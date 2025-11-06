'use client'

import { deleteNoticia } from '@/app/_actions/noticiaActions'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import type { NoticiaResponseDTO } from '@/app/_dtos/response'
import { NoticiaCategoriasDisplay } from '@/app/_enums/noticiaEnums'
import { useDeleteModal } from '@/app/_hooks/useDeleteModal'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import { getNoticiaCategoriaBadgeColor } from '@/app/_utils/getShadcnBadgeColor'
import { EditIcon, ExternalLinkIcon, Trash2Icon, Undo2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NoticiaDeletarModal } from '../../_components/noticia-deletar-modal'

interface NoticiaDetalhesProps {
  noticia: NoticiaResponseDTO
}

export function NoticiaDetalhes({ noticia }: NoticiaDetalhesProps) {
  const router = useRouter()
  const { isOpen, isLoading, openModal, closeModal, confirmDelete } =
    useDeleteModal()

  const handleDelete = () => {
    openModal(
      noticia.id,
      async () => {
        const result = await deleteNoticia(noticia.id)
        if (result.success) {
          router.replace('/noticias/listar')
        }
        return result
      },
      `Notícia deletada com sucesso!`
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{noticia.titulo}</h1>{' '}
          <p className="text-muted-foreground">
            Publicado em {formatDateToDateString(noticia.dataPublicacao)}
          </p>
          <Badge className={getNoticiaCategoriaBadgeColor(noticia.categoria)}>
            {NoticiaCategoriasDisplay[noticia.categoria.toUpperCase()] ??
              noticia.categoria}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={`/noticias/editar/${noticia.id}`}
              aria-label={`Editar notícia ${noticia.titulo}`}
            >
              <EditIcon aria-hidden="true" />
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            aria-label={`Deletar notícia ${noticia.titulo}`}
          >
            <Trash2Icon aria-hidden="true" />
            Deletar
          </Button>
        </div>
      </div>

      {noticia.foto && (
        <Card className="shadow- mx-auto shadow-white/20">
          <CardContent>
            <div className="relative aspect-video h-96 w-fit overflow-hidden rounded-md">
              <Image
                src={noticia.foto.url}
                alt={`Imagem ilustrativa da notícia: ${noticia.titulo}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover"
                draggable={false}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="p-6">
        <p className="leading-relaxed whitespace-pre-wrap">
          {noticia.conteudo}
        </p>
      </Card>

      <div className="flex justify-start gap-4">
        {noticia.url && (
          <Button variant="outline" asChild>
            <Link
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir link externo da notícia ${noticia.titulo} em nova aba`}
            >
              <ExternalLinkIcon aria-hidden="true" />
              Abrir notícia
            </Link>
          </Button>
        )}

        <Button variant="outline" asChild>
          <Link
            href="/noticias/listar"
            aria-label="Voltar para lista de notícias"
          >
            <Undo2Icon aria-hidden="true" />
            <span>Voltar para lista</span>
          </Link>
        </Button>
      </div>

      {isOpen && (
        <NoticiaDeletarModal
          noticia={noticia}
          isOpen={isOpen}
          onCancel={closeModal}
          onConfirm={confirmDelete}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
