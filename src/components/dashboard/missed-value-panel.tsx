import { formatCurrency } from "@/lib/utils"
import type { MissedValueByFunction, PersonalDashboard } from "@/lib/types"
import { SectionHeader } from "@/components/dashboard/section-header"
import { Separator } from "@/components/ui/separator"

interface MissedValuePanelProps {
  totalMissed: number
  byFunction: MissedValueByFunction[]
  personalDashboard: PersonalDashboard
}

/**
 * This part of the code renders the right-column panel on the My Work Today
 * page. It has two sections:
 *
 * 1. "MISSED VALUE" — a large red/warm dollar total and a breakdown by
 *    function showing recoverable, at-risk, window, and loss-rate values.
 *
 * 2. "PERSONAL DASHBOARD" — the logged-in operator's name, their queue
 *    count, recoverable value, and count of items urgent within 12 hours.
 *
 * When the data arrays are empty or the total is zero, the component still
 * renders the structural headers with zero-state values to maintain layout.
 */
export function MissedValuePanel({
  totalMissed,
  byFunction,
  personalDashboard,
}: MissedValuePanelProps) {
  return (
    <div className="space-y-6">
      {/* This part of the code renders the missed-value summary section. */}
      <div className="rounded-xl border border-border bg-card p-5">
        <SectionHeader title="Missed Value" />
        <p className="mt-2 text-3xl font-bold text-red-500 dark:text-red-400">
          {formatCurrency(totalMissed)}
        </p>

        {/* This part of the code renders the per-function breakdown cards. */}
        <div className="mt-4 space-y-3">
          {byFunction.map((fn) => (
            <div
              key={fn.function}
              className="rounded-lg border border-border bg-muted/50 p-3"
            >
              <p className="text-sm font-medium">{fn.function}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Recoverable {formatCurrency(fn.recoverable)} · At risk{" "}
                {formatCurrency(fn.atRisk)} · Window {fn.windowHours}h · losing{" "}
                {formatCurrency(fn.losingPerHour)}/hour
              </p>
            </div>
          ))}

          {byFunction.length === 0 && (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </div>
      </div>

      <Separator />

      {/* This part of the code renders the personal dashboard section
          with the operator's stats. */}
      <div className="rounded-xl border border-border bg-card p-5">
        <SectionHeader title="Personal Dashboard" rightLabel="What you own right now" />
        {personalDashboard.name && (
          <p className="mt-2 text-sm font-medium">
            {personalDashboard.name}
            <span className="ml-2 text-xs text-muted-foreground">
              Losing {formatCurrency(personalDashboard.losingPerHour)}/hour across my queue
            </span>
          </p>
        )}

        {/* This part of the code renders the three inline metrics for the
            personal dashboard: queue count, recoverable value, and urgency. */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{personalDashboard.queueCount}</p>
            <p className="text-xs text-muted-foreground">My queue</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(personalDashboard.recoverableValue)}
            </p>
            <p className="text-xs text-muted-foreground">Recoverable value</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{personalDashboard.urgentIn12h}</p>
            <p className="text-xs text-muted-foreground">Urgent in 12h</p>
          </div>
        </div>
      </div>
    </div>
  )
}
