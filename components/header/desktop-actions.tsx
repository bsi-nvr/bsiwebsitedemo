"use client"

import { Languages, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

interface DesktopActionsProps {
  locale: string
  scrolled: boolean
  mounted: boolean
  isDark: boolean
  onToggleLocale: () => void
  onToggleTheme: () => void
}

export function DesktopActions({
  locale,
  scrolled,
  mounted,
  isDark,
  onToggleLocale,
  onToggleTheme,
}: DesktopActionsProps) {
  return (
    <div className="hidden lg:flex items-center gap-1">
      <button
        onClick={onToggleLocale}
        className={cn(
          "flex items-center gap-1 font-medium text-foreground rounded-full transition-colors hover:bg-foreground/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-[padding] duration-300 ease-out",
          scrolled ? "px-3 py-2.5 text-sm" : "px-3.5 py-2.5 text-sm"
        )}
        aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
      >
        <Languages className="w-4 h-4" aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3" aria-hidden="true" />
      </button>

      {mounted && (
        <ThemeToggle
          isDark={isDark}
          locale={locale}
          onToggle={onToggleTheme}
          className="p-2.5"
        />
      )}

      <a
        href="https://helpdesk.brainsoftict.nl/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-[padding] duration-300 ease-out",
          scrolled ? "px-4 py-2.5 text-sm" : "px-5 py-2.5 text-sm"
        )}
      >
        Helpdesk
      </a>
    </div>
  )
}
