import { ProfissionalEditarForm } from '@/app/(pages)/profissionais/_components/profissional-editar-form'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getProfissionalById } from '@/app/_services/profissionalService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Editar Profissional</h1>
          <p className="text-muted-foreground mt-2">
            Atualize as informações de {profissional.nome}
          </p>
        </div>

        <ProfissionalEditarForm profissional={profissional} />
      </div>
    </LayoutDashboard>
  )
}
