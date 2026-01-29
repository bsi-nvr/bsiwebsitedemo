"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  isDark: boolean
  locale: string
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ isDark, locale, onToggle, className }: ThemeToggleProps) {
  const toggleId = useId().replace(/:/g, "")

  return (
    <button
      onClick={onToggle}
      className={cn(
        "theme-toggle text-[18px] transition-colors rounded-full",
        "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isDark && "theme-toggle--toggled",
        className
      )}
      title={locale === "en" ? "Toggle theme" : "Thema wisselen"}
      aria-label={locale === "en" ? "Toggle theme" : "Thema wisselen"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        strokeLinecap="round"
        className="theme-toggle__classic"
        viewBox="0 0 32 32"
      >
        <clipPath id={`${toggleId}-theme-toggle__classic__cutout`}>
          <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
        </clipPath>
        <g clipPath={`url(#${toggleId}-theme-toggle__classic__cutout)`}>
          <circle cx="16" cy="16" r="9.34" />
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </g>
        </g>
      </svg>
    </button>
  )
}
