'use server'

import { NoticiaData } from '../_schema/NoticiaSchema'

export async function criarNoticia(
  data: NoticiaData
): Promise<{ error?: Error }> {
  console.log('Form data submitted:', data)

  return {}
}
