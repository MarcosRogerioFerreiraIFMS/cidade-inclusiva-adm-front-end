/**
 * Especialidades de manutenção aceitas pelo backend
 * ATENÇÃO: Ao modificar essas especialidades, verifique se elas estão sincronizadas com o backend!
 */
export const MANUTENCAO_ESPECIALIDADES = [
  'CADEIRAS_DE_RODAS',
  'PROTESES',
  'ORTESES',
  'ANDADORES',
  'MULETAS',
  'BENGALAS',
  'SCOOTERS',
  'OUTROS'
] as const

/**
 * Mapeamento das especialidades para exibição amigável no frontend
 */
export const ManutencaoEspecialidadesDisplay: Record<string, string> = {
  CADEIRAS_DE_RODAS: 'Cadeiras de Rodas',
  PROTESES: 'Próteses',
  ORTESES: 'Órteses',
  ANDADORES: 'Andadores',
  MULETAS: 'Muletas',
  BENGALAS: 'Bengalas',
  SCOOTERS: 'Scooters',
  OUTROS: 'Outros'
}

/**
 * Mapeamento das especialidades para classes CSS de badge customizadas
 * Utiliza cores do Tailwind com suporte a dark mode
 */
export const ManutencaoEspecialidadeBadgeColors: Record<
  ManutencaoEspecialidade,
  string
> = {
  CADEIRAS_DE_RODAS:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  PROTESES:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  ORTESES: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  ANDADORES:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  MULETAS: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  BENGALAS: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  SCOOTERS:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  OUTROS: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

export type ManutencaoEspecialidade = (typeof MANUTENCAO_ESPECIALIDADES)[number]

/**
 * Obtém o label amigável para exibição da especialidade
 */
export function getManutencaoEspecialidadeLabel(
  especialidade: ManutencaoEspecialidade
): string {
  return ManutencaoEspecialidadesDisplay[especialidade] || especialidade
}

/**
 * Obtém as classes CSS de badge customizadas para a especialidade
 */
export function getManutencaoEspecialidadeBadgeColor(
  especialidade: ManutencaoEspecialidade
): string {
  return (
    ManutencaoEspecialidadeBadgeColors[especialidade] ||
    ManutencaoEspecialidadeBadgeColors.OUTROS
  )
}

/**
 * Opções de especialidades para uso em formulários
 */
export const ManutencaoEspecialidadesOptions = MANUTENCAO_ESPECIALIDADES.map(
  (value) => ({
    value,
    label: getManutencaoEspecialidadeLabel(value)
  })
)
