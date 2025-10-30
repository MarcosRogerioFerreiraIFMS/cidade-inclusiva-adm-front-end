import 'server-only'

import { API_CONFIG } from '@/app/_constants/appSettingsConstants'
import { getServerAuthToken } from '../_services/tokenService'
import { handleApiError } from './errorHandler'

interface ApiClientOptions extends RequestInit {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
  /**
   * Se true, não inclui o header Authorization
   * Útil para endpoints públicos como login
   */
  skipAuth?: boolean
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T | null> {
  try {
    const { skipAuth, ...fetchOptions } = options

    // Headers base
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    // Adicionar Authorization apenas se não for skipAuth
    if (!skipAuth) {
      const token = await getServerAuthToken()
      headers.Authorization = `Bearer ${token}`
    }

    // Merge com headers customizados
    const finalHeaders = {
      ...headers,
      ...(fetchOptions.headers as Record<string, string>)
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: finalHeaders
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw handleApiError(response.status, errorData)
    }

    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return null
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return (await response.json()) as T
    }

    return null
  } catch (error) {
    const processedError = handleApiError(null, error)
    throw processedError
  }
}
