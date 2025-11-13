import { z } from 'zod'
import {
  hasValidImageExtension,
  validateUrlProtocol
} from '../_utils/imageUtils'
import { sanitizeContent, sanitizeString } from '../_utils/stringUtils'

// Constantes
export const NOME_MIN_LENGTH = 2
export const NOME_MAX_LENGTH = 120
export const TITULO_MIN_LENGTH = 3
export const TITULO_MAX_LENGTH = 100
export const CONTEUDO_MIN_LENGTH = 10
export const CONTEUDO_MAX_LENGTH = 5000
export const TELEFONE_REGEX = /^\(\d{2}\) 9\d{4}-\d{4}$/
export const CEP_REGEX = /^\d{5}-\d{3}$/
export const SENHA_MIN_LENGTH = 8
export const SENHA_MAX_LENGTH = 128
export const EMAIL_MAX_LENGTH = 254

// Schemas de campos comuns
export const emailSchema = z
  .string()
  .email('Email inválido')
  .transform((val) => val.toLowerCase().trim())
  .refine((val) => val.length <= EMAIL_MAX_LENGTH, {
    message: `O email deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres.`
  })

export const loginEmailSchema = z
  .string()
  .email('Digite um email válido')
  .transform((val) => val.toLowerCase().trim())
  .refine((val) => val.length <= EMAIL_MAX_LENGTH, {
    message: `O email deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres.`
  })

export const loginSenhaSchema = z
  .string({
    required_error: 'A senha é obrigatória',
    invalid_type_error: 'A senha deve ser um texto'
  })
  .transform((val) => val.trim())
  .refine(
    (val) => val.length >= SENHA_MIN_LENGTH,
    `Senha deve ter pelo menos ${SENHA_MIN_LENGTH} caracteres`
  )
  .refine(
    (val) => val.length <= SENHA_MAX_LENGTH,
    `Senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres`
  )

export const emailOptionalSchema = z
  .string({ invalid_type_error: 'O email deve ser um texto' })
  .email('Email inválido')
  .transform((val) => val.toLowerCase().trim())
  .optional()

export const senhaSchema = z
  .string({
    required_error: 'A senha é obrigatória',
    invalid_type_error: 'A senha deve ser um texto'
  })
  .transform((val) => val.trim())
  .refine(
    (val) => val.length >= SENHA_MIN_LENGTH,
    `A senha deve ter no mínimo ${SENHA_MIN_LENGTH} caracteres`
  )
  .refine(
    (val) => val.length <= SENHA_MAX_LENGTH,
    `A senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres`
  )

export const senhaOptionalSchema = z
  .string()
  .transform((val) => (val === '' ? undefined : val))
  .optional()
  .refine((val) => {
    if (!val) return true
    return val.length >= SENHA_MIN_LENGTH
  }, `A senha deve ter no mínimo ${SENHA_MIN_LENGTH} caracteres`)
  .refine((val) => {
    if (!val) return true
    return val.length <= SENHA_MAX_LENGTH
  }, `A senha deve ter no máximo ${SENHA_MAX_LENGTH} caracteres`)

export const nomeSchema = z
  .string({
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome deve ser um texto'
  })
  .transform(sanitizeString)
  .refine(
    (val) => val.length >= NOME_MIN_LENGTH,
    `O nome deve ter no mínimo ${NOME_MIN_LENGTH} caracteres`
  )
  .refine(
    (val) => val.length <= NOME_MAX_LENGTH,
    `O nome deve ter no máximo ${NOME_MAX_LENGTH} caracteres`
  )

export const telefoneSchema = z
  .string({
    required_error: 'O telefone é obrigatório',
    invalid_type_error: 'O telefone deve ser um texto'
  })
  .refine(
    (val) => TELEFONE_REGEX.test(val),
    'Telefone inválido. Use o formato (00) 90000-0000'
  )

export const tituloSchema = z
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
  )

export const tituloOptionalSchema = z
  .string({ invalid_type_error: 'O título deve ser um texto' })
  .transform(sanitizeContent)
  .refine(
    (val) => val.length >= TITULO_MIN_LENGTH,
    `O título deve ter no mínimo ${TITULO_MIN_LENGTH} caracteres`
  )
  .refine(
    (val) => val.length <= TITULO_MAX_LENGTH,
    `O título deve ter no máximo ${TITULO_MAX_LENGTH} caracteres`
  )
  .optional()

export const conteudoSchema = z
  .string({
    required_error: 'O conteúdo é obrigatório.',
    invalid_type_error: 'O conteúdo deve ser uma string.'
  })
  .transform(sanitizeContent)
  .refine(
    (val) => val.length >= CONTEUDO_MIN_LENGTH,
    `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
  )
  .refine(
    (val) => val.length <= CONTEUDO_MAX_LENGTH,
    `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
  )

