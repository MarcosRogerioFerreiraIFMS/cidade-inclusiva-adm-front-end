import { z } from 'zod'

const TITULO_MIN_LENGTH = 3
const TITULO_MAX_LENGTH = 100

const CONTEUDO_MIN_LENGTH = 10
const CONTEUDO_MAX_LENGTH = 1000

const CATEGORIA_MIN_LENGTH = 3
const CATEGORIA_MAX_LENGTH = 20

export const NoticiaSchema = z
  .object({
    titulo: z
      .string()
      .nonempty('Título é obrigatório')
      .min(
        TITULO_MIN_LENGTH,
        `O título deve ter pelo menos ${TITULO_MIN_LENGTH} caracteres`
      )
      .max(
        TITULO_MAX_LENGTH,
        `O título deve ter no máximo ${TITULO_MAX_LENGTH} caracteres`
      )
      .refine((titulo) => isNaN(Number(titulo)), {
        message: 'Título deve ser texto'
      }),
    conteudo: z
      .string()
      .nonempty('Conteúdo é obrigatório')
      .min(
        CONTEUDO_MIN_LENGTH,
        `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres`
      )
      .max(
        CONTEUDO_MAX_LENGTH,
        `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres`
      )
      .refine((conteudo) => isNaN(Number(conteudo)), {
        message: 'Conteúdo deve ser texto'
      }),
    url: z
      .string()
      .url('URL inválida')
      .optional()
      .or(z.literal(''))
      .transform((val) => val || '')
      .refine((url) => {
        if (!url || url.trim() === '') return true

        const urlPattern =
          /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i

        try {
          new URL(url)
          return urlPattern.test(url)
        } catch {
          return false
        }
      }, 'A URL não parece ser válida'),
    dataPublicacao: z.date({
      required_error: 'Data de publicação é obrigatória'
    }),
    foto: z
      .string()
      .url('URL da imagem inválida')
      .optional()
      .or(z.literal(''))
      .transform((val) => val || '')
      .refine((url) => {
        if (!url || url.trim() === '') return true

        try {
          const imageExtensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.webp',
            '.svg',
            '.bmp'
          ]

          return (
            imageExtensions.some((ext) => url.toLowerCase().endsWith(ext)) ||
            url.includes('/image/') ||
            url.includes('/img/') ||
            url.includes('cloudinary')
          )
        } catch {
          return false
        }
      }, 'A URL não parece ser uma imagem válida'),
    categoria: z
      .string()
      .nonempty('Categoria é obrigatória')
      .min(
        CATEGORIA_MIN_LENGTH,
        `A categoria deve ter pelo menos ${CATEGORIA_MIN_LENGTH} caracteres`
      )
      .max(
        CATEGORIA_MAX_LENGTH,
        `A categoria deve ter no máximo ${CATEGORIA_MAX_LENGTH} caracteres`
      )
      .refine((categoria) => isNaN(Number(categoria)), {
        message: 'Categoria deve ser texto'
      }),
    categoriaCustomizada: z
      .string()
      .trim()
      .transform((val) => val.replace(/\s+/g, ' '))
      .refine(
        (categoria) => categoria.length === 0 || isNaN(Number(categoria)),
        {
          message: 'Categoria deve ser texto'
        }
      )
      .refine(
        (categoria) =>
          categoria.length === 0 || categoria.length >= CATEGORIA_MIN_LENGTH,
        {
          message: `A categoria deve ter pelo menos ${CATEGORIA_MIN_LENGTH} caracteres`
        }
      )
      .refine(
        (categoria) =>
          categoria.length === 0 || categoria.length <= CATEGORIA_MAX_LENGTH,
        {
          message: `A categoria deve ter no máximo ${CATEGORIA_MAX_LENGTH} caracteres`
        }
      )
      .optional()
  })
  .refine(
    (data) =>
      data.categoria !== 'Outro' ||
      (data.categoria === 'Outro' &&
        (data.categoriaCustomizada?.trim()?.length ?? 0) > 0),
    {
      message:
        'Categoria personalizada é obrigatória quando a categoria é "Outro"',
      path: ['categoriaCustomizada']
    }
  )

export type NoticiaData = z.infer<typeof NoticiaSchema> & { id?: string }
