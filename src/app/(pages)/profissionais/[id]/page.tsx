import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import {
  getProfissionalById,
  getProfissionalComentarios
} from '@/app/_services/profissionalService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { ProfissionalComentariosList } from './_components/profissional-comentarios-list'
import { ProfissionalDetalhes } from './_components/profissional-detalhes'

export const dynamic = 'force-dynamic'

interface ProfissionalDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProfissionalDetalhesPage({
  params
}: ProfissionalDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const [profissional, comentarios] = await Promise.all([
    getProfissionalById(id),
    getProfissionalComentarios(id)
  ])

  if (!profissional) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <ProfissionalDetalhes profissional={profissional} />
      <ProfissionalComentariosList
        comentarios={comentarios}
        profissionalId={id}
      />
    </LayoutDashboard>
  )
}
