'use client'

import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './_components/ui/button'
import { useMenuStore } from './_store/menuStore'

/**
 * Componente de página para exibir quando a rota não é encontrada (404).
 */
export default function NotFound() {
  const { showMenu } = useMenuStore()

  return (
    <main
      className={`animate-fade-in mt-20 flex flex-col items-center justify-center gap-4 p-5 transition-all ${showMenu ? 'ml-70' : 'ml-0'}`}
      style={{
        height: 'calc(100dvh - 5rem)'
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl">Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
      </div>

      <Button asChild>
        <Link href="/">
          <Undo2Icon />
          <span>Voltar para a página inicial</span>
        </Link>
      </Button>
    </main>
  )
}
