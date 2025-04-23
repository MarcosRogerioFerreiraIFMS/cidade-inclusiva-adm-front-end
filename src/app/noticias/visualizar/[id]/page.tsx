'use client'

import { buscarNoticiaPorId } from '@/app/_actions/Noticia'
import { Container } from '@/app/_components/Container'
import { Button } from '@/app/_components/ui/button'
import { NoticiaData } from '@/app/_schema/NoticiaSchema'
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  LinkIcon,
  Loader2Icon,
  PencilIcon,
  Trash2Icon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import { ConfirmDeleteModal } from './_components/ConfirmDeleteModal'

interface VisualizarNoticiaProps {
  params: Promise<{
    id: string
  }>
}

export default function VisualizarNoticia({ params }: VisualizarNoticiaProps) {
  const { id } = use(params)
  const [noticia, setNoticia] = useState<NoticiaData | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const carregarNoticia = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error, status } = await buscarNoticiaPorId(id)

      if (status === 404 && error) {
        setError('Notícia não encontrada.')
        return
      }

      if (error || !data || status !== 200) {
        setError('Falha ao carregar notícia. Tente novamente.')
        return
      }

      setNoticia(data)
    } catch (err) {
      setError('Ocorreu um erro ao carregar a notícia')
      console.error('Erro ao carregar notícia:', err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    carregarNoticia()
  }, [carregarNoticia, id])

  const dataPublicacaoFormatada = useMemo(() => {
    if (noticia?.dataPublicacao) {
      return new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')
    }
    return ''
  }, [noticia?.dataPublicacao])

  if (loading) {
    return (
      <Container className="animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2Icon className="text-primary h-12 w-12 animate-spin" />
          <p className="mt-4 text-lg">Carregando notícia...</p>
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

          <div className="mt-4 space-x-4">
            <Button onClick={carregarNoticia}>Tentar novamente</Button>
            <Button
              variant="outline"
              onClick={() => router.push('/noticias/listar')}
            >
              Voltar para listagem
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  if (!noticia) {
    return (
      <Container className="animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircleIcon size={50} className="text-destructive" />
          <p className="text-destructive mt-4 text-lg">
            Notícia não encontrada.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">{noticia.titulo || '(Sem título)'}</h2>

      <Image
        src={noticia.foto || '/placeholder.png'}
        alt={noticia.titulo || 'Imagem da notícia'}
        width={500}
        height={281}
        className="mx-auto max-h-80 rounded-lg object-cover"
      />

      <p>{noticia.conteudo || '(Sem conteúdo)'}</p>

      <p>
        <span className="font-bold">Categoria: </span>
        {noticia.categoria || '(Sem categoria)'}
      </p>

      <p>
        <span className="font-bold">Data de Publicação: </span>
        {dataPublicacaoFormatada || '(Sem data)'}
      </p>

      <div className="flex items-center justify-end space-x-4">
        {noticia.url && (
          <Button variant="link" asChild>
            <Link href={noticia.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="text-inherit" />
              Acessar link
            </Link>
          </Button>
        )}

        <Button
          variant="outline"
          onClick={() => router.push('/noticias/listar')}
        >
          <ArrowLeftIcon />
          Voltar
        </Button>

        <Button asChild>
          <Link href={`/noticias/editar/${noticia.id}`}>
            <PencilIcon className="text-inherit" />
            Editar
          </Link>
        </Button>

        <Button variant="destructive" onClick={() => setOpen(true)}>
          <Trash2Icon className="text-inherit" />
          Excluir
        </Button>
      </div>

      {noticia.id && (
        <ConfirmDeleteModal
          open={open}
          setOpen={setOpen}
          noticiaIdToDelete={noticia.id}
          carregarNoticia={carregarNoticia}
        />
      )}
    </Container>
  )
}
