import { Badge } from '@/app/_components/ui/badge'
import {
  getProfissionalEspecialidadeBadgeColor,
  getProfissionalEspecialidadeLabel,
  type ProfissionalEspecialidade
} from '@/app/_enums/profissionalEnums'

interface ProfissionalEspecialidadeCellProps {
  especialidade: ProfissionalEspecialidade
}

export function ProfissionalEspecialidadeCell({
  especialidade
}: ProfissionalEspecialidadeCellProps) {
  const displayText = getProfissionalEspecialidadeLabel(especialidade)
  const colorClasses = getProfissionalEspecialidadeBadgeColor(especialidade)

  return <Badge className={colorClasses}>{displayText}</Badge>
}
