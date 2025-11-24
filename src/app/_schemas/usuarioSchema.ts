import { z } from 'zod'
import { TIPO_USUARIO } from '../_enums/tipoUsuarioEnum'
import {
  emailSchema,
  enderecoSchema,
  fotoSchema,
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
  foto: fotoSchema
})

export type UsuarioUpdateDTO = z.infer<typeof updateUsuarioSchema>

// Schema para criação de usuário
export const createUsuarioSchema = z.object({
  endereco: enderecoSchema,
  nome: nomeSchema,
  telefone: telefoneSchema,
  email: emailSchema,
  senha: senhaSchema,
  tipo: z.enum(TIPO_USUARIO, {
    required_error: 'O tipo de usuário é obrigatório',
    invalid_type_error: 'O tipo deve ser USUARIO ou ADMIN'
  }),
  foto: fotoSchema
})

export type UsuarioCreateDTO = z.infer<typeof createUsuarioSchema>
