'use client'

import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageLoaderProps {
  fotoUrl: string
  alt: string
  onLoadComplete: (hasError: boolean) => void
  onLoadingChange: (isLoading: boolean) => void
  className?: string
  sizes?: string
  showLoadingText?: boolean
}

export function ImageLoader({
  fotoUrl,
  alt,
  onLoadComplete,
  onLoadingChange,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  showLoadingText = true
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onLoadingChange(isLoading)
  }, [isLoading, onLoadingChange])

  function handleImageLoad() {
    setIsLoading(false)
    onLoadComplete(false)
  }

  function handleImageError() {
    setIsLoading(false)
    onLoadComplete(true)
  }

  return (
    <>
      {isLoading && (
        <div className="bg-muted/30 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2Icon className="text-muted-foreground size-8 animate-spin" />
            {showLoadingText && (
              <p className="text-muted-foreground text-xs">
                Carregando imagem...
              </p>
            )}
          </div>
        </div>
      )}

      <Image
        src={fotoUrl}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        draggable={false}
        priority
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  )
}
