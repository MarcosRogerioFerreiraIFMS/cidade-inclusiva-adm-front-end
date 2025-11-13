import {
  AccessibilityIcon,
  BriefcaseMedicalIcon,
  BusFrontIcon,
  HomeIcon,
  LucideIcon,
  MapIcon,
  NewspaperIcon,
  TriangleAlertIcon,
  WrenchIcon
} from 'lucide-react'
import { APP_ROUTES } from './appSettingsConstants'

interface SubMenuItem {
  href: string
  icon: LucideIcon
  text: string
  title: string
  enabled?: boolean
}

export interface MenuItem {
  href: string
  icon: LucideIcon
  text: string
  title: string
  enabled?: boolean
  subItems?: SubMenuItem[]
}

/**
 * Itens do menu de navegação do menu lateral do dashboard.
 */
export const menuItems: MenuItem[] = [
  {
    href: APP_ROUTES.HOME,
    icon: HomeIcon,
    text: 'Dashboard',
    title: 'Dashboard',
    enabled: true
  },
  {
    href: APP_ROUTES.ACESSIBILIDADE_URBANA,
    icon: AccessibilityIcon,
    text: 'Acessibilidade Urbana',
    title: 'Acessibilidade Urbana',
    enabled: false
  },
  {
    href: APP_ROUTES.MANUTENCAO,
    icon: WrenchIcon,
    text: 'Oficinas de Manutenção',
    title: 'Oficinas de Manutenção',
    enabled: false,
    subItems: [
      {
        href: APP_ROUTES.MANUTENCAO_LISTAR(),
        icon: WrenchIcon,
        text: 'Listar oficinas de manutenção',
        title: 'Listar Oficinas de Manutenção',
        enabled: true
      },
      {
        href: APP_ROUTES.MANUTENCAO_ADICIONAR(),
        icon: WrenchIcon,
        text: 'Adicionar oficinas de manutenção',
        title: 'Adicionar Oficinas de Manutenção',
        enabled: true
      }
    ]
  },
  {
    href: APP_ROUTES.PROFISSIONAL,
    icon: BriefcaseMedicalIcon,
    text: 'Profissionais',
    title: 'Profissionais',
    enabled: true,
    subItems: [
      {
        href: APP_ROUTES.PROFISSIONAL_LISTAR(),
        icon: BriefcaseMedicalIcon,
        text: 'Listar Profissionais',
        title: 'Listar Profissionais',
        enabled: true
      },
      {
        href: APP_ROUTES.PROFISSIONAL_ADICIONAR(),
        icon: BriefcaseMedicalIcon,
        text: 'Adicionar Profissional',
        title: 'Adicionar Profissional',
        enabled: true
      }
    ]
  },
  {
    href: APP_ROUTES.NOTICIA,
    icon: NewspaperIcon,
    text: 'Notícias',
    title: 'Notícias',
    enabled: true,
    subItems: [
      {
        href: APP_ROUTES.NOTICIA_LISTAR(),
        icon: NewspaperIcon,
        text: 'Listar Notícias',
        title: 'Listar Notícias',
        enabled: true
      },
      {
        href: APP_ROUTES.NOTICIA_ADICIONAR(),
        icon: NewspaperIcon,
        text: 'Adicionar Notícias',
        title: 'Adicionar Notícia',
        enabled: true
      }
    ]
  },
  {
    href: APP_ROUTES.MOBILIDADE,
    icon: TriangleAlertIcon,
    text: 'Ocorrências de Mobilidade',
    title: 'Ocorrências de Mobilidade',
    enabled: false,
    subItems: [
      {
        href: APP_ROUTES.MOBILIDADE_LISTAR(),
        icon: TriangleAlertIcon,
        text: 'Listar Ocorrências de Mobilidade',
        title: 'Listar Ocorrências de Mobilidade',
        enabled: true
      },
      {
        href: APP_ROUTES.MOBILIDADE_MAPA(),
        icon: TriangleAlertIcon,
        text: 'Mapa Interativo',
        title: 'Mapa Interativo de Ocorrências de Mobilidade',
        enabled: true
      },
      {
        href: APP_ROUTES.MOBILIDADE_GERAR_RELATORIO(),
        icon: TriangleAlertIcon,
        text: 'Gerar relatório de ocorrências de mobilidade',
        title: 'Gerar Relatório de Ocorrências de Mobilidade',
        enabled: true
      }
    ]
  },
  {
    href: APP_ROUTES.MOTORISTA,
    icon: BusFrontIcon,
    text: 'Motoristas',
    title: 'Motoristas',
    enabled: false
  },
  {
    href: APP_ROUTES.MOBILIDADE,
    icon: MapIcon,
    text: 'Mobilidades',
    title: 'Mobilidades',
    enabled: true,
    subItems: [
      {
        href: APP_ROUTES.MOBILIDADE_LISTAR(),
        icon: MapIcon,
        text: 'Listar Mobilidades',
        title: 'Listar Mobilidades',
        enabled: true
      }
    ]
  },
  {
    href: APP_ROUTES.USUARIO,
    icon: AccessibilityIcon,
    text: 'Usuários',
    title: 'Usuários',
    enabled: true,
    subItems: [
      {
        href: APP_ROUTES.USUARIO_LISTAR(),
        icon: AccessibilityIcon,
        text: 'Listar Usuários',
        title: 'Listar Usuários',
        enabled: true
      },
      {
        href: APP_ROUTES.USUARIO_ADICIONAR(),
        icon: AccessibilityIcon,
        text: 'Adicionar Usuário',
        title: 'Adicionar Usuário',
        enabled: true
      }
    ]
  }
]

menuItems.sort((a, b) => {
  if (a.text === 'Dashboard') return -1
  if (b.text === 'Dashboard') return 1
  return a.text.localeCompare(b.text)
})
