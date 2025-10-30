'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XCircleIcon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 animate-pulse text-green-500" />
        ),
        info: <InfoIcon className="size-4 animate-pulse text-blue-500" />,
        warning: (
          <TriangleAlertIcon className="size-4 animate-pulse text-yellow-500" />
        ),
        error: (
          <XCircleIcon className="text-destructive size-4 animate-pulse" />
        ),
        loading: <Loader2Icon className="size-4 animate-spin" />
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)'
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
