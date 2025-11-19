/**
 * Status de mobilidades aceitos pelo backend
 * ATENÇÃO: Ao modificar esses status, verifique se eles estão sincronizados com o backend!
 */
export const MOBILIDADE_STATUS = [
  'PENDENTE',
  'EM_ANDAMENTO',
  'CONCLUIDO',
  'CANCELADO'
] as const

export type MobilidadeStatus = (typeof MOBILIDADE_STATUS)[number]

/**
 * Mapeamento dos status para exibição amigável no frontend
 */
export const MobilidadeStatusDisplay: Record<MobilidadeStatus, string> = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado'
}

/**
 * Mapeamento dos status para classes de cor de badge customizadas
 * Usa as mesmas cores dos pins do mapa
 */
export const MobilidadeStatusBadgeClasses: Record<MobilidadeStatus, string> = {
  PENDENTE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  EM_ANDAMENTO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  CONCLUIDO:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  CANCELADO: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

/**
 * Obtém o label amigável para exibição do status
 */
export function getMobilidadeStatusLabel(status: MobilidadeStatus): string {
  return MobilidadeStatusDisplay[status] || status
}

/**
 * Obtém as classes CSS para Badge de um status de mobilidade
 * Usa as mesmas cores dos pins do mapa
 */
export function getMobilidadeStatusBadgeClasses(
  status: MobilidadeStatus
): string {
  return (
    MobilidadeStatusBadgeClasses[status] ||
    MobilidadeStatusBadgeClasses.PENDENTE
  )
}
