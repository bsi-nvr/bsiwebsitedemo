"use client"

import { Menu, X, Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

interface MobileActionsProps {
  locale: string
  scrolled: boolean
  mounted: boolean
  isDark: boolean
  mobileOpen: boolean
  onToggleLocale: () => void
  onToggleTheme: () => void
  onToggleMenu: () => void
}

export function MobileActions({
  locale,
  scrolled,
  mounted,
  isDark,
  mobileOpen,
  onToggleLocale,
  onToggleTheme,
  onToggleMenu,
}: MobileActionsProps) {
  return (
    <div className="flex lg:hidden items-center gap-1">
      <button
        onClick={onToggleLocale}
        className={cn(
          "flex items-center gap-1 font-medium text-foreground transition-colors rounded-full hover:bg-foreground/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          scrolled ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm"
        )}
        aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
      >
        <Languages className={scrolled ? "w-3.5 h-3.5" : "w-4 h-4"} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
      </button>

      {mounted && (
        <ThemeToggle
          isDark={isDark}
          locale={locale}
          onToggle={onToggleTheme}
          className={scrolled ? "p-1" : "p-1.5"}
        />
      )}

      <button
        onClick={onToggleMenu}
        className={cn(
          "text-foreground rounded-full hover:bg-secondary/50 transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          scrolled ? "p-1" : "p-1.5"
        )}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        aria-label={mobileOpen ? (locale === "en" ? "Close menu" : "Sluit menu") : (locale === "en" ? "Open menu" : "Open menu")}
      >
        {mobileOpen ? (
          <X className={scrolled ? "w-4 h-4" : "w-4.5 h-4.5"} aria-hidden="true" />
        ) : (
          <Menu className={scrolled ? "w-4 h-4" : "w-4.5 h-4.5"} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
