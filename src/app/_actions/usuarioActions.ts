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
import {
  API_ROUTES,
  APP_ROUTES,
  CACHE_TAGS
} from '../_constants/appSettingsConstants'

export async function createUsuario(
  data: UsuarioCreateDTO
): Promise<ActionResult> {
  const validation = validateWithZod(createUsuarioSchema, data)
  if (!validation.success) {
    return { success: false, error: validation.error }
  }

  try {
    await apiClient(API_ROUTES.USUARIO, {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.USUARIOS)
    revalidatePath(APP_ROUTES.USUARIO_LISTAR())

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
    await apiClient(API_ROUTES.USUARIO_CRIAR_ADMIN(), {
      method: 'POST',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.USUARIOS)
    revalidatePath(APP_ROUTES.USUARIO_LISTAR())

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
    await apiClient(API_ROUTES.USUARIO_EDITAR(id), {
      method: 'PUT',
      body: JSON.stringify(validation.data)
    })

    revalidateTag(CACHE_TAGS.USUARIOS)
    revalidateTag(CACHE_TAGS.USUARIO_ID(id))
    revalidatePath(APP_ROUTES.PERFIL)
    revalidatePath(APP_ROUTES.USUARIO_LISTAR())
    revalidatePath(APP_ROUTES.USUARIO_DETALHE(id))

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
    await apiClient(API_ROUTES.USUARIO_DELETAR(id), {
      method: 'DELETE'
    })

    revalidateTag(CACHE_TAGS.USUARIOS)
    revalidatePath(APP_ROUTES.PERFIL)
    revalidatePath(APP_ROUTES.USUARIO_LISTAR())

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
  revalidateTag(CACHE_TAGS.USUARIOS)
  revalidatePath(APP_ROUTES.USUARIO_LISTAR())

  return { success: true }
}
