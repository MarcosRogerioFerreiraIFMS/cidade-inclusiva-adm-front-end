import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { QuickActionCard } from '@/app/_components/quick-action-card'
import { QuickActionImageEnum } from '@/app/_enums/quickActionImageEnum'
import type { QuickActionType } from '@/app/_types/quickActionType'

export default async function NoticiaPage() {
  const QuickActions: QuickActionType[] = [
    {
      title: 'Listar Notícias',
      description: 'Visualize uma tabela com todas as notícias',
      imageSrc: QuickActionImageEnum.NOTICIAS,
      href: '/noticias/listar'
    },
    {
      title: 'Adicionar Notícia',
      description: 'Adicione uma nova notícia',
      imageSrc: QuickActionImageEnum.NOTICIAS,
      href: '/noticias/adicionar'
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
