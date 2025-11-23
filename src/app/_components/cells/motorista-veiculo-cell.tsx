import { Badge } from '@/app/_components/ui/badge'
import { CheckIcon, XIcon } from 'lucide-react'

interface MotoristaVeiculoCellProps {
  temVeiculo: boolean
}

export function MotoristaVeiculoCell({
  temVeiculo
}: MotoristaVeiculoCellProps) {
  if (temVeiculo) {
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      >
        <CheckIcon aria-hidden="true" />
        Com Veículo
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-muted-foreground/30 text-muted-foreground"
    >
      <XIcon aria-hidden="true" />
      Sem Veículo
    </Badge>
  )
}
