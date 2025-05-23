/**
 * Container component
 *
 * Descrição:
 *  - Este componente é um container que pode ser utilizado para agrupar os componentes de uma página.
 *  - Ele é responsável por ajustar o layout da página em relação ao conteúdo que ele contém.
 *
 * Dicas: Ele suporta classes de estilo, propriedades de estilo e outras propriedades HTML. Para que ele se ajuste individualmente a cada página.
 *
 * Atenção:
 *  - Todas as páginas devem utilizar este componente.
 *  - Use apenas um por página.
 */

'use client'

import { useMenuStore } from '@/app/_store/useMenuStore'
import { cn } from '../_lib/utils'
import { Card, CardContent } from './ui/card'

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function Container({
  children,
  style,
  className,
  ...rest
}: ContainerProps) {
  const { showMenu } = useMenuStore()

  return (
    <main
      className={cn(
        `[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-background mt-20 flex flex-col gap-5 overflow-y-auto px-5 pt-5 pb-10 transition-all [&::-webkit-scrollbar]:w-2 ${showMenu ? 'ml-70' : 'ml-0'}`,
        className
      )}
      style={{
        height: 'calc(100dvh - 5rem)',
        ...style
      }}
      {...rest}
    >
      <Card className="mx-auto w-full max-w-350">
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </main>
  )
}
