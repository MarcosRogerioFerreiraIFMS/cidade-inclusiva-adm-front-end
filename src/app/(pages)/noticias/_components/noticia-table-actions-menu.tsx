'use client'

import { EditIcon, EyeIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'

import { deleteNoticia } from '@/app/_actions/noticiaActions'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import type { NoticiaResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { NoticiaDeletarModal } from './noticia-deletar-modal'

interface NoticiaTableActionsMenuProps {
  noticia: NoticiaResponseDTO
}

export function NoticiaTableActionsMenu({
  noticia
}: NoticiaTableActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      noticia.id,
      async () => {
        return await deleteNoticia(noticia.id)
      },
      'Notícia deletada com sucesso!'
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/noticias/${noticia.id}`} prefetch={false}>
              <EyeIcon />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/noticias/editar/${noticia.id}`}>
              <EditIcon />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash2Icon />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NoticiaDeletarModal
        noticia={noticia}
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </>
  )
}
