'use client'

import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import type { MobilidadeRelatorioFilterDTO } from '@/app/_schemas/mobilidadeRelatorioSchema'
import { useMemo, useState } from 'react'

export function useMobilidadeRelatorio(mobilidades: MobilidadeResponseDTO[]) {
  const [filters, setFilters] = useState<MobilidadeRelatorioFilterDTO>({
    incluirUsuarioSemNome: true
  })

  const mobilidadesFiltradas = useMemo(() => {
    return mobilidades.filter((mobilidade) => {
      // Filtro por status
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(mobilidade.status)) {
          return false
        }
      }

      // Filtro por data de início
      if (filters.dataInicio) {
        const dataRegistro = new Date(mobilidade.dataRegistro)
        if (dataRegistro < filters.dataInicio) {
          return false
        }
      }

      // Filtro por data de fim
      if (filters.dataFim) {
        const dataRegistro = new Date(mobilidade.dataRegistro)
        // Adiciona 23:59:59 à data de fim para incluir todo o dia
        const dataFimAjustada = new Date(filters.dataFim)
        dataFimAjustada.setHours(23, 59, 59, 999)
        if (dataRegistro > dataFimAjustada) {
          return false
        }
      }

      // Filtro por nome de usuário
      if (filters.usuarioNome && filters.usuarioNome.trim() !== '') {
        const nomeUsuario = mobilidade.usuario?.nome?.toLowerCase() || ''
        const filtroNome = filters.usuarioNome.toLowerCase()

        if (!nomeUsuario.includes(filtroNome)) {
          return false
        }
      }

      // Filtro para incluir/excluir ocorrências sem usuário
      if (!filters.incluirUsuarioSemNome && !mobilidade.usuario?.nome) {
        return false
      }

      return true
    })
  }, [mobilidades, filters])

  return {
    filters,
    setFilters,
    mobilidadesFiltradas,
    totalMobilidades: mobilidades.length,
    totalFiltradas: mobilidadesFiltradas.length
  }
}
