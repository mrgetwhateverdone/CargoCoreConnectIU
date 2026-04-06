import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { FunctionScorecard as FunctionScorecardType } from "@/lib/types"
import { Button } from "@/components/ui/button"

/**
 * This part of the code renders a single function scorecard — one per
 * organisational department (Operations, Supply Chain, Planning). Each
 * card shows the recovery percentage as a large headline value, then
 * three detail lines for total value, captured value, and the current
 * hourly loss rate. An "Explain" button in the header lets the user
 * request AI-generated reasoning for the score.
 */
export function FunctionScorecardCard({
  function: functionName,
  recoveryPercentage,
  total,
  captured,
  losingPerHour,
}: FunctionScorecardType) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors">
      {/* This part of the code renders the card header with the function
          name on the left and an "Explain" button on the right. */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{functionName}</span>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
          Explain
        </Button>
      </div>

      {/* This part of the code renders the large recovery percentage. */}
      <p className="mt-2 text-2xl font-bold">
        Recovery {formatPercentage(recoveryPercentage)}
      </p>

      {/* This part of the code renders the three supporting metrics below
          the headline: total value, captured value, and loss rate. */}
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <p>Total {formatCurrency(total)}</p>
        <p>Captured {formatCurrency(captured)}</p>
        <p>Losing {formatCurrency(losingPerHour)}/hour</p>
      </div>
    </div>
  )
}
