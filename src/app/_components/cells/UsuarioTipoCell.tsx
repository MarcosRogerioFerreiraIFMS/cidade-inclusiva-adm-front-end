'use client'

import { Badge } from '@/app/_components/ui/badge'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'

interface UsuarioTipoCellProps {
  tipo: UsuarioResponseDTO['tipo']
}

const tipoDisplay: Record<UsuarioResponseDTO['tipo'], string> = {
  ADMIN: 'Administrador',
  USUARIO: 'Usuário'
}

const tipoVariant: Record<
  UsuarioResponseDTO['tipo'],
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  ADMIN: 'destructive',
  USUARIO: 'default'
}

export function UsuarioTipoCell({ tipo }: UsuarioTipoCellProps) {
  return <Badge variant={tipoVariant[tipo]}>{tipoDisplay[tipo]}</Badge>
}
