'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import {
  getMobilidadeStatusLabel,
  type MobilidadeStatus
} from '@/app/_enums/mobilidadeEnums'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

interface MobilidadeListPanelProps {
  mobilidades: MobilidadeResponseDTO[]
  onMobilidadeSelect: (id: string) => void
  selectedId?: string
  selectedFilters?: Set<MobilidadeStatus>
}

const STATUS_COLORS: Record<MobilidadeStatus, string> = {
  PENDENTE: 'bg-red-500',
  EM_ANDAMENTO: 'bg-blue-500',
  CONCLUIDO: 'bg-green-500',
  CANCELADO: 'bg-gray-500'
}

export function MobilidadeListPanel({
  mobilidades,
  onMobilidadeSelect,
  selectedId,
  selectedFilters
}: MobilidadeListPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Filtra mobilidades baseado nos filtros selecionados
  const mobilidadesFiltradas = useMemo(() => {
    if (!selectedFilters) {
      return mobilidades
    }
    return mobilidades.filter((m) => selectedFilters.has(m.status))
  }, [mobilidades, selectedFilters])

  return (
    <>
      {/* Painel lateral */}
      <div
        className={`bg-background fixed top-0 left-0 z-20 h-full transform shadow-2xl transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 ${isCollapsed ? 'md:w-14' : 'w-80'}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-5" aria-hidden="true" />
                <h2 className="font-semibold">Ocorrências</h2>
                <Badge variant="secondary">{mobilidadesFiltradas.length}</Badge>
              </div>
            )}

            <div className="flex items-center gap-1">
              {/* Botão de recolher */}
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="ghost"
                className="hidden size-8 p-0 md:flex"
                title={isCollapsed ? 'Expandir lista' : 'Recolher lista'}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="size-4" />
                ) : (
                  <ChevronLeftIcon className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Lista expandida */}
          {!isCollapsed && (
            <div className="flex-1 overflow-y-auto p-2">
              {mobilidadesFiltradas.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <MapPinIcon className="text-muted-foreground size-12" />
                  <p className="text-muted-foreground text-sm">
                    {selectedFilters && selectedFilters.size > 0
                      ? 'Nenhuma ocorrência com os filtros selecionados'
                      : 'Nenhuma ocorrência encontrada'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mobilidadesFiltradas.map((mobilidade) => (
                    <Card
                      key={mobilidade.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedId === mobilidade.id
                          ? 'ring-primary ring-2'
                          : ''
                      }`}
                      onClick={() => {
                        onMobilidadeSelect(mobilidade.id)
                        setIsOpen(false)
                      }}
                    >
                      <div className="p-3">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-2 rounded-full ${STATUS_COLORS[mobilidade.status]}`}
                            />
                            <span className="text-xs font-medium">
                              {getMobilidadeStatusLabel(mobilidade.status)}
                            </span>
                          </div>
                          <ChevronRightIcon className="text-muted-foreground size-4" />
                        </div>

                        <p className="mb-2 line-clamp-2 text-sm">
                          {mobilidade.descricao}
                        </p>

                        <div className="text-muted-foreground flex items-center justify-between text-xs">
                          <span>
                            {formatDateToDateString(
                              mobilidade.dataRegistro.toString()
                            )}
                          </span>
                          {mobilidade.usuario && (
                            <span className="truncate">
                              {mobilidade.usuario.nome}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Lista recolhida - apenas ícones */}
          {isCollapsed && (
            <div className="flex-1 overflow-y-auto py-3">
              <div className="flex flex-col items-center gap-2">
                {mobilidadesFiltradas.map((mobilidade) => (
                  <Button
                    key={mobilidade.id}
                    onClick={() => {
                      onMobilidadeSelect(mobilidade.id)
                    }}
                    size="icon"
                    variant={selectedId === mobilidade.id ? 'default' : 'ghost'}
                    className="size-10"
                    title={mobilidade.descricao}
                  >
                    <div
                      className={`size-3 rounded-full ${STATUS_COLORS[mobilidade.status]}`}
                    />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
