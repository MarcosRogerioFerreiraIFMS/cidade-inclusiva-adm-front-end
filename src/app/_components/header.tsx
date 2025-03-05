import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Header() {
  return (
    <>
      <aside className="bg-secondary fixed top-0 left-0 flex h-full w-[280px] flex-col gap-10 px-5 pt-5">
        <Link
          className="relative flex h-[52px] w-[222px] shrink-0 grow-0"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="Cidade Inclusiva"
            fill
            className="pointer-events-none object-cover select-none"
            sizes="(max-width: 768px) 100vw, 210px"
            placeholder="blur"
            blurDataURL="/logo.png"
            priority={false}
          />
        </Link>

        <ul className="flex flex-col gap-4 overflow-y-auto px-4 pb-20 [&::-webkit-scrollbar]:hidden">
          <li>
            <Link className="flex items-center gap-3" href="/">
              <HomeIcon className="text-secondary-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-foreground line-clamp-3 font-bold">
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              className="flex items-center gap-3"
              href="/acessibilidade-urbana"
            >
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Acessibilidade Urbana
              </p>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3" href="/contatos">
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Contatos
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-3"
              href="/oficinas-manutencao"
            >
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Oficinas de Manutenção
              </p>
            </Link>
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/oficinas-manutencao/listar"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Listar oficinas de manutenção
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/oficinas-manutencao/adicionar"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Adicionar oficinas de manutenção
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="flex items-center gap-3" href="/noticias">
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Notícias
              </p>
            </Link>
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/noticias/visao-geral"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Visão Geral
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/noticias/listar"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Listar Notícias
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/noticias/adicionar"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Adicionar Notícias
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="flex items-center gap-3" href="/ocorrencias">
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Ocorrências
              </p>
            </Link>
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/ocorrencias/visao-geral"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Visão Geral
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/ocorrencias/listar"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Listar Ocorrências
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/ocorrencias/mapa"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Mapa Interativo
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3"
                  href="/ocorrencias/gerar-relatorio"
                >
                  <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
                  <p className="text-secondary-muted-foreground line-clamp-3">
                    Gerar relatório de ocorrências
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="flex items-center gap-3" href="/transporte">
              <HomeIcon className="text-secondary-muted-foreground h-6 w-6 shrink-0 grow-0" />
              <p className="text-secondary-muted-foreground line-clamp-3">
                Transporte
              </p>
            </Link>
          </li>
        </ul>
      </aside>

      <header className="bg-secondary border-secondary-foreground fixed top-0 left-70 flex h-20 w-full items-center justify-between border-l-2 px-5 py-3">
        <h1 className="text-secondary-foreground text-2xl">Dashboard</h1>

        <div className="flex items-center gap-3">
          <Avatar className="h-[50px] w-[50px] cursor-pointer rounded-full border-3">
            <AvatarImage
              className="pointer-events-none select-none"
              src="/user.png"
              alt="Foto de perfil"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          <div className="flex w-full max-w-[200px] flex-col items-center justify-center gap-1">
            <h2 className="text-secondary-foreground w-full truncate text-xs font-bold">
              João Pedro Alves
            </h2>
            <div className="text-secondary-foreground w-full truncate text-[10px]">
              Administrador
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
