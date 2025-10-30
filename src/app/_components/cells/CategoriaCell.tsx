import {
  NoticiaCategoriasDisplay,
  type NoticiaCategoria
} from '@/app/_enums/noticiaEnums'
import { getShadcnBadgeColor } from '@/app/_utils/getShadcnBadgeColor'
import { Badge } from '../ui/badge'

interface NoticiaCategoriaCellProps {
  categoria: NoticiaCategoria
}

export function NoticiaCategoriaCell({ categoria }: NoticiaCategoriaCellProps) {
  const displayName = NoticiaCategoriasDisplay[categoria] ?? categoria
  const colorClasses = getShadcnBadgeColor(categoria)

  return <Badge className={colorClasses}>{displayName}</Badge>
}
