import { z } from 'zod'
import {
  ACESSIBILIDADE_URBANA_CATEGORIAS,
  ACESSIBILIDADE_URBANA_SIMBOLOS
} from '../_enums/acessibilidadeUrbanaEnums'
import {
  emailSchema,
  enderecoSchema,
  fotoSchema,
  fotosArraySchema,
  nomeSchema,
  telefoneSchema
} from './commonSchemas'

const DESCRICAO_MIN_LENGTH = 3
const DESCRICAO_MAX_LENGTH = 500

// Schema para recurso de acessibilidade
export const recursoAcessibilidadeSchema = z.object({
  simbolo: z.enum(ACESSIBILIDADE_URBANA_SIMBOLOS, {
    required_error: 'O símbolo do recurso é obrigatório',
    invalid_type_error: 'Símbolo de recurso inválido'
  }),
  descricao: z
    .string({ invalid_type_error: 'A descrição deve ser um texto' })
    .trim()
    .refine((val) => {
      if (!val) return true
      return val.length >= DESCRICAO_MIN_LENGTH
    }, `A descrição deve ter no mínimo ${DESCRICAO_MIN_LENGTH} caracteres`)
    .refine(
      (val) => val.length <= DESCRICAO_MAX_LENGTH,
      `A descrição deve ter no máximo ${DESCRICAO_MAX_LENGTH} caracteres`
    )
    .optional()
})

// Schema para criação de acessibilidade urbana
export const createAcessibilidadeUrbanaSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  categoria: z.enum(ACESSIBILIDADE_URBANA_CATEGORIAS, {
    required_error: 'A categoria é obrigatória',
    invalid_type_error: 'Categoria inválida'
  }),
  endereco: enderecoSchema,
  fotos: fotosArraySchema,
  logo: fotoSchema,
  recursos: z
    .array(recursoAcessibilidadeSchema)
    .max(ACESSIBILIDADE_URBANA_SIMBOLOS.length, {
      message: `Não é permitido adicionar mais do que ${ACESSIBILIDADE_URBANA_SIMBOLOS.length} recursos`
    })
    .default([])
    .refine(
      (recursos) => {
        // Verifica se não há símbolos duplicados
        const simbolos = recursos.map((r) => r.simbolo)
        return new Set(simbolos).size === simbolos.length
      },
      {
        message: 'Não é permitido adicionar recursos com o mesmo símbolo'
      }
    )

    .optional()
})

export type AcessibilidadeUrbanaCreateDTO = z.infer<
  typeof createAcessibilidadeUrbanaSchema
>

// Schema para atualização de acessibilidade urbana
export const updateAcessibilidadeUrbanaSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  categoria: z.enum(ACESSIBILIDADE_URBANA_CATEGORIAS, {
    required_error: 'A categoria é obrigatória',
    invalid_type_error: 'Categoria inválida'
  }),
  endereco: enderecoSchema,
  fotos: fotosArraySchema,
  logo: fotoSchema,
  recursos: z
    .array(recursoAcessibilidadeSchema)
    .default([])
    .refine(
      (recursos) => {
        // Verifica se não há símbolos duplicados
        const simbolos = recursos.map((r) => r.simbolo)
        return new Set(simbolos).size === simbolos.length
      },
      {
        message: 'Não é permitido adicionar recursos com o mesmo símbolo'
      }
    )
    .optional()
})

export type AcessibilidadeUrbanaUpdateDTO = z.infer<
  typeof updateAcessibilidadeUrbanaSchema
>
