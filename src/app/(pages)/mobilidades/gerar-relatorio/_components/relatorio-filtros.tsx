'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import { Checkbox } from '@/app/_components/ui/checkbox'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import {
  getMobilidadeStatusLabel,
  MOBILIDADE_STATUS,
  type MobilidadeStatus
} from '@/app/_enums/mobilidadeEnums'
import type { MobilidadeRelatorioFilterDTO } from '@/app/_schemas/mobilidadeRelatorioSchema'
import { CalendarIcon, FilterXIcon, SearchIcon, UserIcon } from 'lucide-react'
import { useCallback } from 'react'

interface RelatorioFiltrosProps {
  filters: MobilidadeRelatorioFilterDTO
  onFiltersChange: (filters: MobilidadeRelatorioFilterDTO) => void
  totalFiltradas: number
  totalMobilidades: number
}

// Helper para formatar data com segurança
const formatDateForInput = (date: Date | undefined): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return ''
  }
  try {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch {
    return ''
  }
}

export function RelatorioFiltros({
  filters,
  onFiltersChange,
  totalFiltradas,
  totalMobilidades
}: RelatorioFiltrosProps) {
  const handleStatusChange = useCallback(
    (status: string, checked: boolean) => {
      const currentStatus = filters.status || []
      const newStatus = checked
        ? [...currentStatus, status as MobilidadeStatus]
        : currentStatus.filter((s) => s !== status)

      onFiltersChange({
        ...filters,
        status: newStatus.length > 0 ? newStatus : undefined
      })
    },
    [filters, onFiltersChange]
  )

  const handleDataInicioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (!value) {
        onFiltersChange({
          ...filters,
          dataInicio: undefined
        })
        return
      }

      // Validar formato da data
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(value)) {
        return
      }

      try {
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day, 0, 0, 0, 0)

        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
          return
        }

        // Verificar se os componentes da data correspondem ao input
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          return
        }

        const newFilters: MobilidadeRelatorioFilterDTO = {
          ...filters,
          dataInicio: date
        }

        // Se já existe data fim e a nova data início for posterior, limpar data fim
        if (filters.dataFim && date > filters.dataFim) {
          newFilters.dataFim = undefined
        }

        onFiltersChange(newFilters)
      } catch (error) {
        console.error('Erro ao processar data início:', error)
      }
    },
    [filters, onFiltersChange]
  )

  const handleDataFimChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (!value) {
        onFiltersChange({
          ...filters,
          dataFim: undefined
        })
        return
      }

      // Validar formato da data
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(value)) {
        return
      }

      try {
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day, 23, 59, 59, 999)

        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
          e.target.value = ''
          return
        }

        // Verificar se os componentes da data correspondem ao input
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          e.target.value = ''
          return
        }

        // Validar se data fim não é anterior à data início
        if (filters.dataInicio && date < filters.dataInicio) {
          e.target.value = ''
          return
        }

        onFiltersChange({
          ...filters,
          dataFim: date
        })
      } catch (error) {
        console.error('Erro ao processar data fim:', error)
        e.target.value = ''
      }
    },
    [filters, onFiltersChange]
  )

  const handleUsuarioNomeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onFiltersChange({
        ...filters,
        usuarioNome: value || undefined
      })
    },
    [filters, onFiltersChange]
  )

  const handleIncluirUsuarioSemNomeChange = useCallback(
    (checked: boolean) => {
      onFiltersChange({
        ...filters,
        incluirUsuarioSemNome: checked
      })
    },
    [filters, onFiltersChange]
  )

  const limparFiltros = useCallback(() => {
    onFiltersChange({
      incluirUsuarioSemNome: true
    })
  }, [onFiltersChange])

  const temFiltrosAtivos =
    (filters.status && filters.status.length > 0) ||
    filters.dataInicio ||
    filters.dataFim ||
    filters.usuarioNome

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Filtros do Relatório</CardTitle>
            <CardDescription>
              Configure os filtros para personalizar o relatório de ocorrências
            </CardDescription>
          </div>
          {temFiltrosAtivos && (
            <Button
              variant="outline"
              size="sm"
              onClick={limparFiltros}
              className="gap-2"
            >
              <FilterXIcon className="size-4" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Status das Ocorrências
          </Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MOBILIDADE_STATUS.map((status) => {
              const isChecked = filters.status?.includes(status) || false
              const statusColors = {
                PENDENTE:
                  'border-red-200 bg-red-100 hover:bg-red-200/70 dark:bg-red-900/30 dark:border-red-900/40',
                EM_ANDAMENTO:
                  'border-blue-200 bg-blue-100 hover:bg-blue-200/70 dark:bg-blue-900/30 dark:border-blue-900/40',
                CONCLUIDO:
                  'border-green-200 bg-green-100 hover:bg-green-200/70 dark:bg-green-900/30 dark:border-green-900/40',
                CANCELADO:
                  'border-gray-200 bg-gray-100 hover:bg-gray-200/70 dark:bg-gray-900/30 dark:border-gray-900/40'
              }

              return (
                <Label
                  key={status}
                  htmlFor={`status-${status}`}
                  className={`flex flex-1 cursor-pointer items-center space-x-3 rounded-lg border-2 p-3 font-medium transition-all ${
                    statusColors[status]
                  } `}
                >
                  <Checkbox
                    id={`status-${status}`}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleStatusChange(status, checked as boolean)
                    }
                  />

                  {getMobilidadeStatusLabel(status)}
                </Label>
              )
            })}
          </div>
          <div className="bg-muted/50 rounded-lg border p-3">
            <p className="text-muted-foreground text-sm">
              {filters.status && filters.status.length > 0 ? (
                <>
                  <span className="font-medium">Filtrando por:</span>{' '}
                  {filters.status
                    .map((s) => getMobilidadeStatusLabel(s))
                    .join(', ')}
                </>
              ) : (
                <>
                  <span className="font-medium">Dica:</span> Deixe todos
                  desmarcados para incluir <strong>todos os status</strong> no
                  relatório. Selecione apenas os status específicos que deseja
                  filtrar.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Período */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <CalendarIcon className="size-4" />
            Período de Registro
          </Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dataInicio" className="text-sm font-medium">
                Data Início
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={formatDateForInput(filters.dataInicio)}
                onChange={handleDataInicioChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFim" className="text-sm font-medium">
                Data Fim
              </Label>
              <Input
                id="dataFim"
                type="date"
                value={formatDateForInput(filters.dataFim)}
                onChange={handleDataFimChange}
                min={formatDateForInput(filters.dataInicio)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Usuário */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <UserIcon className="size-4" />
            Filtrar por Usuário
          </Label>
          <div className="space-y-3">
            <div className="relative">
              <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="usuarioNome"
                placeholder="Digite o nome do usuário..."
                value={filters.usuarioNome || ''}
                onChange={handleUsuarioNomeChange}
                className="pl-10"
              />
            </div>
            <div className="bg-muted/50 flex items-center space-x-2 rounded-lg border p-3">
              <Checkbox
                id="incluirUsuarioSemNome"
                checked={filters.incluirUsuarioSemNome}
                onCheckedChange={handleIncluirUsuarioSemNomeChange}
              />
              <Label
                htmlFor="incluirUsuarioSemNome"
                className="cursor-pointer text-sm font-normal"
              >
                Incluir ocorrências sem usuário cadastrado
              </Label>
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div>
          <p className="text-sm font-semibold">
            Exibindo {totalFiltradas} de {totalMobilidades} ocorrências
            {temFiltrosAtivos && ' (com filtros aplicados)'}
          </p>
          {temFiltrosAtivos && (
            <p className="mt-1 text-xs">
              {((totalFiltradas / totalMobilidades) * 100).toFixed(1)}% do total
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
