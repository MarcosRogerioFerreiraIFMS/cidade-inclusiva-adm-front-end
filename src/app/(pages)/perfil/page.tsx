import { checkAuth } from '@/app/_actions/authActions'
import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PerfilForm } from './_components/perfil-form'

export const metadata: Metadata = {
  title: 'Edite seu Perfil - Cidade Inclusiva',
  description: 'Edite suas informações pessoais e configurações de conta'
}

export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  // Buscar dados de autenticação no servidor
  const authData = await checkAuth()

  if (!authData?.user) {
    redirect(APP_ROUTES.LOGIN)
  }

  return (
    <LayoutDashboard>
      <div>
        <h1 className="text-2xl font-bold">Edite seu Perfil</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas informações pessoais e configurações de conta
        </p>
      </div>

      <PerfilForm usuario={authData.user} />
    </LayoutDashboard>
  )
}
