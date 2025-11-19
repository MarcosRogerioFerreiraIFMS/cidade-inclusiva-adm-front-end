import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { ManutencaoAdicionarForm } from '../_components/manutencao-adicionar-form'

export default function ManutencaoAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Oficina de Manutenção</h1>
        <p className="text-muted-foreground mt-1">
          Crie uma nova oficina de manutenção para o sistema
        </p>
      </div>

      <ManutencaoAdicionarForm />
    </LayoutDashboard>
  )
}
