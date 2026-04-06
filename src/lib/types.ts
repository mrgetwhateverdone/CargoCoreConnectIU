/**
 * This part of the code defines the KPI metric shape used by the summary
 * cards at the top of dashboard pages. Each metric has a label, a raw
 * numeric value, a display format, and a visual variant that controls
 * the card's background colour.
 */
export interface KpiMetric {
  label: string
  value: number
  format: "currency" | "percentage" | "number"
  variant: "positive" | "neutral" | "warning" | "danger"
}

/**
 * This part of the code defines the allowed function names that map to
 * organisational departments tracked by the system.
 */
export type FunctionName = "Operations" | "Supply Chain" | "Planning"

/**
 * This part of the code defines a function-level scorecard showing
 * recovery progress, total and captured value, and the current loss rate.
 */
export interface FunctionScorecard {
  id: string
  function: FunctionName
  recoveryPercentage: number
  total: number
  captured: number
  losingPerHour: number
}

/**
 * This part of the code defines the priority tiers used to rank
 * intelligence items and work-queue actions.
 */
export type Priority = "P0" | "P1" | "P2"

/**
 * This part of the code defines the lifecycle states an action can be in
 * as it moves through the execution pipeline.
 */
export type ActionStatus =
  | "in_progress"
  | "completed"
  | "expired"
  | "deferred"
  | "not_started"

/**
 * This part of the code defines an action — the primary work unit in the
 * system. It tracks value, timing, ownership, and risk so operators can
 * prioritise by financial impact.
 */
export interface Action {
  id: string
  title: string
  function: FunctionName
  owner: string
  priority: Priority
  status: ActionStatus
  value: number
  remainingHours: number
  losingPerHour: number
  projectedSavings24h: number
  riskLevel: "critical" | "at_risk" | "on_track"
  progressPercent: number
}

/**
 * This part of the code defines an intelligence-feed item — an AI-generated
 * recommendation that can be promoted into the action queue.
 */
export interface IntelligenceItem {
  id: string
  title: string
  description: string
  function: FunctionName
  priority: Priority
  projectedValue: number
}

/**
 * This part of the code defines a single row in the Outcomes Ledger,
 * comparing what was expected against what was actually realised.
 */
export interface OutcomeLedgerRow {
  id: string
  action: string
  function: FunctionName
  owner: string
  outcomeType: string
  expected: number
  realized: number
  variance: number
  ratio: number
  quality: "Strong" | "Good" | "Weak"
}

/**
 * This part of the code defines a Knock-style notification workflow item
 * that shows the current delivery status of a message.
 */
export interface WorkflowItem {
  id: string
  title: string
  slug: string
  channel: "in_app" | "slack" | "email"
  recipient: string
  status: "queued" | "ready" | "sent" | "failed"
}

/**
 * This part of the code defines a single event-log entry that records
 * an action the system took automatically.
 */
export interface EventLogEntry {
  id: string
  description: string
  source: string
  category: string
  timestamp: string
}

/**
 * This part of the code defines the missed-value breakdown for a single
 * function, showing what's recoverable, at risk, and the current bleed rate.
 */
export interface MissedValueByFunction {
  function: FunctionName
  recoverable: number
  atRisk: number
  windowHours: number
  losingPerHour: number
}

/**
 * This part of the code defines a team member record with their queue
 * stats and personal recovery metrics.
 */
export interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  queueCount: number
  recoverableValue: number
  urgentIn12h: number
  function?: FunctionName
}

/**
 * This part of the code defines the personal dashboard summary that
 * shows an individual operator what they own right now.
 */
export interface PersonalDashboard {
  name: string
  role: string
  losingPerHour: number
  queueCount: number
  recoverableValue: number
  urgentIn12h: number
}
