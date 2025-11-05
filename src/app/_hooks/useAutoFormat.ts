import {
  formatCEP,
  formatContent,
  formatEstado,
  formatTelefone,
  formatTrim,
  formatUrl
} from '@/app/_utils/formatUtils'
import { useCallback } from 'react'
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export function useAutoFormat() {
  const createAutoFormatHandler = useCallback(
    <T extends FieldValues>(
      field: ControllerRenderProps<T, Path<T>>,
      formatFn: (value: string) => string
    ) => {
      return {
        ...field,
        onBlur: (
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          const formatted = formatFn(e.target.value)
          field.onChange(formatted)
          field.onBlur()
        }
      }
    },
    []
  )

  const createOnChangeFormatHandler = useCallback(
    <T extends FieldValues>(
      field: ControllerRenderProps<T, Path<T>>,
      formatFn: (value: string) => string
    ) => {
      return {
        ...field,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const formatted = formatFn(e.target.value)
          field.onChange(formatted)
        }
      }
    },
    []
  )

  return {
    formatTrim,
    formatUrl,
    formatContent,
    formatTelefone,
    formatCEP,
    formatEstado,
    createAutoFormatHandler,
    createOnChangeFormatHandler
  }
}
