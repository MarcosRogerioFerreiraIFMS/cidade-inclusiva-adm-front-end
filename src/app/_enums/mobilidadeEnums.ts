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
 * Mapeamento dos status para variantes de badge do Shadcn/UI
 */
export const MobilidadeStatusBadgeVariant: Record<
  MobilidadeStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  PENDENTE: 'destructive',
  EM_ANDAMENTO: 'default',
  CONCLUIDO: 'secondary',
  CANCELADO: 'destructive'
}

/**
 * Obtém o label amigável para exibição do status
 */
export function getMobilidadeStatusLabel(status: MobilidadeStatus): string {
  return MobilidadeStatusDisplay[status] || status
}

/**
 * Obtém a variante de Badge para um status de mobilidade
 */
export function getMobilidadeStatusBadgeVariant(
  status: MobilidadeStatus
): 'default' | 'secondary' | 'destructive' | 'outline' {
  return MobilidadeStatusBadgeVariant[status] || 'default'
}
