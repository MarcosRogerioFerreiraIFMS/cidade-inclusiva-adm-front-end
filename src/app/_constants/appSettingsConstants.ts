/**
 * Configuração base da API
 */
export const API_CONFIG = {
  BASE_URL: process.env.API_URL || 'http://localhost:5555',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
} as const

/**
 * Configurações de cache e revalidação
 * Tempos em segundos para controle centralizado do cache do Next.js
 */
export const CACHE_CONFIG = {
  /** Tempo padrão de revalidação para dados que mudam com frequência (1 minuto) */
  REVALIDATE_SHORT: 60,
  /** Tempo médio de revalidação para dados moderadamente dinâmicos (5 minutos) */
  REVALIDATE_MEDIUM: 300,
  /** Tempo longo de revalidação para dados relativamente estáticos (1 hora) */
  REVALIDATE_LONG: 3600,
  /** Tempo de revalidação para comentários (30 segundos - mais dinâmico) */
  REVALIDATE_COMMENTS: 30
} as const

/**
 * Tags de cache para invalidação granular
 * Centraliza todas as tags usadas no sistema para revalidação de cache
 */
export const CACHE_TAGS = {
  // Tags gerais por entidade
  NOTICIAS: 'noticias',
  PROFISSIONAIS: 'profissionais',
  USUARIOS: 'usuarios',
  COMENTARIOS: 'comentarios',
  MOBILIDADES: 'mobilidades',
  MOTORISTAS: 'motoristas',
  MANUTENCOES: 'manutencoes',
  ACESSIBILIDADES_URBANAS: 'acessibilidades-urbanas',

  // Tags específicas por ID (funções)
  NOTICIA_ID: (id: string) => `noticia-${id}`,
  PROFISSIONAL_ID: (id: string) => `profissional-${id}`,
  USUARIO_ID: (id: string) => `usuario-${id}`,
  MOBILIDADE_ID: (id: string) => `mobilidade-${id}`,
  MOTORISTA_ID: (id: string) => `motorista-${id}`,
  MANUTENCAO_ID: (id: string) => `manutencao-${id}`,
  ACESSIBILIDADE_URBANA_ID: (id: string) => `acessibilidade-urbana-${id}`,

  // Tags de comentários por entidade
  PROFISSIONAL_COMENTARIOS: (id: string) => `profissional-${id}-comentarios`,
  MOTORISTA_COMENTARIOS: (id: string) => `motorista-${id}-comentarios`,
  MANUTENCAO_COMENTARIOS: (id: string) => `manutencao-${id}-comentarios`,
  ACESSIBILIDADE_URBANA_COMENTARIOS: (id: string) =>
    `acessibilidade-urbana-${id}-comentarios`,
  USUARIO_COMENTARIOS: (id: string) => `usuario-${id}-comentarios`
} as const

/**
 * Rotas de API disponíveis no backend do sistema
 */
