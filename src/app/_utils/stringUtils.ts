export const sanitizeContent = (input: string): string => {
  if (!input || typeof input !== 'string') return ''

  let str = input
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-zA-Z#0-9]+;/g, ' ')
    .replace(/[\\x00-\\x1F\\x7F-\\x9F]/g, '')
    .replace(/[""«»]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s.,!?;:()"'@%&*\-+/áàãâéêíóôõúçÁÀÃÂÉÊÍÓÔÕÚÇ\n\t]/g, '')

  const lines = str
    .split(/\r?\n+/)
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter((line) => line.length > 0)

  str = lines.join('\n')
  str = str.replace(/\n{3,}/g, '\n\n')

  return str.trim()
}
