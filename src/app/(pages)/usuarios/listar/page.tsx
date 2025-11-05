import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getUsuarios } from '@/app/_services/usuarioService'
import { UsuarioTableActions } from '../_components/usuario-table-actions'
import { usuarioTableColumns } from '../_components/usuario-table-columns'

export const dynamic = 'force-dynamic'

export default async function UsuarioListarPage() {
  const usuarios = await getUsuarios()

  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os usuários do sistema ({usuarios.length}{' '}
            {usuarios.length === 1 ? 'usuário' : 'usuários'})
          </p>
        </div>

        <DataTable
          columns={usuarioTableColumns}
          data={usuarios}
          searchKey="nome"
          searchPlaceholder="Pesquisar por nome..."
          actions={<UsuarioTableActions />}
          enableColumnVisibility={true}
        />
      </div>
    </LayoutDashboard>
  )
}
