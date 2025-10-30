import type { FotoResponseDTO } from '@/app/_dtos/response'
import Image from 'next/image'

interface FotoCellProps {
  foto: FotoResponseDTO | undefined
}

export function FotoCell({ foto }: FotoCellProps) {
  if (!foto || !foto.url) {
    return (
      <div className="bg-muted flex aspect-video h-12 items-center justify-center rounded">
        <span className="text-muted-foreground text-xs">Sem foto</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-video h-12 overflow-hidden rounded">
      <Image
        src={foto.url}
        alt="Foto da notícia"
        fill
        className="object-cover"
        draggable={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
