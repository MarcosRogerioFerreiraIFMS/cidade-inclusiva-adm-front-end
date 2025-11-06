import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { QuickActionCard } from '@/app/_components/quick-action-card'
import { QuickActionImageEnum } from '@/app/_enums/quickActionImageEnum'
import type { QuickActionType } from '@/app/_types/quickActionType'

const QuickActions: QuickActionType[] = [
  {
    title: 'Ocorrências',
    description: 'Visualize tudo sobre ocorrências',
    imageSrc: QuickActionImageEnum.OCORRENCIAS,
    href: '/ocorrencias'
  },
  {
    title: 'Acessibilidade Urbana',
    description: 'Visualize tudo sobre Acessibilidade Urbana',
    imageSrc: QuickActionImageEnum.ACESSIBILIDADE_URBANA,
    href: '/acessibilidade-urbana'
  },
  {
    title: 'Profissionais',
    description: 'Visualize tudo sobre Profissionais',
    imageSrc: QuickActionImageEnum.PROFISSIONAIS,
    href: '/profissionais'
  },
  {
    title: 'Notícias',
    description: 'Visualize tudo sobre Notícias',
    imageSrc: QuickActionImageEnum.NOTICIAS,
    href: '/noticias'
  },
  {
    title: 'Transportes',
    description: 'Visualize tudo sobre Transportes',
    imageSrc: QuickActionImageEnum.TRANSPORTES,
    href: '/transportes'
  },
  {
    title: 'Oficinas de Manutenção',
    description: 'Visualize tudo sobre Oficinas de Manutenção',
    imageSrc: QuickActionImageEnum.OFICINAS_MANUTENCAO,
    href: '/oficinas-manutencao'
  },
  {
    title: 'Usuários',
    description: 'Visualize tudo sobre Usuários',
    imageSrc: QuickActionImageEnum.USUARIOS,
    href: '/usuarios'
  }
].sort((a, b) => a.title.localeCompare(b.title))

export default function Home() {
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
