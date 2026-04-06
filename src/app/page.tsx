"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Topbar } from "@/components/layout/topbar"
import { KpiRow } from "@/components/dashboard/kpi-row"
import { SectionHeader } from "@/components/dashboard/section-header"
import { ActionCard } from "@/components/dashboard/action-card"
import { IntelligenceCard } from "@/components/dashboard/intelligence-card"
import { MissedValuePanel } from "@/components/dashboard/missed-value-panel"
import { WormholePanel } from "@/components/review/wormhole-panel"
import type { Action } from "@/lib/types"
import {
  kpiMetrics,
  actNowActions,
  intelligenceItems,
  myWorkActions,
  missedValueTotal,
  missedValueByFunction,
  personalDashboard,
} from "@/lib/data"

/**
 * This part of the code defines the filter tabs available in the "My Work
 * Today" centre column. Each tab filters the work queue by action status.
 */
const WORK_TABS = ["All", "My", "Urgent", "Completed", "Deferred"] as const

/**
 * This part of the code renders the "My Work Today" page — the default
 * landing page of the app. It is composed of four major sections:
 *
 * 1. A KPI summary row at the top.
 * 2. A "Where to Act Right Now" section with high-priority action cards.
 * 3. A three-column grid: Intelligence Feed (left), My Work queue (centre),
 *    and Missed Value + Personal Dashboard (right).
 * 4. A Wormhole slide-over panel that opens when "Open wormhole" is clicked.
 */
export default function MyWorkTodayPage() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const [wormholeAction, setWormholeAction] = useState<Action | null>(null)

  /**
   * This part of the code filters the work queue based on the active tab.
   * "All" shows everything, "Urgent" shows critical/at-risk items,
   * and the other tabs filter by matching status.
   */
  const filteredActions = myWorkActions.filter((action) => {
    if (activeTab === "All") return true
    if (activeTab === "My") return true
    if (activeTab === "Urgent")
      return action.riskLevel === "critical" || action.riskLevel === "at_risk"
    if (activeTab === "Completed") return action.status === "completed"
    if (activeTab === "Deferred") return action.status === "deferred"
    return true
  })

  return (
    <>
      <Topbar title="Execution Intelligence System" subtitle="DecisionOS" />

      <div className="space-y-6 p-6">
        {/* This part of the code renders the KPI summary row. */}
        <KpiRow metrics={kpiMetrics} />

        {/* This part of the code renders the "Where to Act Right Now" section
            with high-value action cards that have the green left border. */}
        {actNowActions.length > 0 && (
          <div className="space-y-3">
            <SectionHeader
              title="Where to Act Right Now"
              rightLabel="Save the most value fastest"
            />
            {actNowActions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                variant="act-now"
                onOpenWormhole={() => setWormholeAction(action)}
              />
            ))}
          </div>
        )}

        {/* This part of the code renders the three-column grid that forms
            the main body of the page: intelligence feed, work queue, and
            missed value panel. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* This part of the code renders the Intelligence Feed column. */}
          <div className="space-y-4">
            <SectionHeader
              title="Intelligence Feed"
              rightLabel="Approve moves item into Actions"
            />
            {intelligenceItems.length > 0 ? (
              intelligenceItems.map((item) => (
                <IntelligenceCard key={item.id} item={item} />
              ))
            ) : (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No intelligence items
              </div>
            )}
          </div>

          {/* This part of the code renders the My Work Today centre column
              with a search input, filter tabs, and the filtered action list. */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search actions, owners, or functions"
                className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Search work items"
              />
            </div>

            {/* This part of the code renders the filter tabs row. */}
            <div className="flex gap-1">
              {WORK_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <SectionHeader title="My Work Today" rightLabel="Click an action to inspect inline" />
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    variant="work-queue"
                    onOpenWormhole={() => setWormholeAction(action)}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                  No work items
                </div>
              )}
            </div>
          </div>

          {/* This part of the code renders the Missed Value and Personal
              Dashboard in the right column. */}
          <MissedValuePanel
            totalMissed={missedValueTotal}
            byFunction={missedValueByFunction}
            personalDashboard={personalDashboard}
          />
        </div>
      </div>

      {/* This part of the code renders the Wormhole slide-over panel. */}
      <WormholePanel
        action={wormholeAction}
        isOpen={wormholeAction !== null}
        onClose={() => setWormholeAction(null)}
      />
    </>
  )
}
