import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getNoticiaById } from '@/app/_services/noticiaService'
import { notFound } from 'next/navigation'
import { NoticiaEditarForm } from '../../_components/noticia-editar-form'

export const dynamic = 'force-dynamic'

interface EditarNoticiaPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NoticiaEditarPage({
  params
}: EditarNoticiaPageProps) {
  const { id } = await params
  const noticia = await getNoticiaById(id)

  if (!noticia) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Editar Notícia</h1>
          <p className="text-muted-foreground mt-2">
            Edite as informações da notícia &quot;{noticia.titulo}&quot;
          </p>
        </div>

        <NoticiaEditarForm noticia={noticia} />
      </div>
    </LayoutDashboard>
  )
}
