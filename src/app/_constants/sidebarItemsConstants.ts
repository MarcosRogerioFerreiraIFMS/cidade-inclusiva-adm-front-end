import {
  AccessibilityIcon,
  BusFrontIcon,
  ContactIcon,
  HomeIcon,
  LucideIcon,
  NewspaperIcon,
  TriangleAlertIcon,
  WrenchIcon
} from 'lucide-react'

export interface MenuItem {
  href: string
  icon: LucideIcon
  text: string
  title: string
  subItems?: MenuItem[]
}

/**
 * Itens do menu de navegação do menu lateral do dashboard.
 */
export const menuItems: MenuItem[] = [
  {
    href: '/',
    icon: HomeIcon,
    text: 'Dashboard',
    title: 'Dashboard'
  },
  {
    href: '/acessibilidade-urbana',
    icon: AccessibilityIcon,
    text: 'Acessibilidade Urbana',
    title: 'Acessibilidade Urbana'
  },
  {
    href: '/contatos',
    icon: ContactIcon,
    text: 'Contatos',
    title: 'Contatos'
  },
  {
    href: '/oficinas-manutencao',
    icon: WrenchIcon,
    text: 'Oficinas de Manutenção',
    title: 'Oficinas de Manutenção',
    subItems: [
      {
        href: '/oficinas-manutencao/listar',
        icon: WrenchIcon,
        text: 'Listar oficinas de manutenção',
        title: 'Listar Oficinas de Manutenção'
      },
      {
        href: '/oficinas-manutencao/adicionar',
        icon: WrenchIcon,
        text: 'Adicionar oficinas de manutenção',
        title: 'Adicionar Oficinas de Manutenção'
      }
    ]
  },
  {
    href: '/noticias',
    icon: NewspaperIcon,
    text: 'Notícias',
    title: 'Notícias',
    subItems: [
      {
        href: '/noticias/listar',
        icon: NewspaperIcon,
        text: 'Listar Notícias',
        title: 'Listar Notícias'
      },
      {
        href: '/noticias/adicionar',
        icon: NewspaperIcon,
        text: 'Adicionar Notícias',
        title: 'Adicionar Notícia'
      }
    ]
  },
  {
    href: '/ocorrencias',
    icon: TriangleAlertIcon,
    text: 'Ocorrências',
    title: 'Ocorrências',
    subItems: [
      {
        href: '/ocorrencias/listar',
        icon: TriangleAlertIcon,
        text: 'Listar Ocorrências',
        title: 'Listar Ocorrências'
      },
      {
        href: '/ocorrencias/mapa',
        icon: TriangleAlertIcon,
        text: 'Mapa Interativo',
        title: 'Mapa Interativo de Ocorrências'
      },
      {
        href: '/ocorrencias/gerar-relatorio',
        icon: TriangleAlertIcon,
        text: 'Gerar relatório de ocorrências',
        title: 'Gerar Relatório de Ocorrências'
      }
    ]
  },
  {
    href: '/transporte',
    icon: BusFrontIcon,
    text: 'Transporte',
    title: 'Transporte'
  },
  {
    href: '/usuarios',
    icon: AccessibilityIcon,
    text: 'Usuários',
    title: 'Usuários',
    subItems: [
      {
        href: '/usuarios/listar',
        icon: AccessibilityIcon,
        text: 'Listar Usuários',
        title: 'Listar Usuários'
      },
      {
        href: '/usuarios/adicionar',
        icon: AccessibilityIcon,
        text: 'Adicionar Usuário',
        title: 'Adicionar Usuário'
      }
    ]
  }
]

menuItems.sort((a, b) => {
  if (a.text === 'Dashboard') return -1
  if (b.text === 'Dashboard') return 1
  return a.text.localeCompare(b.text)
})
