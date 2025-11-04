import { AlertCircleIcon } from 'lucide-react'
import { Card } from './ui/card'

interface FormAlertProps {
  variant: 'error' | 'warning' | 'info'
  title: string
  description: string
}

export function FormAlert({ variant, title, description }: FormAlertProps) {
  const variantStyles = {
    error:
      'border-destructive bg-destructive/10 text-destructive dark:text-red-400',
    warning:
      'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400',
    info: 'border-muted bg-white dark:bg-muted/55 text-muted-foreground dark:text-muted-foreground'
  }

  const Icon = AlertCircleIcon

  return (
    <Card className={`animate-fade-in mt-2 p-3 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  )
}
