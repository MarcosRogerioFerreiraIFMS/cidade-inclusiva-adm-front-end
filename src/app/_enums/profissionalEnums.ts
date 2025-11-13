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

/**
 * Mapeamento das especialidades para classes CSS de badge customizadas
 * Utiliza cores do Tailwind com suporte a dark mode
 */
export const ProfissionalEspecialidadeBadgeColors: Record<
  ProfissionalEspecialidade,
  string
> = {
  CUIDADOR: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  SECRETARIO_DO_LAR:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  ENFERMEIRO:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  MEDICO: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  FISIOTERAPEUTA:
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  PSICOLOGO:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  OUTROS: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

export type ProfissionalEspecialidade =
  (typeof PROFISSIONAL_ESPECIALIDADES)[number]

/**
 * Obtém o label amigável para exibição da especialidade
 */
export function getProfissionalEspecialidadeLabel(
  especialidade: ProfissionalEspecialidade
): string {
  return ProfissionalEspecialidadesDisplay[especialidade] || especialidade
}

/**
 * Obtém as classes CSS de badge customizadas para a especialidade
 */
export function getProfissionalEspecialidadeBadgeColor(
  especialidade: ProfissionalEspecialidade
): string {
  return (
    ProfissionalEspecialidadeBadgeColors[especialidade] ||
    ProfissionalEspecialidadeBadgeColors.OUTROS
  )
}