export const API_ROUTES = {
  /** Rotas para operações de notícias */
  NOTICIA: '/noticias',
  NOTICIA_ID: (noticiaId: string) => `${API_ROUTES.NOTICIA}/${noticiaId}`,
  NOTICIA_EDITAR: (noticiaId: string) => `${API_ROUTES.NOTICIA}/${noticiaId}`,
  NOTICIA_DELETAR: (noticiaId: string) => `${API_ROUTES.NOTICIA}/${noticiaId}`,

  /** Rotas para operações de profissionais */
  PROFISSIONAL: '/profissionais',
  PROFISSIONAL_ID: (profissionalId: string) =>
    `${API_ROUTES.PROFISSIONAL}/${profissionalId}`,
  PROFISSIONAL_EDITAR: (profissionalId: string) =>
    `${API_ROUTES.PROFISSIONAL}/${profissionalId}`,
  PROFISSIONAL_DELETAR: (profissionalId: string) =>
    `${API_ROUTES.PROFISSIONAL}/${profissionalId}`,
  PROFISSIONAL_COMENTARIOS: (profissionalId: string) =>
    `${API_ROUTES.PROFISSIONAL}/${profissionalId}/comentarios`,

  /** Rotas para operações de comentários */
  COMENTARIO: '/comentarios',
  COMENTARIO_EDITAR: (comentarioId: string) =>
    `${API_ROUTES.COMENTARIO}/${comentarioId}`,
  COMENTARIO_DELETAR: (comentarioId: string) =>
    `${API_ROUTES.COMENTARIO}/${comentarioId}`,
  COMENTARIO_ALTERNAR_VISIBILIDADE: (comentarioId: string) =>
    `${API_ROUTES.COMENTARIO}/${comentarioId}/visibilidade`,

  /** Rotas para operações de usuários */
  USUARIO: '/usuarios',
  USUARIO_ID: (usuarioId: string) => `${API_ROUTES.USUARIO}/${usuarioId}`,
  USUARIO_EDITAR: (usuarioId: string) => `${API_ROUTES.USUARIO}/${usuarioId}`,
  USUARIO_DELETAR: (usuarioId: string) => `${API_ROUTES.USUARIO}/${usuarioId}`,
  USUARIO_COMENTARIOS: (usuarioId: string) =>
    `${API_ROUTES.USUARIO}/${usuarioId}/comentarios`,
  USUARIO_CRIAR_ADMIN: () => `${API_ROUTES.USUARIO}/admin`,

  /** Rotas para operações de autenticação */
  AUTH: '/auth',
  AUTH_LOGIN: () => `${API_ROUTES.AUTH}/login`,
  AUTH_ME: () => `${API_ROUTES.AUTH}/me`,

  /** Rotas para operações de mobilidade */
  MOBILIDADE: '/mobilidades',
  MOBILIDADE_ID: (mobilidadeId: string) =>
    `${API_ROUTES.MOBILIDADE}/${mobilidadeId}`,
  MOBILIDADE_EDITAR: (mobilidadeId: string) =>
    `${API_ROUTES.MOBILIDADE}/${mobilidadeId}`,
  MOBILIDADE_DELETAR: (mobilidadeId: string) =>
    `${API_ROUTES.MOBILIDADE}/${mobilidadeId}`,
  MOBILIDADE_USUARIO: (usuarioId: string) =>
    `${API_ROUTES.MOBILIDADE}/usuario/${usuarioId}`,
  MOBILIDADE_STATUS: (mobilidadeId: string) =>
    `${API_ROUTES.MOBILIDADE}/${mobilidadeId}/status`,

  /** Rotas para operações de motoristas */
  MOTORISTA: '/motoristas',
  MOTORISTA_ID: (motoristaId: string) =>
    `${API_ROUTES.MOTORISTA}/${motoristaId}`,
  MOTORISTA_EDITAR: (motoristaId: string) =>
    `${API_ROUTES.MOTORISTA}/${motoristaId}`,
  MOTORISTA_DELETAR: (motoristaId: string) =>
    `${API_ROUTES.MOTORISTA}/${motoristaId}`,
  MOTORISTA_COMENTARIOS: (motoristaId: string) =>
    `${API_ROUTES.MOTORISTA}/${motoristaId}/comentarios`,

  /** Rotas para operações de manutenções */
  MANUTENCAO: '/manutencoes',
  MANUTENCAO_ID: (manutencaoId: string) =>
    `${API_ROUTES.MANUTENCAO}/${manutencaoId}`,
  MANUTENCAO_EDITAR: (manutencaoId: string) =>
    `${API_ROUTES.MANUTENCAO}/${manutencaoId}`,
  MANUTENCAO_DELETAR: (manutencaoId: string) =>
    `${API_ROUTES.MANUTENCAO}/${manutencaoId}`,
  MANUTENCAO_COMENTARIOS: (manutencaoId: string) =>
    `${API_ROUTES.MANUTENCAO}/${manutencaoId}/comentarios`,

  /** Rotas para operações de acessibilidade urbana */
  ACESSIBILIDADE_URBANA: '/acessibilidades-urbanas',
  ACESSIBILIDADE_URBANA_ID: (acessibilidadeId: string) =>
    `${API_ROUTES.ACESSIBILIDADE_URBANA}/${acessibilidadeId}`,
  ACESSIBILIDADE_URBANA_EDITAR: (acessibilidadeId: string) =>
    `${API_ROUTES.ACESSIBILIDADE_URBANA}/${acessibilidadeId}`,
  ACESSIBILIDADE_URBANA_DELETAR: (acessibilidadeId: string) =>
    `${API_ROUTES.ACESSIBILIDADE_URBANA}/${acessibilidadeId}`,
  ACESSIBILIDADE_URBANA_COMENTARIOS: (acessibilidadeId: string) =>
    `${API_ROUTES.ACESSIBILIDADE_URBANA}/${acessibilidadeId}/comentarios`,

  /** Rotas para operações de veículos */
  VEICULO: '/veiculos',
  VEICULO_EDITAR: (veiculoId: string) => `${API_ROUTES.VEICULO}/${veiculoId}`,
  VEICULO_DELETAR: (veiculoId: string) => `${API_ROUTES.VEICULO}/${veiculoId}`
} as const

