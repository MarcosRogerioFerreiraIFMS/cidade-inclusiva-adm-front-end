'use client'

import { AvatarCell } from '@/app/_components/cells'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import {
  getMobilidadeStatusBadgeClasses,
  getMobilidadeStatusLabel
} from '@/app/_enums/mobilidadeEnums'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import Link from 'next/link'
import { MobilidadeTableActionsMenu } from './mobilidade-table-actions-menu'

export const mobilidadeTableColumns: ColumnDef<MobilidadeResponseDTO>[] = [
  {
    accessorKey: 'descricao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por descrição"
        >
          Descrição
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const descricao = row.getValue('descricao') as string
      return (
        <Link
          href={APP_ROUTES.MOBILIDADE_DETALHE(row.original.id)}
          className="block max-w-[300px] truncate font-medium hover:underline"
          aria-label={`Ver detalhes de ${row.original.descricao}`}
        >
          {descricao}
        </Link>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por status"
        >
          Status
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as MobilidadeResponseDTO['status']
      return (
        <Badge className={getMobilidadeStatusBadgeClasses(status)}>
          {getMobilidadeStatusLabel(status)}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'latitude',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por latitude"
        >
          Latitude
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const latitude = row.getValue('latitude') as number
      return <span className="font-medium">{latitude.toFixed(6)}</span>
    }
  },
  {
    accessorKey: 'longitude',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por longitude"
        >
          Longitude
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const longitude = row.getValue('longitude') as number
      return <span className="font-medium">{longitude.toFixed(6)}</span>
    }
  },
  {
    accessorKey: 'dataRegistro',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por data de registro"
        >
          Data de Registro
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataRegistro = row.getValue('dataRegistro') as Date
      return (
        <span className="font-medium">
          {formatDateToDateString(dataRegistro.toString())}
        </span>
      )
    }
  },
  {
    accessorKey: 'usuario.nome',
    header: 'Usuário',
    cell: ({ row }) => {
      const mobilidade = row.original
      return (
        <AvatarCell
          entity={mobilidade.usuario}
          enableNavigation={true}
          getDetailRoute={APP_ROUTES.USUARIO_DETALHE}
        />
      )
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const mobilidade = row.original

      return <MobilidadeTableActionsMenu mobilidade={mobilidade} />
    }
  }
]
