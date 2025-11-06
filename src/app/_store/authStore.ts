'use client'

import {
  checkAuth,
  loginAction,
  logoutAction
} from '@/app/_actions/authActions'
import { UsuarioResponseDTO } from '@/app/_dtos/response'
import { isAdmin } from '@/app/_enums/tipoUsuarioEnum'
import { create } from 'zustand'
import type { LoginCreateDTO } from '../_schemas/loginSchema'

interface AuthStore {
  user: UsuarioResponseDTO | null
  isAuthenticated: boolean
  isLoading: boolean
  isLoggingOut: boolean
  error: string | null
  isInitialized: boolean

  // Flags para prevenir race conditions
  isCheckingAuth: boolean
  isLoggingIn: boolean

  login: (data: LoginCreateDTO) => Promise<void>
  logout: () => Promise<void>
  checkAuthentication: () => Promise<void>
  clearError: () => void
  initialize: () => Promise<void>
}

/** Tempo limite para verificação de autenticação */
const TIMEOUT_CHECK_AUTH_MS = 30 * 60 * 1000 // 30 minutos

// BroadcastChannel para sincronização entre abas
let authChannel: BroadcastChannel | null = null
let handleStorageChange: ((e: StorageEvent) => void) | null = null
let tokenExpirationTimer: NodeJS.Timeout | null = null

// Inicializar BroadcastChannel se disponível
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  authChannel = new BroadcastChannel('auth-sync')
}

export const useAuthStore = create<AuthStore>()((set, get) => {
  // Configurar listener do BroadcastChannel
  if (authChannel) {
    authChannel.onmessage = (event) => {
      if (event.data?.type === 'logout') {
        // Logout em outra aba - sincronizar
        set({
          user: null,
          isAuthenticated: false,
          isInitialized: false,
          isLoggingOut: false,
          isLoading: false,
          isCheckingAuth: false,
          isLoggingIn: false,
          error: null
        })

        // Limpar timer de expiração
        if (tokenExpirationTimer) {
          clearTimeout(tokenExpirationTimer)
          tokenExpirationTimer = null
        }

        // Redirecionar para login
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isLoggingOut: false,
    error: null,
    isInitialized: false,
    isCheckingAuth: false,
    isLoggingIn: false,

    login: async (data: LoginCreateDTO) => {
      const state = get()

      // Prevenir múltiplas chamadas simultâneas
      if (state.isLoggingIn || state.isLoading || state.isLoggingOut) return

      set({ isLoading: true, isLoggingIn: true, error: null })
      try {
        const result = await loginAction(data)
        if (result.success) {
          // Após login bem-sucedido, verificar autenticação para obter dados do usuário
          await get().checkAuthentication()
        } else {
          set({
            error: result.error || 'Erro ao fazer login',
            isLoading: false,
            isLoggingIn: false,
            user: null,
            isAuthenticated: false
          })
        }
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : 'Erro interno no login',
          isLoading: false,
          isLoggingIn: false,
          user: null,
          isAuthenticated: false
        })
      }
    },

    logout: async () => {
      const state = get()

      // Prevenir múltiplas chamadas simultâneas
      if (state.isLoading || state.isLoggingOut || state.isCheckingAuth) return

      set({ isLoggingOut: true, isLoading: true })
      try {
        const result = await logoutAction()
        if (result.success) {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: false,
            isLoggingOut: false,
            isLoading: false,
            isCheckingAuth: false,
            isLoggingIn: false,
            error: null
          })

          // Limpar timer de expiração
          if (tokenExpirationTimer) {
            clearTimeout(tokenExpirationTimer)
            tokenExpirationTimer = null
          }

          // Notificar outras abas via BroadcastChannel
          if (authChannel) {
            authChannel.postMessage({ type: 'logout' })
          }

          // Fallback: usar localStorage para compatibilidade
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth-logout', Date.now().toString())
          }
        } else {
          set({
            error: result.error || 'Erro ao fazer logout',
            isLoggingOut: false,
            isLoading: false
          })
        }
      } catch {
        set({
          error: 'Erro interno no logout',
          isLoggingOut: false,
          isLoading: false
        })
      }
    },

    checkAuthentication: async () => {
      const state = get()

      // Prevenir múltiplas chamadas simultâneas
      if (state.isCheckingAuth || state.isLoading || state.isLoggingOut) return

      set({ isLoading: true, isCheckingAuth: true })
      try {
        const authData = await checkAuth()

        // Verificações de segurança
        if (!authData || !authData.authenticated || !authData.user) {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
            isCheckingAuth: false,
            error: null
          })

          // Limpar timer se houver
          if (tokenExpirationTimer) {
            clearTimeout(tokenExpirationTimer)
            tokenExpirationTimer = null
          }
          return
        }

        const { user } = authData

        // Verificar se é ADMIN
        if (!isAdmin(user.tipo)) {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
            isCheckingAuth: false,
            error: 'Acesso negado. Apenas administradores podem acessar.'
          })
          return
        }

        // Verificar integridade dos dados do usuário
        if (!user.id || !user.email || !user.nome) {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
            isCheckingAuth: false,
            error: 'Dados de usuário corrompidos'
          })
          return
        }

        // Usuário é admin válido
        set({
          user: authData.user,
          isAuthenticated: true,
          isInitialized: true,
          isLoading: false,
          isCheckingAuth: false,
          isLoggingIn: false,
          error: null
        })

        // Configurar verificação proativa de expiração do token
        if (tokenExpirationTimer) {
          clearTimeout(tokenExpirationTimer)
        }

        tokenExpirationTimer = setTimeout(async () => {
          // Verificar se ainda está autenticado
          const currentState = get()
          if (currentState.isAuthenticated && !currentState.isCheckingAuth) {
            await get().checkAuthentication()
          }
        }, TIMEOUT_CHECK_AUTH_MS)
      } catch {
        set({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
          isLoading: false,
          isCheckingAuth: false,
          error: null
        })

        // Limpar timer
        if (tokenExpirationTimer) {
          clearTimeout(tokenExpirationTimer)
          tokenExpirationTimer = null
        }
      }
    },

    initialize: async () => {
      const state = get()
      if (state.isInitialized || state.isLoading || state.isCheckingAuth) return

      await get().checkAuthentication()

      // Observa logout em outras abas via localStorage (fallback)
      if (typeof window !== 'undefined' && !handleStorageChange) {
        handleStorageChange = (e: StorageEvent) => {
          if (e.key === 'auth-logout') {
            set({
              user: null,
              isAuthenticated: false,
              isInitialized: false,
              isLoggingOut: false,
              isCheckingAuth: false,
              isLoggingIn: false
            })

            // Limpar timer
            if (tokenExpirationTimer) {
              clearTimeout(tokenExpirationTimer)
              tokenExpirationTimer = null
            }

            // Redirecionar para login
            window.location.href = '/login'
          }
        }
        window.addEventListener('storage', handleStorageChange)
      }
    },

    clearError: () => set({ error: null })
  }
})

// Limpar listeners ao descarregar a página
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (handleStorageChange) {
      window.removeEventListener('storage', handleStorageChange)
      handleStorageChange = null
    }

    if (authChannel) {
      authChannel.close()
      authChannel = null
    }

    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer)
      tokenExpirationTimer = null
    }
  })
}
