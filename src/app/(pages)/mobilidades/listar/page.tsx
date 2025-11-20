import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getMobilidades } from '@/app/_services/mobilidadeService'
import { MobilidadeTableActions } from '../_components/mobilidade-table-actions'
import { mobilidadeTableColumns } from '../_components/mobilidade-table-columns'

export const dynamic = 'force-dynamic'

export default async function MobilidadeListarPage() {
  const mobilidades = await getMobilidades()

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Ocorrências de Mobilidade</h1>
        <p className="text-muted-foreground mt-1">
          Visualize todas as mobilidades registradas no sistema (
          {mobilidades.length}{' '}
          {mobilidades.length === 1 ? 'mobilidade' : 'mobilidades'})
        </p>
      </div>

      <DataTable
        columns={mobilidadeTableColumns}
        data={mobilidades}
        searchKey="descricao"
        searchPlaceholder="Pesquisar por descrição..."
        actions={<MobilidadeTableActions />}
        enableColumnVisibility={true}
      />
    </LayoutDashboard>
  )
}
