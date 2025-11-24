import { getMobilidades } from '@/app/_services/mobilidadeService'
import { GerarRelatorioClient } from './_components/gerar-relatorio-client'

export const dynamic = 'force-dynamic'

export default async function GerarRelatorioPage() {
  const mobilidades = await getMobilidades()

  return <GerarRelatorioClient mobilidades={mobilidades} />
}
