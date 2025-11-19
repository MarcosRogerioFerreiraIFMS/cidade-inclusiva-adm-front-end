'use client'

import { revalidateMobilidades } from '@/app/_actions/mobilidadeActions'
import { Button } from '@/app/_components/ui/button'
import { useNotification } from '@/app/_hooks/useNotification'
import { RefreshCwIcon } from 'lucide-react'
import { useState, useTransition } from 'react'

export function MobilidadeTableActions() {
  const { notifySuccess, notifyError } = useNotification()
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateMobilidades()

      if (result.success) {
        notifySuccess({ message: 'Dados atualizados com sucesso!' })
      } else {
        notifyError({
          message: result.error || 'Erro ao atualizar dados'
        })
      }

      setIsRefreshing(false)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={handleRefresh}
        disabled={isRefreshing || isPending}
        aria-label="Atualizar lista de mobilidades"
      >
        <RefreshCwIcon
          className={`${isRefreshing || isPending ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        Atualizar
      </Button>
    </div>
  )
}
