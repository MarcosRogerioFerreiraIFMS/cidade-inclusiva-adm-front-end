/**
 * Categorias de acessibilidade urbana aceitas pelo backend
 * ATENÇÃO: Ao modificar essas categorias, verifique se elas estão sincronizadas com o backend!
 */
export const ACESSIBILIDADE_URBANA_CATEGORIAS = [
  'OUTROS',
  'RESTAURANTE',
  'LANCHONETE',
  'BAR',
  'CAFETERIA',
  'HOTEL',
  'SALAO_DE_BELEZA',
  'ACADEMIA',
  'PARQUE',
  'MUSEU',
  'CINEMA',
  'TEATRO',
  'AQUARIO',
  'ZOOLOGICO',
  'BIBLIOTECA',
  'SHOPPING',
  'SUPERMERCADO',
  'HOSPITAL',
  'POSTO_DE_SAUDE',
  'FARMACIA',
  'ESCOLA',
  'UNIVERSIDADE',
  'AEROPORTO',
  'PONTO_DE_ONIBUS',
  'RODOVIARIA',
  'ESTACIONAMENTO'
] as const

/**
 * Símbolos de recursos de acessibilidade urbana aceitos pelo backend
 * ATENÇÃO: Ao modificar esses símbolos, verifique se eles estão sincronizados com o backend!
 */
export const ACESSIBILIDADE_URBANA_SIMBOLOS = [
  'CADEIRA_DE_RODAS',
  'BRAILLE',
  'LIBRAS',
  'AUDIO_DESCRICAO',
  'CLOSED_CAPTION',
  'RAMPA',
  'ELEVADOR',
  'SINALIZACAO_TATIL',
  'BANHEIRO_ACESSIVEL',
  'ESTACIONAMENTO_ACESSIVEL',
  'ATENDIMENTO_PRIORIZADO',
  'ANIMAIS_DE_ASSISTENCIA_PERMITIDOS',
  'MOBILIARIO_ACESSIVEL',
  'COMUNICACAO_SIMPLIFICADA'
] as const

/**
 * Mapeamento das categorias para exibição amigável no frontend
 */
export const AcessibilidadeUrbanaCategoriaDisplay: Record<string, string> = {
  OUTROS: 'Outros',
  RESTAURANTE: 'Restaurante',
  LANCHONETE: 'Lanchonete',
  BAR: 'Bar',
  CAFETERIA: 'Cafeteria',
  HOTEL: 'Hotel',
  SALAO_DE_BELEZA: 'Salão de Beleza',
  ACADEMIA: 'Academia',
  PARQUE: 'Parque',
  MUSEU: 'Museu',
  CINEMA: 'Cinema',
  TEATRO: 'Teatro',
  AQUARIO: 'Aquário',
  ZOOLOGICO: 'Zoológico',
  BIBLIOTECA: 'Biblioteca',
  SHOPPING: 'Shopping',
  SUPERMERCADO: 'Supermercado',
  HOSPITAL: 'Hospital',
  POSTO_DE_SAUDE: 'Posto de Saúde',
  FARMACIA: 'Farmácia',
  ESCOLA: 'Escola',
  UNIVERSIDADE: 'Universidade',
  AEROPORTO: 'Aeroporto',
  PONTO_DE_ONIBUS: 'Ponto de Ônibus',
  RODOVIARIA: 'Rodoviária',
  ESTACIONAMENTO: 'Estacionamento'
}

/**
 * Mapeamento dos símbolos de recursos para exibição amigável no frontend
 */
export const AcessibilidadeUrbanaSimboloDisplay: Record<string, string> = {
  CADEIRA_DE_RODAS: 'Acessível para Cadeira de Rodas',
  BRAILLE: 'Braille',
  LIBRAS: 'Libras',
  AUDIO_DESCRICAO: 'Audiodescrição',
  CLOSED_CAPTION: 'Legendas (Closed Caption)',
  RAMPA: 'Rampa de Acesso',
  ELEVADOR: 'Elevador Acessível',
  SINALIZACAO_TATIL: 'Sinalização Tátil',
  BANHEIRO_ACESSIVEL: 'Banheiro Acessível',
  ESTACIONAMENTO_ACESSIVEL: 'Estacionamento Acessível',
  ATENDIMENTO_PRIORIZADO: 'Atendimento Priorizado',
  ANIMAIS_DE_ASSISTENCIA_PERMITIDOS: 'Animais de Assistência Permitidos',
  MOBILIARIO_ACESSIVEL: 'Mobiliário Acessível',
  COMUNICACAO_SIMPLIFICADA: 'Comunicação Simplificada'
}

