import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import {
  getAcessibilidadeUrbanaById,
  getAcessibilidadeUrbanaComentarios
} from '@/app/_services/acessibilidadeUrbanaService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { AcessibilidadeUrbanaComentariosList } from './_components/acessibilidade-urbana-comentarios-list'
import { AcessibilidadeUrbanaDetalhes } from './_components/acessibilidade-urbana-detalhes'

export const dynamic = 'force-dynamic'

interface AcessibilidadeUrbanaDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AcessibilidadeUrbanaDetalhesPage({
  params
}: AcessibilidadeUrbanaDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const [acessibilidadeUrbana, comentarios] = await Promise.all([
    getAcessibilidadeUrbanaById(id),
    getAcessibilidadeUrbanaComentarios(id)
  ])

  if (!acessibilidadeUrbana) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <AcessibilidadeUrbanaDetalhes
        acessibilidadeUrbana={acessibilidadeUrbana}
      />
      <AcessibilidadeUrbanaComentariosList
        comentarios={comentarios}
        acessibilidadeUrbanaId={id}
      />
    </LayoutDashboard>
  )
}
