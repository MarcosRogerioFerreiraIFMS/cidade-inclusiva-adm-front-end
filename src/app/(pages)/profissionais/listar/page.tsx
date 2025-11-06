import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getProfissionais } from '@/app/_services/profissionalService'
import { ProfissionalTableActions } from '../_components/profissional-table-actions'
import { profissionalTableColumns } from '../_components/profissional-table-columns'

export const dynamic = 'force-dynamic'

export default async function ProfissionalListarPage() {
  const profissionais = await getProfissionais()

  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profissionais</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os profissionais do sistema ({profissionais.length}{' '}
            {profissionais.length === 1 ? 'profissional' : 'profissionais'})
          </p>
        </div>

        <DataTable
          columns={profissionalTableColumns}
          data={profissionais}
          searchKey="nome"
          searchPlaceholder="Pesquisar por nome..."
          actions={<ProfissionalTableActions />}
          enableColumnVisibility={true}
        />
      </div>
    </LayoutDashboard>
  )
}