/**
 * Rotas das páginas do sistema
 */
export const APP_ROUTES = {
  HOME: '/',

  NOTICIA: '/noticias',
  NOTICIA_LISTAR: () => `${APP_ROUTES.NOTICIA}/listar`,
  NOTICIA_ADICIONAR: () => `${APP_ROUTES.NOTICIA}/adicionar`,
  NOTICIA_DETALHE: (id: string) => `${APP_ROUTES.NOTICIA}/${id}`,
  NOTICIA_EDITAR: (id: string) => `${APP_ROUTES.NOTICIA}/editar/${id}`,

  PROFISSIONAL: '/profissionais',
  PROFISSIONAL_LISTAR: () => `${APP_ROUTES.PROFISSIONAL}/listar`,
  PROFISSIONAL_ADICIONAR: () => `${APP_ROUTES.PROFISSIONAL}/adicionar`,
  PROFISSIONAL_DETALHE: (id: string) => `${APP_ROUTES.PROFISSIONAL}/${id}`,
  PROFISSIONAL_EDITAR: (id: string) =>
    `${APP_ROUTES.PROFISSIONAL}/editar/${id}`,

  USUARIO: '/usuarios',
  USUARIO_LISTAR: () => `${APP_ROUTES.USUARIO}/listar`,
  USUARIO_ADICIONAR: () => `${APP_ROUTES.USUARIO}/adicionar`,
  USUARIO_DETALHE: (id: string) => `${APP_ROUTES.USUARIO}/${id}`,
  USUARIO_EDITAR: (id: string) => `${APP_ROUTES.USUARIO}/editar/${id}`,

  MOBILIDADE: '/mobilidades',
  MOBILIDADE_LISTAR: () => `${APP_ROUTES.MOBILIDADE}/listar`,
  MOBILIDADE_DETALHE: (id: string) => `${APP_ROUTES.MOBILIDADE}/${id}`,
  MOBILIDADE_MAPA: () => `${APP_ROUTES.MOBILIDADE}/mapa`,
  MOBILIDADE_GERAR_RELATORIO: () => `${APP_ROUTES.MOBILIDADE}/gerar-relatorio`,
  MOBILIDADE_ALTERAR_STATUS: (id: string) =>
    `${APP_ROUTES.MOBILIDADE}/${id}/alterar-status`,

  MOTORISTA: '/motoristas',
  MOTORISTA_LISTAR: () => `${APP_ROUTES.MOTORISTA}/listar`,
  MOTORISTA_ADICIONAR: () => `${APP_ROUTES.MOTORISTA}/adicionar`,
  MOTORISTA_DETALHE: (id: string) => `${APP_ROUTES.MOTORISTA}/${id}`,
  MOTORISTA_EDITAR: (id: string) => `${APP_ROUTES.MOTORISTA}/editar/${id}`,

  MANUTENCAO: '/manutencoes',
  MANUTENCAO_LISTAR: () => `${APP_ROUTES.MANUTENCAO}/listar`,
  MANUTENCAO_ADICIONAR: () => `${APP_ROUTES.MANUTENCAO}/adicionar`,
  MANUTENCAO_DETALHE: (id: string) => `${APP_ROUTES.MANUTENCAO}/${id}`,
  MANUTENCAO_EDITAR: (id: string) => `${APP_ROUTES.MANUTENCAO}/editar/${id}`,

  ACESSIBILIDADE_URBANA: '/acessibilidades-urbanas',
  ACESSIBILIDADE_URBANA_LISTAR: () =>
    `${APP_ROUTES.ACESSIBILIDADE_URBANA}/listar`,
  ACESSIBILIDADE_URBANA_ADICIONAR: () =>
    `${APP_ROUTES.ACESSIBILIDADE_URBANA}/adicionar`,
  ACESSIBILIDADE_URBANA_DETALHE: (id: string) =>
    `${APP_ROUTES.ACESSIBILIDADE_URBANA}/${id}`,
  ACESSIBILIDADE_URBANA_EDITAR: (id: string) =>
    `${APP_ROUTES.ACESSIBILIDADE_URBANA}/editar/${id}`,

  PERFIL: '/perfil',
  LOGIN: '/login'
} as const
