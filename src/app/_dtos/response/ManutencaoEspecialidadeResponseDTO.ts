/**
 * DTO de resposta para especialidade de manutenção
 */
export interface ManutencaoEspecialidadeResponseDTO {
  /** ID único da especialidade */
  id: string
  /** Tipo da especialidade */
  tipo:
    | 'OUTROS'
    | 'CADEIRAS_DE_RODAS'
    | 'PROTESES'
    | 'ORTESES'
    | 'ANDADORES'
    | 'MULETAS'
    | 'BENGALAS'
    | 'SCOOTERS'
}
