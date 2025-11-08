import {
  NoticiaCategoriasDisplay,
  type NoticiaCategoria
} from '@/app/_enums/noticiaEnums'
import { getNoticiaCategoriaBadgeColor } from '@/app/_utils/getShadcnBadgeColor'
import { Badge } from '../ui/badge'

interface NoticiaCategoriaCellProps {
  categoria: NoticiaCategoria
}

export function NoticiaCategoriaCell({ categoria }: NoticiaCategoriaCellProps) {
  const displayName = NoticiaCategoriasDisplay[categoria] ?? categoria
  const colorClasses = getNoticiaCategoriaBadgeColor(categoria)

  return <Badge className={colorClasses}>{displayName}</Badge>
}
