import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import type { KpiMetric } from "@/lib/types"

/**
 * This part of the code renders a single KPI summary card. It picks
 * background colours based on the variant prop — "positive" gets a green
 * tint, "danger" gets red, "warning" gets amber, and "neutral" gets the
 * default muted background. The value is formatted according to its type
 * (currency, percentage, or plain number).
 */

const VARIANT_STYLES: Record<KpiMetric["variant"], string> = {
  positive:
    "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
  neutral: "bg-muted text-foreground",
  warning:
    "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
  danger: "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100",
}

function formatValue(value: number, format: KpiMetric["format"]): string {
  switch (format) {
    case "currency":
      return formatCurrency(value)
    case "percentage":
      return formatPercentage(value)
    case "number":
      return value.toLocaleString()
  }
}

export function KpiCard({ label, value, format, variant }: KpiMetric) {
  return (
    <div
      className={cn(
        "rounded-xl px-5 py-4 transition-colors",
        VARIANT_STYLES[variant]
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-1 text-2xl font-bold">{formatValue(value, format)}</p>
    </div>
  )
}
