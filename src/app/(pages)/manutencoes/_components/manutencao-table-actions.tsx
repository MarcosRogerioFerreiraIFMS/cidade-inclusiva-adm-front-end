'use client'

import { revalidateManutencoes } from '@/app/_actions/manutencaoActions'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useNotification } from '@/app/_hooks/useNotification'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'

export function ManutencaoTableActions() {
  const { notifySuccess, notifyError } = useNotification()
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateManutencoes()

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
    <div className="flex flex-col gap-2 sm:flex-row">
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
      <Button asChild aria-label="Adicionar nova oficina de manutenção">
        <Link href={APP_ROUTES.MANUTENCAO_ADICIONAR()}>
          <PlusIcon aria-hidden="true" />
          Adicionar Oficina
        </Link>
      </Button>
    </div>
  )
}
