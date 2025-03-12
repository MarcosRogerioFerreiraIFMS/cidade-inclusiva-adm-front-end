'use client'

import {
  AccessibilityIcon,
  BusFrontIcon,
  ContactIcon,
  HomeIcon,
  NewspaperIcon,
  TriangleAlertIcon,
  WrenchIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Header() {
  const router = usePathname()

  function handleTitle() {
    if (router === '/') return 'Dashboard'

    switch (router) {
      case '/acessibilidade-urbana':
        return 'Acessibilidade Urbana'
      case '/contatos':
        return 'Contatos'
      case '/oficinas-manutencao':
        return 'Oficinas de Manutenção'
      case '/oficinas-manutencao/listar':
        return 'Listar Oficinas de Manutenção'
      case '/oficinas-manutencao/adicionar':
        return 'Adicionar Oficinas de Manutenção'
      case '/noticias':
        return 'Notícias'
      case '/noticias/listar':
        return 'Listar Notícias'
      case '/noticias/adicionar':
        return 'Adicionar Notícias'
      case '/ocorrencias':
        return 'Ocorrências'
      case '/ocorrencias/listar':
        return 'Listar Ocorrências'
      case '/ocorrencias/mapa':
        return 'Mapa Interativo de Ocorrências'
      case '/ocorrencias/gerar-relatorio':
        return 'Gerar Relatório de Ocorrências'
      case '/transporte':
        return 'Transporte'
      default:
        return 'Página não encontrada'
    }
  }
  return (
    <>
      <aside className="bg-secondary fixed top-0 left-0 flex h-full w-[280px] flex-col gap-10 pt-5 pr-2 pb-5 pl-5">
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

        <ul className="[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-background flex flex-col gap-4 overflow-y-auto pb-20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <li>
            <LinkItem href="/" icon={HomeIcon} text="Dashboard" />
          </li>

          <li>
            <LinkItem
              href="/acessibilidade-urbana"
              icon={AccessibilityIcon}
              text="Acessibilidade Urbana"
            />
          </li>
          <li>
            <LinkItem href="/contatos" icon={ContactIcon} text="Contatos" />
          </li>
          <li>
            <LinkItem
              href="/oficinas-manutencao"
              icon={WrenchIcon}
              text="Oficinas de Manutenção"
            />
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <LinkItem
                  href="/oficinas-manutencao/listar"
                  icon={WrenchIcon}
                  text="
                  Listar oficinas de manutenção"
                />
              </li>
              <li>
                <LinkItem
                  href="/oficinas-manutencao/adicionar"
                  icon={WrenchIcon}
                  text="Adicionar oficinas de manutenção"
                />
              </li>
            </ul>
          </li>
          <li>
            <LinkItem href="/noticias" icon={NewspaperIcon} text="Notícias" />
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <LinkItem
                  href="/noticias/listar"
                  icon={NewspaperIcon}
                  text="Listar Notícias"
                />
              </li>
              <li>
                <LinkItem
                  href="/noticias/adicionar"
                  icon={NewspaperIcon}
                  text="Adicionar Notícias"
                />
              </li>
            </ul>
          </li>
          <li>
            <LinkItem
              href="/ocorrencias"
              icon={TriangleAlertIcon}
              text="Ocorrências"
            />
            <ul className="mt-4 flex flex-col gap-4 pr-4 pl-5">
              <li>
                <LinkItem
                  href="/ocorrencias/listar"
                  icon={TriangleAlertIcon}
                  text="Listar Ocorrências"
                />
              </li>
              <li>
                <LinkItem
                  href="/ocorrencias/mapa"
                  icon={TriangleAlertIcon}
                  text="Mapa Interativo"
                />
              </li>
              <li>
                <LinkItem
                  href="/ocorrencias/gerar-relatorio"
                  icon={TriangleAlertIcon}
                  text="Gerar relatório de ocorrências"
                />
              </li>
            </ul>
          </li>
          <li>
            <LinkItem
              href="/transporte"
              icon={BusFrontIcon}
              text="Transporte"
            />
          </li>
        </ul>

        <p className="text-secondary-muted-foreground mt-auto text-center text-xs">
          &copy; {new Date().getFullYear()} Cidade Inclusiva. Todos os direitos
          reservados.
        </p>
      </aside>

      <header className="bg-secondary border-secondary-foreground fixed top-0 left-70 flex h-20 w-full items-center justify-between border-l-2 px-5 py-3">
        <h1 className="text-secondary-foreground text-2xl">{handleTitle()}</h1>

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

interface LinkItemProps {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  text: string
}

function LinkItem({ href, icon: Icon, text }: LinkItemProps) {
  const router = usePathname()
  const isActive = router === href

  return (
    <Link
      className={`${isActive ? 'text-secondary-foreground' : 'text-secondary-muted-foreground'} hover:text-secondary-foreground-hover flex items-center gap-3 transition-colors`}
      href={href}
    >
      <Icon className="h-6 w-6 shrink-0 grow-0" />
      <p className={`line-clamp-3 ${isActive ? 'font-bold' : ''}`}>{text}</p>
    </Link>
  )
}
