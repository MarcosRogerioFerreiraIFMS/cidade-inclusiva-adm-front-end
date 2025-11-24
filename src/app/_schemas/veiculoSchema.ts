import { z } from 'zod'
import { fotosArraySchema } from './commonSchemas'

// Schema de placa brasileira
const placaSchema = z
  .string()
  .min(1, 'Placa é obrigatória')
  .regex(
    /^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/,
    'Placa inválida. Use o formato: ABC-1234 ou ABC1D23 (Mercosul)'
  )
  .transform((val) => {
    const clean = val.toUpperCase().replace('-', '')
    return clean.slice(0, 3) + '-' + clean.slice(3)
  })

// Schema para criação de veículo
export const createVeiculoSchema = z.object({
  motoristaId: z.string().uuid('ID do motorista inválido'),
  placa: placaSchema,
  marca: z
    .string()
    .min(1, 'Marca é obrigatória')
    .min(2, 'Marca deve ter pelo menos 2 caracteres')
    .max(50, 'Marca deve ter no máximo 50 caracteres')
    .transform((val) => val.trim()),
  modelo: z
    .string()
    .min(1, 'Modelo é obrigatório')
    .min(2, 'Modelo deve ter pelo menos 2 caracteres')
    .max(50, 'Modelo deve ter no máximo 50 caracteres')
    .transform((val) => val.trim()),
  cor: z
    .string()
    .min(1, 'Cor é obrigatória')
    .min(3, 'Cor deve ter pelo menos 3 caracteres')
    .max(30, 'Cor deve ter no máximo 30 caracteres')
    .transform((val) => val.trim()),
  fotos: fotosArraySchema
})

export type VeiculoCreateDTO = z.infer<typeof createVeiculoSchema>

// Schema para atualização de veículo
export const updateVeiculoSchema = z.object({
  placa: placaSchema,
  marca: z
    .string()
    .min(1, 'Marca é obrigatória')
    .min(2, 'Marca deve ter pelo menos 2 caracteres')
    .max(50, 'Marca deve ter no máximo 50 caracteres')
    .transform((val) => val.trim()),
  modelo: z
    .string()
    .min(1, 'Modelo é obrigatório')
    .min(2, 'Modelo deve ter pelo menos 2 caracteres')
    .max(50, 'Modelo deve ter no máximo 50 caracteres')
    .transform((val) => val.trim()),
  cor: z
    .string()
    .min(1, 'Cor é obrigatória')
    .min(3, 'Cor deve ter pelo menos 3 caracteres')
    .max(30, 'Cor deve ter no máximo 30 caracteres')
    .transform((val) => val.trim()),
  fotos: fotosArraySchema
})

export type VeiculoUpdateDTO = z.infer<typeof updateVeiculoSchema>
