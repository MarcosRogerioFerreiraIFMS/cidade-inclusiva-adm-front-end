/**
 * Categorias de notícias aceitas pelo backend
 * ATENÇÃO: Ao modificar essas categorias, verifique se elas estão sincronizadas com o backend!
 */
export const NOTICIA_CATEGORIES = [
  'DIREITOS',
  'BENEFICIOS',
  'OPORTUNIDADES',
  'TECNOLOGIA',
  'TRABALHO',
  'SAUDE',
  'EDUCACAO',
  'CULTURA',
  'EVENTOS',
  'ESPORTE',
  'ACESSIBILIDADE',
  'OUTROS'
] as const

/**
 * Mapeamento das categorias para exibição amigável no frontend
 */
export const NoticiaCategoriasDisplay: Record<string, string> = {
  DIREITOS: 'Direitos',
  BENEFICIOS: 'Benefícios',
  OPORTUNIDADES: 'Oportunidades',
  TECNOLOGIA: 'Tecnologia',
  TRABALHO: 'Trabalho',
  SAUDE: 'Saúde',
  EDUCACAO: 'Educação',
  CULTURA: 'Cultura',
  EVENTOS: 'Eventos',
  ESPORTE: 'Esporte',
  ACESSIBILIDADE: 'Acessibilidade',
  OUTROS: 'Outros'
}

export type NoticiaCategoria = (typeof NOTICIA_CATEGORIES)[number]
