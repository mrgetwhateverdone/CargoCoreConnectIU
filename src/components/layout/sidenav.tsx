"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  ClipboardCheck,
  Users,
  FileBarChart,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"

/**
 * This part of the code defines every navigation item the sidenav renders.
 * Each entry has a label, an icon component, and an href that maps to a
 * page route. The list is split into two groups separated by a divider:
 * primary operational pages and secondary utility pages.
 */
const PRIMARY_NAV = [
  { label: "My Work Today", icon: LayoutDashboard, href: "/" },
  { label: "Outcomes", icon: TrendingUp, href: "/outcomes" },
  { label: "Review", icon: ClipboardCheck, href: "/review" },
  { label: "Team", icon: Users, href: "/team" },
]

const SECONDARY_NAV = [
  { label: "Reports", icon: FileBarChart, href: "/reports" },
  { label: "Intelligence Center", icon: Brain, href: "/intelligence" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

/**
 * This part of the code renders the collapsible side navigation bar. It
 * tracks collapsed state locally. When collapsed, only icons are visible
 * and the width shrinks to 64px. When expanded, labels appear and the
 * width is 256px. The active route gets a highlighted background and a
 * left accent border in the primary colour.
 */
export function Sidenav() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  /**
   * This part of the code checks whether a given href matches the current
   * pathname. For the root route "/" it requires an exact match; for all
   * other routes it uses a startsWith check so nested routes stay highlighted.
   */
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* This part of the code renders the brand header with the DecisionOS
          logo icon and the app name. When collapsed, only the icon shows. */}
      <div className="flex items-center gap-3 px-4 py-5">
        <Activity className="size-6 shrink-0 text-primary" />
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold tracking-tight">DecisionOS</span>
            <span className="text-xs text-muted-foreground">Role: manager</span>
          </div>
        )}
      </div>

      <Separator />

      {/* This part of the code renders the primary navigation links —
          My Work Today, Outcomes, Review, and Team. */}
      <nav className="flex-1 space-y-1 px-2 py-3" aria-label="Primary navigation">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-l-2 border-primary bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}

        <div className="py-2">
          <Separator />
        </div>

        {/* This part of the code renders the secondary navigation links —
            Reports, Intelligence Center, and Settings. */}
        {SECONDARY_NAV.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-l-2 border-primary bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* This part of the code renders the bottom section of the sidenav
          containing the theme toggle and the collapse/expand button. */}
      <div className="space-y-1 px-2 pb-3">
        <ThemeToggle collapsed={collapsed} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="size-4 shrink-0" />
              <span className="truncate text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
