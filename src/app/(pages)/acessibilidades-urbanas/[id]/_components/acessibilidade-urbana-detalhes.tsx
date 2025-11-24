'use client'

import { deleteAcessibilidadeUrbana } from '@/app/_actions/acessibilidadeUrbanaActions'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { AcessibilidadeUrbanaResponseDTO } from '@/app/_dtos/response'
import {
  getAcessibilidadeUrbanaCategoriaBadgeColor,
  getAcessibilidadeUrbanaCategoriaLabel,
  getAcessibilidadeUrbanaSimboloBadgeColor,
  getAcessibilidadeUrbanaSimboloLabel,
  type AcessibilidadeUrbanaCategoria,
  type AcessibilidadeUrbanaSimbolo
} from '@/app/_enums/acessibilidadeUrbanaEnums'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { formatCEP, formatTelefone } from '@/app/_utils/formatUtils'
import {
  AccessibilityIcon,
  CalendarIcon,
  EditIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Trash2Icon,
  Undo2Icon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AcessibilidadeUrbanaDeletarModal } from '../../_components/acessibilidade-urbana-deletar-modal'

interface AcessibilidadeUrbanaDetalhesProps {
  acessibilidadeUrbana: AcessibilidadeUrbanaResponseDTO
}

export function AcessibilidadeUrbanaDetalhes({
  acessibilidadeUrbana
}: AcessibilidadeUrbanaDetalhesProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      acessibilidadeUrbana.id,
      async () => {
        const result = await deleteAcessibilidadeUrbana(acessibilidadeUrbana.id)
        if (result.success) {
          router.replace(APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR())
        }
        return result
      },
      `Acessibilidade urbana deletada com sucesso!`
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{acessibilidadeUrbana.nome}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={getAcessibilidadeUrbanaCategoriaBadgeColor(
                acessibilidadeUrbana.categoria as AcessibilidadeUrbanaCategoria
              )}
            >
              {getAcessibilidadeUrbanaCategoriaLabel(
                acessibilidadeUrbana.categoria as AcessibilidadeUrbanaCategoria
              )}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={APP_ROUTES.ACESSIBILIDADE_URBANA_EDITAR(
                acessibilidadeUrbana.id
              )}
              aria-label={`Editar ${acessibilidadeUrbana.nome}`}
            >
              <EditIcon aria-hidden="true" />
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar ${acessibilidadeUrbana.nome}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {acessibilidadeUrbana.logo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AccessibilityIcon className="size-5" aria-hidden="true" />
                Logo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-md">
                <Image
                  src={acessibilidadeUrbana.logo.url}
                  alt={`Logo de ${acessibilidadeUrbana.nome}`}
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

        <Card className={acessibilidadeUrbana.logo ? '' : 'md:col-span-2'}>
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
                <p className="font-medium">{acessibilidadeUrbana.email}</p>
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
                  {formatTelefone(acessibilidadeUrbana.telefone)}
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
                    new Date(acessibilidadeUrbana.criadoEm).toISOString()
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {acessibilidadeUrbana.endereco && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="size-5" aria-hidden="true" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                {acessibilidadeUrbana.endereco.logradouro},{' '}
                {acessibilidadeUrbana.endereco.numero}
                {acessibilidadeUrbana.endereco.complemento &&
                  ` - ${acessibilidadeUrbana.endereco.complemento}`}
              </p>
              <p>
                {acessibilidadeUrbana.endereco.bairro},{' '}
                {acessibilidadeUrbana.endereco.cidade} -{' '}
                {acessibilidadeUrbana.endereco.estado}
              </p>
              <p>CEP: {formatCEP(acessibilidadeUrbana.endereco.cep)}</p>
              <p>{acessibilidadeUrbana.endereco.pais}</p>
            </CardContent>
          </Card>
        )}

        {acessibilidadeUrbana.recursos &&
          acessibilidadeUrbana.recursos.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AccessibilityIcon className="size-5" aria-hidden="true" />
                  Recursos de Acessibilidade (
                  {acessibilidadeUrbana.recursos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {acessibilidadeUrbana.recursos.map((recurso) => (
                    <Card key={recurso.id} className="overflow-hidden">
                      <div className="space-y-2 p-4">
                        <Badge
                          className={`${getAcessibilidadeUrbanaSimboloBadgeColor(
                            recurso.simbolo as AcessibilidadeUrbanaSimbolo
                          )} w-fit`}
                        >
                          {getAcessibilidadeUrbanaSimboloLabel(
                            recurso.simbolo as AcessibilidadeUrbanaSimbolo
                          )}
                        </Badge>
                        {recurso.descricao && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {recurso.descricao}
                          </p>
                        )}
                        {!recurso.descricao && (
                          <p className="text-muted-foreground text-xs italic">
                            Sem descrição adicional
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {acessibilidadeUrbana.fotos &&
          acessibilidadeUrbana.fotos.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Fotos do Estabelecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {acessibilidadeUrbana.fotos.map((foto) => (
                    <div
                      key={foto.id}
                      className="relative aspect-square overflow-hidden rounded-md"
                    >
                      <Image
                        src={foto.url}
                        alt={`Foto de ${acessibilidadeUrbana.nome}`}
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
            href={APP_ROUTES.ACESSIBILIDADE_URBANA_LISTAR()}
            aria-label="Voltar para lista de acessibilidades urbanas"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

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
