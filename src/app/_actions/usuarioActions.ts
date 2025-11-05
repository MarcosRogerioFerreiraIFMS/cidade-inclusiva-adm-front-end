'use server'

import {
  createUsuarioSchema,
  updateUsuarioSchema,
  type UsuarioCreateDTO,
  type UsuarioUpdateDTO
} from '@/app/_schemas/usuarioSchema'
import type { ActionResult } from '@/app/_types/apiResponsesType'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { revalidatePath, revalidateTag } from 'next/cache'
import { apiClient } from '../_api/apiClient'
import { validateWithZod } from '../_api/zodValidator'

export async function createUsuario(
  data: UsuarioCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createUsuarioSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient('/usuarios', {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag('usuarios')
    revalidatePath('/usuarios/listar')

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar usuário. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function createAdmin(
  data: UsuarioCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createUsuarioSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient('/usuarios/admin', {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag('usuarios')
    revalidatePath('/usuarios/listar')

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao criar administrador. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

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
    revalidatePath('/usuarios/listar')
    revalidatePath(`/usuarios/${id}`)

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
    revalidatePath('/usuarios/listar')

    return { success: true }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro ao deletar conta. Tente novamente.'

    return { success: false, error: errorMessage }
  }
}

export async function revalidateUsuarios(): Promise<ActionResult> {
  revalidateTag('usuarios')
  revalidatePath('/usuarios/listar')

  return { success: true }
}
