import { formatCurrency } from "@/lib/utils"
import type { IntelligenceItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PriorityBadge } from "@/components/dashboard/priority-badge"

interface IntelligenceCardProps {
  item: IntelligenceItem
  onApprove?: () => void
}

/**
 * This part of the code renders a single intelligence-feed card. Each card
 * represents an AI-generated recommendation that an operator can promote
 * into the action queue by clicking "Approve into actions". The card shows
 * the priority level, an "Explain" link for AI reasoning, the title and
 * description, the source function, and the projected dollar value.
 */
export function IntelligenceCard({ item, onApprove }: IntelligenceCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors">
      {/* This part of the code renders the card header with the priority
          badge on the left and the "Explain" link on the right. */}
      <div className="flex items-center justify-between">
        <PriorityBadge priority={item.priority} />
        <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
          Explain
        </Button>
      </div>

      {/* This part of the code renders the title and description body
          of the intelligence item. */}
      <p className="mt-3 font-semibold leading-snug">{item.title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      {/* This part of the code renders the footer with the function tag
          on the left and the projected value on the right. */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{item.function}</span>
        <span className="font-medium">{formatCurrency(item.projectedValue)} projected</span>
      </div>

      {/* This part of the code renders the full-width approve button. */}
      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={onApprove}
      >
        Approve into actions
      </Button>
    </div>
  )
}
