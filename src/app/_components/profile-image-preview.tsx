'use client'

import {
  hasValidImageExtension,
  VALID_IMAGE_EXTENSIONS,
  validateUrlProtocol
} from '@/app/_utils/imageUtils'
import { UserIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { FormAlert } from './form-alert'
import { ImageLoader } from './image-loader'

interface ProfileImagePreviewProps {
  fotoUrl?: string
  onValidationChange?: (isValid: boolean) => void
}

export function ProfileImagePreview({
  fotoUrl,
  onValidationChange
}: ProfileImagePreviewProps) {
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
      <div className="bg-muted/50 animate-fade-in mt-4 flex w-fit flex-col items-center rounded-lg border p-4">
        <div className="mb-3 flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <p className="text-sm font-medium">Preview da Foto de Perfil</p>
        </div>

        <div className="bg-muted flex size-40 items-center justify-center rounded-full border">
          <UserIcon className="text-muted-foreground h-16 w-16" />
        </div>
        <p className="text-muted-foreground mt-3 text-xs">
          Insira uma URL de imagem para visualizar o preview
        </p>
      </div>
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
    <div className="bg-muted/50 animate-fade-in mt-4 flex w-fit flex-col items-center rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <UserIcon className="size-4" />
        <p className="text-sm font-medium">Preview da Foto de Perfil</p>
      </div>

      <div className="relative size-40 overflow-hidden rounded-full border-2">
        <ImageLoader
          key={fotoUrl}
          fotoUrl={fotoUrl}
          alt="Preview da foto de perfil do usuário"
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 128px, 160px"
          showLoadingText={false}
          onLoadComplete={setHasLoadError}
          onLoadingChange={setIsImageLoading}
        />
      </div>
    </div>
  )
}
