import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { OutcomeLedgerRow } from "@/lib/types"
import { SectionHeader } from "@/components/dashboard/section-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface OutcomesLedgerProps {
  rows: OutcomeLedgerRow[]
}

/**
 * This part of the code renders the Outcomes Ledger table. It shows every
 * completed action's expected vs realised financial performance, the variance,
 * the ratio, and a quality rating. The realised and variance columns are
 * coloured green to visually highlight positive financial outcomes. When
 * there are no rows the component still renders the table headers with an
 * empty-state message.
 */
export function OutcomesLedger({ rows }: OutcomesLedgerProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <SectionHeader title="Outcomes Ledger" rightLabel="Expected vs realized" />

      <div className="mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Action</TableHead>
              <TableHead className="text-right">Expected</TableHead>
              <TableHead className="text-right">Realized</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead className="text-right">Ratio</TableHead>
              <TableHead className="text-right">Quality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* This part of the code renders the action name with
                    function, owner, and outcome-type metadata below it. */}
                <TableCell>
                  <p className="font-medium">{row.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {row.function} · {row.owner} · {row.outcomeType}
                  </p>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(row.expected)}
                </TableCell>
                <TableCell className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(row.realized)}
                </TableCell>
                <TableCell className="text-right font-medium text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(row.variance)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPercentage(row.ratio)}
                </TableCell>
                <TableCell className="text-right font-medium">{row.quality}</TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  No outcome data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
