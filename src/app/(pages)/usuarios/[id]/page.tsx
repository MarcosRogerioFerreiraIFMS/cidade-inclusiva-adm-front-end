import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { TipoUsuarioEnum } from '@/app/_enums/tipoUsuarioEnum'
import { getMobilidadesByUsuarioId } from '@/app/_services/mobilidadeService'
import {
  getUsuarioById,
  getUsuarioComentarios
} from '@/app/_services/usuarioService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'
import { UsuarioComentariosList } from './_components/usuario-comentarios-list'
import { UsuarioDetalhes } from './_components/usuario-detalhes'
import { UsuarioMobilidadesList } from './_components/usuario-mobilidades-list'

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

  const isAdmin = usuario.tipo === TipoUsuarioEnum.ADMIN

  const [comentarios, mobilidades] = await Promise.all([
    isAdmin ? Promise.resolve([]) : getUsuarioComentarios(id),
    isAdmin ? Promise.resolve([]) : getMobilidadesByUsuarioId(id)
  ])

  return (
    <LayoutDashboard>
      <UsuarioDetalhes usuario={usuario} />
      {!isAdmin && (
        <>
          <UsuarioComentariosList comentarios={comentarios} usuarioId={id} />
          <UsuarioMobilidadesList mobilidades={mobilidades} />
        </>
      )}
    </LayoutDashboard>
  )
}
