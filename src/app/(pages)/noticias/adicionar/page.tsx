import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { NoticiaAdicionarForm } from '../_components/noticia-adicionar-form'

export default function NoticiaAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Notícia</h1>
        <p className="text-muted-foreground mt-1">
          Crie uma nova notícia para o sistema
        </p>
      </div>

      <NoticiaAdicionarForm />
    </LayoutDashboard>
  )
}
