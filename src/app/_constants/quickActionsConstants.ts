import { QuickActionImageEnum } from '../_enums/quickActionImageEnum'
import { APP_ROUTES } from './appSettingsConstants'

/**
 * Constantes globais para as ações rápidas do sistema.
 * Centralizadas para facilitar manutenção e escalabilidade.
 */

export interface QuickActionType {
  title: string
  description: string
  href: string
  imageSrc: string
  enabled: boolean
}

/**
 * Ações rápidas para a página inicial (Home/Dashboard)
 */
export const HOME_QUICK_ACTIONS: QuickActionType[] = [
  {
    title: 'Ocorrências de Mobilidade',
    description: 'Visualize tudo sobre ocorrências de mobilidade',
    imageSrc: QuickActionImageEnum.MOBILIDADE,
    href: APP_ROUTES.MOBILIDADE,
    enabled: true
  },
  {
    title: 'Acessibilidade Urbana',
    description: 'Visualize tudo sobre Acessibilidade Urbana',
    imageSrc: QuickActionImageEnum.ACESSIBILIDADE_URBANA,
    href: APP_ROUTES.ACESSIBILIDADE_URBANA,
    enabled: false
  },
  {
    title: 'Profissionais',
    description: 'Visualize tudo sobre Profissionais',
    imageSrc: QuickActionImageEnum.PROFISSIONAIS,
    href: APP_ROUTES.PROFISSIONAL,
    enabled: true
  },
  {
    title: 'Notícias',
    description: 'Visualize tudo sobre Notícias',
    imageSrc: QuickActionImageEnum.NOTICIAS,
    href: APP_ROUTES.NOTICIA,
    enabled: true
  },
  {
    title: 'Motoristas',
    description: 'Visualize tudo sobre Motoristas',
    imageSrc: QuickActionImageEnum.MOTORISTAS,
    href: APP_ROUTES.MOTORISTA,
    enabled: false
  },
  {
    title: 'Oficinas de Manutenção',
    description: 'Visualize tudo sobre Oficinas de Manutenção',
    imageSrc: QuickActionImageEnum.MANUTENCAO,
    href: APP_ROUTES.MANUTENCAO,
    enabled: false
  },
  {
    title: 'Usuários',
    description: 'Visualize tudo sobre Usuários',
    imageSrc: QuickActionImageEnum.USUARIOS,
    href: APP_ROUTES.USUARIO,
    enabled: true
  }
].sort((a, b) => a.title.localeCompare(b.title))

/**
 * Ações rápidas para o módulo de Profissionais
 */
export const PROFISSIONAIS_QUICK_ACTIONS: QuickActionType[] = [
  {
    title: 'Listar Profissionais',
    description: 'Visualize uma tabela com todos os profissionais',
    imageSrc: QuickActionImageEnum.PROFISSIONAIS,
    href: APP_ROUTES.PROFISSIONAL_LISTAR(),
    enabled: true
  },
  {
    title: 'Adicionar Profissional',
    description: 'Adicione um novo profissional ao sistema',
    imageSrc: QuickActionImageEnum.PROFISSIONAIS,
    href: APP_ROUTES.PROFISSIONAL_ADICIONAR(),
    enabled: true
  }
]

/**
 * Ações rápidas para o módulo de Notícias
 */
export const NOTICIAS_QUICK_ACTIONS: QuickActionType[] = [
  {
    title: 'Listar Notícias',
    description: 'Visualize uma tabela com todas as notícias',
    imageSrc: QuickActionImageEnum.NOTICIAS,
    href: APP_ROUTES.NOTICIA_LISTAR(),
    enabled: true
  },
  {
    title: 'Adicionar Notícia',
    description: 'Adicione uma nova notícia',
    imageSrc: QuickActionImageEnum.NOTICIAS,
    href: APP_ROUTES.NOTICIA_ADICIONAR(),
    enabled: true
  }
]

/**
 * Ações rápidas para o módulo de Usuários
 */
export const USUARIOS_QUICK_ACTIONS: QuickActionType[] = [
  {
    title: 'Listar Usuários',
    description: 'Visualize uma tabela com todos os usuários',
    imageSrc: QuickActionImageEnum.USUARIOS,
    href: APP_ROUTES.USUARIO_LISTAR(),
    enabled: true
  },
  {
    title: 'Adicionar Usuário',
    description: 'Adicione um novo usuário ao sistema',
    imageSrc: QuickActionImageEnum.USUARIOS,
    href: APP_ROUTES.USUARIO_ADICIONAR(),
    enabled: true
  }
]

/**
 * Ações rápidas para o módulo de Mobilidades
 */
export const MOBILIDADES_QUICK_ACTIONS: QuickActionType[] = [
  {
    title: 'Listar Ocorrências de Mobilidade',
    description: 'Visualize uma tabela com todas as ocorrências de mobilidade',
    imageSrc: QuickActionImageEnum.MOBILIDADE,
    href: APP_ROUTES.MOBILIDADE_LISTAR(),
    enabled: true
  }
]

/**
 * Filtra ações rápidas habilitadas
 */
export function getEnabledQuickActions(
  actions: QuickActionType[]
): QuickActionType[] {
  return actions.filter((action) => action.enabled !== false)
}
