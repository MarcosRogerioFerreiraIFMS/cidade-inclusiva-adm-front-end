import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import type { NoticiaResponseDTO } from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getNoticias(): Promise<NoticiaResponseDTO[]> {
  const result = await apiClient<ApiResponse<NoticiaResponseDTO[]>>(
    '/noticias',
    {
      next: { revalidate: 60, tags: ['noticias'] }
    }
  )

  return result?.data || []
}

export async function getNoticiaById(
  id: string
): Promise<NoticiaResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<NoticiaResponseDTO>>(
      `/noticias/${id}`,
      {
        next: { revalidate: 60, tags: ['noticias', `noticia-${id}`] }
      }
    )

    return result?.data || null
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}
