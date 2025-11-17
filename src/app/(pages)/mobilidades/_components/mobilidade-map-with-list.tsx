'use client'

import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import type { MobilidadeStatus } from '@/app/_enums/mobilidadeEnums'
import { useState } from 'react'
import { MapErrorBoundary } from './map-error-boundary'
import { MobilidadeListPanel } from './mobilidade-list-panel'
import { MobilidadeMap } from './mobilidade-map'

interface MobilidadeMapWithListProps {
  mobilidades: MobilidadeResponseDTO[]
  apiKey: string
  initialSelectedId?: string
}

export function MobilidadeMapWithList({
  mobilidades,
  apiKey,
  initialSelectedId
}: MobilidadeMapWithListProps) {
  // Usa initialSelectedId diretamente no estado inicial
  const [selectedMobilidadeId, setSelectedMobilidadeId] = useState<
    string | undefined
  >(initialSelectedId)

  // Estado compartilhado dos filtros
  const [selectedFilters, setSelectedFilters] = useState<Set<MobilidadeStatus>>(
    new Set(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'])
  )

  return (
    <div className="flex h-full">
      {/* Painel lateral - sempre presente mas pode estar recolhido ou oculto */}
      <MobilidadeListPanel
        mobilidades={mobilidades}
        onMobilidadeSelect={setSelectedMobilidadeId}
        selectedId={selectedMobilidadeId}
        selectedFilters={selectedFilters}
      />

      {/* Mapa ocupa o restante do espaço */}
      <div className="flex-1">
        <MapErrorBoundary>
          <MobilidadeMap
            mobilidades={mobilidades}
            apiKey={apiKey}
            selectedMobilidadeId={selectedMobilidadeId}
            onMarkerClick={setSelectedMobilidadeId}
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />
        </MapErrorBoundary>
      </div>
    </div>
  )
}
