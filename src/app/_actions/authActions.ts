'use server'

import { apiClient } from '../_api/apiClient'
import { validateWithZod } from '../_api/zodValidator'
import type { LoginResponseDTO, UsuarioResponseDTO } from '../_dtos/response'
import { createLoginSchema, type LoginCreateDTO } from '../_schemas/loginSchema'
import {
  deleteServerAuthToken,
  setServerAuthToken
} from '../_services/tokenService'
import type { ActionResult, ApiResponse } from '../_types/apiResponsesType'

/**
 * Ação de login que valida dados, obtém token e verifica se é ADMIN
 */
export async function loginAction(data: LoginCreateDTO): Promise<ActionResult> {
  const validation = validateWithZod(createLoginSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    const result = await apiClient<ApiResponse<LoginResponseDTO>>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(validation.data),
        cache: 'no-store',
        skipAuth: true // Login não requer token
      }
    )

    // Validar estrutura da resposta
    if (!result?.data?.token || !result?.data?.usuario) {
      return {
        success: false,
        error: 'Erro ao processar resposta do servidor. Tente novamente.'
      }
    }

    const { token, usuario } = result.data

    // Verificar integridade dos dados do usuário
    if (!usuario.id || !usuario.email || !usuario.nome || !usuario.tipo) {
      return {
        success: false,
        error: 'Erro ao processar dados de usuário. Tente novamente.'
      }
    }

    // Verificar se o usuário é ADMIN ANTES de salvar o token
    if (usuario.tipo !== 'ADMIN') {
      return {
        success: false,
        error: 'Acesso negado. Este sistema é exclusivo para administradores.'
      }
    }

    // Só salva o token se todas as validações passarem
    await setServerAuthToken(token)

    return { success: true }
  } catch (error) {
    // Tratamento de erros já é feito pelo apiClient/errorHandler
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: false,
      error: 'Erro inesperado. Tente novamente.'
    }
  }
}

/**
 * Resposta da rota /auth/me
 */
async function validateWithBackend(): Promise<UsuarioResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<UsuarioResponseDTO>>('/auth/me')

    if (!result || !result.data) {
      await deleteServerAuthToken()
      return null
    }

    return result.data
  } catch {
    await deleteServerAuthToken()
    return null
  }
}

/**
 * Garante que o usuário é ADMIN; se não for, deleta o token
 */
async function ensureIsAdmin(
  user: UsuarioResponseDTO | null
): Promise<UsuarioResponseDTO | null> {
  if (!user || user.tipo !== 'ADMIN') {
    await deleteServerAuthToken()
    return null
  }
  return user
}

/**
 * Verifica autenticação e se é ADMIN
 */
export async function checkAuth(): Promise<{
  user: UsuarioResponseDTO
  authenticated: boolean
} | null> {
  try {
    const user = await validateWithBackend()

    if (!user) {
      return null
    }

    const adminUser = await ensureIsAdmin(user)
    if (!adminUser) return null

    return {
      user: adminUser,
      authenticated: true
    }
  } catch {
    return null
  }
}

/**
 * Ação de logout que deleta o token e redireciona para login
 */
export async function logoutAction(): Promise<ActionResult> {
  try {
    await deleteServerAuthToken()
    return { success: true }
  } catch {
    return { success: false, error: 'Erro ao fazer logout. Tente novamente.' }
  }
}
