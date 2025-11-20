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
import type { MotoristaResponseDTO } from '@/app/_dtos/response'
import { Trash2Icon } from 'lucide-react'

interface DeletarMotoristaModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
  motorista: MotoristaResponseDTO
}

export function MotoristaDeletarModal({
  isOpen,
  onCancel,
  onConfirm,
  isLoading = false,
  motorista
}: DeletarMotoristaModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open && !isLoading) {
      onCancel()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar o motorista &quot;{motorista.nome}
            &quot;? Esta ação não pode ser desfeita.
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
