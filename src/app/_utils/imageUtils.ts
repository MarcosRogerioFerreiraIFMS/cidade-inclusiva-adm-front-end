export const VALID_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.bmp',
  '.ico',
  '.avif'
] as const

export function hasValidImageExtension(url: string): boolean {
  const urlLower = url.toLowerCase()
  const cleanUrl = urlLower.split('?')[0].split('#')[0]
  return VALID_IMAGE_EXTENSIONS.some((ext) => cleanUrl.endsWith(ext))
}

export function validateUrlProtocol(url: string): {
  valid: boolean
  error?: string
} {
  if (!url || url.trim() === '') {
    return { valid: true }
  }

  try {
    const urlObj = new URL(url)
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return { valid: false, error: 'URL deve começar com http:// ou https://' }
    }
    return { valid: true }
  } catch {
    return { valid: false, error: 'URL inválida' }
  }
}

export async function validateImageUrl(
  url: string,
  timeout = 5000
): Promise<{ valid: boolean; error?: string }> {
  if (!url || url.trim() === '') {
    return { valid: true }
  }

  const protocolValidation = validateUrlProtocol(url)
  if (!protocolValidation.valid) {
    return protocolValidation
  }

  if (!hasValidImageExtension(url)) {
    return {
      valid: false,
      error: `A URL deve terminar com uma extensão de imagem válida (${VALID_IMAGE_EXTENSIONS.join(', ')})`
    }
  }

  return new Promise((resolve) => {
    const img = new Image()
    let resolved = false

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true
        img.src = ''
        resolve({
          valid: false,
          error: 'Tempo esgotado ao carregar a imagem'
        })
      }
    }, timeout)

    img.onload = () => {
      if (!resolved) {
        resolved = true
        clearTimeout(timer)
        img.src = ''
        resolve({ valid: true })
      }
    }

    img.onerror = () => {
      if (!resolved) {
        resolved = true
        clearTimeout(timer)
        img.src = ''
        resolve({
          valid: false,
          error:
            'Não foi possível carregar a imagem. Verifique se a URL está correta.'
        })
      }
    }

    img.src = url
  })
}
