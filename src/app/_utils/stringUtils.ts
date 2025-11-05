/**
 * Sanitiza e organiza conteúdo de texto de forma robusta,
 * preservando estrutura, legibilidade e formatação básica.
 */
export const sanitizeContent = (input: string): string => {
  if (!input || typeof input !== 'string') return ''

  let str = input
    // Remove tags HTML e script completamente (case insensitive)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/<[^>]*>/g, '')

    // Remove URLs perigosas (javascript:, data:, vbscript:)
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/data\s*:\s*application/gi, '')

    // Remove event handlers (onclick, onerror, etc.)
    .replace(/on\w+\s*=/gi, '')

    // Remove entidades HTML como &nbsp; ou &#x2028;
    .replace(/&[a-zA-Z#0-9]+;/g, ' ')

    // Remove caracteres de controle invisíveis (exceto \n e \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')

    // Remove caracteres bidirecionais Unicode maliciosos
    // (podem alterar ordem de exibição e ocultar código malicioso)
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')

    // Remove zero-width characters suspeitos
    // (podem ser usados para ocultar texto ou criar confusão)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')

    // Normaliza aspas e travessões
    .replace(/[""«»]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[–—]/g, '-')

    // Remove caracteres não textuais (mantém pontuação comum, acentos PT-BR e emojis)
    .replace(
      /[^\w\s.,!?;:()"'@%&*\-+/áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n\t\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu,
      ''
    )

  // Divide o texto em linhas, normalizando espaços
  const lines = str
    .split(/\r?\n+/)
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)

  // Junta com no máximo uma quebra entre blocos
  str = lines.join('\n')

  // Remove múltiplas quebras de linha consecutivas
  str = str.replace(/\n{3,}/g, '\n\n')

  // Limita o tamanho máximo do conteúdo para evitar abusos
  const MAX_CONTENT_LENGTH = 50000 // 50KB de texto
  if (str.length > MAX_CONTENT_LENGTH) {
    str = str.substring(0, MAX_CONTENT_LENGTH)
  }

  // Trim final
  return str.trim()
}

/**
 * Sanitiza uma string removendo caracteres especiais e normalizando espaços
 * @param {string} str - String a ser sanitizada
 * @returns {string} String sanitizada e normalizada
 */
export const sanitizeString = (str: string): string => {
  if (!str || typeof str !== 'string') return ''

  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[^\w\s\-.,!?()áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Trunca um texto em um tamanho máximo, adicionando reticências se necessário
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Gera as iniciais de um nome (primeiras letras das 2 primeiras palavras)
 * Ou as 2 primeiras letras da primeira palavra se houver apenas uma
 */
export function getInitials(name: string): string {
  if (!name) return 'U'

  const names = name.split(' ').filter((n) => n.length > 0)

  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }

  return names[0].substring(0, 2).toUpperCase()
}

/**
 * Capitaliza a primeira letra de uma palavra
 * @param {string} word - Palavra a ser capitalizada
 * @returns {string} Palavra com a primeira letra maiúscula
 */
export function capitalizeFirstLetter(word: string): string {
  if (!word || typeof word !== 'string') return ''
  return word.charAt(0).toUpperCase() + word.slice(1)
}
