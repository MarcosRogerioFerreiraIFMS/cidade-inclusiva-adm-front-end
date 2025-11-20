'use client'

import { revalidateMotoristas } from '@/app/_actions/motoristaActions'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useNotification } from '@/app/_hooks/useNotification'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'

export function MotoristaTableActions() {
  const { notifySuccess, notifyError } = useNotification()
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateMotoristas()

      if (result.success) {
        notifySuccess({ message: 'Dados atualizados com sucesso!' })
      } else {
        notifyError({
          message: result.error ?? 'Erro ao atualizar dados.'
        })
      }

      setIsRefreshing(false)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleRefresh}
        variant="outline"
        disabled={isRefreshing || isPending}
        aria-label="Atualizar lista de oficinas"
      >
        <RefreshCwIcon
          className={isPending ? 'animate-spin' : ''}
          aria-hidden="true"
        />
        Atualizar
      </Button>
      <Button asChild>
        <Link href={APP_ROUTES.MOTORISTA_ADICIONAR()}>
          <PlusIcon aria-hidden="true" />
          Adicionar Motorista
        </Link>
      </Button>
    </div>
  )
}
