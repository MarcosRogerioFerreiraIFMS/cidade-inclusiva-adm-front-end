'use client'

import { useMenuStore } from '@/app/_store/useMenuStore'
import {
  AccessibilityIcon,
  BusFrontIcon,
  ContactIcon,
  HomeIcon,
  MenuSquareIcon,
  NewspaperIcon,
  TriangleAlertIcon,
  WrenchIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export function Header() {
  const router = usePathname()

  const { showMenu, toggleMenu } = useMenuStore()

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
        return 'Adicionar Notícia'
      case `/noticias/editar/${router.split('/')[3]}`:
        return 'Editar Notícia'
      case `/noticias/visualizar/${router.split('/')[3]}`:
        return 'Visualizar Notícia'
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
      <aside
        className={`bg-primary fixed top-0 left-0 z-50 flex h-full w-[280px] transform flex-col gap-10 pt-5 pr-2 pb-5 pl-5 transition-transform ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2 pr-4">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <MenuSquareIcon className="text-primary-foreground size-6" />
          </Button>
          <Link href="/" className="h-full w-full">
            <Image
              width={0}
              height={0}
              src="/logo.png"
              alt="Cidade Inclusiva"
              className="pointer-events-none w-full object-contain select-none"
              sizes="(max-width: 768px) 100vw, 210px"
              placeholder="blur"
              blurDataURL="/logo.png"
              priority={false}
            />
          </Link>
        </div>

        <Accordion
          type="multiple"
          className="[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-background flex flex-col gap-4 overflow-x-hidden overflow-y-auto pr-4 pb-20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full"
        >
          <AccordionItem value="dashboard">
            <LinkItem href="/" icon={HomeIcon} text="Dashboard" />
          </AccordionItem>

          <AccordionItem value="acessibilidade-urbana">
            <LinkItem
              href="/acessibilidade-urbana"
              icon={AccessibilityIcon}
              text="Acessibilidade Urbana"
            />
          </AccordionItem>

          <AccordionItem value="contatos">
            <LinkItem href="/contatos" icon={ContactIcon} text="Contatos" />
          </AccordionItem>

          <AccordionItem value="oficinas-manutencao">
            <AccordionTrigger>
              <LinkItem
                href="/oficinas-manutencao"
                icon={WrenchIcon}
                text="Oficinas de Manutenção"
              />
            </AccordionTrigger>
            <AccordionContent>
              <LinkItem
                href="/oficinas-manutencao/listar"
                icon={WrenchIcon}
                text="Listar oficinas de manutenção"
              />
              <LinkItem
                href="/oficinas-manutencao/adicionar"
                icon={WrenchIcon}
                text="Adicionar oficinas de manutenção"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="noticias">
            <AccordionTrigger>
              <LinkItem href="/noticias" icon={NewspaperIcon} text="Notícias" />
            </AccordionTrigger>
            <AccordionContent>
              <LinkItem
                href="/noticias/listar"
                icon={NewspaperIcon}
                text="Listar Notícias"
              />
              <LinkItem
                href="/noticias/adicionar"
                icon={NewspaperIcon}
                text="Adicionar Notícias"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ocorrencias">
            <AccordionTrigger>
              <LinkItem
                href="/ocorrencias"
                icon={TriangleAlertIcon}
                text="Ocorrências"
              />
            </AccordionTrigger>
            <AccordionContent>
              <LinkItem
                href="/ocorrencias/listar"
                icon={TriangleAlertIcon}
                text="Listar Ocorrências"
              />
              <LinkItem
                href="/ocorrencias/mapa"
                icon={TriangleAlertIcon}
                text="Mapa Interativo"
              />
              <LinkItem
                href="/ocorrencias/gerar-relatorio"
                icon={TriangleAlertIcon}
                text="Gerar relatório de ocorrências"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transporte">
            <LinkItem
              href="/transporte"
              icon={BusFrontIcon}
              text="Transporte"
            />
          </AccordionItem>
        </Accordion>

        <p className="text-primary-muted-foreground mt-auto text-center text-xs">
          &copy; {new Date().getFullYear()} Cidade Inclusiva. Todos os direitos
          reservados.
        </p>
      </aside>

      <header
        className={`bg-primary fixed top-0 flex h-full max-h-20 items-center justify-between px-5 py-3 ${showMenu ? 'border-primary-foreground left-70 w-[calc(100%-280px)] border-l-2' : 'left-0 w-full'} z-40 transition-all`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className={`${showMenu ? 'sr-only' : ''}`}
          >
            <MenuSquareIcon className="text-primary-foreground size-6" />
          </Button>
          <h1 className="text-primary-foreground text-2xl">{handleTitle()}</h1>
        </div>

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
            <h2 className="text-primary-foreground w-full truncate text-xs font-bold">
              João Pedro Alves
            </h2>
            <div className="text-primary-foreground w-full truncate text-[10px]">
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
      className={`${isActive ? 'text-primary-foreground' : 'text-primary-muted-foreground'} hover:text-primary-foreground-hover flex items-center gap-3 text-sm transition-colors`}
      href={href}
    >
      <Icon className="h-6 w-6 shrink-0 grow-0" />
      <p className={`line-clamp-3 ${isActive ? 'font-bold' : ''}`}>{text}</p>
    </Link>
  )
}
