'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/_components/ui/avatar'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import { getInitials } from '@/app/_utils/stringUtils'

interface UsuarioFotoCellProps {
  foto?: UsuarioResponseDTO['foto']
  nome: string
}

export function UsuarioFotoCell({ foto, nome }: UsuarioFotoCellProps) {
  return (
    <Avatar className="size-10">
      <AvatarImage
        className="object-cover"
        draggable={false}
        src={foto?.url}
        alt={`Foto de perfil de ${nome}`}
      />
      <AvatarFallback>{getInitials(nome)}</AvatarFallback>
    </Avatar>
  )
}
