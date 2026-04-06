import { formatCurrency, formatHours } from "@/lib/utils"
import type { Action } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PriorityBadge } from "@/components/dashboard/priority-badge"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Progress } from "@/components/ui/progress"

interface ActionCardProps {
  action: Action
  variant: "act-now" | "work-queue"
  onOpenWormhole?: () => void
  onSimulate?: () => void
}

/**
 * This part of the code renders an action card in one of two visual variants.
 *
 * The "act-now" variant is used in the "Where to Act Right Now" section and
 * features a green left border, the action title, metadata (function, time
 * remaining, loss rate), projected 24h savings on the right, and two CTA
 * buttons ("Open wormhole" and "Simulate completion").
 *
 * The "work-queue" variant is used in the "My Work Today" centre column
 * and shows a priority badge, status label, title, dollar value, remaining
 * time, a metadata line, and a progress bar coloured by risk level.
 */
export function ActionCard({ action, variant, onOpenWormhole, onSimulate }: ActionCardProps) {
  if (variant === "act-now") {
    return (
      <div className="rounded-xl border-l-4 border-l-emerald-500 border-y border-r border-border bg-card p-5 transition-colors">
        {/* This part of the code renders the act-now card header row with
            the title on the left and the projected savings on the right. */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold">{action.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {action.function} · remaining {formatHours(action.remainingHours)} · losing{" "}
              {formatCurrency(action.losingPerHour)}/h
            </p>
          </div>
          <span className="shrink-0 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            +{formatCurrency(action.projectedSavings24h)} / 24h
          </span>
        </div>

        {/* This part of the code renders the two call-to-action buttons
            at the bottom of the act-now card. */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenWormhole}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Open wormhole
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSimulate}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Simulate completion
          </Button>
        </div>
      </div>
    )
  }

  /**
   * This part of the code determines the progress bar colour based on the
   * action's risk level — red for critical/expired, amber for at-risk,
   * and green for on-track.
   */
  const progressColor =
    action.riskLevel === "critical"
      ? "bg-red-500"
      : action.riskLevel === "at_risk"
        ? "bg-amber-500"
        : "bg-emerald-500"

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors">
      {/* This part of the code renders the work-queue card header with
          priority badge, status, title, value, and remaining time. */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 size-4 shrink-0 rounded border-border accent-primary"
          aria-label={`Select ${action.title}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={action.priority} />
            <StatusBadge status={action.status} />
          </div>
          <p className="mt-1.5 font-semibold leading-snug">{action.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {action.function} · owner {action.owner} ·{" "}
            {action.riskLevel === "critical" ? "Expired" : action.riskLevel === "at_risk" ? "At risk" : "On track"} · losing{" "}
            {formatCurrency(action.losingPerHour)}/hour
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-bold">{formatCurrency(action.value)}</p>
          <p className="text-sm text-muted-foreground">
            remaining{" "}
            <span
              className={
                action.remainingHours <= 0
                  ? "text-red-500"
                  : action.remainingHours < 4
                    ? "text-amber-500"
                    : "text-emerald-500"
              }
            >
              {formatHours(action.remainingHours)}
            </span>
          </p>
        </div>
      </div>

      {/* This part of the code renders a progress bar at the bottom of the
          work-queue card. The bar colour reflects the action's risk level. */}
      <div className="mt-3">
        <Progress
          value={action.progressPercent}
          className="h-1.5"
          aria-label={`${action.progressPercent}% complete`}
        />
        <style>{`
          [aria-label="${action.progressPercent}% complete"] [data-slot="progress-indicator"] {
            background-color: ${action.riskLevel === "critical" ? "oklch(0.637 0.237 25.331)" : action.riskLevel === "at_risk" ? "oklch(0.769 0.188 70.08)" : "oklch(0.696 0.17 162.48)"};
          }
        `}</style>
      </div>
    </div>
  )
}
