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
    <article className="outline-secondary flex w-full flex-col items-center justify-start gap-6 rounded-lg p-5 outline-2 outline-offset-[-2px]">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="text-secondary w-full truncate text-center text-xl font-normal">
          {title}
        </h2>
        <p className="text-muted-foreground w-full truncate text-center">
          {description}
        </p>
      </div>

      <Link href={href}>
        <Button variant="secondary" size="lg">
          Acessar
        </Button>
      </Link>
    </article>
  )
}
