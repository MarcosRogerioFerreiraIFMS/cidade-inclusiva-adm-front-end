'use client'

import { deleteManutencao } from '@/app/_actions/manutencaoActions'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { ManutencaoResponseDTO } from '@/app/_dtos/response'
import {
  getManutencaoEspecialidadeBadgeColor,
  getManutencaoEspecialidadeLabel,
  type ManutencaoEspecialidade
} from '@/app/_enums/manutencaoEnums'
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
  WrenchIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ManutencaoDeletarModal } from '../../_components/manutencao-deletar-modal'

interface ManutencaoDetalhesProps {
  manutencao: ManutencaoResponseDTO
}

export function ManutencaoDetalhes({ manutencao }: ManutencaoDetalhesProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      manutencao.id,
      async () => {
        const result = await deleteManutencao(manutencao.id)
        if (result.success) {
          router.replace(APP_ROUTES.MANUTENCAO_LISTAR())
        }
        return result
      },
      `Oficina de manutenção deletada com sucesso!`
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{manutencao.nome}</h1>
          <div className="flex flex-wrap gap-2">
            {manutencao.especialidades.map((esp) => (
              <Badge
                key={esp.id}
                className={getManutencaoEspecialidadeBadgeColor(
                  esp.tipo as ManutencaoEspecialidade
                )}
              >
                {getManutencaoEspecialidadeLabel(
                  esp.tipo as ManutencaoEspecialidade
                )}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={APP_ROUTES.MANUTENCAO_EDITAR(manutencao.id)}
              aria-label={`Editar oficina ${manutencao.nome}`}
            >
              <EditIcon aria-hidden="true" />
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar oficina ${manutencao.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {manutencao.logo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WrenchIcon className="size-5" aria-hidden="true" />
                Logo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={manutencao.logo.url}
                  alt={`Logo de ${manutencao.nome}`}
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

        <Card className={manutencao.logo ? '' : 'md:col-span-2'}>
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
                <p className="font-medium">{manutencao.email}</p>
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
                  {formatTelefone(manutencao.telefone)}
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
                    new Date(manutencao.criadoEm).toISOString()
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {manutencao.endereco && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="size-5" aria-hidden="true" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                {manutencao.endereco.logradouro}, {manutencao.endereco.numero}
                {manutencao.endereco.complemento &&
                  ` - ${manutencao.endereco.complemento}`}
              </p>
              <p>
                {manutencao.endereco.bairro}, {manutencao.endereco.cidade} -{' '}
                {manutencao.endereco.estado}
              </p>
              <p>CEP: {formatCEP(manutencao.endereco.cep)}</p>
              <p>{manutencao.endereco.pais}</p>
            </CardContent>
          </Card>
        )}

        {manutencao.fotos && manutencao.fotos.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Fotos da Oficina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {manutencao.fotos.map((foto) => (
                  <div
                    key={foto.id}
                    className="relative aspect-square overflow-hidden rounded-md"
                  >
                    <Image
                      src={foto.url}
                      alt={`Foto da oficina ${manutencao.nome}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="outline" asChild>
          <Link
            href={APP_ROUTES.MANUTENCAO_LISTAR()}
            aria-label="Voltar para lista de oficinas"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

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
