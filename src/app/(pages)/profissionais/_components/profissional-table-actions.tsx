'use client'

import { revalidateProfissionais } from '@/app/_actions/profissionalActions'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export function ProfissionalTableActions() {
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateProfissionais()

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
        aria-label="Atualizar lista de profissionais"
      >
        <RefreshCwIcon
          className={`${isRefreshing || isPending ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        Atualizar
      </Button>
      <Button asChild aria-label="Adicionar novo profissional">
        <Link href={APP_ROUTES.PROFISSIONAL_ADICIONAR()}>
          <PlusIcon aria-hidden="true" />
          Adicionar Profissional
        </Link>
      </Button>
    </div>
  )
}
