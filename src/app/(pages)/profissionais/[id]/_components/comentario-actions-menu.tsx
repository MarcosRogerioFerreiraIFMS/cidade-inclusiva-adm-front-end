'use client'

import {
  deleteComentario,
  toggleComentarioVisibilidade
} from '@/app/_actions/comentarioActions'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import type { ComentarioResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { useNotification } from '@/app/_hooks/useNotification'
import {
  EyeIcon,
  EyeOffIcon,
  MoreHorizontalIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { ComentarioDeletarModal } from './comentario-deletar-modal'

interface ComentarioActionsMenuProps {
  comentario: ComentarioResponseDTO
  profissionalId: string
}

export function ComentarioActionsMenu({
  comentario,
  profissionalId
}: ComentarioActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()
  const { notifySuccess, notifyError } = useNotification()
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false)

  function handleDelete() {
    openModal(
      comentario.id,
      async () => {
        return await deleteComentario(comentario.id, {
          profissionalId
        })
      },
      'Comentário deletado com sucesso!'
    )
  }

  async function handleToggleVisibility() {
    setIsTogglingVisibility(true)
    try {
      const result = await toggleComentarioVisibilidade(comentario.id, {
        profissionalId
      })

      if (result.success) {
        notifySuccess({
          message: `Comentário ${comentario.visivel ? 'ocultado' : 'exibido'} com sucesso!`
        })
      } else {
        notifyError({
          message:
            result.error || 'Erro ao alterar visibilidade. Tente novamente.'
        })
      }
    } catch (error) {
      notifyError({
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao alterar visibilidade. Tente novamente.'
      })
    } finally {
      setIsTogglingVisibility(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Abrir menu de ações para comentário de ${comentario.autor.nome}`}
          >
            <MoreHorizontalIcon aria-hidden="true" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleToggleVisibility}
            disabled={isTogglingVisibility}
            aria-label={`${comentario.visivel ? 'Ocultar' : 'Exibir'} comentário`}
          >
            {comentario.visivel ? (
              <>
                <EyeOffIcon aria-hidden="true" />
                Ocultar
              </>
            ) : (
              <>
                <EyeIcon aria-hidden="true" />
                Exibir
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar comentário de ${comentario.autor.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <ComentarioDeletarModal
          comentario={comentario}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
