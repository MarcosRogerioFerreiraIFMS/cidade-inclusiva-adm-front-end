import { z } from 'zod'
import { NOTICIA_CATEGORIES } from '../_enums/noticiaEnums'
import {
  conteudoOptionalSchema,
  conteudoSchema,
  dataPublicacaoOptionalSchema,
  dataPublicacaoSchema,
  fotoSchema,
  tituloOptionalSchema,
  tituloSchema,
  urlOptionalSchema,
  urlUpdateSchema
} from './commonSchemas'

export const createNoticiaSchema = z.object({
  titulo: tituloSchema,
  conteudo: conteudoSchema,
  categoria: z
    .string({
      required_error: 'A categoria é obrigatória.',
      invalid_type_error: 'A categoria deve ser uma string.'
    })
    .refine(
      (val) =>
        Object.values(NOTICIA_CATEGORIES).includes(
          val as (typeof NOTICIA_CATEGORIES)[number]
        ),
      {
        message: 'O valor da categoria é inválido.'
      }
    ),
  dataPublicacao: dataPublicacaoSchema,
  foto: fotoSchema,
  url: urlOptionalSchema
})

export const updateNoticiaSchema = z.object({
  titulo: tituloOptionalSchema,
  conteudo: conteudoOptionalSchema,
  categoria: z
    .string({ invalid_type_error: 'A categoria deve ser uma string.' })
    .refine(
      (val) =>
        Object.values(NOTICIA_CATEGORIES).includes(
          val as (typeof NOTICIA_CATEGORIES)[number]
        ),
      {
        message: 'O valor da categoria é inválido.'
      }
    )
    .optional(),
  dataPublicacao: dataPublicacaoOptionalSchema,
  foto: urlUpdateSchema,
  url: urlUpdateSchema
})

export type NoticiaCreateDTO = z.infer<typeof createNoticiaSchema>

export type NoticiaUpdateDTO = z.infer<typeof updateNoticiaSchema>
