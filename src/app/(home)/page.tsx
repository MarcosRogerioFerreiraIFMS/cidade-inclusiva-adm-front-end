import {
  AccessibilityIcon,
  BusFrontIcon,
  ContactIcon,
  NewspaperIcon,
  TriangleAlertIcon,
  WrenchIcon
} from 'lucide-react'

import { Container } from '@/app/_components/Container'
import { InfoCard } from '@/app/_components/InfoCard'
import { QuickActionCard } from '@/app/_components/QuickActionCard'

const QuickActions = [
  {
    title: 'Ocorrências',
    description: 'Visualize tudo sobre ocorrências',
    href: '/ocorrencias'
  },
  {
    title: 'Acessibilidade Urbana',
    description: 'Visualize tudo sobre Acessibilidade Urbana',
    href: '/acessibilidade-urbana'
  },
  {
    title: 'Contatos',
    description: 'Visualize tudo sobre Contatos',
    href: '/contatos'
  },
  {
    title: 'Notícias',
    description: 'Visualize tudo sobre Notícias',
    href: '/noticias'
  },
  {
    title: 'Transporte',
    description: 'Visualize tudo sobre Transporte',
    href: '/transporte'
  },
  {
    title: 'Oficinas de Manutenção',
    description: 'Visualize tudo sobre Oficinas de Manutenção',
    href: '/oficinas-manutencao'
  }
]

const summaryOfLastThreeMonths = [
  {
    title: 'Acessibilidade Urbana',
    description: 'Total de Locais em 90 dias',
    value: 242,
    icon: AccessibilityIcon
  },
  {
    title: 'Contatos',
    description: 'Total de Contatos em 90 dias',
    value: 88,
    icon: ContactIcon
  },
  {
    title: 'Manuntenção',
    description: 'Total Oficinas em 90 dias',
    value: 4,
    icon: WrenchIcon
  },
  {
    title: 'Notícias',
    description: 'Total de Notícias em 90 dias',
    value: 12,
    icon: NewspaperIcon
  },
  {
    title: 'Ocorrências',
    description: 'Total de Ocorrências em 90 dias',
    value: 32,
    icon: TriangleAlertIcon
  },
  {
    title: 'Transporte',
    description: 'Total de Transportes em 90 dias',
    value: 6,
    icon: BusFrontIcon
  }
]

export default function Home() {
  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">Acesso Rápido</h2>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {QuickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </section>

      <h2 className="mt-5 text-2xl">Resumo dos últimos 3 meses</h2>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {summaryOfLastThreeMonths.map((summary, index) => (
          <InfoCard key={index} {...summary} />
        ))}
      </section>
    </Container>
  )
}
