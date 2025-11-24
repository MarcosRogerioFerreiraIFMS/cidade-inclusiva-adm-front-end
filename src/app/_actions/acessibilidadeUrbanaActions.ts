'use server'

import {
  createAcessibilidadeUrbanaSchema,
  updateAcessibilidadeUrbanaSchema,
  type AcessibilidadeUrbanaCreateDTO,
  type AcessibilidadeUrbanaUpdateDTO
} from '@/app/_schemas/acessibilidadeUrbanaSchema'
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

export async function createAcessibilidadeUrbana(
  data: AcessibilidadeUrbanaCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createAcessibilidadeUrbanaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.ACESSIBILIDADE_URBANA, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.ACESSIBILIDADES_URBANAS)
    revalidatePath(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar acessibilidade urbana. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateAcessibilidadeUrbana(
  id: string,
  data: AcessibilidadeUrbanaUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateAcessibilidadeUrbanaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.ACESSIBILIDADE_URBANA_EDITAR(id), {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.ACESSIBILIDADES_URBANAS)
    revalidateTag(CACHE_TAGS.ACESSIBILIDADE_URBANA_ID(id))
    revalidatePath(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())
    revalidatePath(APP_ROUTES.ACESSIBILIDADE_URBANA_DETALHE(id))

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar acessibilidade urbana. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteAcessibilidadeUrbana(
  id: string
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(API_ROUTES.ACESSIBILIDADE_URBANA_DELETAR(id), {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.ACESSIBILIDADES_URBANAS)
    revalidatePath(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar acessibilidade urbana. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateAcessibilidadesUrbanas(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.ACESSIBILIDADES_URBANAS)
  revalidatePath(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())

  return { success: true }
}
