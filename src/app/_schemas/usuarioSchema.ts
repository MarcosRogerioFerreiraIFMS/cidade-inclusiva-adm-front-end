import { z } from 'zod'
import {
  emailSchema,
  enderecoSchema,
  fotoUpdateSchema,
  nomeSchema,
  senhaOptionalSchema,
  senhaSchema,
  telefoneSchema
} from './commonSchemas'

// Schema para atualização de perfil (sem senha obrigatória)
export const updateUsuarioSchema = z.object({
  endereco: enderecoSchema,
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  senha: senhaOptionalSchema,
  foto: fotoUpdateSchema
})

export type UsuarioUpdateDTO = z.infer<typeof updateUsuarioSchema>

// Schema para criação de usuário
export const createUsuarioSchema = z.object({
  endereco: enderecoSchema,
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  senha: senhaSchema,
  tipo: z.enum(['USUARIO', 'ADMIN'], {
    required_error: 'O tipo de usuário é obrigatório',
    invalid_type_error: 'O tipo deve ser USUARIO ou ADMIN'
  }),
  foto: fotoUpdateSchema
})

export type UsuarioCreateDTO = z.infer<typeof createUsuarioSchema>
