import Link from 'next/link'
import { Button } from './_components/ui/button'

export default function NotFound() {
  return (
    <main
      className="mt-20 ml-70 flex flex-col items-center justify-center gap-4 p-5"
      style={{
        height: 'calc(100dvh - 5rem)'
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl text-slate-900">Página não encontrada</h1>
        <p className="text-slate-700">
          A página que você está procurando não existe.
        </p>
      </div>

      <Link href="/">
        <Button className="cursor-pointer">Voltar para a página inicial</Button>
      </Link>
    </main>
  )
}
