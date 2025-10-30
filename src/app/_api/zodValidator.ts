import { ZodSchema } from 'zod'

interface ValidationResult<T> {
  success: boolean
  data?: T
  error?: string
}

export function validateWithZod<T>(
  schema: ZodSchema<T>,
  data: unknown,
  customMessage?: string
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const zodError = result.error
  const firstIssue = zodError.issues[0]
  const field = firstIssue?.path?.[0]
  const message =
    customMessage ||
    (field
      ? `Erro no campo "${field}": ${firstIssue.message}`
      : firstIssue.message || 'Dados inválidos.')

  return { success: false, error: message }
}
