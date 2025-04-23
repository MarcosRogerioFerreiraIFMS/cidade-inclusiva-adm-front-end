import { listarNoticias } from '@/app/_actions/Noticia'
import { NoticiaData } from '@/app/_schema/NoticiaSchema'
import { create } from 'zustand'

interface NoticiasState {
  noticias: NoticiaData[]
  loading: boolean
  error: string | null
  fetchNoticias: () => Promise<void>
}

export const useNoticiasStore = create<NoticiasState>((set) => ({
  noticias: [],
  loading: true,
  error: null,
  fetchNoticias: async () => {
    set({ loading: true, error: null })
    try {
      const noticias = await listarNoticias()
      set({ noticias, loading: false })
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
      set({
        error: 'Falha ao carregar notícias. Tente novamente.',
        loading: false
      })
    }
  }
}))
