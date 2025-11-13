import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import {
  API_ROUTES,
  CACHE_CONFIG,
  CACHE_TAGS
} from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getMobilidades(): Promise<MobilidadeResponseDTO[]> {
  const result = await apiClient<ApiResponse<MobilidadeResponseDTO[]>>(
    API_ROUTES.MOBILIDADE,
    {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [CACHE_TAGS.MOBILIDADES]
      }
    }
  )

  return result?.data || []
}

export async function getMobilidadeById(
  id: string
): Promise<MobilidadeResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<MobilidadeResponseDTO>>(
      `${API_ROUTES.MOBILIDADE}/${id}`,
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
          tags: [CACHE_TAGS.MOBILIDADES, CACHE_TAGS.MOBILIDADE_ID(id)]
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
