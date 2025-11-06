import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { QuickActionCard } from '@/app/_components/quick-action-card'
import { QuickActionImageEnum } from '@/app/_enums/quickActionImageEnum'
import type { QuickActionType } from '@/app/_types/quickActionType'

export default async function ProfissionaisPage() {
  const QuickActions: QuickActionType[] = [
    {
      title: 'Listar Profissionais',
      description: 'Visualize uma tabela com todos os profissionais',
      imageSrc: QuickActionImageEnum.PROFISSIONAIS,
      href: '/profissionais/listar'
    },
    {
      title: 'Adicionar Profissional',
      description: 'Adicione um novo profissional ao sistema',
      imageSrc: QuickActionImageEnum.PROFISSIONAIS,
      href: '/profissionais/adicionar'
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
