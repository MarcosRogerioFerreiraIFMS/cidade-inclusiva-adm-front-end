import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import {
  getMotoristaById,
  getMotoristaComentarios
} from '@/app/_services/motoristaService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { MotoristaComentariosList } from './_components/motorista-comentarios-list'
import { MotoristaDetalhes } from './_components/motorista-detalhes'

export const dynamic = 'force-dynamic'

interface MotoristaDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MotoristaDetalhesPage({
  params
}: MotoristaDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const [motorista, comentarios] = await Promise.all([
    getMotoristaById(id),
    getMotoristaComentarios(id)
  ])

  if (!motorista) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <MotoristaDetalhes motorista={motorista} />
      <MotoristaComentariosList comentarios={comentarios} motoristaId={id} />
    </LayoutDashboard>
  )
}
