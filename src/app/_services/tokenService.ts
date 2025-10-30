import { cookies } from 'next/headers'
import 'server-only'

const AUTH_COOKIE_NAME = 'auth-token'
const MAX_AGE = 60 * 60 * 24 * 7

export async function getServerAuthToken(): Promise<string> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    throw new Error('Sua sessão expirou. Por favor, faça login novamente.')
  }

  return token
}

export async function setServerAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteServerAuthToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}
