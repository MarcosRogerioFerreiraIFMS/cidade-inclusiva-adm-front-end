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
  ManutencaoResponseDTO
} from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getManutencoes(): Promise<ManutencaoResponseDTO[]> {
  const result = await apiClient<ApiResponse<ManutencaoResponseDTO[]>>(
    API_ROUTES.MANUTENCAO,
    {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [CACHE_TAGS.MANUTENCOES]
      }
    }
  )

  return result?.data || []
}

export async function getManutencaoById(
  id: string
): Promise<ManutencaoResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<ManutencaoResponseDTO>>(
      API_ROUTES.MANUTENCAO_ID(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
          tags: [CACHE_TAGS.MANUTENCOES, CACHE_TAGS.MANUTENCAO_ID(id)]
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

export async function getManutencaoComentarios(
  id: string
): Promise<ComentarioResponseDTO[]> {
  try {
    const result = await apiClient<ApiResponse<ComentarioResponseDTO[]>>(
      API_ROUTES.MANUTENCAO_COMENTARIOS(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_COMMENTS,
          tags: [CACHE_TAGS.COMENTARIOS, CACHE_TAGS.MANUTENCAO_COMENTARIOS(id)]
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
