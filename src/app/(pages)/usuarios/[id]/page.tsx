import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getUsuarioById } from '@/app/_services/usuarioService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
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

  const usuario = await getUsuarioById(id)

  if (!usuario) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <UsuarioDetalhes usuario={usuario} />
    </LayoutDashboard>
  )
}
