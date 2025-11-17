'use client'

import { deleteUsuario } from '@/app/_actions/usuarioActions'
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
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import { isAdmin } from '@/app/_enums/tipoUsuarioEnum'
import { useAuth } from '@/app/_hooks/useAuth'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import {
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Link from 'next/link'
import { UsuarioDeletarModal } from './usuario-deletar-modal'

interface UsuarioTableActionsMenuProps {
  usuario: UsuarioResponseDTO
}

export function UsuarioTableActionsMenu({
  usuario
}: UsuarioTableActionsMenuProps) {
  const { user: currentUser } = useAuth()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  function handleDelete() {
    openModal(
      usuario.id,
      async () => {
        return await deleteUsuario(usuario.id)
      },
      'Usuário deletado com sucesso!'
    )
  }

  const isCurrentUser = currentUser?.id === usuario.id
  const canEditOrDelete = !isAdmin(usuario.tipo) && !isCurrentUser
  const editRoute = isCurrentUser
    ? APP_ROUTES.PERFIL
    : APP_ROUTES.USUARIO_EDITAR(usuario.id)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={`Abrir menu de ações para ${usuario.nome}`}
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
              href={APP_ROUTES.USUARIO_DETALHE(usuario.id)}
              aria-label={`Visualizar usuário ${usuario.nome}`}
            >
              <EyeIcon aria-hidden="true" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          {canEditOrDelete && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={editRoute}
                  aria-label={`Editar usuário ${usuario.nome}`}
                >
                  <PencilIcon aria-hidden="true" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={handleDelete}
                aria-label={`Deletar usuário ${usuario.nome}`}
              >
                <Trash2Icon aria-hidden="true" />
                Deletar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <UsuarioDeletarModal
          usuario={usuario}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
