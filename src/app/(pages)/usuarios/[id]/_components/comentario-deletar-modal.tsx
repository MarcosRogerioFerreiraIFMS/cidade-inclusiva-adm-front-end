'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import type { ComentarioResponseDTO } from '@/app/_dtos/response'
import { Trash2Icon } from 'lucide-react'

interface ComentarioDeletarModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
  comentario: ComentarioResponseDTO
}

export function ComentarioDeletarModal({
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false,
  comentario
}: ComentarioDeletarModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onCancel()
    }
  }

  const conteudoPreview =
    comentario.conteudo.length > 100
      ? `${comentario.conteudo.substring(0, 100)}...`
      : comentario.conteudo

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar o comentário de &quot;
            {comentario.autor.nome}&quot;? Esta ação não pode ser desfeita.
            <br />
            <br />
            <span className="text-foreground italic">
              &quot;{conteudoPreview}&quot;
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
          >
            <Trash2Icon />
            {isLoading ? 'Deletando...' : 'Deletar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
