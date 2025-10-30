interface TituloCellProps {
  titulo: string
}

export function TituloCell({ titulo }: TituloCellProps) {
  return (
    <div className="max-w-[300px] truncate font-medium" title={titulo}>
      {titulo}
    </div>
  )
}
