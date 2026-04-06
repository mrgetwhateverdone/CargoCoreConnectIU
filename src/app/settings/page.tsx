import { Settings } from "lucide-react"
import { Topbar } from "@/components/layout/topbar"

/**
 * This part of the code renders a placeholder for the Settings page.
 * The layout shell is present but the content area shows a centered
 * empty-state with an icon and message.
 */
export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="DecisionOS" />

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <Settings className="size-12 text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Settings coming soon</p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Theme, profile, workflow configuration, and integrations will be available here.
        </p>
      </div>
    </>
  )
}
