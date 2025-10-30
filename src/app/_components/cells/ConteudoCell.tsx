export function ConteudoCell({ conteudo }: { conteudo: string }) {
  const truncated =
    conteudo.length > 100 ? `${conteudo.substring(0, 100)}...` : conteudo
  return (
    <div className="line-clamp-1 max-w-[300px] text-sm" title={conteudo}>
      {truncated}
    </div>
  )
}
