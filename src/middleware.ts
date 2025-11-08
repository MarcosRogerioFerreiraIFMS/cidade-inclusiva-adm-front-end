import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { hasValidJWTFormat, isTokenExpired } from '@/app/_utils/jwtUtils'
import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest
} from 'next/server'

// Rotas que não requerem autenticação (whitelist)
const PUBLIC_ROUTES: string[] = [APP_ROUTES.LOGIN]

/**
 * Função para verificar se uma rota é pública
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname)
}

/**
 * Função para validar token JWT
 * Verifica formato e expiração
 */
function validateToken(token: string): { valid: boolean; reason?: string } {
  // Verificar formato
  if (!hasValidJWTFormat(token)) {
    return { valid: false, reason: 'invalid_format' }
  }

  // Verificar expiração
  const expired = isTokenExpired(token)

  // Se não conseguiu determinar, deixar backend validar
  if (expired === null) {
    return { valid: true }
  }

  if (expired) {
    return { valid: false, reason: 'expired' }
  }

  return { valid: true }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('auth-token')?.value

  // Se a rota é pública, permitir acesso
  if (isPublicRoute(pathname)) {
    // Se tem token válido e não expirado, redirecionar para home
    if (token) {
      const validation = validateToken(token)
      if (validation.valid && pathname === APP_ROUTES.LOGIN) {
        return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.url))
      }
    }
    return NextResponse.next()
  }

  // TODAS as outras rotas requerem token JWT válido
  if (!token) {
    const loginUrl = new URL(APP_ROUTES.LOGIN, request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Validar token
  const validation = validateToken(token)

  if (!validation.valid) {
    // Token inválido ou expirado - deletar cookie e redirecionar
    const response = NextResponse.redirect(
      new URL(APP_ROUTES.LOGIN, request.url)
    )

    // Deletar cookie inválido
    response.cookies.delete('auth-token')

    return response
  }

  // Token válido - permitir acesso
  // A verificação de ADMIN será feita pelos componentes que usam checkAuth()
  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)'
  ]
}
