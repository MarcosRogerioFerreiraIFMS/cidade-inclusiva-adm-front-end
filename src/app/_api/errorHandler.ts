import type { ApiErrorResponse } from '../_types/apiResponsesType'

/**
 * Classe de erro customizada que preserva o status HTTP
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number | null
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Normaliza e traduz erros de API/fetch em mensagens amigáveis ao usuário
 */
export function handleApiError(
  status: number | null,
  errorData: unknown
): ApiError {
  // Se já for um Error, processa a mensagem
  if (errorData instanceof Error) {
    const message = errorData.message.toLowerCase()
    const errorName = errorData.name.toLowerCase()

    // Erros de rede/conexão
    if (
      message.includes('fetch') ||
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('network request failed') ||
      message.includes('econnrefused') ||
      message.includes('enotfound') ||
      message.includes('etimedout') ||
      message.includes('getaddrinfo') ||
      message.includes('connect') ||
      message.includes('socket') ||
      errorName === 'typeerror' ||
      (errorData.cause && errorData.cause instanceof Error)
    ) {
      return new ApiError(
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.',
        status
      )
    }

    // Remover mensagens técnicas e torná-las amigáveis
    return new ApiError(makeUserFriendly(errorData.message), status)
  }

  if (isApiErrorResponse(errorData)) {
    const rawMessage =
      errorData.error ||
      errorData.message ||
      defaultMessageForStatus(status) ||
      'Erro inesperado.'

    return new ApiError(makeUserFriendly(rawMessage), status)
  }

  if (typeof errorData === 'string') {
    return new ApiError(makeUserFriendly(errorData), status)
  }

  return new ApiError(
    defaultMessageForStatus(status) ||
      'Ocorreu um erro. Por favor, tente novamente.',
    status
  )
}

/**
 * Transforma mensagens técnicas em mensagens amigáveis ao usuário
 */
function makeUserFriendly(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Token inválido ou expirado
  if (
    lowerMessage.includes('token inválido') ||
    lowerMessage.includes('token invalido') ||
    lowerMessage.includes('invalid token') ||
    lowerMessage.includes('token expired') ||
    lowerMessage.includes('jwt expired')
  ) {
    return 'Sua sessão expirou. Por favor, faça login novamente.'
  }

  // Não autenticado
  if (
    lowerMessage.includes('não autenticado') ||
    lowerMessage.includes('nao autenticado') ||
    lowerMessage.includes('not authenticated') ||
    lowerMessage.includes('unauthenticated')
  ) {
    return 'Você precisa estar logado para acessar este recurso.'
  }

  // Rota não encontrada
  if (
    lowerMessage.includes('rota não encontrada') ||
    lowerMessage.includes('rota nao encontrada') ||
    lowerMessage.includes('route not found') ||
    lowerMessage.includes('not found')
  ) {
    return 'O recurso que você procura não está disponível.'
  }

  // Dados inválidos
  if (
    lowerMessage.includes('validation') ||
    lowerMessage.includes('invalid data') ||
    lowerMessage.includes('dados inválidos')
  ) {
    return 'Os dados informados são inválidos. Verifique e tente novamente.'
  }

  // Permissão negada
  if (
    lowerMessage.includes('forbidden') ||
    lowerMessage.includes('permission denied') ||
    lowerMessage.includes('access denied')
  ) {
    return 'Você não tem permissão para realizar esta ação.'
  }

  // Retorna mensagem original se já for amigável, senão usa uma genérica
  if (isAlreadyUserFriendly(message)) {
    return message
  }

  return 'Ocorreu um erro ao processar sua solicitação. Tente novamente.'
}

/**
 * Verifica se a mensagem já é amigável ao usuário
 */
function isAlreadyUserFriendly(message: string): boolean {
  const lowerMessage = message.toLowerCase()

  // Lista de padrões que indicam mensagens amigáveis
  const friendlyPatterns = [
    'por favor',
    'tente novamente',
    'verifique',
    'não foi possível',
    'erro ao',
    'aguarde',
    'credenciais',
    'email',
    'senha',
    'acesso negado',
    'permissão',
    'disponível',
    'temporariamente'
  ]

  return friendlyPatterns.some((pattern) => lowerMessage.includes(pattern))
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) return false
  return 'error' in value || 'message' in value
}

function defaultMessageForStatus(status: number | null): string | undefined {
  switch (status) {
    case 400:
      return 'Os dados enviados são inválidos. Verifique e tente novamente.'
    case 401:
      return 'Sua sessão expirou. Por favor, faça login novamente.'
    case 403:
      return 'Você não tem permissão para acessar este recurso.'
    case 404:
      return 'O recurso que você procura não foi encontrado.'
    case 408:
      return 'A requisição demorou muito. Por favor, tente novamente.'
    case 429:
      return 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.'
    case 500:
      return 'Erro no servidor. Nossa equipe já foi notificada.'
    case 502:
      return 'Servidor temporariamente indisponível. Tente novamente em instantes.'
    case 503:
      return 'Serviço em manutenção. Tente novamente em alguns minutos.'
    case 504:
      return 'O servidor demorou para responder. Por favor, tente novamente.'
    default:
      return undefined
  }
}
