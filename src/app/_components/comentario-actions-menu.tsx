'use client'

import { toggleComentarioVisibilidade } from '@/app/_actions/comentarioActions'
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
import { useNotification } from '@/app/_hooks/useNotification'
import { EyeIcon, EyeOffIcon, MoreHorizontalIcon } from 'lucide-react'
import { useState } from 'react'

interface ComentarioActionsMenuProps {
  comentario: ComentarioResponseDTO
  revalidationContext?: Record<string, string>
}

export function ComentarioActionsMenu({
  comentario,
  revalidationContext = {}
}: ComentarioActionsMenuProps) {
  const { notifySuccess, notifyError } = useNotification()
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false)

  async function handleToggleVisibility() {
    setIsTogglingVisibility(true)
    try {
      const result = await toggleComentarioVisibilidade(
        comentario.id,
        revalidationContext
      )

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
              <span>Ocultar</span>
            </>
          ) : (
            <>
              <EyeIcon aria-hidden="true" />
              <span>Exibir</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
