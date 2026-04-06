import { Brain } from "lucide-react"
import { Topbar } from "@/components/layout/topbar"

/**
 * This part of the code renders a placeholder for the Intelligence Center
 * page. The layout shell is present but the content area shows a centered
 * empty-state with an icon and message.
 */
export default function IntelligencePage() {
  return (
    <>
      <Topbar title="Intelligence Center" subtitle="DecisionOS" />

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Brain className="size-12 text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          Intelligence Center coming soon
        </p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Full intelligence feed, history, and outcome tracking will be available here.
        </p>
      </div>
    </>
  )
}
