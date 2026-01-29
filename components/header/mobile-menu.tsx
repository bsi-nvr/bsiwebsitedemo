"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { PagesDropdown } from "../pages-dropdown"

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  navLinks: NavLink[]
  pathname: string | null
  mobileOpen: boolean
}

export function MobileMenu({ navLinks, pathname, mobileOpen }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
                mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                pathname === link.href
                  ? "text-background bg-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
              style={{ transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          <PagesDropdown isMobile mobileOpen={mobileOpen} navLinksLength={navLinks.length} />
        </nav>

        <a
          href="https://helpdesk.brainsoftict.nl/"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={mobileOpen ? 0 : -1}
          className={cn(
            "mt-8 px-8 py-3 bg-foreground text-background rounded-full font-medium text-sm uppercase tracking-[0.15em] transition-all duration-300",
            "hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: mobileOpen ? `${navLinks.length * 50 + 100}ms` : "0ms" }}
        >
          Helpdesk
        </a>
      </div>
    </div>
  )
}
