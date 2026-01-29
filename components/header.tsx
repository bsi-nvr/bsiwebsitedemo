"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Languages, ChevronDown } from "lucide-react"
import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { PagesDropdown } from "./pages-dropdown"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Handle escape key to close mobile menu
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && mobileOpen) {
      setMobileOpen(false)
    }
  }, [mobileOpen])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ]

  const isDark = resolvedTheme === "dark"

  const handleThemeToggle = (toggled: boolean) => {
    setTheme(toggled ? "dark" : "light")
  }

  const toggleLocale = () => {
    setLocale(locale === "en" ? "nl" : "en")
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md"
      >
        {locale === "en" ? "Skip to main content" : "Ga naar hoofdinhoud"}
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex justify-center px-4 lg:px-4">
          {/* Floating Navigation Bar - full width on mobile, compact pill on desktop */}
          <nav
            aria-label="Main navigation"
            className={cn(
              "pointer-events-auto flex items-center bg-background/95 backdrop-blur-md border border-border/40 shadow-sm rounded-full",
              // Mobile: full width bar
              "w-full justify-between mx-0 mt-4 px-4 py-3",
              // Desktop: centered pill
              "lg:w-auto lg:inline-flex lg:justify-start lg:gap-1 lg:mx-0",
              // Smooth transitions with different timing
              "transition-all",
              scrolled
                ? "lg:mt-3 lg:px-3 lg:py-2.5 lg:scale-[0.98] duration-300 ease-out"
                : "lg:mt-6 lg:px-4 lg:py-3 lg:scale-100 duration-500 ease-out"
            )}
          >
            {/* Logo - Icon */}
            <Link 
              href="/" 
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
              aria-label="BrainSoft ICT - Home"
            >
              <Image
                src={resolvedTheme === "dark" ? "/brainsoft-icon-dark.png" : "/brainsoft-icon.png"}
                alt=""
                width={48}
                height={48}
                className={cn(
                  "object-contain transition-all",
                  scrolled 
                    ? "w-10 h-10 duration-300 ease-out" 
                    : "w-12 h-12 duration-500 ease-out"
                )}
                priority
              />
            </Link>

            {/* Spacing between logo and navigation */}
            <div className="hidden lg:block w-8" aria-hidden="true" />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "font-medium rounded-full transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    scrolled 
                      ? "px-4 py-2.5 text-sm duration-300 ease-out" 
                      : "px-5 py-2.5 text-sm duration-500 ease-out",
                    pathname === link.href
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Pages Dropdown Menu */}
              <PagesDropdown scrolled={scrolled} />
            </div>

            {/* Spacer */}
            <div className="hidden lg:block w-3" aria-hidden="true" />

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={toggleLocale}
                className={cn(
                  "flex items-center gap-1 font-medium text-foreground rounded-full transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  scrolled 
                    ? "px-3 py-2.5 text-sm duration-300 ease-out" 
                    : "px-3.5 py-2.5 text-sm duration-500 ease-out"
                )}
                aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" aria-hidden="true" />
              </button>
              
              {mounted && (
                <Expand
                  duration={750}
                  toggled={isDark}
                  onToggle={handleThemeToggle}
                  className="text-muted-foreground hover:text-foreground rounded-full p-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={isDark ? (locale === "en" ? "Switch to light mode" : "Schakel naar lichte modus") : (locale === "en" ? "Switch to dark mode" : "Schakel naar donkere modus")}
                />
              )}

              <a
                href="https://helpdesk.brainsoftict.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  scrolled 
                    ? "px-4 py-2.5 text-sm duration-300 ease-out" 
                    : "px-5 py-2.5 text-sm duration-500 ease-out"
                )}
              >
                Helpdesk
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={toggleLocale}
                className={cn(
                  "flex items-center gap-1 font-medium text-foreground transition-colors rounded-full",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  scrolled ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm"
                )}
                aria-label={locale === "en" ? "Switch to Dutch" : "Switch to English"}
              >
                <Languages className={scrolled ? "w-3.5 h-3.5" : "w-4 h-4"} aria-hidden="true" />
                <span>{locale.toUpperCase()}</span>
              </button>
              
              {mounted && (
                <Expand
                  duration={750}
                  toggled={isDark}
                  onToggle={handleThemeToggle}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors rounded-full",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    scrolled ? "p-1" : "p-1.5"
                  )}
                  aria-label={isDark ? (locale === "en" ? "Switch to light mode" : "Schakel naar lichte modus") : (locale === "en" ? "Switch to dark mode" : "Schakel naar donkere modus")}
                />
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
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
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col justify-center items-center h-full px-6 overflow-y-auto">
          <nav className="flex flex-col items-center gap-2 w-full max-w-xs" aria-label="Mobile navigation">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "w-full text-center py-3 text-lg font-medium transition-all duration-300 rounded-full",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                  pathname === link.href
                    ? "text-background bg-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                style={{ transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Pages Dropdown */}
            <PagesDropdown 
              isMobile 
              mobileOpen={mobileOpen} 
              navLinksLength={navLinks.length} 
            />
          </nav>

          {/* Mobile Helpdesk Button - Styled like desktop */}
          <a
            href="https://helpdesk.brainsoftict.nl/"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={mobileOpen ? 0 : -1}
            className={cn(
              "mt-8 px-8 py-3 bg-foreground text-background rounded-full font-medium text-sm uppercase tracking-[0.15em] transition-all duration-300",
              "hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: mobileOpen ? `${navLinks.length * 50 + 100}ms` : "0ms" }}
          >
            Helpdesk
          </a>
        </div>
      </div>
    </>
  )
}
