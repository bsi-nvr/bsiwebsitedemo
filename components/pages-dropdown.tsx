"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useCallback, useEffect, useRef, useState } from "react"

interface PagesDropdownProps {
  scrolled?: boolean
  isMobile?: boolean
  mobileOpen?: boolean
  navLinksLength?: number
}

export function PagesDropdown({ 
  scrolled = false, 
  isMobile = false, 
  mobileOpen = false,
  navLinksLength = 0 
}: PagesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { locale } = useLanguage()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pagesMenuLinks = [
    { href: "/pricing", label: locale === "en" ? "Pricing" : "Prijzen" },
    { href: "/blog", label: locale === "en" ? "News" : "Nieuws" },
    { href: "/security", label: locale === "en" ? "Security" : "Beveiliging" },
    { href: "/privacy-policy", label: locale === "en" ? "Privacy Policy" : "Privacybeleid" },
    { href: "/terms-conditions", label: locale === "en" ? "Terms & Conditions" : "Algemene Voorwaarden" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false)
    } else if (event.key === "ArrowDown" && !isOpen) {
      event.preventDefault()
      setIsOpen(true)
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (isMobile) {
    return (
      <div className="w-full mt-2" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className={cn(
            "w-full text-center py-3 text-lg font-medium transition-all duration-300 rounded-full flex items-center justify-center gap-2",
            mobileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
            isOpen
              ? "text-background bg-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
          style={{ transitionDelay: mobileOpen ? `${navLinksLength * 50}ms` : "0ms" }}
        >
          {locale === "en" ? "Pages" : "Pagina's"}
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div className="mt-2 space-y-1" role="menu">
            {pagesMenuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={cn(
                  "block w-full text-center py-2.5 text-base font-medium transition-all duration-300 rounded-full",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  pathname === link.href
                    ? "text-background bg-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1 font-medium rounded-full transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          scrolled 
            ? "px-4 py-2.5 text-sm duration-300 ease-out" 
            : "px-5 py-2.5 text-sm duration-500 ease-out",
          isOpen
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {locale === "en" ? "Pages" : "Pagina's"}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full mt-2 left-0 min-w-[200px] bg-background/95 backdrop-blur-md border border-border/40 rounded-2xl shadow-lg overflow-hidden"
          role="menu"
        >
          {pagesMenuLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              className={cn(
                "block px-4 py-2.5 text-sm font-medium transition-colors",
                "focus:outline-none focus-visible:bg-secondary/50",
                pathname === link.href
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="sr-only"> (current page)</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
