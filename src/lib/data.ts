import type {
  KpiMetric,
  FunctionScorecard,
  Action,
  IntelligenceItem,
  OutcomeLedgerRow,
  WorkflowItem,
  EventLogEntry,
  MissedValueByFunction,
  TeamMember,
  PersonalDashboard,
} from "@/lib/types"

/**
 * This part of the code provides typed, empty data arrays for every domain
 * entity. When a real API or database is connected, replace these with
 * fetch calls. The UI renders gracefully with zero items.
 */

export const kpiMetrics: KpiMetric[] = []

export const outcomesKpiMetrics: KpiMetric[] = []

export const functionScorecards: FunctionScorecard[] = []

export const actNowActions: Action[] = []

export const intelligenceItems: IntelligenceItem[] = []

export const myWorkActions: Action[] = []

export const outcomeLedger: OutcomeLedgerRow[] = []

export const workflowItems: WorkflowItem[] = []

export const eventLog: EventLogEntry[] = []

export const missedValueTotal: number = 0

export const missedValueByFunction: MissedValueByFunction[] = []

export const personalDashboard: PersonalDashboard = {
  name: "",
  role: "",
  losingPerHour: 0,
  queueCount: 0,
  recoverableValue: 0,
  urgentIn12h: 0,
}

export const teamMembers: TeamMember[] = []

export const actNowBannerText: string = ""
