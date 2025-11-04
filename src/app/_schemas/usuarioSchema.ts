import { z } from 'zod'
import {
  hasValidImageExtension,
  validateUrlProtocol
} from '../_utils/imageUtils'
import { sanitizeString } from '../_utils/stringUtils'

const NOME_MIN_LENGTH = 3
const NOME_MAX_LENGTH = 100
const TELEFONE_REGEX = /^\(\d{2}\) 9\d{4}-\d{4}$/
const CEP_REGEX = /^\d{5}-\d{3}$/
const SENHA_MIN_LENGTH = 8

// Schema para endereço
const enderecoSchema = z.object({
  logradouro: z
    .string({
      required_error: 'O logradouro é obrigatório',
      invalid_type_error: 'O logradouro deve ser um texto'
    })
    .trim()
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
    ),

  cidade: z
    .string({
      required_error: 'A cidade é obrigatória',
      invalid_type_error: 'A cidade deve ser um texto'
    })
    .trim()
    .refine(
      (val) => val.length >= 2,
      'A cidade deve ter no mínimo 2 caracteres'
    )
    .refine(
      (val) => val.length <= 100,
      'A cidade deve ter no máximo 100 caracteres'
    ),

  bairro: z
    .string({
      required_error: 'O bairro é obrigatório',
      invalid_type_error: 'O bairro deve ser um texto'
    })
    .trim()
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
    .trim()
    .refine((val) => val.length >= 2, 'O país deve ter no mínimo 2 caracteres')
    .refine(
      (val) => val.length <= 100,
      'O país deve ter no máximo 100 caracteres'
    ),

  complemento: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length <= 200,
      'O complemento deve ter no máximo 200 caracteres'
    )
})

// Schema para atualização de perfil (sem senha obrigatória)
export const updateUsuarioSchema = z.object({
  endereco: enderecoSchema,

  nome: z
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
    ),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório',
      invalid_type_error: 'O telefone deve ser um texto'
    })
    .refine(
      (val) => TELEFONE_REGEX.test(val),
      'Telefone inválido. Use o formato (00) 90000-0000'
    ),

  email: z
    .string({
      required_error: 'O email é obrigatório',
      invalid_type_error: 'O email deve ser um texto'
    })
    .email('Email inválido')
    .transform((val) => val.toLowerCase().trim()),

  senha: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional()
    .refine(
      (val) => !val || val.length >= SENHA_MIN_LENGTH,
      `A senha deve ter no mínimo ${SENHA_MIN_LENGTH} caracteres`
    ),

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
    .optional()
})

export type UsuarioUpdateDTO = z.infer<typeof updateUsuarioSchema>
