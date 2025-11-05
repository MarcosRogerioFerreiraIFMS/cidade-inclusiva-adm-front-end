import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { QuickActionCard } from '@/app/_components/quick-action-card'
import { QuickActionImageEnum } from '@/app/_enums/quickActionImageEnum'
import type { QuickActionType } from '@/app/_types/quickActionType'

export default async function UsuariosPage() {
  const QuickActions: QuickActionType[] = [
    {
      title: 'Listar Usuários',
      description: 'Visualize uma tabela com todos os usuários',
      imageSrc: QuickActionImageEnum.USUARIOS,
      href: '/usuarios/listar'
    },
    {
      title: 'Adicionar Usuário',
      description: 'Adicione um novo usuário ao sistema',
      imageSrc: QuickActionImageEnum.USUARIOS,
      href: '/usuarios/adicionar'
    }
  ]

  return (
    <LayoutDashboard>
      <h2 className="text-2xl">Acesso Rápido</h2>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5">
        {QuickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </section>
    </LayoutDashboard>
  )
}
