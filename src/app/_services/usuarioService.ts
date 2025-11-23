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
  UsuarioResponseDTO
} from '@/app/_dtos/response'
import type { ApiResponse } from '../_types/apiResponsesType'

export async function getUsuarios(): Promise<UsuarioResponseDTO[]> {
  const result = await apiClient<ApiResponse<UsuarioResponseDTO[]>>(
    API_ROUTES.USUARIO,
    {
      next: {
        revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
        tags: [CACHE_TAGS.USUARIOS]
      }
    }
  )

  return result?.data || []
}

export async function getUsuarioById(
  id: string
): Promise<UsuarioResponseDTO | null> {
  try {
    const result = await apiClient<ApiResponse<UsuarioResponseDTO>>(
      API_ROUTES.USUARIO_ID(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_SHORT,
          tags: [CACHE_TAGS.USUARIOS, CACHE_TAGS.USUARIO_ID(id)]
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

export async function getUsuarioComentarios(
  id: string
): Promise<ComentarioResponseDTO[]> {
  try {
    const result = await apiClient<ApiResponse<ComentarioResponseDTO[]>>(
      API_ROUTES.USUARIO_COMENTARIOS(id),
      {
        next: {
          revalidate: CACHE_CONFIG.REVALIDATE_COMMENTS,
          tags: [CACHE_TAGS.COMENTARIOS, CACHE_TAGS.USUARIO_COMENTARIOS(id)]
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
