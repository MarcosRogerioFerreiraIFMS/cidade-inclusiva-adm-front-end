import { DataTable } from '@/app/_components/data-table'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getNoticias } from '@/app/_services/noticiaService'
import { NoticiaTableActions } from '../_components/noticia-table-actions'
import { noticiaTableColumns } from '../_components/noticias-table-columns'

export const dynamic = 'force-dynamic'

export default async function NoticiaListarPage() {
  const noticias = await getNoticias()

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Notícias</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todas as notícias do sistema ({noticias.length}{' '}
          {noticias.length === 1 ? 'notícia' : 'notícias'})
        </p>
      </div>

      <DataTable
        columns={noticiaTableColumns}
        data={noticias}
        searchKey="titulo"
        searchPlaceholder="Pesquisar por título..."
        actions={<NoticiaTableActions />}
        enableColumnVisibility={true}
      />
    </LayoutDashboard>
  )
}
