import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { ProfissionalAdicionarForm } from '../_components/profissional-adicionar-form'

export default function ProfissionalAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Profissional</h1>
        <p className="text-muted-foreground mt-1">
          Crie um novo profissional para o sistema
        </p>
      </div>

      <ProfissionalAdicionarForm />
    </LayoutDashboard>
  )
}
