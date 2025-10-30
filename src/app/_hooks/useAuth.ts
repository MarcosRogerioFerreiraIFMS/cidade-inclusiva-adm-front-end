import { useEffect, useRef } from 'react'
import type { LoginCreateDTO } from '../_schemas/loginSchema'
import { useAuthStore } from '../_store/authStore'

/**
 * Hook de autenticação que fornece estado e ações de autenticação.
 */
export const useAuth = () => {
  const store = useAuthStore()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current && !store.isInitialized && !store.isLoading) {
      hasInitialized.current = true
      store.initialize()
    }
  }, [store])

  /**
   * Faz login com os dados do formulário.
   */
  const login = async (data: LoginCreateDTO) => {
    try {
      await store.login(data)
    } catch {
      await store.logout()
    }
  }

  /**
   * Faz logout do usuário e redireciona para a página de login.
   */
  const logout = async () => {
    await store.logout()
  }

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    isLoggingOut: store.isLoggingOut,
    error: store.error,
    isInitialized: store.isInitialized,
    login,
    logout,
    clearError: store.clearError,
    checkAuthentication: store.checkAuthentication,
    initialize: store.initialize
  }
}
