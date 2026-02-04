"use client"

import { useEffect, useState, useCallback, useRef } from "react"
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

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()
  const pathname = usePathname()

  const [isCompact, setIsCompact] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      const isScrollingUp = currentScrollY < lastScrollY.current

      // Update scroll direction state
      lastScrollY.current = currentScrollY

      if (currentScrollY < 50) {
        setIsCompact(false)
        setScrolled(false)
      } else {
        setScrolled(true)
        if (isScrollingDown) {
          setIsCompact(true)
        } else if (isScrollingUp) {
          setIsCompact(false)
        }
      }
    }

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
        <div className="flex justify-center px-4">
          <nav
            aria-label="Main navigation"
            className={cn(
              "pointer-events-auto flex items-center bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm",
              "px-5 mx-auto mt-5 rounded-full",
              "w-full justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[max-width,padding]",
              // Standard CSS classes for width and padding transitions
              isCompact
                ? "max-w-3xl py-2" // Compact: highly constrained (Upstart style)
                : "max-w-5xl py-3", // Expanded: constrained but comfortable padding
            )}
          >
            <Link
              href="/"
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full transition-opacity duration-300"
              aria-label="BrainSoft ICT - Home"
            >
              <Image
                src={resolvedTheme === "dark" ? "/brainsoft-icon-dark.webp" : "/brainsoft-icon.webp"}
                alt=""
                width={48}
                height={48}
                sizes="(min-width: 1024px) 48px, 40px"
                className="object-contain w-10 h-10 lg:w-12 lg:h-12"
                priority
              />
            </Link>

            <DesktopNav navLinks={navLinks} pathname={pathname} scrolled={scrolled} />

            <div className="flex items-center gap-2">
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
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu navLinks={navLinks} pathname={pathname} mobileOpen={mobileOpen} />
    </>
  )
}
