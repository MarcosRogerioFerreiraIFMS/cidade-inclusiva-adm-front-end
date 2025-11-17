'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/_components/ui/avatar'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import {
  getMobilidadeStatusLabel,
  type MobilidadeStatus
} from '@/app/_enums/mobilidadeEnums'
import { formatDateToDateString } from '@/app/_utils/dateUtils'
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap
} from '@vis.gl/react-google-maps'
import {
  AlertCircleIcon,
  CheckIcon,
  ExternalLinkIcon,
  FilterIcon,
  MapPinIcon,
  NavigationIcon,
  UserIcon,
  XIcon
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface MobilidadeMapProps {
  mobilidades: MobilidadeResponseDTO[]
  apiKey: string
  selectedMobilidadeId?: string
  onMarkerClick?: (id: string) => void
  selectedFilters?: Set<MobilidadeStatus>
  onFiltersChange?: (filters: Set<MobilidadeStatus>) => void
}

/**
 * Mapeamento de cores dos pins baseado no status da mobilidade
 */
const STATUS_PIN_COLORS: Record<MobilidadeStatus, string> = {
  PENDENTE: '#ef4444', // red-500 - Urgente
  EM_ANDAMENTO: '#3b82f6', // blue-500 - Em progresso
  CONCLUIDO: '#22c55e', // green-500 - Finalizado
  CANCELADO: '#6b7280' // gray-500 - Cancelado
}

/**
 * Obtém a cor do pin baseado no status
 */
function getPinColor(status: MobilidadeStatus): string {
  return STATUS_PIN_COLORS[status] || STATUS_PIN_COLORS.PENDENTE
}

/**
 * Componente que monitora o status de carregamento da API
 */
function APIErrorHandler({ onError }: { onError: () => void }) {
  const status = useApiLoadingStatus()

  useEffect(() => {
    if (status === APILoadingStatus.FAILED) {
      onError()
    }
  }, [status, onError])

  return null
}

/**
 * Componente de marcador individual com InfoWindow melhorado
 */
function MobilidadeMarker({
  mobilidade,
  onMarkerClick,
  isOpen
}: {
  mobilidade: MobilidadeResponseDTO
  onMarkerClick: () => void
  isOpen: boolean
}) {
  const [markerRef, marker] = useAdvancedMarkerRef()

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: mobilidade.latitude, lng: mobilidade.longitude }}
        onClick={onMarkerClick}
        title={`${getMobilidadeStatusLabel(mobilidade.status)} - ${new Date(mobilidade.dataRegistro).toLocaleDateString('pt-BR')}`}
      >
        <Pin
          background={getPinColor(mobilidade.status)}
          glyphColor="#ffffff"
          borderColor="#ffffff"
          scale={isOpen ? 1.2 : 1}
        />
      </AdvancedMarker>

      {isOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onMarkerClick}
          maxWidth={320}
          headerDisabled={true}
        >
          <div className="bg-background w-80">
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4" />
                  <span className="text-sm font-semibold">
                    {getMobilidadeStatusLabel(mobilidade.status)}
                  </span>
                </div>
                <Badge
                  variant={
                    mobilidade.status === 'CONCLUIDO'
                      ? 'secondary'
                      : mobilidade.status === 'EM_ANDAMENTO'
                        ? 'default'
                        : 'destructive'
                  }
                  className="shrink-0"
                >
                  {getMobilidadeStatusLabel(mobilidade.status)}
                </Badge>
              </div>

              <div className="text-xs">
                Registrado em{' '}
                {formatDateToDateString(mobilidade.dataRegistro.toString())}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium">Descrição:</p>
                <p className="line-clamp-3 text-sm leading-relaxed">
                  {mobilidade.descricao}
                </p>
              </div>

              {mobilidade.usuario && (
                <div className="bg-muted flex items-center gap-2.5 rounded-lg p-2">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={mobilidade.usuario.fotoUrl || undefined}
                      alt={mobilidade.usuario.nome}
                    />
                    <AvatarFallback className="bg-gray-200 text-xs dark:bg-gray-700">
                      <UserIcon className="size-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-medium">
                      {mobilidade.usuario.nome}
                    </p>
                    <p className="truncate text-xs">
                      {mobilidade.usuario.email}
                    </p>
                  </div>
                </div>
              )}

              <Button asChild className="w-full">
                <Link
                  href={APP_ROUTES.MOBILIDADE_DETALHE(mobilidade.id)}
                  className="flex items-center justify-center gap-2 text-xs"
                >
                  Ver detalhes completos
                  <ExternalLinkIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

/**
 * Componente de controle de localização do usuário
 */
