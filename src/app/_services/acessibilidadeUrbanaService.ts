import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import {
  API_ROUTES,
  CACHE_CONFIG,
  CACHE_TAGS
} from '@/app/_constants/appSettingsConstants'
import type {
  AcessibilidadeUrbanaResponseDTO,
  ComentarioResponseDTO
} from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getAcessibilidadesUrbanas(): Promise<
  AcessibilidadeUrbanaResponseDTO[]
> {
  const result = await apiClient<
    ApiResponse<AcessibilidadeUrbanaResponseDTO[]>
  >(API_ROUTES.ACESSIBILIDADE_URBANA, {
    next: {
      revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
      tags: [CACHE_TAGS.ACESSIBILIDADES_URBANAS]
    }
  })

  return result?.data || []
}

export async function getAcessibilidadeUrbanaById(
  id: string
): Promise<AcessibilidadeUrbanaResponseDTO | null> {
  try {
    const result = await apiClient<
      ApiResponse<AcessibilidadeUrbanaResponseDTO>
    >(API_ROUTES.ACESSIBILIDADE_URBANA_ID(id), {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [
          CACHE_TAGS.ACESSIBILIDADES_URBANAS,
          CACHE_TAGS.ACESSIBILIDADE_URBANA_ID(id)
        ]
      }
    })

    return result?.data || null
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}

export async function getAcessibilidadeUrbanaComentarios(
  id: string
): Promise<ComentarioResponseDTO[]> {
  try {
    const result = await apiClient<ApiResponse<ComentarioResponseDTO[]>>(
      API_ROUTES.ACESSIBILIDADE_URBANA_COMENTARIOS(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_COMMENTS,
          tags: [
            CACHE_TAGS.COMENTARIOS,
            CACHE_TAGS.ACESSIBILIDADE_URBANA_COMENTARIOS(id)
          ]
        }
      }
    )

    return result?.data || []
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return []
    }

    throw error
  }
}
