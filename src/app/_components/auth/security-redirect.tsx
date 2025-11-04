'use client'

import { AlertTriangleIcon, ArrowRightIcon, ShieldIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'

/**
 * Tempos pré-configurados para facilitar o uso
 */
export const REDIRECT_TIMES = {
  /** 3 segundos - Redirecionamento rápido */
  FAST: 3,
  /** 10 segundos - Tempo padrão recomendado */
  DEFAULT: 10,
  /** 20 segundos - Tempo moderado */
  MODERATE: 20,
  /** 30 segundos - Redirecionamento lento */
  SLOW: 30
} as const

interface SecurityRedirectProps {
  /** Mensagem principal exibida ao usuário */
  message?: string
  /** Motivo do redirecionamento */
  reason?: string
  /** Tempo em segundos para redirecionamento automático (padrão: 5s) */
  countdown?: number
  /** Callback executado quando o redirecionamento é completado */
  onRedirectComplete?: () => void
}

/**
 * Componente que mostra feedback durante redirecionamentos de segurança
 */
export function SecurityRedirect({
  message = 'Redirecionando para área segura',
  reason = 'Verificação de segurança',
  countdown = REDIRECT_TIMES.DEFAULT,
  onRedirectComplete
}: SecurityRedirectProps) {
  const [timeLeft, setTimeLeft] = useState(countdown)
  const isRedirecting = timeLeft === 0

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    if (timeLeft === 0) {
      const redirectTimer = setTimeout(() => {
        onRedirectComplete?.()
      }, 500)

      return () => clearTimeout(redirectTimer)
    }
  }, [timeLeft, onRedirectComplete])

  // Função para forçar redirecionamento imediato
  const handleImmediateRedirect = () => {
    if (!isRedirecting) {
      setTimeLeft(0)
      onRedirectComplete?.()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-50 via-orange-50 to-amber-50 p-4 dark:from-gray-950 dark:via-red-950/20 dark:to-orange-950/20">
      {/* Efeito de luz de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 animate-pulse rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute -bottom-40 -left-40 size-80 animate-pulse rounded-full bg-red-300/20 blur-3xl delay-700 dark:bg-red-500/10" />
      </div>

      <Card className="animate-in fade-in-0 zoom-in-95 relative z-10 w-full max-w-md border-orange-200/50 shadow-2xl duration-700 dark:border-orange-900/50 dark:bg-gray-900/80 dark:backdrop-blur-md">
        <CardHeader className="space-y-6 pb-4 text-center">
          {/* Ícone de Segurança */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Círculo animado de fundo */}
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/30 dark:bg-orange-500/20" />

              <div className="relative rounded-full border-2 border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 p-6 shadow-xl ring-4 shadow-orange-200/50 ring-orange-100/50 transition-all hover:scale-105 dark:border-orange-900 dark:from-orange-950 dark:to-orange-900 dark:shadow-orange-900/50 dark:ring-orange-900/30">
                {isRedirecting ? (
                  <ArrowRightIcon className="size-12 text-orange-600 drop-shadow-lg dark:text-orange-400" />
                ) : (
                  <ShieldIcon className="size-12 animate-pulse text-orange-600 drop-shadow-lg dark:text-orange-400" />
                )}
              </div>

              {!isRedirecting && (
                <div className="absolute -top-2 -right-2 rounded-full bg-linear-to-br from-red-500 to-red-600 p-1.5 shadow-lg ring-2 ring-red-100 dark:from-red-600 dark:to-red-700 dark:ring-red-900/50">
                  <AlertTriangleIcon className="size-4 text-white drop-shadow" />
                </div>
              )}
            </div>
          </div>

          {/* Título e Badge */}
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center gap-3">
              <h2 className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl font-bold text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                {isRedirecting ? 'Redirecionando...' : 'Acesso Restrito'}
              </h2>
              {!isRedirecting && (
                <Badge
                  variant="destructive"
                  className="animate-pulse shadow-md dark:shadow-red-900/50"
                >
                  <ShieldIcon className="mr-1 size-3" />
                  Segurança
                </Badge>
              )}
            </div>

            <CardDescription className="text-base leading-relaxed font-medium">
              {message}
            </CardDescription>

            <p className="text-muted-foreground/80 text-sm">{reason}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {/* Contador ou Indicador de Progresso */}
          {!isRedirecting ? (
            <div className="space-y-5">
              {/* Contador com design aprimorado */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-2xl bg-orange-400/20 blur-xl dark:bg-orange-500/20" />
                  <Badge
                    variant="outline"
                    className="animate-in zoom-in-50 relative border-2 border-orange-500 bg-linear-to-br from-orange-50 to-orange-100 px-8 py-4 text-5xl font-bold text-orange-600 shadow-lg duration-500 dark:border-orange-400 dark:from-orange-950/50 dark:to-orange-900/50 dark:text-orange-400"
                  >
                    <span className="animate-pulse">{timeLeft}</span>
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground text-center text-sm font-medium">
                Redirecionando em {timeLeft} segundo{timeLeft !== 1 ? 's' : ''}
                ...
              </p>

              {/* Barra de Progresso aprimorada */}
              <div className="h-3 w-full overflow-hidden rounded-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 shadow-inner dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                <div
                  className="relative h-3 rounded-full bg-linear-to-r from-orange-400 via-red-500 to-red-600 shadow-lg transition-all duration-1000 ease-linear dark:from-orange-500 dark:via-red-600 dark:to-red-700"
                  style={{
                    width: `${((countdown - timeLeft) / countdown) * 100}%`
                  }}
                >
                  <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 py-4">
              <div className="flex items-center justify-center gap-3 text-orange-600 dark:text-orange-400">
                <div className="relative">
                  <ArrowRightIcon className="size-6 drop-shadow-md" />
                  <div className="absolute inset-0 animate-ping">
                    <ArrowRightIcon className="size-6 opacity-30" />
                  </div>
                </div>
                <span className="font-semibold">
                  Processando redirecionamento...
                </span>
              </div>

              {/* Spinner de loading aprimorado */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="size-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600 shadow-lg dark:border-orange-900 dark:border-t-orange-400" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/20" />
                </div>
              </div>
            </div>
          )}

          {/* Botão para redirecionamento imediato */}
          {!isRedirecting && timeLeft > 2 && (
            <Button
              onClick={handleImmediateRedirect}
              className="w-full bg-linear-to-r from-orange-600 to-orange-500 shadow-lg transition-all hover:scale-[1.02] dark:from-orange-500 dark:to-orange-600"
              size="lg"
            >
              <ArrowRightIcon className="mr-2 size-4" />
              Ir para login agora
            </Button>
          )}

          {/* Informação de Segurança */}
          <Alert className="border-orange-200 bg-linear-to-br from-orange-50/80 to-amber-50/80 shadow-md backdrop-blur-sm dark:border-orange-900/50 dark:from-orange-950/50 dark:to-amber-950/30">
            <ShieldIcon className="size-3.5 text-orange-600! dark:text-orange-400!" />
            <AlertTitle className="text-gray-800 dark:text-gray-200">
              Aviso de Segurança
            </AlertTitle>
            <AlertDescription className="text-xs font-medium">
              Este redirecionamento é por motivos de segurança para proteger
              seus dados.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
