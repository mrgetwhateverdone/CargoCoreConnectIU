import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
}

/**
 * This part of the code maps a status string to a coloured pill badge.
 * "queued" gets a teal background, "ready" and "sent" get green, "completed"
 * gets green, "in_progress" gets blue, and anything failure-related gets red.
 * The badge renders as a small rounded pill with white text.
 */
const STATUS_STYLES: Record<string, string> = {
  queued: "bg-emerald-600 text-white",
  ready: "bg-emerald-500 text-white",
  sent: "bg-emerald-500 text-white",
  completed: "bg-emerald-600 text-white",
  in_progress: "bg-blue-600 text-white",
  expired: "bg-red-500 text-white",
  deferred: "bg-slate-400 text-white dark:bg-slate-600",
  failed: "bg-red-500 text-white",
  not_started: "bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.replace(/_/g, " ")

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status] ?? "bg-slate-200 text-slate-600"
      )}
    >
      {label}
    </span>
  )
}
