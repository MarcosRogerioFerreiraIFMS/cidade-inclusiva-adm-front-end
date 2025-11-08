'use server'

import {
  createProfissionalSchema,
  updateProfissionalSchema,
  type ProfissionalCreateDTO,
  type ProfissionalUpdateDTO
} from '@/app/_schemas/profissionalSchema'
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

export async function createProfissional(
  data: ProfissionalCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createProfissionalSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.PROFISSIONAL, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.PROFISSIONAIS)
    revalidatePath(APP_ROUTES.PROFISSIONAL_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar profissional. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateProfissional(
  id: string,
  data: ProfissionalUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateProfissionalSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(`${API_ROUTES.PROFISSIONAL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.PROFISSIONAIS)
    revalidateTag(CACHE_TAGS.PROFISSIONAL_ID(id))
    revalidatePath(APP_ROUTES.PROFISSIONAL_LISTAR())
    revalidatePath(APP_ROUTES.PROFISSIONAL_DETALHE(id))

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar profissional. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteProfissional(id: string): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(`${API_ROUTES.PROFISSIONAL}/${id}`, {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.PROFISSIONAIS)
    revalidatePath(APP_ROUTES.PROFISSIONAL_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar profissional. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateProfissionais(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.PROFISSIONAIS)
  revalidatePath(APP_ROUTES.PROFISSIONAL_LISTAR())

  return { success: true }
}
