import { UsuarioAdicionarForm } from '@/app/(pages)/usuarios/_components/usuario-adicionar-form'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'

export default function UsuarioAdicionarPage() {
  return (
    <LayoutDashboard>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Adicionar Usuário</h1>
          <p className="text-muted-foreground mt-2">
            Crie um novo usuário para o sistema
          </p>
        </div>

        <UsuarioAdicionarForm />
      </div>
    </LayoutDashboard>
  )
}
