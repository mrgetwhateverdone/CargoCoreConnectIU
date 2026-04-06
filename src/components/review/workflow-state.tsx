import type { WorkflowItem } from "@/lib/types"
import { SectionHeader } from "@/components/dashboard/section-header"
import { StatusBadge } from "@/components/dashboard/status-badge"

interface WorkflowStateProps {
  items: WorkflowItem[]
}

/**
 * This part of the code renders the "Knock Workflow State" section. It
 * lists every notification workflow item with its title, slug, channel,
 * recipient, and current delivery status. When there are no items it
 * shows an empty-state message.
 */
export function WorkflowState({ items }: WorkflowStateProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <SectionHeader title="Knock Workflow State" />

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
          >
            {/* This part of the code renders the workflow item details
                with title and metadata on the left. */}
            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.slug} · {item.channel} · {item.recipient}
              </p>
            </div>

            {/* This part of the code renders the status badge on the right. */}
            <StatusBadge status={item.status} />
          </div>
        ))}

        {items.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No workflow items
          </p>
        )}
      </div>
    </div>
  )
}
