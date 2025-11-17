'use client'

import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import { EyeIcon, MapIcon, MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'

interface MobilidadeTableActionsMenuProps {
  mobilidade: MobilidadeResponseDTO
}

export function MobilidadeTableActionsMenu({
  mobilidade
}: MobilidadeTableActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`Abrir menu de ações para mobilidade ${mobilidade.id}`}
        >
          <MoreHorizontalIcon aria-hidden="true" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={APP_ROUTES.MOBILIDADE_DETALHE(mobilidade.id)}
            aria-label={`Visualizar mobilidade ${mobilidade.id}`}
          >
            <EyeIcon aria-hidden="true" />
            Visualizar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`${APP_ROUTES.MOBILIDADE_MAPA()}?id=${mobilidade.id}`}
            aria-label={`Ver mobilidade ${mobilidade.id} no mapa`}
          >
            <MapIcon aria-hidden="true" />
            Ver no Mapa
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
