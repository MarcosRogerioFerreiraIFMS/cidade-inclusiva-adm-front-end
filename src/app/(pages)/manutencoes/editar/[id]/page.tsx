import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getManutencaoById } from '@/app/_services/manutencaoService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { ManutencaoEditarForm } from '../../_components/manutencao-editar-form'

export const dynamic = 'force-dynamic'

interface ManutencaoEditarPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ManutencaoEditarPage({
  params
}: ManutencaoEditarPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const manutencao = await getManutencaoById(id)

  if (!manutencao) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Editar Oficina de Manutenção</h1>
        <p className="text-muted-foreground mt-1">
          Atualize os dados da oficina &quot;{manutencao.nome}&quot;
        </p>
      </div>

      <ManutencaoEditarForm manutencao={manutencao} />
    </LayoutDashboard>
  )
}
