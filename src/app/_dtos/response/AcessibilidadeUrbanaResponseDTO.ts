import type { EnderecoResponseDTO } from './EnderecoResponseDTO'
import type { FotoResponseDTO } from './FotoResponsesDTO'

/**
 * - DTO (Data Transfer Object) de resposta para recurso individual de acessibilidade urbana
 * - Define a estrutura dos dados de recurso retornados pela API
 */
export interface AcessibilidadeUrbanaRecursoResponseDTO {
  /** ID único do recurso */
  id: string
  /** Símbolo de acessibilidade */
  simbolo:
    | 'CADEIRA_DE_RODAS'
    | 'BRAILLE'
    | 'LIBRAS'
    | 'AUDIO_DESCRICAO'
    | 'CLOSED_CAPTION'
    | 'RAMPA'
    | 'ELEVADOR'
    | 'SINALIZACAO_TATIL'
    | 'BANHEIRO_ACESSIVEL'
    | 'ESTACIONAMENTO_ACESSIVEL'
    | 'ATENDIMENTO_PRIORIZADO'
    | 'ANIMAIS_DE_ASSISTENCIA_PERMITIDOS'
    | 'MOBILIARIO_ACESSIVEL'
    | 'COMUNICACAO_SIMPLIFICADA'
  /** Descrição do recurso (opcional) */
  descricao?: string
  /** Data e hora de criação do registro */
  criadoEm: Date
}

/**
 * - DTO (Data Transfer Object) de resposta para acessibilidade urbana
 * - Define a estrutura dos dados de acessibilidade urbana retornados pela API
 */
export interface AcessibilidadeUrbanaResponseDTO {
  /** ID único da acessibilidade urbana */
  id: string
  /** Nome do estabelecimento */
  nome: string
  /** Telefone de contato */
  telefone: string
  /** E-mail de contato */
  email: string
  /** Categoria do estabelecimento */
  categoria:
    | 'OUTROS'
    | 'RESTAURANTE'
    | 'LANCHONETE'
    | 'BAR'
    | 'CAFETERIA'
    | 'HOTEL'
    | 'SALAO_DE_BELEZA'
    | 'ACADEMIA'
    | 'PARQUE'
    | 'MUSEU'
    | 'CINEMA'
    | 'TEATRO'
    | 'AQUARIO'
    | 'ZOOLOGICO'
    | 'BIBLIOTECA'
    | 'SHOPPING'
    | 'SUPERMERCADO'
    | 'HOSPITAL'
    | 'POSTO_DE_SAUDE'
    | 'FARMACIA'
    | 'ESCOLA'
    | 'UNIVERSIDADE'
    | 'AEROPORTO'
    | 'PONTO_DE_ONIBUS'
    | 'RODOVIARIA'
    | 'ESTACIONAMENTO'
  /** Logo do estabelecimento (opcional) */
  logo?: FotoResponseDTO
  /** Fotos do estabelecimento */
  fotos: FotoResponseDTO[]
  /** Endereço do estabelecimento (opcional) */
  endereco?: EnderecoResponseDTO
  /** Recursos de acessibilidade disponíveis */
  recursos: AcessibilidadeUrbanaRecursoResponseDTO[]
  /** Data e hora de criação do registro */
  criadoEm: Date
}
