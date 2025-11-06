import { z } from 'zod'
import { PROFISSIONAL_ESPECIALIDADES } from '../_enums/profissionalEnums'
import {
  emailSchema,
  fotoUpdateSchema,
  nomeSchema,
  telefoneSchema
} from './commonSchemas'

// Schema para criação de profissional
export const createProfissionalSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  especialidade: z.enum(PROFISSIONAL_ESPECIALIDADES, {
    required_error: 'A especialidade é obrigatória',
    invalid_type_error: 'Especialidade inválida'
  }),
  foto: fotoUpdateSchema
})

export type ProfissionalCreateDTO = z.infer<typeof createProfissionalSchema>

// Schema para atualização de profissional
export const updateProfissionalSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  especialidade: z.enum(PROFISSIONAL_ESPECIALIDADES, {
    required_error: 'A especialidade é obrigatória',
    invalid_type_error: 'Especialidade inválida'
  }),
  foto: fotoUpdateSchema
})

export type ProfissionalUpdateDTO = z.infer<typeof updateProfissionalSchema>
