'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { cn } from '@/app/_lib/utils'
import { CheckIcon } from 'lucide-react'

interface EspecialidadeOption {
  value: string
  label: string
}

interface EspecialidadesSelectorProps {
  options: EspecialidadeOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
  className?: string
}

export function EspecialidadesSelector({
  options,
  selectedValues,
  onChange,
  disabled = false,
  className
}: EspecialidadesSelectorProps) {
  const handleToggle = (value: string) => {
    if (disabled) return

    const isSelected = selectedValues.includes(value)
    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const handleSelectAll = () => {
    if (disabled) return
    onChange(options.map((option) => option.value))
  }

  const handleClearAll = () => {
    if (disabled) return
    onChange([])
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <Badge variant="outline" className="text-xs">
          {selectedValues.length}{' '}
          {selectedValues.length === 1 ? 'selecionada' : 'selecionadas'}
        </Badge>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            disabled={disabled || selectedValues.length === options.length}
            className="h-7 text-xs"
          >
            Selecionar todas
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={disabled || selectedValues.length === 0}
            className="h-7 text-xs"
          >
            Limpar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)

          return (
            <Card
              key={option.value}
              className={cn(
                'relative cursor-pointer transition-all hover:shadow-md',
                isSelected
                  ? 'border-primary bg-primary/5 ring-primary/20 ring-2'
                  : 'border-border hover:border-primary/50',
                disabled && 'cursor-not-allowed opacity-60'
              )}
              onClick={() => handleToggle(option.value)}
            >
              <div className="flex items-center gap-3 p-3">
                <div
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/50'
                  )}
                >
                  {isSelected && <CheckIcon className="h-3.5 w-3.5" />}
                </div>
                <span
                  className={cn(
                    'text-sm leading-tight font-medium',
                    isSelected ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {option.label}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
