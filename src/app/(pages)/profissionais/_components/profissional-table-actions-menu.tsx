'use client'

import { deleteProfissional } from '@/app/_actions/profissionalActions'
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
import type { ProfissionalResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Link from 'next/link'
import { ProfissionalDeletarModal } from './profissional-deletar-modal'

interface ProfissionalTableActionsMenuProps {
  profissional: ProfissionalResponseDTO
}

export function ProfissionalTableActionsMenu({
  profissional
}: ProfissionalTableActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      profissional.id,
      async () => {
        return await deleteProfissional(profissional.id)
      },
      'Profissional deletado com sucesso!'
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Abrir menu de ações para ${profissional.nome}`}
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
              href={APP_ROUTES.PROFISSIONAL_DETALHE(profissional.id)}
              aria-label={`Visualizar profissional ${profissional.nome}`}
            >
              <EyeIcon aria-hidden="true" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={APP_ROUTES.PROFISSIONAL_EDITAR(profissional.id)}
              aria-label={`Editar profissional ${profissional.nome}`}
            >
              <PencilIcon aria-hidden="true" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar profissional ${profissional.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <ProfissionalDeletarModal
          profissional={profissional}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
