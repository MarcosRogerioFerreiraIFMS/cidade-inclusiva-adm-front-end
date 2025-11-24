import { z } from 'zod'
import {
  emailSchema,
  fotoSchema,
  nomeSchema,
  telefoneSchema
} from './commonSchemas'

// Schema para criação de motorista
export const createMotoristaSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  foto: fotoSchema
})

export type MotoristaCreateDTO = z.infer<typeof createMotoristaSchema>

// Schema para atualização de motorista
export const updateMotoristaSchema = z.object({
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  foto: fotoSchema
})

export type MotoristaUpdateDTO = z.infer<typeof updateMotoristaSchema>
