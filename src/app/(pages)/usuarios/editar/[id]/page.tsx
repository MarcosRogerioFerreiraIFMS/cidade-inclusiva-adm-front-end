import { UsuarioEditarForm } from '@/app/(pages)/usuarios/_components/usuario-editar-form'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getUsuarioById } from '@/app/_services/usuarioService'
import { notFound } from 'next/navigation'

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Editar Usuário</h1>
          <p className="text-muted-foreground mt-2">
            Edite as informações do usuário &quot;{usuario.nome}&quot;
          </p>
        </div>

        <UsuarioEditarForm usuario={usuario} />
      </div>
    </LayoutDashboard>
  )
}
