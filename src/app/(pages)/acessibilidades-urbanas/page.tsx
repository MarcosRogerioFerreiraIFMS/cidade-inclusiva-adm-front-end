import { LayoutDashboard } from '@/app/_components/layout/layout-dashboard'
import { QuickActionCard } from '@/app/_components/quick-action-card'
import {
  ACESSIBILIDADE_URBANA_QUICK_ACTIONS,
  getEnabledQuickActions
} from '@/app/_constants/quickActionsConstants'

export default function AcessibilidadeUrbanaPage() {
  const quickActions = getEnabledQuickActions(
    ACESSIBILIDADE_URBANA_QUICK_ACTIONS
  )

  return (
    <LayoutDashboard>
      <h2 className="text-2xl font-bold">Acesso Rápido</h2>

      <section className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5">
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </section>
    </LayoutDashboard>
  )
}
