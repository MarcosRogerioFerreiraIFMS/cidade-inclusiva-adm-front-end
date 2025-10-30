import { Loader2Icon } from 'lucide-react'
import { LayoutDashboard } from './layout-dashboard'

interface LayoutLoadingProps {
  children?: React.ReactNode
}

/**
 * Serve para envolver o conteúdo de loading do dashboard.
 */
export function LayoutLoading({ children }: LayoutLoadingProps) {
  return (
    <LayoutDashboard>
      <div className="flex h-full items-center justify-center gap-2 px-4">
        <Loader2Icon className="dark:text-foreground text-primary size-12 animate-spin" />
        <span className="line-clamp-1 max-w-xl text-2xl">{children}...</span>
      </div>
    </LayoutDashboard>
  )
}
