"use client"

import { useState } from "react"
import { Topbar } from "@/components/layout/topbar"
import { WorkflowState } from "@/components/review/workflow-state"
import { EventLog } from "@/components/review/event-log"
import { WormholePanel } from "@/components/review/wormhole-panel"
import type { Action } from "@/lib/types"
import { workflowItems, eventLog } from "@/lib/data"

/**
 * This part of the code renders the Review page. It provides an operational
 * audit view with two side-by-side sections:
 *
 * 1. Knock Workflow State (left) — notification delivery statuses.
 * 2. Event Log (right) — chronological system-generated events.
 *
 * It also includes the Wormhole slide-over panel that can be triggered
 * from future interactive elements.
 */
export default function ReviewPage() {
  const [wormholeAction, setWormholeAction] = useState<Action | null>(null)

  return (
    <>
      <Topbar title="Review" subtitle="DecisionOS" />

      <div className="space-y-6 p-6">
        {/* This part of the code renders the two-column grid containing
            the workflow state on the left and the event log on the right. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WorkflowState items={workflowItems} />
          <EventLog entries={eventLog} />
        </div>
      </div>

      {/* This part of the code renders the Wormhole panel for this page. */}
      <WormholePanel
        action={wormholeAction}
        isOpen={wormholeAction !== null}
        onClose={() => setWormholeAction(null)}
      />
    </>
  )
}
