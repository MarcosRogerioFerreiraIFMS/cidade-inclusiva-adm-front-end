'use client'

import {
  hasValidImageExtension,
  VALID_IMAGE_EXTENSIONS,
  validateUrlProtocol
} from '@/app/_utils/imageUtils'
import { AlertCircleIcon, ImageIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Card } from './ui/card'

interface FormImagePreviewProps {
  fotoUrl?: string
  onValidationChange?: (isValid: boolean) => void
}

function FormAlert({
  variant,
  title,
  description
}: {
  variant: 'error' | 'warning' | 'info'
  title: string
  description: string
}) {
  const variantStyles = {
    error:
      'border-destructive bg-destructive/10 text-destructive dark:text-red-400',
    warning:
      'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400',
    info: 'border-muted bg-white dark:bg-muted/55 text-muted-foreground dark:text-muted-foreground'
  }

  const Icon = AlertCircleIcon

  return (
    <Card className={`animate-fade-in mt-4 p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  )
}

function ImageLoader({
  fotoUrl,
  onLoadComplete,
  onLoadingChange
}: {
  fotoUrl: string
  onLoadComplete: (hasError: boolean) => void
  onLoadingChange: (isLoading: boolean) => void
}) {
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
            <Loader2Icon className="text-muted-foreground h-8 w-8 animate-spin" />
            <p className="text-muted-foreground text-xs">
              Carregando imagem...
            </p>
          </div>
        </div>
      )}

      <Image
        src={fotoUrl}
        alt="Preview da imagem"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        draggable={false}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  )
}

export function FormImagePreview({
  fotoUrl,
  onValidationChange
}: FormImagePreviewProps) {
  const imageKey = useMemo(() => fotoUrl || '', [fotoUrl])
  const [hasLoadError, setHasLoadError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [currentKey, setCurrentKey] = useState(imageKey)

  // Detecta mudança de URL e reseta o erro e loading
  if (currentKey !== imageKey) {
    setCurrentKey(imageKey)
    if (hasLoadError) {
      setHasLoadError(false)
    }
    if (!isImageLoading && fotoUrl && fotoUrl.trim() !== '') {
      setIsImageLoading(true)
    }
  }

  const isEmpty = !fotoUrl || fotoUrl.trim() === ''
  const urlValidation = fotoUrl ? validateUrlProtocol(fotoUrl) : { valid: true }
  const hasValidExtension = fotoUrl ? hasValidImageExtension(fotoUrl) : false

  const hasInvalidUrl = !isEmpty && !urlValidation.valid
  const hasInvalidExtension = !isEmpty && !hasValidExtension
  const isValid =
    !isEmpty &&
    !hasInvalidUrl &&
    !hasInvalidExtension &&
    !hasLoadError &&
    !isImageLoading

  useEffect(() => {
    onValidationChange?.(isValid)
  }, [isValid, onValidationChange])

  if (isEmpty) {
    return (
      <FormAlert
        variant="info"
        title="Nenhuma imagem informada"
        description="Insira uma URL de imagem para visualizar o preview."
      />
    )
  }

  if (hasInvalidUrl) {
    return (
      <FormAlert
        variant="error"
        title="URL inválida"
        description="A URL deve começar com http:// ou https://."
      />
    )
  }

  if (hasInvalidExtension) {
    return (
      <FormAlert
        variant="warning"
        title="Extensão não reconhecida"
        description={`A URL não termina com uma extensão válida (${VALID_IMAGE_EXTENSIONS.slice(
          0,
          4
        ).join(', ')}, etc.).`}
      />
    )
  }

  if (hasLoadError) {
    return (
      <FormAlert
        variant="error"
        title="Erro ao carregar imagem"
        description="Não foi possível carregar a imagem. Verifique se a URL está correta e acessível."
      />
    )
  }

  return (
    <div className="bg-muted/50 animate-fade-in mt-4 w-fit rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <ImageIcon className="h-4 w-4" />
        <p className="text-sm font-medium">Preview da Imagem</p>
      </div>

      <div className="relative aspect-video w-md overflow-hidden rounded-md">
        <ImageLoader
          key={fotoUrl}
          fotoUrl={fotoUrl}
          onLoadComplete={setHasLoadError}
          onLoadingChange={setIsImageLoading}
        />
      </div>
    </div>
  )
}
