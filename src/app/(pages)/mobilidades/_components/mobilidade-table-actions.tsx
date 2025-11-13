'use client'

import { revalidateMobilidades } from '@/app/_actions/mobilidadeActions'
import { Button } from '@/app/_components/ui/button'
import { RefreshCwIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export function MobilidadeTableActions() {
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateMobilidades()

      if (result.success) {
        toast.success('Dados atualizados com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao atualizar dados')
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
