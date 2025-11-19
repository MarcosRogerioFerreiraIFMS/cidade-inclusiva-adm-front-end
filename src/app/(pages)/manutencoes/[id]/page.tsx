import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import {
  getManutencaoById,
  getManutencaoComentarios
} from '@/app/_services/manutencaoService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { ManutencaoComentariosList } from './_components/manutencao-comentarios-list'
import { ManutencaoDetalhes } from './_components/manutencao-detalhes'

export const dynamic = 'force-dynamic'

interface ManutencaoDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ManutencaoDetalhesPage({
  params
}: ManutencaoDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const [manutencao, comentarios] = await Promise.all([
    getManutencaoById(id),
    getManutencaoComentarios(id)
  ])

  if (!manutencao) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <ManutencaoDetalhes manutencao={manutencao} />
      <ManutencaoComentariosList comentarios={comentarios} manutencaoId={id} />
    </LayoutDashboard>
  )
}
