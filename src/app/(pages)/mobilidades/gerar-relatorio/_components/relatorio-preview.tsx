'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/_components/ui/card'
import type { MobilidadeResponseDTO } from '@/app/_dtos/response'
import type { MobilidadeRelatorioFilterDTO } from '@/app/_schemas/mobilidadeRelatorioSchema'
import { EyeIcon, EyeOffIcon, FileTextIcon, Loader2Icon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const PDFViewerComponent = dynamic(
  () => import('./pdf-components').then((mod) => mod.PDFViewerComponent),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100vh-22rem)] items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">Carregando preview do PDF...</p>
      </div>
    )
  }
)

const PDFDownloadButton = dynamic(
  () => import('./pdf-components').then((mod) => mod.PDFDownloadButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled>
        <Loader2Icon className="animate-spin" />
        <span>Carregando...</span>
      </Button>
    )
  }
)

interface RelatorioPreviewProps {
  mobilidades: MobilidadeResponseDTO[]
  filters: MobilidadeRelatorioFilterDTO
}

export function RelatorioPreview({
  mobilidades,
  filters
}: RelatorioPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleTogglePreview = () => {
    if (!showPreview) {
      setIsProcessing(true)
      // Simula um pequeno delay para dar feedback visual
      setTimeout(() => {
        setShowPreview(true)
        setIsProcessing(false)
      }, 300)
    } else {
      setShowPreview(false)
    }
  }

  if (mobilidades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview do Relatório</CardTitle>
          <CardDescription>
            Visualize como o PDF ficará antes de baixar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileTextIcon className="text-muted-foreground mb-4 size-12" />
            <p className="text-muted-foreground">
              Nenhuma ocorrência encontrada com os filtros aplicados.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Ajuste os filtros para incluir mais dados no relatório.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Preview do Relatório</CardTitle>
            <CardDescription>
              Visualize como o PDF ficará antes de baixar ({mobilidades.length}{' '}
              {mobilidades.length === 1 ? 'ocorrência' : 'ocorrências'})
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleTogglePreview}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Processando...
                </>
              ) : showPreview ? (
                <>
                  <EyeOffIcon className="size-4" />
                  Ocultar
                </>
              ) : (
                <>
                  <EyeIcon className="size-4" />
                  Visualizar
                </>
              )}
            </Button>
            <PDFDownloadButton mobilidades={mobilidades} filters={filters} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {isProcessing && (
          <div className="bg-background/80 absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2Icon className="text-primary size-12 animate-spin" />
              <p className="text-sm font-medium">
                Gerando visualização do PDF...
              </p>
              <p className="text-muted-foreground text-xs">
                Isso pode levar alguns segundos
              </p>
            </div>
          </div>
        )}
        {showPreview ? (
          <div className="h-[calc(100vh-22rem)] overflow-hidden rounded-lg border">
            <PDFViewerComponent mobilidades={mobilidades} filters={filters} />
          </div>
        ) : (
          <div className="bg-muted/20 flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 text-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <FileTextIcon className="text-primary size-12" />
            </div>
            <p className="mb-2 text-lg font-semibold">
              Pronto para visualizar o relatório!
            </p>
            <p className="text-muted-foreground max-w-md text-sm">
              Clique em &quot;Visualizar&quot; para ver o preview do PDF com
              gráficos, estatísticas e links para o Google Maps
            </p>
            <p className="text-muted-foreground mt-3 text-xs">
              Ou clique em &quot;Baixar PDF&quot; para fazer o download
              diretamente
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
