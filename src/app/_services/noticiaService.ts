import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import { CACHE_CONFIG, CACHE_TAGS } from '@/app/_constants/appSettingsConstants'
import type { NoticiaResponseDTO } from '@/app/_dtos/response'
import { API_ROUTES } from '../_constants/appSettingsConstants'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getNoticias(): Promise<NoticiaResponseDTO[]> {
  const result = await apiClient<ApiResponse<NoticiaResponseDTO[]>>(
    API_ROUTES.NOTICIA,
    {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [CACHE_TAGS.NOTICIAS]
      }
    }
  )

  return result?.data || []
}

export async function getNoticiaById(
  id: string
): Promise<NoticiaResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<NoticiaResponseDTO>>(
      API_ROUTES.NOTICIA_ID(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
          tags: [CACHE_TAGS.NOTICIAS, CACHE_TAGS.NOTICIA_ID(id)]
        }
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
