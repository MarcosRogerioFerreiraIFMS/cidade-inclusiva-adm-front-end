'use client'

import { AvatarCell } from '@/app/_components/cells'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { ManutencaoResponseDTO } from '@/app/_dtos/response'
import {
  getManutencaoEspecialidadeBadgeColor,
  getManutencaoEspecialidadeLabel,
  type ManutencaoEspecialidade
} from '@/app/_enums/manutencaoEnums'
import { formatTelefone } from '@/app/_utils/formatUtils'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { ManutencaoTableActionsMenu } from './manutencao-table-actions-menu'

export const manutencaoTableColumns: ColumnDef<ManutencaoResponseDTO>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por nome"
        >
          Oficina
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const manutencao = row.original
      return (
        <AvatarCell
          entity={{
            id: manutencao.id,
            nome: manutencao.nome,
            fotoUrl: manutencao.logo?.url ?? null
          }}
          enableNavigation={true}
          getDetailRoute={APP_ROUTES.MANUTENCAO_DETALHE}
        />
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por e-mail"
        >
          E-mail
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      return <span className="max-w-[200px] truncate font-medium">{email}</span>
    }
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por telefone"
        >
          Telefone
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const telefone = row.getValue('telefone') as string
      return <span className="font-medium">{formatTelefone(telefone)}</span>
    }
  },
  {
    accessorKey: 'especialidades',
    header: 'Especialidades',
    cell: ({ row }) => {
      const especialidades = row.original.especialidades
      return (
        <div className="flex flex-wrap gap-1">
          {especialidades.slice(0, 2).map((esp) => (
            <Badge
              key={esp.id}
              className={`text-xs ${getManutencaoEspecialidadeBadgeColor(
                esp.tipo as ManutencaoEspecialidade
              )}`}
            >
              {getManutencaoEspecialidadeLabel(
                esp.tipo as ManutencaoEspecialidade
              )}
            </Badge>
          ))}
          {especialidades.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{especialidades.length - 2}
            </Badge>
          )}
        </div>
      )
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const manutencao = row.original
      return <ManutencaoTableActionsMenu manutencao={manutencao} />
    }
  }
]
