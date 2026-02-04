"use client"

import { Languages, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { LanguageDropdown } from "./language-dropdown"

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
      <LanguageDropdown scrolled={scrolled} />

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
