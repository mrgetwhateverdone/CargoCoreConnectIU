import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Sidenav } from "@/components/layout/sidenav"

/**
 * This part of the code loads the Inter font from Google Fonts and assigns
 * it to the --font-sans CSS variable so Tailwind and shadcn can use it
 * as the default sans-serif typeface throughout the app.
 */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DecisionOS — Execution Intelligence System",
  description:
    "Real-time operations command center for surfacing recoverable value, routing decisions, and tracking outcomes.",
}

/**
 * This part of the code defines the root layout that wraps every page.
 * It renders the ThemeProvider for light/dark mode, the collapsible
 * sidenav on the left, and the main content area on the right that
 * fills the remaining horizontal space and scrolls vertically.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex h-full overflow-hidden antialiased">
        <ThemeProvider>
          <Sidenav />
          <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
