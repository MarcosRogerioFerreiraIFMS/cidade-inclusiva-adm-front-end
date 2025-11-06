'use server'

import type { ActionResult } from '@/app/_types/apiResponsesType'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'

/**
 * Opções para revalidação de cache específico por entidade
 */
interface RevalidateOptions {
  profissionalId?: string
  motoristaId?: string
  manutencaoId?: string
  acessibilidadeUrbanaId?: string
}

/**
 * Revalida tags de cache relacionadas ao comentário
 */
function revalidateComentarioTags(options?: RevalidateOptions) {
  // Sempre revalida a tag genérica de comentários
  revalidateTag('comentarios')

  // Revalida tags específicas por entidade, se fornecidas
  if (options?.profissionalId) {
    revalidateTag(`profissional-${options.profissionalId}-comentarios`)
  }
  if (options?.motoristaId) {
    revalidateTag(`motorista-${options.motoristaId}-comentarios`)
  }
  if (options?.manutencaoId) {
    revalidateTag(`manutencao-${options.manutencaoId}-comentarios`)
  }
  if (options?.acessibilidadeUrbanaId) {
    revalidateTag(
      `acessibilidade-urbana-${options.acessibilidadeUrbanaId}-comentarios`
    )
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
    await apiClient(`/comentarios/${id}`, {
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
    await apiClient(`/comentarios/${id}/visibilidade`, {
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
