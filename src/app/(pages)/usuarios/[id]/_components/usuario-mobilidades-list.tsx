'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/app/_components/ui/collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/app/_components/ui/tooltip'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import {
  getMobilidadeStatusBadgeVariant,
  getMobilidadeStatusLabel
} from '@/app/_enums/mobilidadeEnums'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  NavigationIcon
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface UsuarioMobilidadesListProps {
  mobilidades: MobilidadeResponseDTO[]
}

export function UsuarioMobilidadesList({
  mobilidades
}: UsuarioMobilidadesListProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (mobilidades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <NavigationIcon className="size-5" aria-hidden="true" />
            Mobilidades
          </CardTitle>
          <CardDescription>
            Este usuário ainda não possui registros de mobilidade.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CollapsibleTrigger className="w-full cursor-pointer">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <NavigationIcon className="size-5" aria-hidden="true" />
                Mobilidades
                <Badge variant="secondary">{mobilidades.length}</Badge>
              </CardTitle>
              {isOpen ? (
                <ChevronUpIcon className="size-5" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="size-5" aria-hidden="true" />
              )}
            </div>
          </CollapsibleTrigger>
          <CardDescription>
            Registros de mobilidade reportados por este usuário
          </CardDescription>
        </CardHeader>
        <CollapsibleContent>
          <div className="space-y-4 px-6 pb-6">
            {mobilidades.map((mobilidade) => (
              <div
                key={mobilidade.id}
                className="border-border rounded-lg border p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={getMobilidadeStatusBadgeVariant(
                          mobilidade.status
                        )}
                      >
                        {getMobilidadeStatusLabel(mobilidade.status)}
                      </Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-6 px-2 text-xs"
                            asChild
                          >
                            <Link
                              href={APP_ROUTES.MOBILIDADE_DETALHE(
                                mobilidade.id
                              )}
                              aria-label="Ver detalhes da mobilidade"
                            >
                              <ArrowRightIcon
                                className="size-3"
                                aria-hidden="true"
                              />
                              Ver detalhes
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Ver página completa da mobilidade
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                        {mobilidade.descricao}
                      </p>

                      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="size-3" aria-hidden="true" />
                          Lat: {mobilidade.latitude.toFixed(6)}, Long:{' '}
                          {mobilidade.longitude.toFixed(6)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3" aria-hidden="true" />
                          Registrado em{' '}
                          {formatDateToDateString(
                            mobilidade.dataRegistro.toString()
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
