"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * This part of the code provides a hydration-safe way to detect whether
 * the component has mounted on the client. It uses useSyncExternalStore
 * with a subscribe no-op so that the server snapshot returns false and
 * the client snapshot returns true, avoiding the useEffect + setState
 * lint violation.
 */
const emptySubscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

/**
 * This part of the code renders a theme toggle button that switches between
 * light and dark mode. It uses useSyncExternalStore to safely detect mount
 * state and avoid hydration mismatches. When the sidenav is collapsed, only
 * the icon shows; when expanded, the label "Light mode" or "Dark mode"
 * appears next to the icon.
 */
export function ThemeToggle({ collapsed }: { collapsed?: boolean }) {
  const { theme, setTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 opacity-0">
        <Sun className="size-4" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
      {!collapsed && (
        <span className="truncate text-sm">{isDark ? "Light mode" : "Dark mode"}</span>
      )}
    </Button>
  )
}
