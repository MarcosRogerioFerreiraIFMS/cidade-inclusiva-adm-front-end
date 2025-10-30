import { NoticiaDetalhes } from '@/app/(pages)/noticias/[id]/_components/noticia-detalhes'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { getNoticiaById } from '@/app/_services/noticiaService'
import { validateUuidV4 } from '@/app/_utils/validateUuid'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface NoticiaDetalhesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NoticiaDetalhesPage({
  params
}: NoticiaDetalhesPageProps) {
  const { id } = await params

  if (!validateUuidV4(id)) {
    notFound()
  }

  const noticia = await getNoticiaById(id)

  if (!noticia) {
    notFound()
  }

  return (
    <LayoutDashboard>
      <NoticiaDetalhes noticia={noticia} />
    </LayoutDashboard>
  )
}
