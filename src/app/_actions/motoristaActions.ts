'use server'

import {
  createMotoristaSchema,
  updateMotoristaSchema,
  type MotoristaCreateDTO,
  type MotoristaUpdateDTO
} from '@/app/_schemas/motoristaSchema'
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

export async function createMotorista(
  data: MotoristaCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createMotoristaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.MOTORISTA, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar motorista. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateMotorista(
  id: string,
  data: MotoristaUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateMotoristaSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(`${API_ROUTES.MOTORISTA}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidateTag(CACHE_TAGS.MOTORISTA_ID(id))
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())
    revalidatePath(APP_ROUTES.MOTORISTA_DETALHE(id))

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar motorista. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteMotorista(id: string): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(API_ROUTES.MOTORISTA_DELETAR(id), {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar motorista. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateMotoristas(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.MOTORISTAS)
  revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

  return { success: true }
}
