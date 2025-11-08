'use server'

import type { ActionResult } from '@/app/_types/apiResponsesType'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'
import { API_ROUTES, CACHE_TAGS } from '../_constants/appSettingsConstants'

/**
 * Opções para revalidação de cache específico por entidade
 */
interface RevalidateOptions {
  profissionalId?: string
  motoristaId?: string
  manutencaoId?: string
  acessibilidadeUrbanaId?: string
  usuarioId?: string
}

/**
 * Revalida tags de cache relacionadas ao comentário
 */
function revalidateComentarioTags(options?: RevalidateOptions) {
  // Sempre revalida a tag genérica de comentários
  revalidateTag(CACHE_TAGS.COMENTARIOS)

  // Revalida tags específicas por entidade, se fornecidas
  if (options?.profissionalId) {
    revalidateTag(CACHE_TAGS.PROFISSIONAL_COMENTARIOS(options.profissionalId))
  }
  if (options?.motoristaId) {
    revalidateTag(CACHE_TAGS.MOTORISTA_COMENTARIOS(options.motoristaId))
  }
  if (options?.manutencaoId) {
    revalidateTag(CACHE_TAGS.MANUTENCAO_COMENTARIOS(options.manutencaoId))
  }
  if (options?.acessibilidadeUrbanaId) {
    revalidateTag(
      CACHE_TAGS.ACESSIBILIDADE_URBANA_COMENTARIOS(
        options.acessibilidadeUrbanaId
      )
    )
  }
  if (options?.usuarioId) {
    revalidateTag(CACHE_TAGS.USUARIO_COMENTARIOS(options.usuarioId))
  }
}

export async function deleteComentario(
  id: string,
  revalidateOptions?: RevalidateOptions
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(`${API_ROUTES.COMENTARIO}/${id}`, {
      method: 'DELETE'
    })

    revalidateComentarioTags(revalidateOptions)

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar comentário. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function toggleComentarioVisibilidade(
  id: string,
  revalidateOptions?: RevalidateOptions
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(`${API_ROUTES.COMENTARIO}/${id}/visibilidade`, {
      method: 'PATCH'
    })

    revalidateComentarioTags(revalidateOptions)

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao alterar visibilidade do comentário. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}
