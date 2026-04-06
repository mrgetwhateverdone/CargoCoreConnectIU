import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  title: string
  subtitle?: string
}

/**
 * This part of the code renders the top bar that sits above the page content.
 * It shows the page title and optional subtitle on the left, and a search
 * input with a notification bell icon on the right.
 */
export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      {/* This part of the code renders the left side of the topbar with
          the page title and an optional subtitle above it. */}
      <div className="flex flex-col">
        {subtitle && (
          <span className="text-xs font-medium text-muted-foreground">{subtitle}</span>
        )}
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      </div>

      {/* This part of the code renders the right side of the topbar with
          a search input field and a notification bell button. */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search actions, owners, or functions"
            className="h-9 w-72 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Search actions, owners, or functions"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
        </Button>
      </div>
    </header>
  )
}
