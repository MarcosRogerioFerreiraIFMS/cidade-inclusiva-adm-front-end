import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { NoticiaData } from '@/app/_schema/NoticiaSchema'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { NoticiaActions } from './NoticiaActions'

export const useNoticiaColumns = (
  refreshData: () => void
): ColumnDef<NoticiaData>[] => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  return useMemo(
    () => [
      {
        accessorKey: 'foto',
        header: 'Imagem',
        enableSorting: false,
        cell: ({ row }) => (
          <Link href={`/noticias/visualizar/${row.original.id}`}>
            <Image
              src={row.original.foto || '/placeholder.png'}
              alt={row.original.titulo}
              width={80}
              height={80}
              priority
              className="h-auto w-20 rounded-lg object-cover hover:cursor-pointer"
            />
          </Link>
        )
      },
      {
        accessorKey: 'titulo',
        header: 'Título',
        sortingFn: 'text',
        cell: ({ row }) => (
          <Link href={`/noticias/visualizar/${row.original.id}`}>
            <h2 className="w-full max-w-40 truncate font-medium hover:cursor-pointer">
              {row.original.titulo}
            </h2>
          </Link>
        )
      },
      {
        accessorKey: 'conteudo',
        header: 'Conteúdo',
        sortingFn: 'text',
        cell: ({ row }) => (
          <Link href={`/noticias/visualizar/${row.original.id}`}>
            <p className="w-full max-w-80 truncate hover:cursor-pointer">
              {row.original.conteudo}
            </p>
          </Link>
        )
      },
      {
        accessorKey: 'categoria',
        header: 'Categoria',
        sortingFn: 'text',
        cell: ({ row }) => <Badge>{row.original.categoria}</Badge>
      },
      {
        accessorKey: 'dataPublicacao',
        header: 'Data de Publicação',
        sortingFn: 'datetime',
        cell: ({ row }) =>
          new Date(row.original.dataPublicacao).toLocaleDateString('pt-BR')
      },
      {
        accessorKey: 'url',
        header: 'Link',
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="link"
            className="p-0"
            asChild={row.original.url ? true : false}
            disabled={!row.original.url}
          >
            {row.original.url ? (
              <Link
                href={row.original.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Mais
              </Link>
            ) : (
              <span>Ver Mais</span>
            )}
          </Button>
        )
      },
      {
        id: 'actions',
        header: 'Opções',
        enableSorting: false,
        cell: ({ row }) => (
          <NoticiaActions
            noticiaId={row.original.id || ''}
            deletingId={deletingId}
            setDeletingId={setDeletingId}
            refreshData={refreshData}
          />
        )
      }
    ],
    [deletingId, refreshData]
  )
}
