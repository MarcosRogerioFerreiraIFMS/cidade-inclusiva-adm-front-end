'use client'

import { deleteManutencao } from '@/app/_actions/manutencaoActions'
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
import type { ManutencaoResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Link from 'next/link'
import { ManutencaoDeletarModal } from './manutencao-deletar-modal'

interface ManutencaoTableActionsMenuProps {
  manutencao: ManutencaoResponseDTO
}

export function ManutencaoTableActionsMenu({
  manutencao
}: ManutencaoTableActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      manutencao.id,
      async () => {
        return await deleteManutencao(manutencao.id)
      },
      'Oficina de manutenção deletada com sucesso!'
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={`Abrir menu de ações para ${manutencao.nome}`}
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
              href={APP_ROUTES.MANUTENCAO_DETALHE(manutencao.id)}
              aria-label={`Visualizar oficina ${manutencao.nome}`}
            >
              <EyeIcon aria-hidden="true" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={APP_ROUTES.MANUTENCAO_EDITAR(manutencao.id)}
              aria-label={`Editar oficina ${manutencao.nome}`}
            >
              <PencilIcon aria-hidden="true" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar oficina ${manutencao.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <ManutencaoDeletarModal
          manutencao={manutencao}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
