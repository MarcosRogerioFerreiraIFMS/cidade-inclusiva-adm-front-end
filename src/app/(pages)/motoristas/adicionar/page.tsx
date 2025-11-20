import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { MotoristaAdicionarForm } from '../_components/motorista-adicionar-form'

export default function MotoristaAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Motorista</h1>
        <p className="text-muted-foreground mt-1">
          Crie um novo motorista para o sistema
        </p>
      </div>

      <MotoristaAdicionarForm />
    </LayoutDashboard>
  )
}
