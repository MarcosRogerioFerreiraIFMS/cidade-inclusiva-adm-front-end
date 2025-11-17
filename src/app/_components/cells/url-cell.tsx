import { ExternalLinkIcon } from 'lucide-react'
import { Button } from '../ui/button'

export function UrlCell({ url }: { url: string }) {
  if (!url) {
    return <span className="text-muted-foreground text-sm">-</span>
  }

  return (
    <Button variant="ghost" asChild className="h-8">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5"
      >
        <ExternalLinkIcon className="size-3.5" />
        <span className="text-xs">Abrir</span>
      </a>
    </Button>
  )
}
