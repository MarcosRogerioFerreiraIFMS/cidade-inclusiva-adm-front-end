export function formatDateToLocalDatetime(
  date: Date | string | undefined | null
): string {
  if (!date) return ''

  const parsedDate =
    typeof date === 'string'
      ? new Date(date)
      : date instanceof Date
        ? date
        : null
  if (!parsedDate || isNaN(parsedDate.getTime())) return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = parsedDate.getFullYear()
  const month = pad(parsedDate.getMonth() + 1)
  const day = pad(parsedDate.getDate())
  const hours = pad(parsedDate.getHours())
  const minutes = pad(parsedDate.getMinutes())

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function formatDateToDateString(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
