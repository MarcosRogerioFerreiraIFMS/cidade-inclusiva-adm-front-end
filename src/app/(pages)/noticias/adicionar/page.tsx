import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { NoticiaAdicionarForm } from '../_components/noticia-adicionar-form'

export default function NoticiaAdicionarPage() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">Adicionar Notícia</h1>
          <p className="text-muted-foreground mt-2">
            Crie uma nova notícia para o sistema
          </p>
        </div>

        <NoticiaAdicionarForm />
      </div>
    </LayoutDashboard>
  )
}
