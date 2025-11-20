'use client'

import { deleteMotorista } from '@/app/_actions/motoristaActions'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MotoristaResponseDTO } from '@/app/_dtos/response'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { formatTelefone } from '@/app/_utils/formatUtils'
import {
  CalendarIcon,
  EditIcon,
  MailIcon,
  PhoneIcon,
  Trash2Icon,
  Undo2Icon,
  UserIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MotoristaDeletarModal } from '../../_components/motorista-deletar-modal'

interface MotoristaDetalhesProps {
  motorista: MotoristaResponseDTO
}

export function MotoristaDetalhes({ motorista }: MotoristaDetalhesProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      motorista.id,
      async () => {
        const result = await deleteMotorista(motorista.id)
        if (result.success) {
          router.replace(APP_ROUTES.MOTORISTA_LISTAR())
        }
        return result
      },
      `Motorista deletado com sucesso!`
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{motorista.nome}</h1>
          <p className="text-muted-foreground">Motorista</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={APP_ROUTES.MOTORISTA_EDITAR(motorista.id)}
              aria-label={`Editar motorista ${motorista.nome}`}
            >
              <EditIcon aria-hidden="true" />
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar motorista ${motorista.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {motorista.foto && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="size-5" aria-hidden="true" />
                Foto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={motorista.foto.url}
                  alt={`Foto de ${motorista.nome}`}
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

        <Card className={motorista.foto ? '' : 'md:col-span-2'}>
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
                <p className="font-medium">{motorista.email}</p>
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
                  {formatTelefone(motorista.telefone)}
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
                  Data de Cadastro
                </p>
                <p className="font-medium">
                  {formatDateToDateString(
                    new Date(motorista.criadoEm).toISOString()
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="outline" asChild>
          <Link
            href={APP_ROUTES.MOTORISTA_LISTAR()}
            aria-label="Voltar para lista de motoristas"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

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
