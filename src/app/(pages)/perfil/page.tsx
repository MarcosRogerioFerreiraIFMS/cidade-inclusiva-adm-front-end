import { checkAuth } from '@/app/_actions/authActions'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import type { Metadata } from 'next'
import { PerfilForm } from './_components/perfil-form'

export const metadata: Metadata = {
  title: 'Meu Perfil - Cidade Inclusiva',
  description: 'Edite suas informações pessoais e configurações de conta'
}

export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  const authData = await checkAuth()

  if (!authData || !authData.authenticated || !authData.user) {
    throw new Error('Usuário não autenticado')
  }

  const { user } = authData

  return (
    <LayoutDashboard>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e configurações de conta
        </p>
      </div>

      <PerfilForm usuario={user} />
    </LayoutDashboard>
  )
}
