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
      className={`mt-20 ml-70 grid place-items-center p-5 ${className || ''}`}
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
