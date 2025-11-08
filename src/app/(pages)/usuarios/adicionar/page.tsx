import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { UsuarioAdicionarForm } from '../_components/usuario-adicionar-form'

export default function UsuarioAdicionarPage() {
  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Adicionar Usuário</h1>
        <p className="text-muted-foreground mt-1">
          Crie um novo usuário para o sistema
        </p>
      </div>

      <UsuarioAdicionarForm />
    </LayoutDashboard>
  )
}
