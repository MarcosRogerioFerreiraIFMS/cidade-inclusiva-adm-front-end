import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getAcessibilidadesUrbanas } from '@/app/_services/acessibilidadeUrbanaService'
import { AcessibilidadeUrbanaTableActions } from '../_components/acessibilidade-urbana-table-actions'
import { acessibilidadeUrbanaTableColumns } from '../_components/acessibilidade-urbana-table-columns'

export const dynamic = 'force-dynamic'

export default async function AcessibilidadeUrbanaListarPage() {
  const acessibilidades = await getAcessibilidadesUrbanas()

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Acessibilidades Urbanas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todas as acessibilidades urbanas do sistema (
          {acessibilidades.length}{' '}
          {acessibilidades.length === 1
            ? 'estabelecimento'
            : 'estabelecimentos'}
          )
        </p>
      </div>

      <DataTable
        columns={acessibilidadeUrbanaTableColumns}
        data={acessibilidades}
        searchKey="nome"
        searchPlaceholder="Pesquisar por nome..."
        actions={<AcessibilidadeUrbanaTableActions />}
        enableColumnVisibility={true}
      />
    </LayoutDashboard>
  )
}
