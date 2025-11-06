'use client'

import { isAdmin } from '@/app/_enums/tipoUsuarioEnum'
import { useAuth } from '@/app/_hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AuthFallback } from './auth-fallback'
import { SecurityRedirect } from './security-redirect'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    isLoggingOut,
    isInitialized,
    logout
  } = useAuth()
  const router = useRouter()
  const securityCheckTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [securityError, setSecurityError] = useState<{
    type: 'unauthorized' | 'not_admin' | 'invalid_data' | 'session_expired'
    message: string
    reason: string
  } | null>(null)

  // Verificação de segurança após inicialização completa
  useEffect(() => {
    // Limpar timer anterior se existir
    if (securityCheckTimerRef.current) {
      clearTimeout(securityCheckTimerRef.current)
    }

    // Não fazer verificações durante loading, logout ou se já há erro
    if (isLoading || isLoggingOut || securityError) {
      return
    }

    // Só fazer verificações se estiver inicializado
    if (!isInitialized) {
      return
    }

    // Timer para aguardar um pouco antes de considerar erro (evitar flashes)
    securityCheckTimerRef.current = setTimeout(() => {
      // Verificar se o usuário não está autenticado após inicialização completa
      if (!isAuthenticated) {
        setSecurityError({
          type: 'unauthorized',
          message: 'Sessão expirou ou não encontrada',
          reason:
            'Sua sessão de autenticação não foi encontrada ou expirou. Por favor, faça login novamente para continuar usando o sistema.'
        })
        return
      }

      // Verificar se o usuário existe mas não tem dados válidos
      if (!user) {
        setSecurityError({
          type: 'session_expired',
          message: 'Dados de usuário não encontrados',
          reason:
            'Não foi possível carregar seus dados de usuário. Isso pode indicar uma sessão corrompida ou expirada.'
        })
        return
      }

      // Verificar se o usuário não é ADMIN
      if (!isAdmin(user.tipo)) {
        setSecurityError({
          type: 'not_admin',
          message: 'Acesso negado - Permissão insuficiente',
          reason: `Sua conta foi identificada como "${user.tipo}", mas este sistema é exclusivo para administradores. Entre em contato com o administrador do sistema para obter as permissões necessárias.`
        })
        return
      }

      // Verificar integridade dos dados do usuário
      if (!user.id || !user.email || !user.nome) {
        setSecurityError({
          type: 'invalid_data',
          message: 'Dados de usuário incompletos',
          reason:
            'Os dados essenciais da sua conta estão incompletos ou corrompidos. É necessário fazer login novamente para restaurar a sessão.'
        })
        return
      }
    }, 800) // Reduzido para 800ms para resposta mais rápida

    return () => {
      if (securityCheckTimerRef.current) {
        clearTimeout(securityCheckTimerRef.current)
      }
    }
  }, [
    isInitialized,
    isAuthenticated,
    user,
    isLoading,
    isLoggingOut,
    securityError
  ])

  // Função para lidar com o redirecionamento após erro de segurança
  const handleSecurityRedirect = async () => {
    try {
      // Fazer logout para limpar dados corrompidos/inválidos
      await logout()
    } catch {
      // Continuar com redirecionamento mesmo se logout falhar
    }

    // Pequeno delay para melhor UX
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  // Se há erro de segurança, mostrar SecurityRedirect
  if (securityError) {
    return (
      <SecurityRedirect
        message={securityError.message}
        reason={securityError.reason}
        onRedirectComplete={handleSecurityRedirect}
      />
    )
  }

  // Durante logout, mostrar mensagem específica
  if (isLoggingOut) {
    return <AuthFallback message="Fazendo logout..." />
  }

  // Se ainda está carregando ou inicializando
  if (!isInitialized || isLoading) {
    return <AuthFallback message="Carregando..." />
  }

  // Se não estiver autenticado, aguardar verificação de segurança
  if (!isAuthenticated) {
    return <AuthFallback message="Verificando credenciais..." />
  }

  // Se não há usuário, aguardar verificação
  if (!user) {
    return <AuthFallback message="Carregando dados do usuário..." />
  }

  // Verificação final: garantir que o usuário é ADMIN
  if (!isAdmin(user.tipo)) {
    return <AuthFallback message="Verificando permissões de administrador..." />
  }

  // Tudo OK - renderizar conteúdo protegido
  return <>{children}</>
}
