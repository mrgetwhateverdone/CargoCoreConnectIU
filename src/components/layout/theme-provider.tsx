"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

/**
 * This part of the code wraps the next-themes ThemeProvider as a client
 * component. It sets the default theme to "light", uses the "class" attribute
 * strategy so Tailwind's .dark variant works, and disables system preference
 * detection to guarantee the app always starts in light mode.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
