import { ProfissionalAdicionarForm } from '@/app/(pages)/profissionais/_components/profissional-adicionar-form'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'

export default function ProfissionalAdicionarPage() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Adicionar Profissional</h1>
          <p className="text-muted-foreground mt-2">
            Crie um novo profissional para o sistema
          </p>
        </div>

        <ProfissionalAdicionarForm />
      </div>
    </LayoutDashboard>
  )
}
