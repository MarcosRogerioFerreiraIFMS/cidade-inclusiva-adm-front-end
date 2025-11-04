'use server'

import {
  updateUsuarioSchema,
  type UsuarioUpdateDTO
} from '@/app/_schemas/usuarioSchema'
import type { ActionResult } from '@/app/_types/apiResponsesType'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { revalidatePath, revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'
import { validateWithZod } from '../_api/zodValidator'

export async function updateUsuario(
  id: string,
  data: UsuarioUpdateDTO
): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  const validation = validateWithZod(updateUsuarioSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag('usuarios')
    revalidateTag(`usuario-${id}`)
    revalidatePath('/perfil')

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar perfil. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function deleteUsuario(id: string): Promise<ActionResult> {
  if (!validateUuidV4(id)) {
    return { success: false, error: 'ID inválido.' }
  }

  try {
    await apiClient(`/usuarios/${id}`, {
      method: 'DELETE'
    })

    revalidateTag('usuarios')
    revalidatePath('/perfil')

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar conta. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}
