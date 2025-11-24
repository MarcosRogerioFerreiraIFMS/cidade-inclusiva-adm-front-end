import { z } from 'zod'
import { MANUTENCAO_ESPECIALIDADES } from '../_enums/manutencaoEnums'
import {
  emailSchema,
  enderecoSchema,
  fotosArraySchema,
  fotoSchema,
  nomeSchema,
  telefoneSchema
} from './commonSchemas'

// Schema para criação de manutenção
export const createManutencaoSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  especialidades: z
    .array(
      z.enum(MANUTENCAO_ESPECIALIDADES, {
        required_error: 'Pelo menos uma especialidade é obrigatória',
        invalid_type_error: 'Especialidade inválida'
      })
    )
    .min(1, 'Selecione pelo menos uma especialidade')
    .max(20, 'Selecione no máximo 20 especialidades'),
  endereco: enderecoSchema,
  fotos: fotosArraySchema,
  logo: fotoSchema
})

export type ManutencaoCreateDTO = z.infer<typeof createManutencaoSchema>

// Schema para atualização de manutenção
export const updateManutencaoSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  especialidades: z
    .array(
      z.enum(MANUTENCAO_ESPECIALIDADES, {
        required_error: 'Pelo menos uma especialidade é obrigatória',
        invalid_type_error: 'Especialidade inválida'
      })
    )
    .min(1, 'Selecione pelo menos uma especialidade')
    .max(20, 'Selecione no máximo 20 especialidades'),
  endereco: enderecoSchema,
  fotos: fotosArraySchema,
  logo: fotoSchema
})

export type ManutencaoUpdateDTO = z.infer<typeof updateManutencaoSchema>
