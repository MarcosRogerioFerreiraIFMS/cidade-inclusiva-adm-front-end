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

export async function createProfissional(
  data: ProfissionalCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createProfissionalSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient('/profissionais', {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag('profissionais')
    revalidatePath('/profissionais/listar')

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
    await apiClient(`/profissionais/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag('profissionais')
    revalidateTag(`profissional-${id}`)
    revalidatePath('/profissionais/listar')
    revalidatePath(`/profissionais/${id}`)

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
    await apiClient(`/profissionais/${id}`, {
      method: 'DELETE'
    })

    revalidateTag('profissionais')
    revalidatePath('/profissionais/listar')

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
  revalidateTag('profissionais')
  revalidatePath('/profissionais/listar')

  return { success: true }
}
