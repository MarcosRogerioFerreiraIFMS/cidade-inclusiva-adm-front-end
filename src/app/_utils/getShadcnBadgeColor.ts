import type { NoticiaCategoria } from '@/app/_enums/noticiaEnums'

const colors: Record<NoticiaCategoria, string> = {
  TRABALHO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  ACESSIBILIDADE:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  SAUDE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  TECNOLOGIA:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  BENEFICIOS:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  DIREITOS:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  EVENTOS: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  OPORTUNIDADES:
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  EDUCACAO:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  CULTURA:
    'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300',
  ESPORTE: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  OUTROS: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
}

export function getShadcnBadgeColor(categoria: NoticiaCategoria): string {
  return colors[categoria] ?? colors.OUTROS
}
