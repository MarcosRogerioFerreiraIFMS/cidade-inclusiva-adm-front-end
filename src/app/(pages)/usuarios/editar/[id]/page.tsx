import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getUsuarioById } from '@/app/_services/usuarioService'
import { notFound } from 'next/navigation'
import { UsuarioEditarForm } from '../../_components/usuario-editar-form'

export const dynamic = 'force-dynamic'

interface EditarUsuarioPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UsuarioEditarPage({
  params
}: EditarUsuarioPageProps) {
  const { id } = await params
  const usuario = await getUsuarioById(id)

  if (!usuario) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Editar Usuário</h1>
        <p className="text-muted-foreground mt-1">
          Edite as informações do usuário &quot;{usuario.nome}&quot;
        </p>
      </div>

      <UsuarioEditarForm usuario={usuario} />
    </LayoutDashboard>
  )
}
