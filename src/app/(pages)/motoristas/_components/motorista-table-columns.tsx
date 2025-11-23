'use client'

import { AvatarCell, MotoristaVeiculoCell } from '@/app/_components/cells'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MotoristaResponseDTO } from '@/app/_dtos/response'
import { formatTelefone } from '@/app/_utils/formatUtils'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { MotoristaTableActionsMenu } from './motorista-table-actions-menu'

export const motoristaTableColumns: ColumnDef<MotoristaResponseDTO>[] = [
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
          Motorista
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const motorista = row.original
      return (
        <AvatarCell
          entity={{
            id: motorista.id,
            nome: motorista.nome,
            fotoUrl: motorista.foto?.url ?? null
          }}
          enableNavigation={true}
          getDetailRoute={APP_ROUTES.MOTORISTA_DETALHE}
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
    accessorKey: 'veiculo',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por veículo"
        >
          Veículo
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const motorista = row.original
      return <MotoristaVeiculoCell temVeiculo={!!motorista.veiculo} />
    },
    sortingFn: (rowA, rowB) => {
      const hasVeiculoA = !!rowA.original.veiculo
      const hasVeiculoB = !!rowB.original.veiculo
      if (hasVeiculoA === hasVeiculoB) return 0
      return hasVeiculoA ? -1 : 1
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const motorista = row.original
      return <MotoristaTableActionsMenu motorista={motorista} />
    }
  }
]
