import * as React from 'react'

import { cn } from '@/app/_lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  height?: number
  width?: number
}

function Textarea({
  className,
  resize = 'vertical',
  height,
  width,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        resize === 'none' && 'resize-none',
        resize === 'horizontal' && 'resize-x',
        resize === 'vertical' && 'resize-y',
        resize === 'both' && 'resize',
        className
      )}
      style={{ height, width }}
      {...props}
    />
  )
}

export { Textarea }
