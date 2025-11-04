'use client'

import { ForwardIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

interface QuickActionCardProps {
  title: string
  description: string
  imageSrc: string
  href: string
}

function QuickActionImage({
  imageSrc,
  title
}: {
  imageSrc: string
  title: string
}) {
  const [hasImage, setHasImage] = useState(true)

  if (!hasImage) {
    return (
      <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-md">
        <span className="text-muted-foreground text-center text-xs">
          Sem imagem
        </span>
      </div>
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={`Ícone representando ${title}`}
      width={64}
      height={64}
      draggable={false}
      onError={() => setHasImage(false)}
      className="h-16 w-16 rounded-md object-cover"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4DwQACfsD/QcAxN8AAAAASUVORK5CYII="
    />
  )
}

/**
 * Cartão de ação rápida utilizado no dashboard.
 */
export function QuickActionCard({
  title,
  description,
  imageSrc,
  href = '#'
}: QuickActionCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <QuickActionImage imageSrc={imageSrc} title={title} />

        <div>
          <h2 className="w-full truncate text-center text-xl font-normal">
            {title}
          </h2>
          <p className="text-muted-foreground line-clamp-1 w-full text-center">
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <Button asChild>
          <Link href={href} aria-label={`Acessar ${title}`}>
            <ForwardIcon aria-hidden="true" />
            <span>Acessar</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
