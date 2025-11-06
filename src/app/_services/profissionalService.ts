import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import type {
  ComentarioResponseDTO,
  ProfissionalResponseDTO
} from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getProfissionais(): Promise<ProfissionalResponseDTO[]> {
  const result = await apiClient<ApiResponse<ProfissionalResponseDTO[]>>(
    '/profissionais',
    {
      next: { revalidate: 60, tags: ['profissionais'] }
    }
  )

  return result?.data || []
}

export async function getProfissionalById(
  id: string
): Promise<ProfissionalResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<ProfissionalResponseDTO>>(
      `/profissionais/${id}`,
      {
        next: { revalidate: 60, tags: ['profissionais', `profissional-${id}`] }
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
      `/profissionais/${id}/comentarios`,
      {
        next: {
          revalidate: 30,
          tags: ['comentarios', `profissional-${id}-comentarios`]
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
