"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { DesktopNav } from "./header/desktop-nav"
import { DesktopActions } from "./header/desktop-actions"
import { MobileActions } from "./header/mobile-actions"
import { MobileMenu } from "./header/mobile-menu"

const SCROLL_THRESHOLD = 60

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
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const toggleLocale = () => {
    setLocale(locale === "en" ? "nl" : "en")
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md"
      >
        {locale === "en" ? "Skip to main content" : "Ga naar hoofdinhoud"}
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex justify-center px-4 lg:px-4">
          <nav
            aria-label="Main navigation"
            className={cn(
              "pointer-events-auto flex items-center bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm rounded-full", // Explicit frosted glass
              "w-full justify-between mx-0 mt-4 px-4 py-3",
              "lg:w-auto lg:inline-flex lg:justify-start lg:gap-1 lg:mx-0",
              "transition-[margin,padding,transform,background-color,border-color] duration-500 ease-out", // Added transition props
              scrolled
                ? "lg:mt-3 lg:px-3 lg:py-2.5 lg:scale-[0.98]"
                : "lg:mt-6 lg:px-4 lg:py-3 lg:scale-100"
            )}
          >
            <Link
              href="/"
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
              aria-label="BrainSoft ICT - Home"
            >
              <Image
                src={resolvedTheme === "dark" ? "/brainsoft-icon-dark.webp" : "/brainsoft-icon.webp"}
                alt=""
                width={48}
                height={48}
                sizes="(min-width: 1024px) 48px, 40px"
                className={cn(
                  "object-contain w-10 h-10 transition-[width,height] duration-300 ease-out",
                  scrolled ? "lg:w-10 lg:h-10" : "lg:w-12 lg:h-12"
                )}
                priority
              />
            </Link>

            <div className="hidden lg:block w-8" aria-hidden="true" />

            <DesktopNav navLinks={navLinks} pathname={pathname} scrolled={scrolled} />

            <div className="hidden lg:block w-3" aria-hidden="true" />

            <DesktopActions
              locale={locale}
              scrolled={scrolled}
              mounted={mounted}
              isDark={isDark}
              onToggleLocale={toggleLocale}
              onToggleTheme={toggleTheme}
            />

            <MobileActions
              locale={locale}
              scrolled={scrolled}
              mounted={mounted}
              isDark={isDark}
              mobileOpen={mobileOpen}
              onToggleLocale={toggleLocale}
              onToggleTheme={toggleTheme}
              onToggleMenu={() => setMobileOpen(!mobileOpen)}
            />
          </nav>
        </div>
      </header>

      <MobileMenu navLinks={navLinks} pathname={pathname} mobileOpen={mobileOpen} />
    </>
  )
}
