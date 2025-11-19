'use client'

import { revalidateNoticias } from '@/app/_actions/noticiaActions'
import { Button } from '@/app/_components/ui/button'
import { APP_ROUTES } from '@/app/_constants/appSettingsConstants'
import { useNotification } from '@/app/_hooks/useNotification'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'

export function NoticiaTableActions() {
  const { notifySuccess, notifyError } = useNotification()
  const [isPending, startTransition] = useTransition()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    startTransition(async () => {
      const result = await revalidateNoticias()

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
        aria-label="Atualizar lista de notícias"
      >
        <RefreshCwIcon
          className={`${isRefreshing || isPending ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        Atualizar
      </Button>
      <Button asChild>
        <Link
          href={APP_ROUTES.NOTICIA_ADICIONAR()}
          aria-label="Adicionar nova notícia"
        >
          <PlusIcon aria-hidden="true" />
          Adicionar Notícia
        </Link>
      </Button>
    </div>
  )
}
