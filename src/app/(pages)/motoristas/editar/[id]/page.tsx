import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getMotoristaById } from '@/app/_services/motoristaService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { MotoristaEditarForm } from '../../_components/motorista-editar-form'

export const dynamic = 'force-dynamic'

interface MotoristaEditarPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MotoristaEditarPage({
  params
}: MotoristaEditarPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const motorista = await getMotoristaById(id)

  if (!motorista) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Editar Motorista</h1>
        <p className="text-muted-foreground mt-1">
          Atualize as informações do motorista {motorista.nome}
        </p>
      </div>

      <MotoristaEditarForm motorista={motorista} />
    </LayoutDashboard>
  )
}
