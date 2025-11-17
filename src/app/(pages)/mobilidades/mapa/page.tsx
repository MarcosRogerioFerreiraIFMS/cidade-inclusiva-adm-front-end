import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { Card, CardContent } from '@/app/_components/ui/card'
import { getMobilidades } from '@/app/_services/mobilidadeService'
import { MapIcon } from 'lucide-react'
import { Suspense } from 'react'
import { MobilidadeMapWithList } from '../_components/mobilidade-map-with-list'

export const dynamic = 'force-dynamic'

interface MapaInterativoPageProps {
  searchParams: Promise<{
    id?: string
  }>
}

/**
 * Componente de loading para o mapa
 */
function MapLoadingSkeleton() {
  return (
    <Card className="h-[calc(100vh-14rem)]">
      <CardContent className="flex h-full items-center justify-center p-6">
        <div className="space-y-4 text-center">
          <div className="bg-muted mx-auto h-16 w-16 animate-pulse rounded-full" />
          <div className="space-y-2">
            <div className="bg-muted mx-auto h-4 w-48 animate-pulse rounded" />
            <div className="bg-muted mx-auto h-3 w-64 animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Componente que carrega os dados e renderiza o mapa
 */
async function MapaInterativoContent({ selectedId }: { selectedId?: string }) {
  const mobilidades = await getMobilidades()

  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <Card className="h-[calc(100vh-14rem)]">
        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <MapIcon className="text-muted-foreground size-16" />
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

  if (mobilidades.length === 0) {
    return (
      <Card className="h-[calc(100vh-14rem)]">
        <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
          <MapIcon className="text-muted-foreground mb-4 size-16" />
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            Nenhuma ocorrência encontrada
          </h3>
          <p className="text-muted-foreground text-sm">
            Não há ocorrências de mobilidade para exibir no mapa.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="h-[calc(100vh-14rem)]">
      <MobilidadeMapWithList
        mobilidades={mobilidades}
        apiKey={apiKey}
        initialSelectedId={selectedId}
      />
    </div>
  )
}

export default async function MapaInterativoPage({
  searchParams
}: MapaInterativoPageProps) {
  const params = await searchParams
  const selectedId = params.id

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Mapa Interativo</h1>
        <p className="text-muted-foreground mt-1">
          Visualize todas as ocorrências de mobilidade em um mapa interativo
        </p>
      </div>

      <Suspense fallback={<MapLoadingSkeleton />}>
        <MapaInterativoContent selectedId={selectedId} />
      </Suspense>
    </LayoutDashboard>
  )
}
