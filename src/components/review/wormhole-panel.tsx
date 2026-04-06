"use client"

import type { Action } from "@/lib/types"
import { formatCurrency, formatHours } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface WormholePanelProps {
  action: Action | null
  isOpen: boolean
  onClose: () => void
}

/**
 * This part of the code renders the "Wormhole" slide-over panel. When an
 * operator clicks "Open wormhole" on any action card, this sheet slides
 * in from the right and shows the full drill-down view for that action:
 * an "Act Now" section with Assign / Mark complete / Defer buttons, an
 * impact summary, and detailed action metrics (function, owner, remaining
 * time, loss rate, projected savings). If no action is selected the panel
 * renders nothing inside.
 */
export function WormholePanel({ action, isOpen, onClose }: WormholePanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        {action && (
          <>
            <SheetHeader>
              <SheetTitle>{action.title}</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* This part of the code renders the "Act Now" controls
                  with three action buttons. */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Act Now
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">
                    Assign
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark complete
                  </Button>
                  <Button variant="outline" size="sm">
                    Defer
                  </Button>
                </div>
              </div>

              {/* This part of the code renders the impact projection in a
                  green-tinted banner. */}
              <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  If you act now, loss falls from {formatCurrency(action.losingPerHour)}/h
                  to {formatCurrency(0)}/h, saving {formatCurrency(action.projectedSavings24h)}{" "}
                  over the next 24h.
                </p>
              </div>

              <Separator />

              {/* This part of the code renders the detailed action metrics
                  in a definition-list style layout. */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Action Details
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Function</p>
                    <p className="font-medium">{action.function}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Owner</p>
                    <p className="font-medium">{action.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-medium">{formatHours(action.remainingHours)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Losing</p>
                    <p className="font-medium">{formatCurrency(action.losingPerHour)}/hour</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Projected Savings (24h)</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(action.projectedSavings24h)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Value</p>
                    <p className="font-medium">{formatCurrency(action.value)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
