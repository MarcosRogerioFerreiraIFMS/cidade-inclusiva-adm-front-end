import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getProfissionalById } from '@/app/_services/profissionalService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { ProfissionalEditarForm } from '../../_components/profissional-editar-form'

export const dynamic = 'force-dynamic'

interface ProfissionalEditarPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProfissionalEditarPage({
  params
}: ProfissionalEditarPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const profissional = await getProfissionalById(id)

  if (!profissional) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Editar Profissional</h1>
        <p className="text-muted-foreground mt-1">
          Atualize as informações de {profissional.nome}
        </p>
      </div>

      <ProfissionalEditarForm profissional={profissional} />
    </LayoutDashboard>
  )
}
