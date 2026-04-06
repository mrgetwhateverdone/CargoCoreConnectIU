import { formatCurrency } from "@/lib/utils"
import type { TeamMember } from "@/lib/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/**
 * This part of the code renders a single team member card. It shows an
 * avatar with initials fallback, the member's name, role, and optional
 * function ownership tag. Below that, three metrics are displayed in a
 * row: queue count, recoverable value, and urgent-within-12h count.
 */
export function TeamMemberCard({ name, role, queueCount, recoverableValue, urgentIn12h, function: fn }: TeamMember) {
  /**
   * This part of the code extracts initials from the team member's name
   * to use as the avatar fallback text.
   */
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors">
      {/* This part of the code renders the member identity row with
          avatar, name, role, and optional function tag. */}
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        {fn && (
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {fn}
          </span>
        )}
      </div>

      {/* This part of the code renders the three stat columns:
          queue count, recoverable value, and urgency count. */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xl font-bold">{queueCount}</p>
          <p className="text-xs text-muted-foreground">Queue</p>
        </div>
        <div>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(recoverableValue)}
          </p>
          <p className="text-xs text-muted-foreground">Recoverable</p>
        </div>
        <div>
          <p className="text-xl font-bold">{urgentIn12h}</p>
          <p className="text-xs text-muted-foreground">Urgent 12h</p>
        </div>
      </div>
    </div>
  )
}
