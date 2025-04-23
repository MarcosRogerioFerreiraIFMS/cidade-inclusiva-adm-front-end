export async function validateImageUrl(url: string): Promise<boolean> {
  if (!url || url.trim() === '') {
    return true
  }

  try {
    new URL(url)
  } catch {
    return false
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

export function isValidImageUrlFormat(url: string): boolean {
  if (!url || url.trim() === '') {
    return true
  }

  try {
    new URL(url)
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.bmp'
    ]

    return (
      imageExtensions.some((ext) => url.toLowerCase().endsWith(ext)) ||
      url.includes('/image/')
    )
  } catch {
    return false
  }
}
