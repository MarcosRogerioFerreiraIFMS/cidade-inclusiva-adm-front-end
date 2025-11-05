import { z } from 'zod'
import { loginEmailSchema, loginSenhaSchema } from './commonSchemas'

export const createLoginSchema = z.object({
  email: loginEmailSchema,
  senha: loginSenhaSchema
})

export type LoginCreateDTO = z.infer<typeof createLoginSchema>
