import { Badge } from '@/app/_components/ui/badge'
import {
  ProfissionalEspecialidadesDisplay,
  type ProfissionalEspecialidade
} from '@/app/_enums/profissionalEnums'
import { getProfissionalEspecialidadeBadgeColor } from '@/app/_utils/getShadcnBadgeColor'

interface ProfissionalEspecialidadeCellProps {
  especialidade: ProfissionalEspecialidade
}

export function ProfissionalEspecialidadeCell({
  especialidade
}: ProfissionalEspecialidadeCellProps) {
  const displayText =
    ProfissionalEspecialidadesDisplay[especialidade] ?? especialidade
  const colorClasses = getProfissionalEspecialidadeBadgeColor(especialidade)

  return <Badge className={colorClasses}>{displayText}</Badge>
}
