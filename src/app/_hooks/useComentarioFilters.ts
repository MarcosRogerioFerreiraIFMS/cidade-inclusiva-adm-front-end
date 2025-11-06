'use client'

import type { ComentarioResponseDTO } from '@/app/_dtos/response'
import { useMemo, useState } from 'react'

export type OrdemNota = 'crescente' | 'decrescente' | null
export type FiltroVisibilidade = 'todos' | 'visiveis' | 'ocultos'
export type OrdemData = 'recentes' | 'antigas' | null

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

    // Ordenação por nota
    if (filtros.ordemNota === 'crescente') {
      resultado.sort((a, b) => a.nota - b.nota)
    } else if (filtros.ordemNota === 'decrescente') {
      resultado.sort((a, b) => b.nota - a.nota)
    }

    // Ordenação por data
    if (filtros.ordemData === 'recentes') {
      resultado.sort(
        (a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      )
    } else if (filtros.ordemData === 'antigas') {
      resultado.sort(
        (a, b) =>
          new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime()
      )
    }

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
      filtros.ordemNota !== null ||
      filtros.ordemData !== 'recentes'
    )
  }, [filtros])

  const contadorFiltrosAtivos = useMemo(() => {
    let count = 0
    if (filtros.visibilidade !== 'todos') count++
    if (filtros.notaMinima !== null) count++
    if (filtros.ordemNota !== null) count++
    if (filtros.ordemData !== 'recentes') count++
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
