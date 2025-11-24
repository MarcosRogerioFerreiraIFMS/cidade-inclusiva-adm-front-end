'use server'

import type { ActionResult } from '@/app/_types/apiResponsesType'
import { revalidatePath, revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'
import { validateWithZod } from '../_api/zodValidator'
import {
  API_ROUTES,
  APP_ROUTES,
  CACHE_TAGS
} from '../_constants/appSettingsConstants'
import {
  updateMobilidadeStatusSchema,
  type UpdateMobilidadeStatusDTO
} from '../_schemas/mobilidadeRelatorioSchema'
import { validateUuidV4 } from '../_utils/validateUuid'

export async function revalidateMobilidades(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.MOBILIDADES)
  revalidatePath(APP_ROUTES.MOBILIDADE_LISTAR())

  return { success: true }
}

export async function updateMobilidadeStatusAction(
  id: string,
  data: UpdateMobilidadeStatusDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateMobilidadeStatusSchema, data)
  if (!validation.success || !validation.data) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.MOBILIDADE_STATUS(id), {
      method: 'PATCH',
      body: JSON.stringify({ status: validation.data.status })
    })

    revalidateTag(CACHE_TAGS.MOBILIDADES)
    revalidateTag(CACHE_TAGS.MOBILIDADE_ID(id))
    revalidatePath(APP_ROUTES.MOBILIDADE_LISTAR())
    revalidatePath(APP_ROUTES.MOBILIDADE_DETALHE(id))
    revalidatePath(APP_ROUTES.MOBILIDADE_MAPA())

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar status da mobilidade. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}
