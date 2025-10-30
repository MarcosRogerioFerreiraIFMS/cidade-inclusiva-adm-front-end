import { z } from 'zod'
import { NOTICIA_CATEGORIES } from '../_enums/noticiaEnums'
import {
  hasValidImageExtension,
  validateUrlProtocol
} from '../_utils/imageUtils'
import { sanitizeContent } from '../_utils/stringUtils'

const TITULO_MIN_LENGTH = 3
const TITULO_MAX_LENGTH = 100
const CONTEUDO_MIN_LENGTH = 10
const CONTEUDO_MAX_LENGTH = 5000

export const createNoticiaSchema = z.object({
  titulo: z
    .string({
      required_error: 'O título é obrigatório',
      invalid_type_error: 'O título deve ser um texto'
    })
    .transform(sanitizeContent)
    .refine(
      (val) => val.length >= TITULO_MIN_LENGTH,
      `O título deve ter no mínimo ${TITULO_MIN_LENGTH} caracteres`
    )
    .refine(
      (val) => val.length <= TITULO_MAX_LENGTH,
      `O título deve ter no máximo ${TITULO_MAX_LENGTH} caracteres`
    ),

  conteudo: z
    .string({
      required_error: 'O conteúdo é obrigatório.',
      invalid_type_error: 'O conteúdo deve ser uma string.'
    })
    .transform(sanitizeContent)
    .refine((val) => val.length >= CONTEUDO_MIN_LENGTH, {
      message: `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= CONTEUDO_MAX_LENGTH, {
      message: `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
    }),

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

  dataPublicacao: z
    .date({
      required_error: 'A data de publicação é obrigatória',
      invalid_type_error: 'Data de publicação inválida'
    })
    .refine(
      (date) => date <= new Date(),
      'A data de publicação não pode ser no futuro'
    ),

  foto: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        const validation = validateUrlProtocol(val)
        return validation.valid
      },
      { message: 'URL da foto inválida. Deve começar com http:// ou https://' }
    )
    .refine(
      (val) => {
        if (!val) return true
        return hasValidImageExtension(val)
      },
      {
        message:
          'A URL deve terminar com uma extensão de imagem válida (.jpg, .png, .webp, etc.)'
      }
    ),

  url: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        const validation = validateUrlProtocol(val)
        return validation.valid
      },
      { message: 'URL inválida. Deve começar com http:// ou https://' }
    )
})

export const updateNoticiaSchema = z.object({
  titulo: z
    .string({
      invalid_type_error: 'O título deve ser um texto'
    })
    .transform(sanitizeContent)
    .refine(
      (val) => val.length >= TITULO_MIN_LENGTH,
      `O título deve ter no mínimo ${TITULO_MIN_LENGTH} caracteres`
    )
    .refine(
      (val) => val.length <= TITULO_MAX_LENGTH,
      `O título deve ter no máximo ${TITULO_MAX_LENGTH} caracteres`
    )
    .optional(),

  conteudo: z
    .string({
      invalid_type_error: 'O conteúdo deve ser uma string.'
    })
    .transform(sanitizeContent)
    .refine((val) => val.length >= CONTEUDO_MIN_LENGTH, {
      message: `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
    })
    .refine((val) => val.length <= CONTEUDO_MAX_LENGTH, {
      message: `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
    })
    .optional(),

  categoria: z
    .string({
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
    )
    .optional(),

  dataPublicacao: z
    .date({
      invalid_type_error: 'Data de publicação inválida'
    })
    .refine(
      (date) => date <= new Date(),
      'A data de publicação não pode ser no futuro'
    )
    .optional(),

  foto: z
    .string()
    .trim()
    .transform((val) => (val === '' ? '' : val))
    .refine(
      (val) => {
        if (!val || val === '') return true
        const validation = validateUrlProtocol(val)
        return validation.valid
      },
      { message: 'URL da foto inválida. Deve começar com http:// ou https://' }
    )
    .refine(
      (val) => {
        if (!val || val === '') return true
        return hasValidImageExtension(val)
      },
      {
        message:
          'A URL deve terminar com uma extensão de imagem válida (.jpg, .png, .webp, etc.)'
      }
    )
    .optional(),

  url: z
    .string()
    .trim()
    .transform((val) => (val === '' ? '' : val))
    .refine(
      (val) => {
        if (!val || val === '') return true
        const validation = validateUrlProtocol(val)
        return validation.valid
      },
      { message: 'URL inválida. Deve começar com http:// ou https://' }
    )
    .optional()
})

export type NoticiaCreateDTO = z.infer<typeof createNoticiaSchema>

export type NoticiaUpdateDTO = z.infer<typeof updateNoticiaSchema>
