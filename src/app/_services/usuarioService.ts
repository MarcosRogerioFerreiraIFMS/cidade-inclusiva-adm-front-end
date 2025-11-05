import 'server-only'

import { apiClient } from '@/app/_api/apiClient'
import { ApiError } from '@/app/_api/errorHandler'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getUsuarios(): Promise<UsuarioResponseDTO[]> {
  const result = await apiClient<ApiResponse<UsuarioResponseDTO[]>>(
    '/usuarios',
    {
      next: { revalidate: 60, tags: ['usuarios'] }
    }
  )

  return result?.data || []
}

export async function getUsuarioById(
  id: string
): Promise<UsuarioResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<UsuarioResponseDTO>>(
      `/usuarios/${id}`,
      {
        next: { revalidate: 60, tags: ['usuarios', `usuario-${id}`] }
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
