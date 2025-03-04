import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Header() {
  return (
    <header className="bg-secondary border-secondary-foreground flex h-20 items-center justify-between border-l-2 px-5 py-3">
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
  )
}
