import { truncateText } from '@/app/_utils/stringUtils'

export function ConteudoCell({ conteudo }: { conteudo: string }) {
  const truncated = truncateText(conteudo, 60)

  return (
    <div className="line-clamp-1 text-sm" title={conteudo}>
      {truncated}
    </div>
  )
}
