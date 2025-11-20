import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getMotoristas } from '@/app/_services/motoristaService'
import { MotoristaTableActions } from '../_components/motorista-table-actions'
import { motoristaTableColumns } from '../_components/motorista-table-columns'

export const dynamic = 'force-dynamic'

export default async function MotoristaListarPage() {
  const motoristas = await getMotoristas()

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Motoristas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todos os motoristas do sistema ({motoristas.length}{' '}
          {motoristas.length === 1 ? 'motorista' : 'motoristas'})
        </p>
      </div>

      <DataTable
        columns={motoristaTableColumns}
        data={motoristas}
        searchKey="nome"
        searchPlaceholder="Pesquisar por nome..."
        actions={<MotoristaTableActions />}
        enableColumnVisibility={true}
      />
    </LayoutDashboard>
  )
}
