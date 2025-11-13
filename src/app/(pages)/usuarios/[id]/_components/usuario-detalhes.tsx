'use client'

import { deleteUsuario } from '@/app/_actions/usuarioActions'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { UsuarioResponseDTO } from '@/app/_dtos/response'
import {
  getTipoUsuarioBadgeVariant,
  getTipoUsuarioLabel,
  isAdmin
} from '@/app/_enums/tipoUsuarioEnum'
import { useAuth } from '@/app/_hooks/useAuth'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { formatCEP, formatTelefone } from '@/app/_utils/formatUtils'
import {
  CalendarIcon,
  EditIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Trash2Icon,
  Undo2Icon,
  UserIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UsuarioDeletarModal } from '../../_components/usuario-deletar-modal'

interface UsuarioDetalhesProps {
  usuario: UsuarioResponseDTO
}

export function UsuarioDetalhes({ usuario }: UsuarioDetalhesProps) {
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      usuario.id,
      async () => {
        const result = await deleteUsuario(usuario.id)
        if (result.success) {
          router.replace(APP_ROUTES.USUARIO_LISTAR())
        }
        return result
      },
      `Usuário deletado com sucesso!`
    )
  }

  const isCurrentUser = currentUser?.id === usuario.id
  const canEditOrDelete = !isAdmin(usuario.tipo) && !isCurrentUser
  const editRoute = isCurrentUser
    ? APP_ROUTES.PERFIL
    : APP_ROUTES.USUARIO_EDITAR(usuario.id)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{usuario.nome}</h1>
          <Badge variant={getTipoUsuarioBadgeVariant(usuario.tipo)}>
            {getTipoUsuarioLabel(usuario.tipo)}
          </Badge>
        </div>
        {canEditOrDelete && (
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link
                href={editRoute}
                aria-label={`Editar usuário ${usuario.nome}`}
              >
                <EditIcon aria-hidden="true" />
                Editar
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              aria-label={`Deletar usuário ${usuario.nome}`}
            >
              <Trash2Icon aria-hidden="true" />
              Deletar
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {usuario.foto && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="size-5" aria-hidden="true" />
                Foto de Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={usuario.foto.url}
                  alt={`Foto de perfil de ${usuario.nome}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={usuario.foto ? '' : 'md:col-span-2'}>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MailIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  E-mail
                </p>
                <p className="font-medium">{usuario.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PhoneIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Telefone
                </p>
                <p className="font-medium">
                  {formatTelefone(usuario.telefone)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Cadastrado em
                </p>
                <p className="font-medium">
                  {formatDateToDateString(usuario.criadoEm.toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {usuario.endereco && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="size-5" aria-hidden="true" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">
                  {usuario.endereco.logradouro}, {usuario.endereco.numero}
                  {usuario.endereco.complemento &&
                    ` - ${usuario.endereco.complemento}`}
                </p>
                <p className="text-muted-foreground">
                  {usuario.endereco.bairro} - {usuario.endereco.cidade},{' '}
                  {usuario.endereco.estado}
                </p>
                <p className="text-muted-foreground">
                  CEP: {formatCEP(usuario.endereco.cep)}
                </p>
                <p className="text-muted-foreground">{usuario.endereco.pais}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="outline" asChild>
          <Link
            href={APP_ROUTES.USUARIO_LISTAR()}
            aria-label="Voltar para lista de usuários"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

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
