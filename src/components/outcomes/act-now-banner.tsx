import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActNowBannerProps {
  message: string
  onAssign?: () => void
  onMarkComplete?: () => void
  onDefer?: () => void
}

/**
 * This part of the code renders the green-bordered "Act Now" banner that
 * appears on the Outcomes page when there is an actionable opportunity.
 * It shows an info icon, the message text describing the financial impact
 * of acting now, and three action buttons: Assign, Mark complete, Defer.
 * When the message is empty the component renders nothing.
 */
export function ActNowBanner({
  message,
  onAssign,
  onMarkComplete,
  onDefer,
}: ActNowBannerProps) {
  if (!message) return null

  return (
    <div className="space-y-4">
      {/* This part of the code renders the action button row above the
          banner message. */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Act Now
        </p>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" onClick={onAssign}>
            Assign
          </Button>
          <Button variant="outline" size="sm" onClick={onMarkComplete}>
            Mark complete
          </Button>
          <Button variant="outline" size="sm" onClick={onDefer}>
            Defer
          </Button>
        </div>
      </div>

      {/* This part of the code renders the impact projection message
          inside a green-tinted card. */}
      <div className="flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
        <Info className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm text-emerald-800 dark:text-emerald-200">{message}</p>
      </div>
    </div>
  )
}
