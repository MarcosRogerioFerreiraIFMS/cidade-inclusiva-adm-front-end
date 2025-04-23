import { Container } from '@/app/_components/Container'
import { QuickActionCard } from '@/app/_components/QuickActionCard'

const QuickActions = [
  {
    title: 'Listar Notícias',
    description: 'Visualize uma tabela com todas as notícias',
    href: '/noticias/listar'
  },
  {
    title: 'Adicionar Notícia',
    description: 'Adicione uma nova notícia',
    href: '/noticias/adicionar'
  }
]

export default function Noticias() {
  return (
    <Container className="animate-fade-in">
      <h2 className="text-2xl">Acesso Rápido</h2>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {QuickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </section>
    </Container>
  )
}
