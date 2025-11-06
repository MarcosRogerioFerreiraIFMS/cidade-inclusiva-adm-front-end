'use client'

import { LayoutError } from '@/app/_components/layout/layout-error'

export default function ProfissionalListarError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <LayoutError error={error} reset={reset} />
}
