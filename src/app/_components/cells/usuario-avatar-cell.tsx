'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/_components/ui/avatar'
import { getInitials } from '@/app/_utils/stringUtils'
import Link from 'next/link'

interface AvatarCellProps {
  entity?: {
    id: string
    nome: string
    fotoUrl?: string | null
  } | null
  enableNavigation?: boolean
  getDetailRoute?: (id: string) => string
}

export function AvatarCell({
  entity,
  enableNavigation = false,
  getDetailRoute
}: AvatarCellProps) {
  if (!entity) {
    return <span className="text-muted-foreground text-sm">Não informado</span>
  }

  const avatarContent = (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage
          src={entity.fotoUrl ?? undefined}
          alt={`Foto de ${entity.nome}`}
        />
        <AvatarFallback>{getInitials(entity.nome)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{entity.nome}</span>
      </div>
    </div>
  )

  if (enableNavigation && getDetailRoute) {
    return (
      <Link
        href={getDetailRoute(entity.id)}
        className="hover:underline"
        aria-label={`Ver detalhes de ${entity.nome}`}
      >
        {avatarContent}
      </Link>
    )
  }

  return avatarContent
}
