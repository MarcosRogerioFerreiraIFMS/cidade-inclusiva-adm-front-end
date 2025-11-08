'use client'

import { useAuth } from '@/app/_hooks/useAuth'

interface UsuarioNomeCellProps {
  nome: string
  usuarioId: string
}

export function UsuarioNomeCell({ nome, usuarioId }: UsuarioNomeCellProps) {
  const { user: currentUser } = useAuth()
  const isCurrentUser = currentUser?.id === usuarioId

  return (
    <div className="max-w-[300px] truncate font-medium" title={nome}>
      {isCurrentUser ? 'Você' : nome}
    </div>
  )
}
