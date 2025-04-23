import Link from 'next/link'
import { Button } from './ui/button'

interface QuickActionCardProps {
  title: string
  description: string
  href: string
}

export function QuickActionCard({
  title,
  description,
  href = '#'
}: QuickActionCardProps) {
  return (
    <article className="outline-primary flex w-full flex-col items-center gap-6 rounded-lg p-5 outline-2 outline-offset-[-2px]">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="text-primary w-full truncate text-center text-xl font-normal">
          {title}
        </h2>
        <p className="text-muted-foreground w-full truncate text-center">
          {description}
        </p>
      </div>

      <Button size="lg" asChild>
        <Link href={href}>Acessar</Link>
      </Button>
    </article>
  )
}
