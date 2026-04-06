import { Topbar } from "@/components/layout/topbar"
import { KpiRow } from "@/components/dashboard/kpi-row"
import { SectionHeader } from "@/components/dashboard/section-header"
import { FunctionScorecardCard } from "@/components/dashboard/function-scorecard"
import { OutcomesLedger } from "@/components/outcomes/outcomes-ledger"
import { ActNowBanner } from "@/components/outcomes/act-now-banner"
import { ActionCard } from "@/components/dashboard/action-card"
import {
  outcomesKpiMetrics,
  functionScorecards,
  outcomeLedger,
  actNowBannerText,
  actNowActions,
} from "@/lib/data"

/**
 * This part of the code renders the Outcomes page. It provides a financial
 * accountability view of the execution pipeline with four major sections:
 *
 * 1. A KPI summary row (total recoverable, captured, completion rate).
 * 2. Function Scorecards showing per-department recovery performance.
 * 3. An Act Now banner with impact projection and action buttons.
 * 4. A "Where to Act Right Now" section with prioritised action cards.
 * 5. The Outcomes Ledger table comparing expected vs realised value.
 */
export default function OutcomesPage() {
  return (
    <>
      <Topbar title="Outcomes" subtitle="DecisionOS" />

      <div className="space-y-6 p-6">
        {/* This part of the code renders the outcomes-specific KPI row. */}
        <KpiRow metrics={outcomesKpiMetrics} />

        {/* This part of the code renders the function scorecards section
            with one card per organisational department. */}
        {functionScorecards.length > 0 && (
          <div className="space-y-3">
            <SectionHeader title="Function Scorecards" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {functionScorecards.map((scorecard) => (
                <FunctionScorecardCard key={scorecard.id} {...scorecard} />
              ))}
            </div>
          </div>
        )}

        {/* This part of the code renders the Act Now banner when there is
            an actionable message to display. */}
        <ActNowBanner message={actNowBannerText} />

        {/* This part of the code renders the "Where to Act Right Now"
            section with action cards featuring green left borders. */}
        {actNowActions.length > 0 && (
          <div className="space-y-3">
            <SectionHeader
              title="Where to Act Right Now"
              rightLabel="Save the most value fastest"
            />
            {actNowActions.map((action) => (
              <ActionCard key={action.id} action={action} variant="act-now" />
            ))}
          </div>
        )}

        {/* This part of the code renders the Outcomes Ledger table. */}
        <OutcomesLedger rows={outcomeLedger} />
      </div>
    </>
  )
}
