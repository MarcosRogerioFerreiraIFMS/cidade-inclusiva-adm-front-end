'use client'

import { usePathname } from 'next/navigation'
import { ProtectedRoute } from '../auth/protected-route'
import { Toaster } from '../ui/sonner'
import { Header } from './header'
import { MobileBlocker } from './mobile-blocker'

interface LayoutProviderProps {
  children: React.ReactNode
}

/**
 * Componente que fornece o layout principal do aplicativo
 */
export function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  // Se for a página de login, não renderiza o Header
  if (isLoginPage) {
    return (
      <MobileBlocker>
        {children}
        <Toaster position="top-center" duration={5000} offset="40px" />
      </MobileBlocker>
    )
  }

  return (
    <ProtectedRoute>
      <MobileBlocker>
        <Header />
        {children}
        <Toaster position="top-center" duration={5000} offset="40px" />
      </MobileBlocker>
    </ProtectedRoute>
  )
}
