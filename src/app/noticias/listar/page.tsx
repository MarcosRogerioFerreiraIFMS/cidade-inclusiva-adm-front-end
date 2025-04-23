'use client'

import { Container } from '@/app/_components/Container'
import { DataTable } from '@/app/_components/DataTable'
import { useNoticiasStore } from '@/app/_store/useNoticiasStore'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useNoticiaColumns } from './_components/NoticiasColumns'

export default function NoticiasListar() {
  const { noticias, loading, error, fetchNoticias } = useNoticiasStore()
  const columns = useNoticiaColumns(fetchNoticias)

  useEffect(() => {
    fetchNoticias()
  }, [fetchNoticias])

  if (loading) {
    return (
      <Container className="animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2Icon className="text-primary h-12 w-12 animate-spin" />
          <p className="mt-4 text-lg">Carregando notícias...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircleIcon size={50} className="text-destructive" />
          <p className="text-destructive mt-4 text-lg">{error}</p>

          <button
            onClick={fetchNoticias}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded px-4 py-2"
          >
            Tentar novamente
          </button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">Veja todas as Notícias</h2>

      <DataTable
        columns={columns}
        data={noticias}
        newItemUrl="/noticias/adicionar"
        searchPlaceholder="Buscar por título..."
        newItemText="Nova notícia"
      />
    </Container>
  )
}
