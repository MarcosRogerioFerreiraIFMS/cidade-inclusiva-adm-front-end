'use client'

import { MonitorIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'

export function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [screenState, setScreenState] = useState<{
    isMobile: boolean
    isClient: boolean
  }>({
    isMobile: false,
    isClient: false
  })

  useEffect(() => {
    function checkScreen() {
      const width = window.innerWidth
      const isMobileScreen = width < 1024

      setScreenState({
        isMobile: isMobileScreen,
        isClient: true
      })
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  if (!screenState.isClient) {
    return null
  }

  if (screenState.isMobile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-6 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-white p-6 shadow-lg dark:bg-gray-800">
              <MonitorIcon className="text-primary size-16" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tela Muito Pequena
            </h1>
            <p className="text-lg">
              Esta aplicação requer uma tela maior para funcionar corretamente.
            </p>
          </div>

          <div className="space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Painel Administrativo</strong>
            </p>
            <p className="text-muted-foreground text-sm">
              Por favor, acesse esta aplicação em um computador ou tablet com
              tela de pelo menos <strong>1024 pixels de largura</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">
              Dispositivos suportados:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Desktop</Badge>
              <Badge>Laptop</Badge>
              <Badge>Tablet (Paisagem)</Badge>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
