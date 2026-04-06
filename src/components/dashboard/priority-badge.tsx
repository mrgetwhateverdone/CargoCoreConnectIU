import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/types"

interface PriorityBadgeProps {
  priority: Priority
}

/**
 * This part of the code renders a small coloured badge for action priority.
 * P0 gets a yellow/amber background to signal highest urgency, P1 gets a
 * red background, and P2 gets a neutral grey background.
 */
const PRIORITY_STYLES: Record<Priority, string> = {
  P0: "bg-amber-400 text-amber-900",
  P1: "bg-red-500 text-white",
  P2: "bg-slate-300 text-slate-700 dark:bg-slate-600 dark:text-slate-200",
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-bold leading-none",
        PRIORITY_STYLES[priority]
      )}
    >
      {priority}
    </span>
  )
}
