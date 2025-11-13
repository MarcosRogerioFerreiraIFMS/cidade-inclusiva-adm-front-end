import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getMobilidadeById } from '@/app/_services/mobilidadeService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { MobilidadeDetalhes } from './_components/mobilidade-detalhes'

export const dynamic = 'force-dynamic'

interface MobilidadeDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MobilidadeDetalhesPage({
  params
}: MobilidadeDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const mobilidade = await getMobilidadeById(id)

  if (!mobilidade) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <MobilidadeDetalhes mobilidade={mobilidade} />
    </LayoutDashboard>
  )
}
