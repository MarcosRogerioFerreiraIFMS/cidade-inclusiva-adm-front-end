'use client'

import { deleteAcessibilidadeUrbana } from '@/app/_actions/acessibilidadeUrbanaActions'
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
import type { AcessibilidadeUrbanaResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Link from 'next/link'
import { AcessibilidadeUrbanaDeletarModal } from './acessibilidade-urbana-deletar-modal'

interface AcessibilidadeUrbanaTableActionsMenuProps {
  acessibilidadeUrbana: AcessibilidadeUrbanaResponseDTO
}

export function AcessibilidadeUrbanaTableActionsMenu({
  acessibilidadeUrbana
}: AcessibilidadeUrbanaTableActionsMenuProps) {
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      acessibilidadeUrbana.id,
      async () => {
        return await deleteAcessibilidadeUrbana(acessibilidadeUrbana.id)
      },
      'Acessibilidade urbana deletada com sucesso!'
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={`Abrir menu de ações para ${acessibilidadeUrbana.nome}`}
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
              href={APP_ROUTES.ACESSIBILIDADE_URBANA_DETALHE(
                acessibilidadeUrbana.id
              )}
              aria-label={`Visualizar ${acessibilidadeUrbana.nome}`}
            >
              <EyeIcon aria-hidden="true" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={APP_ROUTES.ACESSIBILIDADE_URBANA_EDITAR(
                acessibilidadeUrbana.id
              )}
              aria-label={`Editar ${acessibilidadeUrbana.nome}`}
            >
              <PencilIcon aria-hidden="true" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar ${acessibilidadeUrbana.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <AcessibilidadeUrbanaDeletarModal
          acessibilidadeUrbana={acessibilidadeUrbana}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
