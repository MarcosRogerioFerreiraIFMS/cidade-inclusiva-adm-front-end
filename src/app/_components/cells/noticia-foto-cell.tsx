import type { FotoResponseDTO } from '@/app/_dtos/response'
import Image from 'next/image'
import Link from 'next/link'

interface NoticiaFotoCellProps {
  id: string
  foto: FotoResponseDTO | undefined
  titulo: string
  enableNavigation?: boolean
  getDetailRoute?: (id: string) => string
}

export function NoticiaFotoCell({
  id,
  foto,
  titulo,
  enableNavigation = false,
  getDetailRoute
}: NoticiaFotoCellProps) {
  const altText = titulo ? `Imagem da notícia: ${titulo}` : 'Imagem da notícia'

  const noticiaFotoContent = (
    <div className="flex items-center gap-3">
      <div className="relative aspect-video h-12 overflow-hidden rounded">
        {!foto || !foto.url ? (
          <div className="bg-muted flex aspect-video h-12 items-center justify-center rounded">
            <span className="text-muted-foreground text-xs">Sem foto</span>
          </div>
        ) : (
          <Image
            src={foto.url}
            alt={altText}
            fill
            className="object-cover"
            draggable={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="flex flex-col">
        <span className="max-w-[300px] truncate font-medium">{titulo}</span>
      </div>
    </div>
  )

  if (enableNavigation && getDetailRoute) {
    return (
      <Link
        href={getDetailRoute(id)}
        className="hover:underline"
        aria-label={`Ver detalhes de ${titulo}`}
      >
        {noticiaFotoContent}
      </Link>
    )
  }

  return noticiaFotoContent
}
