'use server'

import {
  createManutencaoSchema,
  updateManutencaoSchema,
  type ManutencaoCreateDTO,
  type ManutencaoUpdateDTO
} from '@/app/_schemas/manutencaoSchema'
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

export async function createManutencao(
  data: ManutencaoCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createManutencaoSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.MANUTENCAO, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MANUTENCOES)
    revalidatePath(APP_ROUTES.MANUTENCAO_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar oficina de manutenção. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateManutencao(
  id: string,
  data: ManutencaoUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateManutencaoSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(`${API_ROUTES.MANUTENCAO}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MANUTENCOES)
    revalidateTag(CACHE_TAGS.MANUTENCAO_ID(id))
    revalidatePath(APP_ROUTES.MANUTENCAO_LISTAR())
    revalidatePath(APP_ROUTES.MANUTENCAO_DETALHE(id))

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar oficina de manutenção. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteManutencao(id: string): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(API_ROUTES.MANUTENCAO_DELETAR(id), {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.MANUTENCOES)
    revalidatePath(APP_ROUTES.MANUTENCAO_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar oficina de manutenção. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateManutencoes(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.MANUTENCOES)
  revalidatePath(APP_ROUTES.MANUTENCAO_LISTAR())

  return { success: true }
}
