import { useCallback } from 'react'
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export function useAutoFormat() {
  const formatTrim = useCallback((value: string): string => {
    return value.trim()
  }, [])

  const formatUrl = useCallback((value: string): string => {
    return value.trim()
  }, [])

  const formatContent = useCallback((value: string): string => {
    if (!value) return ''

    let formatted = value.replace(/\s+/g, ' ')
    formatted = formatted.replace(/^\s+/gm, '')

    return formatted
  }, [])

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

  return {
    formatTrim,
    formatUrl,
    formatContent,
    createAutoFormatHandler
  }
}
