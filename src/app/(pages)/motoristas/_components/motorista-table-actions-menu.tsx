'use client'

import { deleteMotorista } from '@/app/_actions/motoristaActions'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MotoristaResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Link from 'next/link'
import { MotoristaDeletarModal } from './motorista-deletar-modal'

interface MotoristaTableActionsMenuProps {
  motorista: MotoristaResponseDTO
}

export function MotoristaTableActionsMenu({
  motorista
}: MotoristaTableActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      motorista.id,
      async () => {
        return await deleteMotorista(motorista.id)
      },
      'Motorista deletado com sucesso!'
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={`Abrir menu de ações para ${motorista.nome}`}
          >
            <MoreHorizontalIcon aria-hidden="true" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={APP_ROUTES.MOTORISTA_DETALHE(motorista.id)}
              aria-label={`Visualizar motorista ${motorista.nome}`}
            >
              <EyeIcon aria-hidden="true" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={APP_ROUTES.MOTORISTA_EDITAR(motorista.id)}
              aria-label={`Editar motorista ${motorista.nome}`}
            >
              <PencilIcon aria-hidden="true" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar motorista ${motorista.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <MotoristaDeletarModal
          motorista={motorista}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
