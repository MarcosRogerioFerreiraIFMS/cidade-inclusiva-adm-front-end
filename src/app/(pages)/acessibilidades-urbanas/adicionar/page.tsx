import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { AcessibilidadeUrbanaAdicionarForm } from '../_components/acessibilidade-urbana-adicionar-form'

export default function AcessibilidadeUrbanaAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Acessibilidade Urbana</h1>
        <p className="text-muted-foreground mt-1">
          Crie uma nova acessibilidade urbana para o sistema
        </p>
      </div>

      <AcessibilidadeUrbanaAdicionarForm />
    </LayoutDashboard>
  )
}
