'use client'

import { deleteProfissional } from '@/app/_actions/profissionalActions'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { ProfissionalResponseDTO } from '@/app/_dtos/response'
import {
  getProfissionalEspecialidadeBadgeColor,
  getProfissionalEspecialidadeLabel
} from '@/app/_enums/profissionalEnums'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { formatTelefone } from '@/app/_utils/formatUtils'
import {
  BriefcaseIcon,
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
import { ProfissionalDeletarModal } from '../../_components/profissional-deletar-modal'

interface ProfissionalDetalhesProps {
  profissional: ProfissionalResponseDTO
}

export function ProfissionalDetalhes({
  profissional
}: ProfissionalDetalhesProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      profissional.id,
      async () => {
        const result = await deleteProfissional(profissional.id)
        if (result.success) {
          router.replace(APP_ROUTES.PROFISSIONAL_LISTAR())
        }
        return result
      },
      'Profissional deletado com sucesso!'
    )
  }

  const especialidadeDisplay = getProfissionalEspecialidadeLabel(
    profissional.especialidade
  )

  const especialidadeColorClasses = getProfissionalEspecialidadeBadgeColor(
    profissional.especialidade
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{profissional.nome}</h1>
          <Badge className={especialidadeColorClasses}>
            {especialidadeDisplay}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={APP_ROUTES.PROFISSIONAL_EDITAR(profissional.id)}
              aria-label={`Editar profissional ${profissional.nome}`}
            >
              <EditIcon aria-hidden="true" />
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar profissional ${profissional.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {profissional.foto && (
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
                  src={profissional.foto.url}
                  alt={`Foto de perfil de ${profissional.nome}`}
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

        <Card className={profissional.foto ? '' : 'md:col-span-2'}>
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
                <p className="font-medium">{profissional.email}</p>
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
                  {formatTelefone(profissional.telefone)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BriefcaseIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Especialidade
                </p>
                <p className="font-medium">{especialidadeDisplay}</p>
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
                  {formatDateToDateString(profissional.criadoEm.toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="outline" asChild>
          <Link
            href={APP_ROUTES.PROFISSIONAL_LISTAR()}
            aria-label="Voltar para lista de profissionais"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

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
