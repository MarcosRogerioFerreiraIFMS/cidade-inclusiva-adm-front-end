import {
  getNoticiaCategoriaBadgeColor,
  getNoticiaCategoriaLabel,
  type NoticiaCategoria
} from '@/app/_enums/noticiaEnums'
import { Badge } from '../ui/badge'

interface NoticiaCategoriaCellProps {
  categoria: NoticiaCategoria
}

export function NoticiaCategoriaCell({ categoria }: NoticiaCategoriaCellProps) {
  const displayName = getNoticiaCategoriaLabel(categoria)
  const colorClasses = getNoticiaCategoriaBadgeColor(categoria)

  return <Badge className={colorClasses}>{displayName}</Badge>
}
