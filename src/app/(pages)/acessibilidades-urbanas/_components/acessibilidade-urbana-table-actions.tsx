'use client'

import { revalidateAcessibilidadesUrbanas } from '@/app/_actions/acessibilidadeUrbanaActions'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useNotification } from '@/app/_hooks/useNotification'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'

export function AcessibilidadeUrbanaTableActions() {
  const { notifySuccess, notifyError } = useNotification()
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateAcessibilidadesUrbanas()

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
        aria-label="Atualizar lista de acessibilidades urbanas"
      >
        <RefreshCwIcon
          className={isPending ? 'animate-spin' : ''}
          aria-hidden="true"
        />
        Atualizar
      </Button>
      <Button asChild aria-label="Adicionar nova acessibilidade urbana">
        <Link href={APP_ROUTES.ACESSIBILIDADE_URBANA_ADICIONAR()}>
          <PlusIcon aria-hidden="true" />
          Adicionar Acessibilidade
        </Link>
      </Button>
    </div>
  )
}
