'use server'

import {
  createVeiculoSchema,
  updateVeiculoSchema,
  type VeiculoCreateDTO,
  type VeiculoUpdateDTO
} from '@/app/_schemas/veiculoSchema'
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

export async function createVeiculo(
  data: VeiculoCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createVeiculoSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.VEICULO, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidateTag(CACHE_TAGS.MOTORISTA_ID(data.motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_DETALHE(data.motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar veículo. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function updateVeiculo(
  id: string,
  motoristaId: string,
  data: VeiculoUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateVeiculoSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.VEICULO_EDITAR(id), {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidateTag(CACHE_TAGS.MOTORISTA_ID(motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_DETALHE(motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar veículo. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteVeiculo(
  id: string,
  motoristaId: string
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(API_ROUTES.VEICULO_DELETAR(id), {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.MOTORISTAS)
    revalidateTag(CACHE_TAGS.MOTORISTA_ID(motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_DETALHE(motoristaId))
    revalidatePath(APP_ROUTES.MOTORISTA_LISTAR())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar veículo. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}
