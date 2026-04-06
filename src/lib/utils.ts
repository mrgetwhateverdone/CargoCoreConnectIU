import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * This part of the code formats a raw number into a compact currency string
 * like "$32.0K" or "$1.2M". It divides by 1000 for thousands, by 1_000_000
 * for millions, and falls back to a plain dollar format for smaller values.
 */
export function formatCurrency(value: number): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? "-" : ""

  if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(1)}M`
  }
  if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(1)}K`
  }
  return `${sign}$${absValue.toFixed(0)}`
}

/**
 * This part of the code takes a decimal ratio (e.g. 0.5) and formats it
 * as a percentage string like "50%".
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

/**
 * This part of the code formats a number of hours into a compact string
 * like "21.28h". It shows two decimal places for precision when tracking
 * remaining time windows.
 */
export function formatHours(hours: number): string {
  if (hours <= 0) return "0h"
  return `${hours.toFixed(hours % 1 === 0 ? 0 : 2)}h`
}
