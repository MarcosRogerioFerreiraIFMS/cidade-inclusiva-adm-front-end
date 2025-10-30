'use client'

import {
  ConteudoCell,
  DataCell,
  FotoCell,
  NoticiaCategoriaCell,
  TituloCell,
  UrlCell
} from '@/app/_components/cells'
import { Button } from '@/app/_components/ui/button'
import type { NoticiaResponseDTO } from '@/app/_dtos/response'
import { type NoticiaCategoria } from '@/app/_enums/noticiaEnums'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { NoticiaTableActionsMenu } from './noticia-table-actions-menu'

export const noticiaTableColumns: ColumnDef<NoticiaResponseDTO>[] = [
  {
    accessorKey: 'foto',
    header: 'Imagem',
    cell: ({ row }) => {
      const foto = row.getValue('foto') as NoticiaResponseDTO['foto']
      return <FotoCell foto={foto} />
    }
  },
  {
    accessorKey: 'titulo',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
        >
          Título
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const titulo = row.getValue('titulo') as string
      return <TituloCell titulo={titulo} />
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
        >
          Categoria
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const categoria = row.getValue('categoria') as NoticiaCategoria
      return <NoticiaCategoriaCell categoria={categoria} />
    }
  },
  {
    accessorKey: 'dataPublicacao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 hover:bg-transparent"
        >
          Data de Publicação
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataPublicacao = row.getValue('dataPublicacao') as string
      return <DataCell dataPublicacao={dataPublicacao} />
    }
  },
  {
    accessorKey: 'conteudo',
    header: 'Conteúdo',
    cell: ({ row }) => {
      const conteudo = row.getValue('conteudo') as string
      return <ConteudoCell conteudo={conteudo} />
    }
  },
  {
    accessorKey: 'url',
    header: 'Link',
    cell: ({ row }) => {
      const url = row.getValue('url') as string
      return <UrlCell url={url} />
    }
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const noticia = row.original

      return <NoticiaTableActionsMenu noticia={noticia} />
    }
  }
]
