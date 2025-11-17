'use client'

import { Card, CardContent } from '@/app/_components/ui/card'
import { AlertCircleIcon } from 'lucide-react'
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Verifica se é um erro relacionado ao Google Maps
    const isMapError =
      error.message.includes('Maps') ||
      error.message.includes('InvalidKeyMapError') ||
      error.message.includes('getRootNode') ||
      error.message.includes('AdvancedMarker')

    if (isMapError) {
      this.setState({ hasError: true })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-card h-full">
          <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <AlertCircleIcon className="text-destructive size-16" />
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

    return this.props.children
  }
}
