'use client'

import { menuItems } from '@/app/_constants/sidebarItemsConstants'
import { useAuth } from '@/app/_hooks/useAuth'
import { useMenuStore } from '@/app/_store/menuStore'
import {
  LogOutIcon,
  LucideIcon,
  MenuSquareIcon,
  MoonIcon,
  SunIcon,
  WrenchIcon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useMemo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const showMenu = useMenuStore((state) => state.showMenu)
  const toggleMenu = useMenuStore((state) => state.toggleMenu)
  const { setTheme } = useTheme()
  const { user, logout } = useAuth()

  const pageTitle = useMemo(() => {
    const mainItem = menuItems.find((item) => item.href === pathname)
    if (mainItem) return mainItem.title

    for (const item of menuItems) {
      if (item.subItems) {
        const subItem = item.subItems.find((sub) => sub.href === pathname)
        if (subItem) return subItem.title
      }
    }

    if (pathname.startsWith('/noticias/editar/')) return 'Editar Notícia'
    if (/^\/noticias\/[a-zA-Z0-9-]+$/.test(pathname))
      return 'Visualizar Notícia'

    return 'Página não encontrada'
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch {
      router.push('/login')
    }
  }

  // Obter iniciais do usuário para o avatar
  const userInitials = useMemo(() => {
    if (!user?.nome) return 'U'
    const names = user.nome.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return names[0].substring(0, 2).toUpperCase()
  }, [user])

  return (
    <>
      <aside
        className={`dark:bg-background bg-primary fixed top-0 left-0 z-50 flex h-full w-[280px] flex-col gap-5 border-r pt-5 pr-2 pb-5 pl-5 transition-transform ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="dark:text-foreground text-white"
          >
            <MenuSquareIcon className="size-6" />
          </Button>
          <Link href="/" className="relative aspect-207/48 h-10">
            <Image
              src="/logo.png"
              fill
              alt="Cidade Inclusiva"
              draggable={false}
              priority
              className="rounded-md object-contain shadow-sm"
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, 640px"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4DwQACfsD/QcAxN8AAAAASUVORK5CYII="
            />
          </Link>
        </div>

        <Accordion
          type="multiple"
          className="[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-background flex flex-col gap-4 overflow-x-hidden overflow-y-auto pr-4 pb-20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full"
        >
          {menuItems.map((item, index) => {
            if (item.subItems && item.subItems.length > 0) {
              return (
                <AccordionItem
                  key={item.href}
                  value={`item-${index}`}
                  className="border-none"
                >
                  <AccordionTrigger className="py-0">
                    <LinkItem
                      href={item.href}
                      icon={item.icon}
                      text={item.text}
                      pathname={pathname}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 py-2 pb-0 pl-4">
                    {item.subItems.map((subItem) => (
                      <LinkItem
                        key={subItem.href}
                        href={subItem.href}
                        icon={subItem.icon}
                        text={subItem.text}
                        pathname={pathname}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            }
            return (
              <AccordionItem
                key={item.href}
                value={`item-${index}`}
                className="border-none"
              >
                <LinkItem
                  href={item.href}
                  icon={item.icon}
                  text={item.text}
                  pathname={pathname}
                />
              </AccordionItem>
            )
          })}
        </Accordion>

        <p className="dark:text-muted-foreground mt-auto text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Cidade Inclusiva. Todos os direitos
          reservados.
        </p>
      </aside>

      <header
        className={`dark:bg-background bg-primary fixed top-0 flex h-full max-h-20 items-center justify-between border-b px-5 ${showMenu ? 'left-70 w-[calc(100%-280px)]' : 'left-0 w-full'} z-40 transition-all`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className={`${showMenu ? 'sr-only' : ''} dark:text-foreground text-white`}
          >
            <MenuSquareIcon className="size-6" />
          </Button>
          <h1 className="dark:text-foreground text-2xl text-white">
            {pageTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 p-2 hover:bg-transparent focus-visible:border-none focus-visible:ring-0 dark:hover:bg-transparent"
              >
                <Avatar className="size-14 rounded-full border-2">
                  <AvatarImage
                    className="object-cover"
                    draggable={false}
                    src={
                      user?.foto && typeof user.foto === 'object'
                        ? user.foto.url
                        : undefined
                    }
                  />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>

                <div className="flex w-full max-w-[200px] flex-col items-center justify-center gap-1">
                  <h2 className="dark:text-foreground w-full truncate text-xs font-bold text-white">
                    {user?.nome || 'Usuário'}
                  </h2>
                  <div className="dark:text-muted-foreground w-full truncate text-[0.6rem] text-gray-300">
                    {user?.tipo || 'Administrador'}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunIcon />
                  <span>Tema</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <SunIcon />
                    <span>Tema claro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <MoonIcon />
                    <span>Tema escuro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <WrenchIcon />
                    <span>Tema do sistema</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOutIcon />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}

interface LinkItemProps {
  href: string
  icon: LucideIcon
  text: string
  pathname: string
}

const LinkItem = memo(
  function LinkItem({ href, icon: Icon, text, pathname }: LinkItemProps) {
    const isActive = pathname === href

    return (
      <Link
        className={`${
          isActive
            ? 'dark:text-foreground text-white'
            : 'dark:text-muted-foreground text-gray-300'
        } dark:hover:text-foreground/90 flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white/90`}
        href={href}
      >
        <Icon className="size-6" />
        <p className={`line-clamp-3 ${isActive ? 'font-bold' : ''}`}>{text}</p>
      </Link>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.href === nextProps.href &&
      prevProps.pathname === nextProps.pathname &&
      prevProps.text === nextProps.text
    )
  }
)
