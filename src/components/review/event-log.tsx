import type { EventLogEntry } from "@/lib/types"
import { SectionHeader } from "@/components/dashboard/section-header"

interface EventLogProps {
  entries: EventLogEntry[]
}

/**
 * This part of the code renders the "Event Log" section. It displays a
 * chronological list of system events, each showing a description of what
 * happened and a source tag identifying which subsystem generated it. When
 * there are no entries it shows an empty-state message.
 */
export function EventLog({ entries }: EventLogProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <SectionHeader title="Event Log" />

      <div className="mt-4 space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-lg border border-border bg-muted/30 p-4"
          >
            {/* This part of the code renders the event description and
                the source/category tag below it. */}
            <p className="text-sm">{entry.description}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {entry.source} · {entry.category}
            </p>
          </div>
        ))}

        {entries.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No events recorded
          </p>
        )}
      </div>
    </div>
  )
}
