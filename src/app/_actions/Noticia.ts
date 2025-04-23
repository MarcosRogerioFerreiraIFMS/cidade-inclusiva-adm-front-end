'use server'

import { NoticiaData } from '../_schema/NoticiaSchema'

const url = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + '/noticias'
  : 'http://localhost:5555/noticias'

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

export async function listarNoticias(): Promise<NoticiaData[]> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    throw error
  }
}

export async function deletarNoticia(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao excluir: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir notícia:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export async function buscarNoticiaPorId(
  id: string
): Promise<{ data?: NoticiaData; error?: string; status?: number }> {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      return {
        error: `Erro ao buscar notícia: ${response.statusText}`,
        status: response.status
      }
    }

    const noticia = await response.json()

    if (noticia.dataPublicacao) {
      noticia.dataPublicacao = new Date(noticia.dataPublicacao)
    }

    return { data: noticia, status: response.status }
  } catch (error) {
    console.error('Erro ao buscar notícia:', error)
    return {
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}

export async function atualizarNoticia(
  id: string,
  data: NoticiaData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}
