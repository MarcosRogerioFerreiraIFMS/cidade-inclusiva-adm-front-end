// Interface para respostas de erro
export interface ApiErrorResponse {
  success: false
  error: string
  details?: string | Record<string, unknown> | Array<Record<string, unknown>>
  message?: string
}

// Interface para respostas gerais de API
export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
  total?: number
}

/** Tipo de retorno para Server Actions */
export type ActionResult = {
  success: boolean
  error?: string
}
