import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getManutencoes } from '@/app/_services/manutencaoService'
import { ManutencaoTableActions } from '../_components/manutencao-table-actions'
import { manutencaoTableColumns } from '../_components/manutencao-table-columns'

export const dynamic = 'force-dynamic'

export default async function ManutencaoListarPage() {
  const manutencoes = await getManutencoes()

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Oficinas de Manutenção</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todas as oficinas de manutenção do sistema (
          {manutencoes.length}{' '}
          {manutencoes.length === 1 ? 'oficina' : 'oficinas'})
        </p>
      </div>

      <DataTable
        columns={manutencaoTableColumns}
        data={manutencoes}
        searchKey="nome"
        searchPlaceholder="Pesquisar por nome..."
        actions={<ManutencaoTableActions />}
        enableColumnVisibility={true}
      />
    </LayoutDashboard>
  )
}
