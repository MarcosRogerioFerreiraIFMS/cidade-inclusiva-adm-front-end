import { Container } from '../_components/container'
import { QuickActionCard } from '../_components/QuickActionCard'

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
export default function Home() {
  return (
    <Container>
      <h2 className="text-2xl">Acesso Rápido</h2>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {QuickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </section>
    </Container>
  )
}
