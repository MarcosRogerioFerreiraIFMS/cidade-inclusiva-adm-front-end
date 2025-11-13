'use server'

import type { ActionResult } from '@/app/_types/apiResponsesType'
import { revalidatePath, revalidateTag } from 'next/cache'
import { APP_ROUTES, CACHE_TAGS } from '../_constants/appSettingsConstants'

export async function revalidateMobilidades(): Promise<ActionResult> {
  revalidateTag(CACHE_TAGS.MOBILIDADES)
  revalidatePath(APP_ROUTES.MOBILIDADE_LISTAR())

  return { success: true }
}
