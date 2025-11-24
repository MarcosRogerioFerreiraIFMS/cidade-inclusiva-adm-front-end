import { z } from 'zod'
import { MOBILIDADE_STATUS } from '../_enums/mobilidadeEnums'

/**
 * Schema para filtros de geração de relatório de mobilidade
 */
export const mobilidadeRelatorioSchema = z.object({
  status: z
    .array(
      z.enum(MOBILIDADE_STATUS, {
        errorMap: () => ({ message: 'Status inválido' })
      })
    )
    .optional(),
  dataInicio: z
    .date({
      invalid_type_error: 'Data de início inválida'
    })
    .optional(),
  dataFim: z
    .date({
      invalid_type_error: 'Data de fim inválida'
    })
    .optional(),
  usuarioNome: z
    .string()
    .trim()
    .max(120, 'Nome deve ter no máximo 120 caracteres')
    .optional(),
  incluirUsuarioSemNome: z.boolean().default(true)
})

export type MobilidadeRelatorioFilterDTO = z.infer<
  typeof mobilidadeRelatorioSchema
>

/**
 * Schema para atualização de status de mobilidade
 */
export const updateMobilidadeStatusSchema = z.object({
  status: z.enum(MOBILIDADE_STATUS, {
    errorMap: () => ({ message: 'Status inválido' })
  })
})

export type UpdateMobilidadeStatusDTO = z.infer<
  typeof updateMobilidadeStatusSchema
>
