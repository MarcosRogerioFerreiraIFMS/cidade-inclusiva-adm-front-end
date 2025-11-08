import { formatDateToDateString } from '@/app/_utils/dateUtils'

interface DataCellProps {
  dataPublicacao: string
}

export function DataCell({ dataPublicacao }: DataCellProps) {
  return <div className="text-sm">{formatDateToDateString(dataPublicacao)}</div>
}
