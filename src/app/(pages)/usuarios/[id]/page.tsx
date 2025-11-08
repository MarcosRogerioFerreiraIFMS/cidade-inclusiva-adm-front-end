import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import {
  getUsuarioById,
  getUsuarioComentarios
} from '@/app/_services/usuarioService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { UsuarioComentariosList } from './_components/usuario-comentarios-list'
import { UsuarioDetalhes } from './_components/usuario-detalhes'

export const dynamic = 'force-dynamic'

interface UsuarioDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UsuarioDetalhesPage({
  params
}: UsuarioDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const [usuario, comentarios] = await Promise.all([
    getUsuarioById(id),
    getUsuarioComentarios(id)
  ])

  if (!usuario) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <UsuarioDetalhes usuario={usuario} />
      <UsuarioComentariosList comentarios={comentarios} usuarioId={id} />
    </LayoutDashboard>
  )
}
