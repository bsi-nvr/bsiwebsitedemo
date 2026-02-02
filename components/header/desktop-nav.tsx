"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { PagesDropdown } from "../pages-dropdown"

interface NavLink {
  href: string
  label: string
}

interface DesktopNavProps {
  navLinks: NavLink[]
  pathname: string | null
  scrolled: boolean
}

export function DesktopNav({ navLinks, pathname, scrolled }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className={cn(
            "font-medium rounded-full transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-[padding] duration-300 ease-out",
            scrolled ? "px-4 py-2.5 text-sm" : "px-5 py-2.5 text-sm",
            pathname === link.href
              ? "text-foreground bg-secondary/80"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
          )}
        >
          {link.label}
        </Link>
      ))}

      <PagesDropdown scrolled={scrolled} />
    </div>
  )
}
