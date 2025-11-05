/**
 * Utilitários de formatação de strings
 * Funções puras para formatação de diversos tipos de dados
 */

/**
 * Remove espaços extras no início e fim da string
 */
export function formatTrim(value: string): string {
  return value.trim()
}

/**
 * Formata URL removendo espaços extras
 */
export function formatUrl(value: string): string {
  return value.trim()
}

/**
 * Formata conteúdo de texto removendo espaços múltiplos e normalizando quebras de linha
 */
export function formatContent(value: string): string {
  if (!value) return ''

  let formatted = value.replace(/\s+/g, ' ')
  formatted = formatted.replace(/^\s+/gm, '')

  return formatted
}

/**
 * Formata número de telefone brasileiro
 * Aceita formato: (00) 0000-0000 ou (00) 00000-0000
 */
export function formatTelefone(value: string): string {
  if (!value) return ''

  const numbers = value.replace(/\D/g, '')
  const limited = numbers.substring(0, 11)

  if (limited.length <= 10) {
    return limited
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  return limited
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

/**
 * Formata CEP brasileiro no formato 00000-000
 */
export function formatCEP(value: string): string {
  if (!value) return ''

  const numbers = value.replace(/\D/g, '')
  const limited = numbers.substring(0, 8)

  return limited.replace(/(\d{5})(\d)/, '$1-$2')
}

/**
 * Formata sigla de estado brasileiro (2 letras maiúsculas)
 */
export function formatEstado(value: string): string {
  if (!value) return ''

  const cleaned = value.replace(/[^a-zA-Z]/g, '').toUpperCase()

  return cleaned.substring(0, 2)
}

/**
 * Remove todos os caracteres não numéricos de uma string
 */
export function removeNonDigits(value: string): string {
  if (!value) return ''
  return value.replace(/\D/g, '')
}

/**
 * Limpa e valida um CEP, retornando apenas os dígitos (8 caracteres)
 * Retorna string vazia se inválido
 */
export function cleanCEP(value: string): string {
  if (!value) return ''
  const digits = removeNonDigits(value)
  return digits.length === 8 ? digits : ''
}
