'use client'

import {
  TituloCell,
  UsuarioFotoCell,
  UsuarioTipoCell
} from '@/app/_components/cells'
import { Button } from '@/app/_components/ui/button'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import { formatTelefone } from '@/app/_utils/formatUtils'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { UsuarioTableActionsMenu } from './usuario-table-actions-menu'

export const usuarioTableColumns: ColumnDef<UsuarioResponseDTO>[] = [
  {
    accessorKey: 'foto',
    header: 'Foto',
    cell: ({ row }) => {
      const foto = row.getValue('foto') as UsuarioResponseDTO['foto']
      const nome = row.getValue('nome') as string
      return <UsuarioFotoCell foto={foto} nome={nome} />
    }
  },
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
          Nome
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const nome = row.getValue('nome') as string
      return <TituloCell titulo={nome} />
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
    accessorKey: 'tipo',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
          aria-label="Ordenar por tipo"
        >
          Tipo
          <ArrowUpDownIcon aria-hidden="true" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tipo = row.getValue('tipo') as UsuarioResponseDTO['tipo']
      return <UsuarioTipoCell tipo={tipo} />
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const usuario = row.original

      return <UsuarioTableActionsMenu usuario={usuario} />
    }
  }
]
