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
  return (
    <main
      className={`mt-20 ml-70 flex flex-col gap-5 p-5 ${className || ''}`}
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
