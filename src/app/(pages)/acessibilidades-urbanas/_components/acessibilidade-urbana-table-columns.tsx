'use client'

import { AvatarCell } from '@/app/_components/cells'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { AcessibilidadeUrbanaResponseDTO } from '@/app/_dtos/response'
import {
  getAcessibilidadeUrbanaCategoriaBadgeColor,
  getAcessibilidadeUrbanaCategoriaLabel,
  type AcessibilidadeUrbanaCategoria
} from '@/app/_enums/acessibilidadeUrbanaEnums'
import { formatTelefone } from '@/app/_utils/formatUtils'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { AcessibilidadeUrbanaTableActionsMenu } from './acessibilidade-urbana-table-actions-menu'

export const acessibilidadeUrbanaTableColumns: ColumnDef<AcessibilidadeUrbanaResponseDTO>[] =
  [
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
            Estabelecimento
            <ArrowUpDownIcon aria-hidden="true" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const acessibilidade = row.original
        return (
          <AvatarCell
            entity={{
              id: acessibilidade.id,
              nome: acessibilidade.nome,
              fotoUrl: acessibilidade.logo?.url ?? null
            }}
            enableNavigation={true}
            getDetailRoute={APP_ROUTES.ACESSIBILIDADE_URBANA_DETALHE}
          />
        )
      }
    },
    {
      accessorKey: 'categoria',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-auto p-0 hover:bg-transparent"
            aria-label="Ordenar por categoria"
          >
            Categoria
            <ArrowUpDownIcon aria-hidden="true" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const categoria = row.getValue(
          'categoria'
        ) as AcessibilidadeUrbanaCategoria
        return (
          <Badge
            className={getAcessibilidadeUrbanaCategoriaBadgeColor(categoria)}
          >
            {getAcessibilidadeUrbanaCategoriaLabel(categoria)}
          </Badge>
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
        return (
          <span className="max-w-[200px] truncate font-medium">{email}</span>
        )
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
      accessorKey: 'recursos',
      header: 'Recursos',
      cell: ({ row }) => {
        const recursos = row.original.recursos
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{recursos.length}</span>
            <span className="text-muted-foreground text-xs">
              {recursos.length === 1 ? 'recurso' : 'recursos'}
            </span>
          </div>
        )
      }
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const acessibilidade = row.original
        return (
          <AcessibilidadeUrbanaTableActionsMenu
            acessibilidadeUrbana={acessibilidade}
          />
        )
      }
    }
  ]
