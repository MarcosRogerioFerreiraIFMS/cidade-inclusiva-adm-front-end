'use client'

import { Badge } from '@/app/_components/ui/badge'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import {
  getTipoUsuarioBadgeVariant,
  getTipoUsuarioLabel
} from '@/app/_enums/tipoUsuarioEnum'

interface UsuarioTipoCellProps {
  tipo: UsuarioResponseDTO['tipo']
}

export function UsuarioTipoCell({ tipo }: UsuarioTipoCellProps) {
  return (
    <Badge variant={getTipoUsuarioBadgeVariant(tipo)}>
      {getTipoUsuarioLabel(tipo)}
    </Badge>
  )
}
