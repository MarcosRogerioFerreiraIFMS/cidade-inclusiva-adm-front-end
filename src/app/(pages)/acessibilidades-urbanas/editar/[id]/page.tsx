import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getAcessibilidadeUrbanaById } from '@/app/_services/acessibilidadeUrbanaService'
import { notFound } from 'next/navigation'
import { AcessibilidadeUrbanaEditarForm } from '../../_components/acessibilidade-urbana-editar-form'

export const dynamic = 'force-dynamic'

interface AcessibilidadeUrbanaEditarPageProps {
  params: Promise<{ id: string }>
}

export default async function AcessibilidadeUrbanaEditarPage({
  params
}: AcessibilidadeUrbanaEditarPageProps) {
  const { id } = await params
  const acessibilidadeUrbana = await getAcessibilidadeUrbanaById(id)

  if (!acessibilidadeUrbana) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Editar Acessibilidade Urbana</h1>
        <p className="text-muted-foreground mt-1">
          Edite as informações de {acessibilidadeUrbana.nome}
        </p>
      </div>

      <AcessibilidadeUrbanaEditarForm
        acessibilidadeUrbana={acessibilidadeUrbana}
      />
    </LayoutDashboard>
  )
}
