import * as React from 'react'

import { cn } from '@/app/_lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={props['aria-invalid']}
      aria-describedby={props['aria-describedby']}
      aria-required={props.required}
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'transition-all duration-300 ease-in-out',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
