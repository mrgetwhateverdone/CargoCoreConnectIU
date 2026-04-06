import { FileBarChart } from "lucide-react"
import { Topbar } from "@/components/layout/topbar"

/**
 * This part of the code renders a placeholder for the Reports page.
 * The page structure (topbar + sidenav) is in place, but the content
 * area shows a centered empty-state with an icon and message.
 */
export default function ReportsPage() {
  return (
    <>
      <Topbar title="Reports" subtitle="DecisionOS" />

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <FileBarChart className="size-12 text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Reports coming soon</p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Custom reporting and analytics will be available here.
        </p>
      </div>
    </>
  )
}
