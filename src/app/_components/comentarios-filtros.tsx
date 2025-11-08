'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/_components/ui/select'
import type {
  FiltroVisibilidade,
  OrdemData,
  OrdemNota
} from '@/app/_hooks/useComentarioFilters'
import {
  ArrowDownAZIcon,
  CalendarIcon,
  EyeIcon,
  FilterIcon,
  FilterXIcon,
  StarIcon
} from 'lucide-react'
import { Label } from './ui/label'

interface ComentariosFiltrosProps {
  visibilidade: FiltroVisibilidade
  notaMinima: number | null
  ordemNota: OrdemNota
  ordemData: OrdemData
  onVisibilidadeChange: (value: FiltroVisibilidade) => void
  onNotaMinimaChange: (value: number | null) => void
  onOrdemNotaChange: (value: OrdemNota) => void
  onOrdemDataChange: (value: OrdemData) => void
  onLimparFiltros: () => void
  temFiltrosAtivos: boolean
  contadorFiltrosAtivos: number
  totalComentarios: number
  totalFiltrados: number
}

export function ComentariosFiltros({
  visibilidade,
  notaMinima,
  ordemNota,
  ordemData,
  onVisibilidadeChange,
  onNotaMinimaChange,
  onOrdemNotaChange,
  onOrdemDataChange,
  onLimparFiltros,
  temFiltrosAtivos,
  contadorFiltrosAtivos,
  totalComentarios,
  totalFiltrados
}: ComentariosFiltrosProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FilterIcon className="size-5" aria-hidden="true" />
          <h3 className="font-semibold">Filtros</h3>
          {temFiltrosAtivos && (
            <Badge variant="secondary">
              {contadorFiltrosAtivos}{' '}
              {contadorFiltrosAtivos === 1 ? 'filtro' : 'filtros'} ativo
              {contadorFiltrosAtivos !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        {temFiltrosAtivos && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLimparFiltros}
            aria-label="Limpar todos os filtros"
          >
            <FilterXIcon aria-hidden="true" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Filtro de Visibilidade */}
        <div className="space-y-2">
          <Label
            htmlFor="filtro-visibilidade"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <EyeIcon className="size-4" aria-hidden="true" />
            Visibilidade
          </Label>
          <Select value={visibilidade} onValueChange={onVisibilidadeChange}>
            <SelectTrigger
              id="filtro-visibilidade"
              className="w-full"
              aria-label="Filtrar por visibilidade"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="visiveis">Visíveis</SelectItem>
              <SelectItem value="ocultos">Ocultos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Nota Mínima */}
        <div className="space-y-2">
          <Label
            htmlFor="filtro-nota-minima"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <StarIcon className="size-4" aria-hidden="true" />
            Nota Mínima
          </Label>
          <Select
            value={notaMinima?.toString() ?? 'todas'}
            onValueChange={(value) =>
              onNotaMinimaChange(value === 'todas' ? null : parseInt(value))
            }
          >
            <SelectTrigger
              id="filtro-nota-minima"
              className="w-full"
              aria-label="Filtrar por nota mínima"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as notas</SelectItem>
              <SelectItem value="5">★★★★★ (5 estrelas)</SelectItem>
              <SelectItem value="4">★★★★ (4+ estrelas)</SelectItem>
              <SelectItem value="3">★★★ (3+ estrelas)</SelectItem>
              <SelectItem value="2">★★ (2+ estrelas)</SelectItem>
              <SelectItem value="1">★ (1+ estrela)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ordenação por Nota */}
        <div className="space-y-2">
          <Label
            htmlFor="ordem-nota"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <ArrowDownAZIcon className="size-4" aria-hidden="true" />
            Ordenar por Nota
          </Label>
          <Select
            value={ordemNota ?? 'nenhuma'}
            onValueChange={(value) =>
              onOrdemNotaChange(
                value === 'nenhuma' ? null : (value as OrdemNota)
              )
            }
          >
            <SelectTrigger
              id="ordem-nota"
              className="w-full"
              aria-label="Ordenar por nota"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhuma">Sem ordenação</SelectItem>
              <SelectItem value="decrescente">Maior nota primeiro</SelectItem>
              <SelectItem value="crescente">Menor nota primeiro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ordenação por Data */}
        <div className="space-y-2">
          <Label
            htmlFor="ordem-data"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarIcon className="size-4" aria-hidden="true" />
            Ordenar por Data
          </Label>
          <Select
            value={ordemData}
            onValueChange={(value) => onOrdemDataChange(value as OrdemData)}
            disabled={ordemNota !== null}
          >
            <SelectTrigger
              id="ordem-data"
              className="w-full"
              aria-label="Ordenar por data"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="antigas">Mais antigas</SelectItem>
            </SelectContent>
          </Select>
          {ordemNota !== null && (
            <p className="text-muted-foreground text-xs">
              Desative a ordenação por nota para usar este filtro
            </p>
          )}
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="text-muted-foreground flex items-center justify-between border-t pt-3 text-sm">
        <span>
          Exibindo <strong className="text-foreground">{totalFiltrados}</strong>{' '}
          de <strong className="text-foreground">{totalComentarios}</strong>{' '}
          {totalComentarios === 1 ? 'comentário' : 'comentários'}
        </span>
      </div>
    </div>
  )
}
