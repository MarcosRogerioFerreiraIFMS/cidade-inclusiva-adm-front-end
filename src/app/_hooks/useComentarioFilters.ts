'use client'

import type { ComentarioResponseDTO } from '@/app/_dtos/response'
import { useMemo, useState } from 'react'

export type OrdemNota = 'crescente' | 'decrescente' | null
export type FiltroVisibilidade = 'todos' | 'visiveis' | 'ocultos'
export type OrdemData = 'recentes' | 'antigas'

interface FiltrosComentario {
  visibilidade: FiltroVisibilidade
  notaMinima: number | null
  ordemNota: OrdemNota
  ordemData: OrdemData
}

export function useComentarioFilters(comentarios: ComentarioResponseDTO[]) {
  const [filtros, setFiltros] = useState<FiltrosComentario>({
    visibilidade: 'todos',
    notaMinima: null,
    ordemNota: null,
    ordemData: 'recentes'
  })

  const comentariosFiltrados = useMemo(() => {
    let resultado = [...comentarios]

    // Filtro por visibilidade
    if (filtros.visibilidade === 'visiveis') {
      resultado = resultado.filter((c) => c.visivel)
    } else if (filtros.visibilidade === 'ocultos') {
      resultado = resultado.filter((c) => !c.visivel)
    }

    // Filtro por nota mínima
    if (filtros.notaMinima !== null) {
      resultado = resultado.filter((c) => c.nota >= filtros.notaMinima!)
    }

    // Ordenação: combina nota e data de forma independente
    resultado.sort((a, b) => {
      // Se há ordenação por nota selecionada, aplica como critério primário
      if (filtros.ordemNota) {
        const notaDiff =
          filtros.ordemNota === 'crescente' ? a.nota - b.nota : b.nota - a.nota

        // Se as notas forem iguais, usa data como desempate
        if (notaDiff !== 0) return notaDiff
      }

      // Ordenação por data (sempre aplicada, seja como principal ou secundária)
      const dataA = new Date(a.criadoEm).getTime()
      const dataB = new Date(b.criadoEm).getTime()
      return filtros.ordemData === 'recentes' ? dataB - dataA : dataA - dataB
    })

    return resultado
  }, [comentarios, filtros])

  const setVisibilidade = (visibilidade: FiltroVisibilidade) => {
    setFiltros((prev) => ({ ...prev, visibilidade }))
  }

  const setNotaMinima = (notaMinima: number | null) => {
    setFiltros((prev) => ({ ...prev, notaMinima }))
  }

  const setOrdemNota = (ordemNota: OrdemNota) => {
    setFiltros((prev) => ({ ...prev, ordemNota }))
  }

  const setOrdemData = (ordemData: OrdemData) => {
    setFiltros((prev) => ({ ...prev, ordemData }))
  }

  const limparFiltros = () => {
    setFiltros({
      visibilidade: 'todos',
      notaMinima: null,
      ordemNota: null,
      ordemData: 'recentes'
    })
  }

  const temFiltrosAtivos = useMemo(() => {
    return (
      filtros.visibilidade !== 'todos' ||
      filtros.notaMinima !== null ||
      filtros.ordemNota !== null
    )
  }, [filtros])

  const contadorFiltrosAtivos = useMemo(() => {
    let count = 0
    if (filtros.visibilidade !== 'todos') count++
    if (filtros.notaMinima !== null) count++
    if (filtros.ordemNota !== null) count++
    // Não conta ordemData como filtro ativo pois sempre tem um valor padrão
    return count
  }, [filtros])

  return {
    filtros,
    comentariosFiltrados,
    setVisibilidade,
    setNotaMinima,
    setOrdemNota,
    setOrdemData,
    limparFiltros,
    temFiltrosAtivos,
    contadorFiltrosAtivos
  }
}
