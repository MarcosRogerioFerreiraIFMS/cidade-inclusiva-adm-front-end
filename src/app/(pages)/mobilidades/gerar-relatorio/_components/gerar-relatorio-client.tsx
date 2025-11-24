'use client'

import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import { useMobilidadeRelatorio } from '@/app/_hooks/useMobilidadeRelatorio'
import { RelatorioFiltros } from './relatorio-filtros'
import { RelatorioPreview } from './relatorio-preview'

interface GerarRelatorioClientProps {
  mobilidades: MobilidadeResponseDTO[]
}

export function GerarRelatorioClient({
  mobilidades
}: GerarRelatorioClientProps) {
  const { filters, setFilters, mobilidadesFiltradas, totalMobilidades } =
    useMobilidadeRelatorio(mobilidades)

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">
          Gerar Relatório de Ocorrências de Mobilidade
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure os filtros e visualize o preview do relatório em PDF antes
          de baixar
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RelatorioFiltros
            filters={filters}
            onFiltersChange={setFilters}
            totalFiltradas={mobilidadesFiltradas.length}
            totalMobilidades={totalMobilidades}
          />
        </div>

        <div className="space-y-6">
          <RelatorioPreview
            mobilidades={mobilidadesFiltradas}
            filters={filters}
          />
        </div>
      </div>
    </LayoutDashboard>
  )
}
