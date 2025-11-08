'use server'

import {
  createNoticiaSchema,
  updateNoticiaSchema,
  type NoticiaCreateDTO,
  type NoticiaUpdateDTO
} from '@/app/_schemas/noticiaSchema'
import type { ActionResult } from '@/app/_types/apiResponsesType'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { revalidatePath, revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'
import { validateWithZod } from '../_api/zodValidator'
import {
  API_ROUTES,
  APP_ROUTES,
  CACHE_TAGS
} from '../_constants/appSettingsConstants'

export async function createNoticia(
  data: NoticiaCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createNoticiaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.NOTICIA, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.NOTICIAS)
    revalidatePath(APP_ROUTES.NOTICIA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar notícia. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateNoticia(
  id: string,
  data: NoticiaUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateNoticiaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(`${API_ROUTES.NOTICIA}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.NOTICIAS)
    revalidateTag(CACHE_TAGS.NOTICIA_ID(id))
    revalidatePath(APP_ROUTES.NOTICIA_LISTAR())
    revalidatePath(APP_ROUTES.NOTICIA_DETALHE(id))

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar notícia. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteNoticia(id: string): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(`${API_ROUTES.NOTICIA}/${id}`, {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.NOTICIAS)
    revalidatePath(APP_ROUTES.NOTICIA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar notícia. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateNoticias(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.NOTICIAS)
  revalidatePath(APP_ROUTES.NOTICIA_LISTAR())

  return { success: true }
}
