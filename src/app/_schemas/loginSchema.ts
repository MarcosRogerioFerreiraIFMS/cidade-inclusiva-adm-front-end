import { z } from 'zod'

/** Comprimento mínimo permitido para senhas */
const SENHA_MIN_LENGTH = 8
/** Comprimento máximo permitido para senhas */
const SENHA_MAX_LENGTH = 128

export const createLoginSchema = z.object({
  email: z
    .string()
    .email('Digite um email válido')
    .min(5, 'Email deve ter pelo menos 5 caracteres')
    .max(100, 'Email deve ter no máximo 100 caracteres')
    .transform((val) => val.trim().toLowerCase())
    .refine((val) => val.length <= 254, {
      message: 'O email deve ter no máximo 254 caracteres.'
    })
    .refine((val) => !val.includes('..'), {
      message: 'O email não pode conter pontos consecutivos.'
    }),

  senha: z
    .string()
    .min(
      SENHA_MIN_LENGTH,
      `Senha deve ter pelo menos ${SENHA_MIN_LENGTH} caracteres`
    )
    .max(
      SENHA_MAX_LENGTH,
      `Senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres`
    )
})

export type LoginCreateDTO = z.infer<typeof createLoginSchema>
