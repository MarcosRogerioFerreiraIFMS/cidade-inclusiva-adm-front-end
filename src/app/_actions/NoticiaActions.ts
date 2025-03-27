'use server'

import { NoticiaData } from '../_schema/NoticiaSchema'

const url =
  process.env.NEXT_PUBLIC_API_URL + '/noticias' || 'http://localhost:5555'

export async function criarNoticia(
  data: NoticiaData
): Promise<{ error?: Error }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao enviar dados:', error)
    throw error
  }
}
