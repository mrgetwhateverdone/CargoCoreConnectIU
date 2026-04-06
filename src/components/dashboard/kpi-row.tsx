import type { KpiMetric } from "@/lib/types"
import { KpiCard } from "@/components/dashboard/kpi-card"

interface KpiRowProps {
  metrics: KpiMetric[]
}

/**
 * This part of the code renders a responsive horizontal row of KPI cards.
 * On mobile it stacks to 2 columns, on larger screens it spans all
 * available columns (up to 4). If the metrics array is empty it renders
 * nothing, keeping the page clean when no data is connected.
 */
export function KpiRow({ metrics }: KpiRowProps) {
  if (metrics.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <KpiCard key={`${metric.label}-${index}`} {...metric} />
      ))}
    </div>
  )
}
