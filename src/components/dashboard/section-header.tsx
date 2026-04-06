import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  rightLabel?: string
  rightAction?: ReactNode
}

/**
 * This part of the code renders the uppercase, wide-tracked section headers
 * used throughout the dashboard. It displays a title on the left and an
 * optional label or action element on the right — for example
 * "Save the most value fastest" or an "Expected vs realized" toggle.
 */
export function SectionHeader({ title, rightLabel, rightAction }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {rightLabel && (
        <span className="text-xs font-medium text-muted-foreground">{rightLabel}</span>
      )}
      {rightAction}
    </div>
  )
}
