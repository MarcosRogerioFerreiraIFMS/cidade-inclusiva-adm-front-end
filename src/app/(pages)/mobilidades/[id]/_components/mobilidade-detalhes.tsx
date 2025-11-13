'use client'

import { AvatarCell } from '@/app/_components/cells'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import {
  getMobilidadeStatusBadgeVariant,
  getMobilidadeStatusLabel
} from '@/app/_enums/mobilidadeEnums'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { CalendarIcon, MapPinIcon, TextIcon, Undo2Icon } from 'lucide-react'
import Link from 'next/link'

interface MobilidadeDetalhesProps {
  mobilidade: MobilidadeResponseDTO
}

export function MobilidadeDetalhes({ mobilidade }: MobilidadeDetalhesProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Detalhes da Mobilidade</h1>
          <Badge variant={getMobilidadeStatusBadgeVariant(mobilidade.status)}>
            {getMobilidadeStatusLabel(mobilidade.status)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TextIcon className="size-5" aria-hidden="true" />
              Descrição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{mobilidade.descricao}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="size-5" aria-hidden="true" />
              Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-muted-foreground mt-0.5 flex size-5 items-center justify-center">
                <span className="text-xs font-bold">Lat</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Latitude
                </p>
                <p className="font-medium">{mobilidade.latitude.toFixed(6)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-muted-foreground mt-0.5 flex size-5 items-center justify-center">
                <span className="text-xs font-bold">Lng</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Longitude
                </p>
                <p className="font-medium">{mobilidade.longitude.toFixed(6)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CalendarIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Data de Registro
                </p>
                <p className="font-medium">
                  {formatDateToDateString(mobilidade.dataRegistro.toString())}
                </p>
              </div>
            </div>

            {mobilidade.usuario && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-1">
                  <p className="text-muted-foreground mb-2 text-sm font-medium">
                    Usuário
                  </p>
                  <AvatarCell
                    entity={mobilidade.usuario}
                    enableNavigation={true}
                    getDetailRoute={APP_ROUTES.USUARIO_DETALHE}
                  />
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <CalendarIcon
                className="text-muted-foreground mt-0.5 size-5"
                aria-hidden="true"
              />
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Criado em
                </p>
                <p className="font-medium">
                  {formatDateToDateString(mobilidade.criadoEm.toString())}
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
                  Atualizado em
                </p>
                <p className="font-medium">
                  {formatDateToDateString(mobilidade.atualizadoEm.toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="outline" asChild>
          <Link
            href={APP_ROUTES.MOBILIDADE_LISTAR()}
            aria-label="Voltar para lista de mobilidades"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>
    </>
  )
}
