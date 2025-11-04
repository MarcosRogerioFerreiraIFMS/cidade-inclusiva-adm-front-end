export function ConteudoCell({ conteudo }: { conteudo: string }) {
  const truncated =
    conteudo.length > 60 ? `${conteudo.substring(0, 60)}...` : conteudo
  return (
    <div className="line-clamp-1 text-sm" title={conteudo}>
      {truncated}
    </div>
  )
}
