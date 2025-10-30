/**
 * Hook para controle de rate limiting no frontend
 * Previne tentativas excessivas de login com feedback visual
 */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface RateLimitConfig {
  /** Número máximo de tentativas permitidas */
  maxAttempts: number
  /** Janela de tempo em milissegundos */
  windowMs: number
  /** Tempo de bloqueio após exceder tentativas */
  blockDurationMs: number
}

interface RateLimitState {
  /** Tentativas restantes */
  remainingAttempts: number
  /** Se está bloqueado */
  isBlocked: boolean
  /** Tempo restante de bloqueio em segundos */
  blockedTimeLeft: number
  /** Registrar uma tentativa */
  recordAttempt: () => void
  /** Resetar o contador */
  reset: () => void
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutos
  blockDurationMs: 5 * 60 * 1000 // 5 minutos de bloqueio
}

const STORAGE_KEY = 'login_attempts'
const BLOCKED_UNTIL_KEY = 'login_blocked_until'

interface AttemptRecord {
  timestamps: number[]
}

/**
 * Hook para controle de rate limiting
 */
export function useRateLimit(
  config: Partial<RateLimitConfig> = {}
): RateLimitState {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  const [remainingAttempts, setRemainingAttempts] = useState(
    finalConfig.maxAttempts
  )
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockedTimeLeft, setBlockedTimeLeft] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Verificar estado ao montar e configurar interval
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Função para verificar bloqueio
    const checkBlock = () => {
      const blockedUntil = localStorage.getItem(BLOCKED_UNTIL_KEY)
      if (!blockedUntil) {
        setIsBlocked(false)
        setBlockedTimeLeft(0)
        return false
      }

      const blockedUntilTime = parseInt(blockedUntil)
      const now = Date.now()

      if (now < blockedUntilTime) {
        setIsBlocked(true)
        setBlockedTimeLeft(Math.ceil((blockedUntilTime - now) / 1000))
        return true
      } else {
        // Bloqueio expirou
        localStorage.removeItem(BLOCKED_UNTIL_KEY)
        localStorage.removeItem(STORAGE_KEY)
        setIsBlocked(false)
        setBlockedTimeLeft(0)
        setRemainingAttempts(finalConfig.maxAttempts)
        return false
      }
    }

    // Função para atualizar tentativas
    const updateAttempts = () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setRemainingAttempts(finalConfig.maxAttempts)
        return
      }

      try {
        const record: AttemptRecord = JSON.parse(stored)
        const now = Date.now()

        const recentAttempts = record.timestamps.filter(
          (timestamp) => now - timestamp < finalConfig.windowMs
        )

        const remaining = Math.max(
          0,
          finalConfig.maxAttempts - recentAttempts.length
        )
        setRemainingAttempts(remaining)

        if (recentAttempts.length > 0) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ timestamps: recentAttempts })
          )
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        setRemainingAttempts(finalConfig.maxAttempts)
      }
    }

    // Verificar inicialmente
    const isCurrentlyBlocked = checkBlock()
    if (!isCurrentlyBlocked) {
      updateAttempts()
    }

    // Configurar interval para atualizar quando bloqueado
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      checkBlock()
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [finalConfig.maxAttempts, finalConfig.windowMs])

  /**
   * Registra uma tentativa de login
   */
  const recordAttempt = useCallback(() => {
    if (typeof window === 'undefined') return

    const now = Date.now()
    const stored = localStorage.getItem(STORAGE_KEY)

    let record: AttemptRecord = { timestamps: [] }
    if (stored) {
      try {
        record = JSON.parse(stored)
      } catch {
        record = { timestamps: [] }
      }
    }

    // Filtrar tentativas antigas e adicionar a nova
    const recentAttempts = record.timestamps.filter(
      (timestamp) => now - timestamp < finalConfig.windowMs
    )
    recentAttempts.push(now)

    // Salvar no localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ timestamps: recentAttempts })
    )

    // Verificar se excedeu o limite
    if (recentAttempts.length >= finalConfig.maxAttempts) {
      const blockedUntil = now + finalConfig.blockDurationMs
      localStorage.setItem(BLOCKED_UNTIL_KEY, blockedUntil.toString())
      setIsBlocked(true)
      setBlockedTimeLeft(Math.ceil(finalConfig.blockDurationMs / 1000))
      setRemainingAttempts(0)
    } else {
      setRemainingAttempts(finalConfig.maxAttempts - recentAttempts.length)
    }
  }, [
    finalConfig.maxAttempts,
    finalConfig.windowMs,
    finalConfig.blockDurationMs
  ])

  /**
   * Reseta o rate limiting (usar com cuidado, apenas após login bem-sucedido)
   */
  const reset = useCallback(() => {
    if (typeof window === 'undefined') return

    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(BLOCKED_UNTIL_KEY)
    setRemainingAttempts(finalConfig.maxAttempts)
    setIsBlocked(false)
    setBlockedTimeLeft(0)
  }, [finalConfig.maxAttempts])

  return {
    remainingAttempts,
    isBlocked,
    blockedTimeLeft,
    recordAttempt,
    reset
  }
}
