import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import {
  API_ROUTES,
  CACHE_CONFIG,
  CACHE_TAGS
} from '@/app/_constants/appSettingsConstants'
import type {
  ComentarioResponseDTO,
  ProfissionalResponseDTO
} from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getProfissionais(): Promise<ProfissionalResponseDTO[]> {
  const result = await apiClient<ApiResponse<ProfissionalResponseDTO[]>>(
    API_ROUTES.PROFISSIONAL,
    {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [CACHE_TAGS.PROFISSIONAIS]
      }
    }
  )

  return result?.data || []
}

export async function getProfissionalById(
  id: string
): Promise<ProfissionalResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<ProfissionalResponseDTO>>(
      API_ROUTES.PROFISSIONAL_ID(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
          tags: [CACHE_TAGS.PROFISSIONAIS, CACHE_TAGS.PROFISSIONAL_ID(id)]
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

export async function getProfissionalComentarios(
  id: string
): Promise<ComentarioResponseDTO[]> {
  try {
    const result = await apiClient<ApiResponse<ComentarioResponseDTO[]>>(
      API_ROUTES.PROFISSIONAL_COMENTARIOS(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_COMMENTS,
          tags: [
            CACHE_TAGS.COMENTARIOS,
            CACHE_TAGS.PROFISSIONAL_COMENTARIOS(id)
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
