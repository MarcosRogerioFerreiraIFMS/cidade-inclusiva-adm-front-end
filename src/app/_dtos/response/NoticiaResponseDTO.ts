import type { NoticiaCategoria } from '@/app/_enums/noticiaEnums'
import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) de resposta para notícia
 * - Define a estrutura dos dados de notícia retornados pela API
 */
export interface NoticiaResponseDTO {
  /** ID único da notícia */
  id: string
  /** URL da imagem da notícia (opcional) */
  foto?: FotoResponseDTO
  /** Título da notícia */
  titulo: string
  /** Conteúdo completo da notícia */
  conteudo: string
  /** URL de referência externa (opcional) */
  url?: string
  /** Data e hora de publicação da notícia */
  dataPublicacao: string
  /** Categoria da notícia */
  categoria: NoticiaCategoria
  /** Data e hora de criação do registro */
  criadoEm: string
}
