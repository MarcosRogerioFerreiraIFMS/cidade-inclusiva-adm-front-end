import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { EllipsisIcon, EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

interface NoticiaActionsProps {
  noticiaId: string
  deletingId: string | null
  setDeletingId: (id: string | null) => void
  refreshData: () => void
}

export function NoticiaActions({
  noticiaId,
  deletingId,
  setDeletingId,
  refreshData
}: NoticiaActionsProps) {
  const [open, setOpen] = useState(false)
  const [noticiaIdToDelete, setNoticiaIdToDelete] = useState<
    string | undefined
  >(undefined)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            disabled={deletingId === noticiaId}
          >
            <span className="sr-only">Abrir menu</span>
            <EllipsisIcon className="text-inherit" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/noticias/visualizar/${noticiaId}`}>
              <EyeIcon className="text-inherit" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/noticias/editar/${noticiaId}`}>
              <PencilIcon className="text-inherit" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setOpen(true)
              setNoticiaIdToDelete(noticiaId)
            }}
            disabled={deletingId === noticiaId}
          >
            <Trash2Icon className="text-inherit" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        setDeletingId={setDeletingId}
        deletingId={deletingId}
        refreshData={refreshData}
        noticiaIdToDelete={noticiaIdToDelete}
        setNoticiaIdToDelete={setNoticiaIdToDelete}
      />
    </>
  )
}
