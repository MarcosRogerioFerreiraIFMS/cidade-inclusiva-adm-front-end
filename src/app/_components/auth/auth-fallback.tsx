import { Loader2Icon } from 'lucide-react'

interface FallbackProps {
  message?: string
}

export function AuthFallback({
  message = 'Verificando autenticação...'
}: FallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="flex items-center gap-2">
        <Loader2Icon className="dark:text-foreground text-primary size-12 animate-spin" />
        <span className="line-clamp-1 max-w-xl text-2xl">{message}</span>
      </div>
    </div>
  )
}
