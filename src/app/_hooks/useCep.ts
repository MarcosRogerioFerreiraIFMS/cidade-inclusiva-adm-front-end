import axios from 'axios'
import { useState } from 'react'

interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

interface CepData {
  logradouro: string
  bairro: string
  cidade: string
  estado: string
}

interface UseCepReturn {
  loading: boolean
  error: string | null
  buscarCep: (cep: string) => Promise<CepData | null>
}

export function useCep(): UseCepReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buscarCep = async (cep: string): Promise<CepData | null> => {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '')

    // Valida se tem 8 dígitos - retorna silenciosamente sem erro
    if (cepLimpo.length !== 8) {
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
        {
          timeout: 10000 // 10 segundos de timeout
        }
      )

      // Se o CEP não for encontrado, retorna silenciosamente
      if (response.data.erro) {
        return null
      }

      const cepData: CepData = {
        logradouro: response.data.logradouro || '',
        bairro: response.data.bairro || '',
        cidade: response.data.localidade || '',
        estado: response.data.uf || ''
      }

      return cepData
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, buscarCep }
}