function LocationButton({
  onLocationFound
}: {
  onLocationFound: (location: { lat: number; lng: number }) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const map = useMap()

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocalização não suportada pelo navegador')
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const location = { lat: latitude, lng: longitude }
        onLocationFound(location)

        if (map) {
          map.panTo(location)
          map.setZoom(14)
        }

        toast.success('Localização encontrada!')
        setIsLoading(false)
      },
      () => {
        toast.error('Não foi possível obter sua localização')
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  return (
    <Button
      onClick={handleGetLocation}
      disabled={isLoading}
      className="h-9 gap-2 shadow-lg"
    >
      <NavigationIcon className="size-4" />
      {isLoading ? 'Localizando...' : 'Minha Localização'}
    </Button>
  )
}

/**
 * Componente interno que gerencia eventos do mapa
 */
function MapEventHandler({ onMapClick }: { onMapClick: () => void }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const listener = map.addListener('click', onMapClick)

    return () => {
      listener?.remove()
    }
  }, [map, onMapClick])

  return null
}

/**
 * Componente que gerencia a navegação para mobilidade selecionada
 */
function MapNavigator({
  selectedMobilidadeId,
  mobilidades,
  onNavigate
}: {
  selectedMobilidadeId?: string
  mobilidades: MobilidadeResponseDTO[]
  onNavigate: (id: string) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedMobilidadeId && map) {
      const mobilidade = mobilidades.find((m) => m.id === selectedMobilidadeId)
      if (mobilidade) {
        map.panTo({ lat: mobilidade.latitude, lng: mobilidade.longitude })
        map.setZoom(16)
        onNavigate(mobilidade.id)
      }
    }
  }, [selectedMobilidadeId, map, mobilidades, onNavigate])

  return null
}

/**
 * Componente principal do mapa interativo de mobilidades
 */