export const conteudoOptionalSchema = z
  .string({ invalid_type_error: 'O conteúdo deve ser uma string.' })
  .transform(sanitizeContent)
  .refine(
    (val) => val.length >= CONTEUDO_MIN_LENGTH,
    `O conteúdo deve ter pelo menos ${CONTEUDO_MIN_LENGTH} caracteres.`
  )
  .refine(
    (val) => val.length <= CONTEUDO_MAX_LENGTH,
    `O conteúdo deve ter no máximo ${CONTEUDO_MAX_LENGTH} caracteres.`
  )
  .optional()

// Helper para criar schema de URL com validações de protocolo e imagem
const createUrlSchema = (
  fieldName: string,
  optional = true,
  validateImage = false
) => {
  const schema = z
    .string()
    .trim()
    .transform((val) => (val === '' ? (optional ? undefined : '') : val))
    .refine(
      (val) => {
        if (!val || (optional && val === '')) return true
        const validation = validateUrlProtocol(val)
        return validation.valid
      },
      {
        message: `URL ${fieldName} inválida. Deve começar com http:// ou https://`
      }
    )

  if (validateImage) {
    return schema.refine(
      (val) => {
        if (!val || (optional && val === '')) return true
        return hasValidImageExtension(val)
      },
      {
        message:
          'A URL deve terminar com uma extensão de imagem válida (.jpg, .png, .webp, etc.)'
      }
    )
  }

  return schema
}

export const fotoOptionalSchema = createUrlSchema(
  'da foto',
  true,
  true
).optional()

export const fotoUpdateSchema = z
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
  .optional()

export const urlOptionalSchema = z
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

export const urlUpdateSchema = z
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

export const dataPublicacaoSchema = z
  .date({
    required_error: 'A data de publicação é obrigatória',
    invalid_type_error: 'Data de publicação inválida'
  })
  .refine(
    (date) => date <= new Date(),
    'A data de publicação não pode ser no futuro'
  )

export const dataPublicacaoOptionalSchema = z
  .date({ invalid_type_error: 'Data de publicação inválida' })
  .refine(
    (date) => date <= new Date(),
    'A data de publicação não pode ser no futuro'
  )
  .optional()

// Schema de endereço
export const enderecoSchema = z.object({
  logradouro: z
    .string({
      required_error: 'O logradouro é obrigatório',
      invalid_type_error: 'O logradouro deve ser um texto'
    })
    .transform(sanitizeString)
    .refine(
      (val) => val.length >= 3,
      'O logradouro deve ter no mínimo 3 caracteres'
    )
    .refine(
      (val) => val.length <= 200,
      'O logradouro deve ter no máximo 200 caracteres'
    ),
  numero: z
    .string({
      required_error: 'O número é obrigatório',
      invalid_type_error: 'O número deve ser um texto'
    })
    .trim()
    .refine((val) => val.length >= 1, 'O número é obrigatório')
    .refine(
      (val) => val.length <= 10,
      'O número deve ter no máximo 10 caracteres'
    )
    .refine((val) => /^[0-9A-Za-z\s-/]+$/.test(val), {
      message:
        'O número deve conter apenas números, letras, espaços, hífens ou barras.'
    }),
  cidade: z
    .string({
      required_error: 'A cidade é obrigatória',
      invalid_type_error: 'A cidade deve ser um texto'
    })
    .transform(sanitizeString)
    .refine(
      (val) => val.length >= 2,
      'A cidade deve ter no mínimo 2 caracteres'
    )
    .refine(
      (val) => val.length <= 100,
      'A cidade deve ter no máximo 100 caracteres'
    )
    .refine((val) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(val), {
      message: 'A cidade deve conter apenas letras, espaços e hífens.'
    }),
  bairro: z
    .string({
      required_error: 'O bairro é obrigatório',
      invalid_type_error: 'O bairro deve ser um texto'
    })
    .transform(sanitizeString)
    .refine(
      (val) => val.length >= 2,
      'O bairro deve ter no mínimo 2 caracteres'
    )
    .refine(
      (val) => val.length <= 100,
      'O bairro deve ter no máximo 100 caracteres'
    ),
  cep: z
    .string({
      required_error: 'O CEP é obrigatório',
      invalid_type_error: 'O CEP deve ser um texto'
    })
    .refine(
      (val) => CEP_REGEX.test(val),
      'CEP inválido. Use o formato 00000-000'
    ),
  estado: z
    .string({
      required_error: 'O estado é obrigatório',
      invalid_type_error: 'O estado deve ser um texto'
    })
    .length(2, 'O estado deve ter exatamente 2 caracteres (sigla)')
    .transform((val) => val.toUpperCase()),
  pais: z
    .string({
      required_error: 'O país é obrigatório',
      invalid_type_error: 'O país deve ser um texto'
    })
    .transform(sanitizeString)
    .refine((val) => val.length >= 2, 'O país deve ter no mínimo 2 caracteres')
    .refine(
      (val) => val.length <= 100,
      'O país deve ter no máximo 100 caracteres'
    ),
  complemento: z
    .string({
      invalid_type_error: 'O complemento deve ser um texto'
    })
    .transform(sanitizeString)
    .refine(
      (val) => !val || val.length <= 200,
      'O complemento deve ter no máximo 200 caracteres'
    )
    .optional()
})
