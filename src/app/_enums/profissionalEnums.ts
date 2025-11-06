/**
 * Especialidades de profissionais aceitas pelo backend
 * ATENÇÃO: Ao modificar essas especialidades, verifique se elas estão sincronizadas com o backend!
 */
export const PROFISSIONAL_ESPECIALIDADES = [
  'CUIDADOR',
  'SECRETARIO_DO_LAR',
  'ENFERMEIRO',
  'MEDICO',
  'FISIOTERAPEUTA',
  'PSICOLOGO',
  'OUTROS'
] as const

/**
 * Mapeamento das especialidades para exibição amigável no frontend
 */
export const ProfissionalEspecialidadesDisplay: Record<string, string> = {
  CUIDADOR: 'Cuidador',
  SECRETARIO_DO_LAR: 'Secretário do Lar',
  ENFERMEIRO: 'Enfermeiro',
  MEDICO: 'Médico',
  FISIOTERAPEUTA: 'Fisioterapeuta',
  PSICOLOGO: 'Psicólogo',
  OUTROS: 'Outros'
}

export type ProfissionalEspecialidade =
  (typeof PROFISSIONAL_ESPECIALIDADES)[number]