export function MobilidadeMap({
  mobilidades,
  apiKey,
  selectedMobilidadeId,
  onMarkerClick,
  selectedFilters: externalSelectedFilters,
  onFiltersChange
}: MobilidadeMapProps) {
  const [internalSelectedFilters, setInternalSelectedFilters] = useState<
    Set<MobilidadeStatus>
  >(new Set(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO']))

  // Usa filtros externos se fornecidos, senão usa internos
  const selectedFilters = externalSelectedFilters || internalSelectedFilters
  const setSelectedFilters = onFiltersChange || setInternalSelectedFilters

  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [hasApiError, setHasApiError] = useState(false)

  // Usa selectedMobilidadeId como activeMarker
  const activeMarker = selectedMobilidadeId || null

  // Tenta obter localização do usuário ao montar
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          // Silenciosamente falha, usa fallback
        },
        { timeout: 5000 }
      )
    }
  }, [])

  // Filtra mobilidades baseado nos filtros selecionados
  const mobilidadesFiltradas = useMemo(() => {
    return mobilidades.filter((m) => selectedFilters.has(m.status))
  }, [mobilidades, selectedFilters])

  // Calcula o centro do mapa
  const mapCenter = useMemo(() => {
    // Prioriza localização do usuário se disponível
    if (userLocation) {
      return userLocation
    }

    // Senão, usa a média das mobilidades filtradas
    if (mobilidadesFiltradas.length > 0) {
      return {
        lat:
          mobilidadesFiltradas.reduce((sum, m) => sum + m.latitude, 0) /
          mobilidadesFiltradas.length,
        lng:
          mobilidadesFiltradas.reduce((sum, m) => sum + m.longitude, 0) /
          mobilidadesFiltradas.length
      }
    }

    // Fallback: Centro de MS
    return { lat: -20.4697, lng: -54.6201 }
  }, [userLocation, mobilidadesFiltradas])

  const handleMarkerClick = (mobilidadeId: string) => {
    if (onMarkerClick) {
      // Se já está selecionado, desmarca
      onMarkerClick(activeMarker === mobilidadeId ? '' : mobilidadeId)
    }
  }

  const toggleFilter = (status: MobilidadeStatus) => {
    const newFilters = new Set(selectedFilters)
    if (newFilters.has(status)) {
      newFilters.delete(status)
    } else {
      newFilters.add(status)
    }
    setSelectedFilters(newFilters)
  }

  const clearFilters = () => {
    setSelectedFilters(new Set())
  }

  const setAllFilters = () => {
    setSelectedFilters(
      new Set(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'])
    )
  }

  // Se houver erro na API, mostrar mensagem de erro
  if (hasApiError) {
    return (
      <Card className="bg-card h-full">
        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <AlertCircleIcon className="text-destructive h-16 w-16" />
          <div className="max-w-md">
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              Mapa indisponível
            </h3>
            <p className="text-muted-foreground text-sm">
              O mapa interativo está indisponível no momento.
              <br />
              <br />
              Por favor, entre em contato com o administrador do sistema.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <APIProvider
      apiKey={apiKey}
      onLoad={() => setHasApiError(false)}
      onError={() => setHasApiError(true)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <Map
          defaultCenter={mapCenter}
          defaultZoom={
            userLocation ? 15 : mobilidadesFiltradas.length > 0 ? 12 : 7
          }
          mapId="MAPA_INTERATIVO_MOBILIDADES"
          gestureHandling="greedy"
          disableDefaultUI={false}
          className="h-full w-full"
          style={{ borderRadius: '0.5rem' }}
        >
          {/* Monitor de erro da API */}
          <APIErrorHandler onError={() => setHasApiError(true)} />

          {/* Navegador - deve estar dentro do Map para usar useMap */}
          <MapNavigator
            selectedMobilidadeId={selectedMobilidadeId}
            mobilidades={mobilidades}
            onNavigate={onMarkerClick || (() => {})}
          />

          <MapEventHandler
            onMapClick={() => onMarkerClick && onMarkerClick('')}
          />

          {mobilidadesFiltradas.map((mobilidade) => (
            <MobilidadeMarker
              key={mobilidade.id}
              mobilidade={mobilidade}
              onMarkerClick={() => handleMarkerClick(mobilidade.id)}
              isOpen={activeMarker === mobilidade.id}
            />
          ))}

          {/* Marcador da localização do usuário */}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 shadow-lg ring-4 ring-blue-200/50">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </AdvancedMarker>
          )}
        </Map>

        {/* Botão de filtros */}
        <div className="absolute bottom-8 left-4 flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="h-9 gap-2 shadow-lg"
          >
            <FilterIcon className="size-4" />
            Filtros
            {selectedFilters.size > 0 && selectedFilters.size < 4 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {selectedFilters.size}
              </Badge>
            )}
          </Button>

          <LocationButton onLocationFound={setUserLocation} />
        </div>

        {/* Painel de filtros */}
        {showFilters && (
          <div className="bg-background absolute bottom-20 left-4 w-64 rounded-lg p-3 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Filtrar por Status</p>
              <Button
                onClick={() => setShowFilters(false)}
                variant="ghost"
                className="size-6 p-0"
              >
                <XIcon className="size-3" />
              </Button>
            </div>

            <div className="space-y-2">
              {(
                [
                  'PENDENTE',
                  'EM_ANDAMENTO',
                  'CONCLUIDO',
                  'CANCELADO'
                ] as MobilidadeStatus[]
              ).map((status) => (
                <Button
                  key={status}
                  variant="ghost"
                  onClick={() => toggleFilter(status)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors"
                >
                  <div
                    className={`flex size-4 items-center justify-center rounded border-2 ${
                      selectedFilters.has(status)
                        ? 'border-primary bg-primary'
                        : 'border-gray-400 dark:border-gray-600'
                    }`}
                  >
                    {selectedFilters.has(status) && (
                      <CheckIcon className="text-primary-foreground size-3" />
                    )}
                  </div>
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: STATUS_PIN_COLORS[status] }}
                  />
                  <span className="flex-1 text-xs">
                    {getMobilidadeStatusLabel(status)}
                  </span>
                  <span className="text-xs">
                    {mobilidades.filter((m) => m.status === status).length}
                  </span>
                </Button>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full text-xs"
              >
                Limpar Filtros
              </Button>
              <Button
                onClick={setAllFilters}
                variant="outline"
                className="w-full text-xs"
              >
                Selecionar Todos
              </Button>
            </div>
          </div>
        )}

        {/* Legenda do mapa */}
        <div className="bg-background absolute top-16 left-2 rounded-lg border border-none p-2.5 shadow-lg">
          <p className="mb-1.5 text-xs font-semibold">Legenda:</p>
          <div className="space-y-1">
            {(
              [
                'PENDENTE',
                'EM_ANDAMENTO',
                'CONCLUIDO',
                'CANCELADO'
              ] as MobilidadeStatus[]
            ).map((status) => (
              <div
                key={status}
                className={`flex items-center gap-2 transition-all ${
                  !selectedFilters.has(status) ? 'opacity-40' : ''
                }`}
              >
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_PIN_COLORS[status] }}
                />
                <span className="text-xs">
                  {getMobilidadeStatusLabel(status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contador de mobilidades */}
        <div className="bg-background absolute top-3.5 right-16 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs">
            {selectedFilters.size === 0 ? (
              <>
                <span className="font-semibold">0</span>
                {' de '}
                <span className="font-semibold">{mobilidades.length}</span>{' '}
                {mobilidades.length === 1 ? 'ocorrência' : 'ocorrências'}
              </>
            ) : (
              <>
                <span className="font-semibold">
                  {mobilidadesFiltradas.length}
                </span>
                {selectedFilters.size < 4 && (
                  <>
                    {' de '}
                    <span className="font-semibold">{mobilidades.length}</span>
                  </>
                )}{' '}
                {mobilidades.length === 1 ? 'ocorrência' : 'ocorrências'}
              </>
            )}
          </p>
        </div>
      </div>
    </APIProvider>
  )
}
