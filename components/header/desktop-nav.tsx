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

import { useState } from "react"
import { motion } from "framer-motion"

export function DesktopNav({ navLinks, pathname, scrolled }: DesktopNavProps) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  const pagesRoutes = ["/pricing", "/blog", "/security", "/privacy-policy", "/terms-conditions", "/404"]
  const isPagesActive = pathname ? pagesRoutes.some(route => pathname.startsWith(route)) : false

  return (
    <div className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHoveredPath(link.href)}
            onMouseLeave={() => setHoveredPath(null)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative font-medium rounded-full transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "transition-[padding,font-size] duration-300 ease-out",
              scrolled ? "px-3 py-2 text-sm" : "px-5 py-2.5 text-sm",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              "whitespace-nowrap"
            )}
          >
            {(hoveredPath === link.href || (isActive && hoveredPath === null)) && (
              <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 bg-secondary/80 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </Link>
        )
      })}

      <PagesDropdown
        scrolled={scrolled}
        onMouseEnter={() => setHoveredPath("pages")}
        onMouseLeave={() => setHoveredPath(null)}
        showGlow={hoveredPath === "pages" || (isPagesActive && hoveredPath === null)}
      />
    </div>
  )
}
