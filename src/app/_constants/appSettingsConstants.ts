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
