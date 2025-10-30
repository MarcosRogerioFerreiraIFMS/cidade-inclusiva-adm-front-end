'use client'

import type { ActionResult } from '@/app/_types/apiResponsesType'
import { useCallback, useState } from 'react'
import { useNotification } from './useNotification'

interface DeleteModalState {
  isOpen: boolean
  itemId?: string | number
  onConfirm?: () => Promise<ActionResult>
  successMessage?: string
}

export function useDeleteModal() {
  const [modalState, setModalState] = useState<DeleteModalState>({
    isOpen: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const { notifySuccess, notifyError } = useNotification()

  const openModal = useCallback(
    (
      itemId: string | number,
      onConfirm: () => Promise<ActionResult>,
      successMessage?: string
    ) => {
      setModalState({ isOpen: true, itemId, onConfirm, successMessage })
    },
    []
  )

  const resetModal = useCallback(() => {
    setModalState({
      isOpen: false,
      itemId: undefined,
      onConfirm: undefined,
      successMessage: undefined
    })
    setIsLoading(false)
  }, [])

  const closeModal = useCallback(() => {
    resetModal()
  }, [resetModal])

  const confirmDelete = useCallback(async () => {
    if (!modalState.onConfirm || isLoading) return

    setIsLoading(true)
    try {
      const result = await modalState.onConfirm()

      if (result.success) {
        if (modalState.successMessage) {
          notifySuccess({ message: modalState.successMessage })
        }
        resetModal()
      } else {
        const errorMessage =
          result.error ||
          'Não foi possível completar a operação. Tente novamente.'

        notifyError({ message: errorMessage })
        setIsLoading(false)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro de conexão. Verifique sua internet e tente novamente.'

      notifyError({ message: errorMessage })
      setIsLoading(false)
    }
  }, [modalState, isLoading, notifyError, notifySuccess, resetModal])

  return {
    isOpen: modalState.isOpen,
    itemId: modalState.itemId,
    isLoading,
    openModal,
    closeModal,
    confirmDelete
  }
}
