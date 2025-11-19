'use client'

import {
  hasValidImageExtension,
  VALID_IMAGE_EXTENSIONS,
  validateUrlProtocol
} from '@/app/_utils/imageUtils'
import {
  CheckIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  XIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormAlert } from './form-alert'
import { ImageLoader } from './image-loader'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface MultipleImagesPreviewProps {
  fotosUrls: string[]
  onFotosChange: (urls: string[]) => void
  onValidationChange?: (isValid: boolean) => void
  maxImages?: number
}

interface ImageValidationState {
  url: string
  isValid: boolean
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
}

export function MultipleImagesPreview({
  fotosUrls,
  onFotosChange,
  onValidationChange,
  maxImages = 20
}: MultipleImagesPreviewProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  // Inicializa estados de validação para URLs existentes (modo edição)
  const [validationStates, setValidationStates] = useState<
    Map<string, ImageValidationState>
  >(() => {
    const initialStates = new Map<string, ImageValidationState>()
    fotosUrls.forEach((url) => {
      initialStates.set(url, {
        url,
        isValid: false,
        isLoading: true,
        hasError: false
      })
    })
    return initialStates
  })

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingUrl, setEditingUrl] = useState('')

  // Notifica mudanças de validação
  useEffect(() => {
    // Limpa estados de URLs que não existem mais e adiciona novos
    const cleanStates = new Map<string, ImageValidationState>()
    fotosUrls.forEach((url) => {
      const state = validationStates.get(url)
      if (state) {
        cleanStates.set(url, state)
      }
    })

    // Se não há fotos, considera válido (campo opcional)
    if (fotosUrls.length === 0) {
      onValidationChange?.(true)
      return
    }

    // Se há fotos, valida todas usando os estados limpos
    const allValid = fotosUrls.every((url) => {
      const state = cleanStates.get(url)
      return state?.isValid && !state?.isLoading && !state?.hasError
    })
    onValidationChange?.(allValid)
  }, [validationStates, fotosUrls, onValidationChange])

  const validateUrl = (url: string): { valid: boolean; error?: string } => {
    if (!url || url.trim() === '') {
      return { valid: false, error: 'URL vazia' }
    }

    const urlValidation = validateUrlProtocol(url)
    if (!urlValidation.valid) {
      return {
        valid: false,
        error: 'A URL deve começar com http:// ou https://'
      }
    }

    if (!hasValidImageExtension(url)) {
      return {
        valid: false,
        error: `Extensão inválida. Use: ${VALID_IMAGE_EXTENSIONS.slice(0, 4).join(', ')}`
      }
    }

    return { valid: true }
  }

  const handleAddUrl = () => {
    const trimmedUrl = currentUrl.trim()

    if (!trimmedUrl) return

    if (fotosUrls.length >= maxImages) {
      return
    }

    if (fotosUrls.includes(trimmedUrl)) {
      return
    }

    const validation = validateUrl(trimmedUrl)
    if (!validation.valid) {
      return
    }

    // Adiciona novo estado de validação para a URL
    setValidationStates((prev) => {
      const newStates = new Map(prev)
      newStates.set(trimmedUrl, {
        url: trimmedUrl,
        isValid: false,
        isLoading: true,
        hasError: false
      })
      return newStates
    })

    onFotosChange([...fotosUrls, trimmedUrl])
    setCurrentUrl('')
  }

  const handleRemoveUrl = (urlToRemove: string) => {
    onFotosChange(fotosUrls.filter((url) => url !== urlToRemove))
    // O estado será limpo automaticamente pelo useEffect
  }

  const handleStartEdit = (index: number) => {
    setEditingIndex(index)
    setEditingUrl(fotosUrls[index])
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingUrl('')
  }

  const handleSaveEdit = (index: number) => {
    const trimmedUrl = editingUrl.trim()

    if (!trimmedUrl) {
      handleCancelEdit()
      return
    }

    // Verifica se a URL é duplicada (exceto com ela mesma)
    const isDuplicate = fotosUrls.some(
      (url, i) => i !== index && url === trimmedUrl
    )

    if (isDuplicate) {
      return
    }

    const validation = validateUrl(trimmedUrl)
    if (!validation.valid) {
      return
    }

    // Atualiza a URL no array
    const newUrls = [...fotosUrls]
    newUrls[index] = trimmedUrl
    onFotosChange(newUrls)

    // Adiciona novo estado de validação para a URL editada
    setValidationStates((prev) => {
      const newStates = new Map(prev)
      newStates.set(trimmedUrl, {
        url: trimmedUrl,
        isValid: false,
        isLoading: true,
        hasError: false
      })
      return newStates
    })

    handleCancelEdit()
  }

  const handleImageValidation = (url: string, hasError: boolean) => {
    setValidationStates((prev) => {
      const currentState = prev.get(url)
      // Se o estado não mudou, retorna o mesmo Map para evitar re-render
      if (
        !currentState ||
        (currentState.hasError === hasError &&
          currentState.isValid === !hasError &&
          currentState.isLoading === false)
      ) {
        return prev
      }

      const newStates = new Map(prev)
      newStates.set(url, {
        ...currentState,
        hasError,
        isValid: !hasError,
        isLoading: false
      })
      return newStates
    })
  }

  const handleImageLoadingChange = (url: string, isLoading: boolean) => {
    setValidationStates((prev) => {
      const currentState = prev.get(url)
      // Se o estado não mudou, retorna o mesmo Map para evitar re-render
      if (!currentState || currentState.isLoading === isLoading) {
        return prev
      }

      const newStates = new Map(prev)
      newStates.set(url, {
        ...currentState,
        isLoading
      })
      return newStates
    })
  }

  const urlValidation = validateUrl(currentUrl)
  const canAddMore = fotosUrls.length < maxImages
  const isDuplicate = fotosUrls.includes(currentUrl.trim())

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddUrl()
                }
              }}
              disabled={!canAddMore}
            />
          </div>
          <Button
            type="button"
            onClick={handleAddUrl}
            disabled={
              !currentUrl.trim() ||
              !urlValidation.valid ||
              !canAddMore ||
              isDuplicate
            }
            aria-label="Adicionar URL de foto"
          >
            <PlusIcon aria-hidden="true" />
            Adicionar
          </Button>
        </div>

        {currentUrl && isDuplicate && (
          <FormAlert
            variant="warning"
            title="URL duplicada"
            description="Esta foto já foi adicionada"
          />
        )}

        {currentUrl && !isDuplicate && !urlValidation.valid && (
          <FormAlert
            variant="error"
            title="URL inválida"
            description={urlValidation.error || 'Verifique a URL informada'}
          />
        )}

        {!canAddMore && (
          <FormAlert
            variant="warning"
            title="Limite atingido"
            description={`Você pode adicionar no máximo ${maxImages} fotos.`}
          />
        )}

        <p className="text-muted-foreground text-sm">
          {fotosUrls.length} de {maxImages} fotos adicionadas
        </p>
      </div>

      {fotosUrls.length === 0 ? (
        <div className="bg-muted/50 animate-fade-in flex flex-col items-center rounded-lg border p-8">
          <ImageIcon className="text-muted-foreground mb-3 size-12" />
          <p className="text-muted-foreground text-center text-sm">
            Nenhuma foto adicionada ainda
          </p>
          <p className="text-muted-foreground text-center text-xs">
            Adicione URLs de fotos para visualizar os previews
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotosUrls.map((url, index) => {
            const state = validationStates.get(url)
            const showError = state?.hasError
            const isLoading = state?.isLoading

            return (
              <div
                key={`${url}-${index}`}
                className="bg-muted/50 animate-fade-in group relative overflow-hidden rounded-lg border"
              >
                {/* Botão de remover */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 z-10 size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => handleRemoveUrl(url)}
                  aria-label={`Remover foto ${index + 1}`}
                >
                  <Trash2Icon className="size-4" />
                </Button>

                {/* Preview da imagem */}
                <div className="relative aspect-video w-full">
                  {showError ? (
                    <div className="flex h-full flex-col items-center justify-center p-4">
                      <XIcon className="text-destructive mb-2 size-8" />
                      <p className="text-destructive text-center text-xs">
                        Erro ao carregar
                      </p>
                    </div>
                  ) : (
                    <ImageLoader
                      key={url}
                      fotoUrl={url}
                      alt={`Foto ${index + 1}`}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      showLoadingText={false}
                      onLoadComplete={(hasError) =>
                        handleImageValidation(url, hasError)
                      }
                      onLoadingChange={(loading) =>
                        handleImageLoadingChange(url, loading)
                      }
                    />
                  )}
                </div>

                {/* URL editável */}
                <div className="border-t p-2">
                  {editingIndex === index ? (
                    <div className="space-y-2">
                      <Input
                        type="url"
                        value={editingUrl}
                        onChange={(e) => setEditingUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSaveEdit(index)
                          } else if (e.key === 'Escape') {
                            handleCancelEdit()
                          }
                        }}
                        className="h-8 text-xs"
                        placeholder="https://exemplo.com/foto.jpg"
                        autoFocus
                      />
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="default"
                          className="h-6 flex-1 text-xs"
                          onClick={() => handleSaveEdit(index)}
                          disabled={
                            !editingUrl.trim() ||
                            !validateUrl(editingUrl).valid ||
                            fotosUrls.some(
                              (u, i) => i !== index && u === editingUrl.trim()
                            )
                          }
                        >
                          <CheckIcon className="size-3" />
                          Salvar
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-6 flex-1 text-xs"
                          onClick={handleCancelEdit}
                        >
                          <XIcon className="size-3" />
                          Cancelar
                        </Button>
                      </div>
                      {editingUrl && !validateUrl(editingUrl).valid && (
                        <p className="text-destructive text-xs">
                          {validateUrl(editingUrl).error}
                        </p>
                      )}
                      {editingUrl &&
                        fotosUrls.some(
                          (u, i) => i !== index && u === editingUrl.trim()
                        ) && (
                          <p className="text-destructive text-xs">
                            URL duplicada
                          </p>
                        )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-muted-foreground flex-1 truncate text-xs">
                        {url}
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleStartEdit(index)}
                        aria-label="Editar URL"
                      >
                        <PencilIcon className="size-3" />
                      </Button>
                    </div>
                  )}
                  {isLoading && editingIndex !== index && (
                    <p className="text-muted-foreground animate-pulse text-xs">
                      Carregando...
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {fotosUrls.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="size-4" />
            <p className="text-sm font-medium">
              {fotosUrls.length} foto{fotosUrls.length !== 1 ? 's' : ''}{' '}
              adicionada{fotosUrls.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              onFotosChange([])
              setValidationStates(new Map())
            }}
            aria-label="Remover todas as fotos"
          >
            <Trash2Icon className="size-4" />
            Limpar todas
          </Button>
        </div>
      )}
    </div>
  )
}
