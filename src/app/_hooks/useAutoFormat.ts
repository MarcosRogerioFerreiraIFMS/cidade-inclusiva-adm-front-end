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

  const formatTelefone = useCallback((value: string): string => {
    if (!value) return ''

    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '')

    // Limita a 11 dígitos
    const limited = numbers.substring(0, 11)

    // Aplica a máscara
    if (limited.length <= 10) {
      // (00) 0000-0000
      return limited
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }

    // (00) 00000-0000
    return limited
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }, [])

  const formatCEP = useCallback((value: string): string => {
    if (!value) return ''

    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '')

    // Limita a 8 dígitos
    const limited = numbers.substring(0, 8)

    // Aplica a máscara 00000-000
    return limited.replace(/(\d{5})(\d)/, '$1-$2')
  }, [])

  const formatEstado = useCallback((value: string): string => {
    if (!value) return ''

    // Remove caracteres especiais e números, converte para maiúsculas
    const cleaned = value.replace(/[^a-zA-Z]/g, '').toUpperCase()

    // Limita a 2 caracteres
    return cleaned.substring(0, 2)
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
