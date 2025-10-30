/**
 * Utilitários para manipulação e validação de JWT
 */

interface JWTPayload {
  exp?: number
  iat?: number
  [key: string]: unknown
}

/**
 * Decodifica um JWT sem verificar a assinatura
 * Apenas para validações básicas no client/middleware
 */
export function decodeJWT(token: string): JWTPayload | null {
  if (!token || token.trim() === '') return null

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // Decodificar o payload (segunda parte)
    const payload = parts[1]
    if (!payload) return null

    // Decodificar base64url
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload) as JWTPayload
  } catch {
    return null
  }
}

/**
 * Verifica se um token JWT está expirado
 * @returns true se expirado, false se válido, null se não pode determinar
 */
export function isTokenExpired(token: string): boolean | null {
  const payload = decodeJWT(token)
  if (!payload) return null

  // Se não tem campo exp, considerar válido (deixar backend validar)
  if (!payload.exp) return false

  // exp está em segundos, Date.now() em milissegundos
  const expirationTime = payload.exp * 1000
  const now = Date.now()

  // Adicionar margem de 10 segundos para clock skew
  return now >= expirationTime - 10000
}

/**
 * Verifica se o token tem formato JWT válido (sem verificar assinatura)
 */
export function hasValidJWTFormat(token: string): boolean {
  if (!token || token.trim() === '') return false

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    // Validar que cada parte tem conteúdo
    if (!parts[0] || !parts[1] || !parts[2]) return false

    // Tentar decodificar o payload
    const payload = decodeJWT(token)
    return payload !== null
  } catch {
    return false
  }
}
