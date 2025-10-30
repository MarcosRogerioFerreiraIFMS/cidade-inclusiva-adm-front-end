'use client'

import { cn } from '@/app/_lib/utils'
import { useMenuStore } from '@/app/_store/menuStore'

interface LayoutDashboardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

/**
 * Serve para envolver o conteúdo principal do dashboard.
 */
export function LayoutDashboard({
  children,
  style,
  className,
  ...rest
}: LayoutDashboardProps) {
  const showMenu = useMenuStore((state) => state.showMenu)

  return (
    <main
      className={cn(
        `animate-fade-in [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-background mt-20 flex flex-col gap-5 overflow-y-auto px-5 pt-5 pb-10 transition-all [&::-webkit-scrollbar]:w-2 ${showMenu ? 'ml-70' : 'ml-0'}`,
        className
      )}
      style={{
        height: 'calc(100dvh - 5rem)',
        ...style
      }}
      {...rest}
    >
      {children}
    </main>
  )
}