/**
 * Mapeamento das categorias para classes CSS de badge customizadas
 * Utiliza cores do Tailwind com suporte a dark mode
 */
export const AcessibilidadeUrbanaCategoriaBadgeColors: Record<
  AcessibilidadeUrbanaCategoria,
  string
> = {
  OUTROS: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  RESTAURANTE:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  LANCHONETE:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  BAR: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  CAFETERIA:
    'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  HOTEL:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  SALAO_DE_BELEZA:
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  ACADEMIA: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  PARQUE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  MUSEU: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  CINEMA:
    'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  TEATRO: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  AQUARIO: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  ZOOLOGICO: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
  BIBLIOTECA: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  SHOPPING:
    'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300',
  SUPERMERCADO:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  HOSPITAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  POSTO_DE_SAUDE: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  FARMACIA: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  ESCOLA:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  UNIVERSIDADE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  AEROPORTO:
    'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
  PONTO_DE_ONIBUS:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  RODOVIARIA:
    'bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-300',
  ESTACIONAMENTO:
    'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
}

/**
 * Mapeamento dos símbolos para classes CSS de badge customizadas
 * Utiliza cores do Tailwind com suporte a dark mode
 */
export const AcessibilidadeUrbanaSimboloBadgeColors: Record<
  AcessibilidadeUrbanaSimbolo,
  string
> = {
  CADEIRA_DE_RODAS:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  BRAILLE:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  LIBRAS: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  AUDIO_DESCRICAO:
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  CLOSED_CAPTION:
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  RAMPA: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  ELEVADOR:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  SINALIZACAO_TATIL:
    'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  BANHEIRO_ACESSIVEL:
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  ESTACIONAMENTO_ACESSIVEL:
    'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
  ATENDIMENTO_PRIORIZADO:
    'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  ANIMAIS_DE_ASSISTENCIA_PERMITIDOS:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  MOBILIARIO_ACESSIVEL:
    'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  COMUNICACAO_SIMPLIFICADA:
    'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300'
}

export type AcessibilidadeUrbanaCategoria =
  (typeof ACESSIBILIDADE_URBANA_CATEGORIAS)[number]
export type AcessibilidadeUrbanaSimbolo =
  (typeof ACESSIBILIDADE_URBANA_SIMBOLOS)[number]

/**
 * Obtém o label amigável para exibição da categoria
 */
export function getAcessibilidadeUrbanaCategoriaLabel(
  categoria: AcessibilidadeUrbanaCategoria
): string {
  return AcessibilidadeUrbanaCategoriaDisplay[categoria] || categoria
}

/**
 * Obtém o label amigável para exibição do símbolo
 */
export function getAcessibilidadeUrbanaSimboloLabel(
  simbolo: AcessibilidadeUrbanaSimbolo
): string {
  return AcessibilidadeUrbanaSimboloDisplay[simbolo] || simbolo
}

/**
 * Obtém as classes CSS de badge customizadas para a categoria
 */
export function getAcessibilidadeUrbanaCategoriaBadgeColor(
  categoria: AcessibilidadeUrbanaCategoria
): string {
  return (
    AcessibilidadeUrbanaCategoriaBadgeColors[categoria] ||
    AcessibilidadeUrbanaCategoriaBadgeColors.OUTROS
  )
}

/**
 * Obtém as classes CSS de badge customizadas para o símbolo
 */
export function getAcessibilidadeUrbanaSimboloBadgeColor(
  simbolo: AcessibilidadeUrbanaSimbolo
): string {
  return (
    AcessibilidadeUrbanaSimboloBadgeColors[simbolo] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  )
}

/**
 * Opções de categorias para uso em formulários
 */
export const AcessibilidadeUrbanaCategoriasOptions =
  ACESSIBILIDADE_URBANA_CATEGORIAS.map((value) => ({
    value,
    label: getAcessibilidadeUrbanaCategoriaLabel(value)
  }))

/**
 * Opções de símbolos para uso em formulários
 */
export const AcessibilidadeUrbanaSimbolosOptions =
  ACESSIBILIDADE_URBANA_SIMBOLOS.map((value) => ({
    value,
    label: getAcessibilidadeUrbanaSimboloLabel(value)
  }))
