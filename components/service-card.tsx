"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { GlowCard } from "@/components/glow-card"

export interface ServiceCardProps {
  number: string
  title: string
  description?: string
  features?: string[]
  href: string
  index: number
  variant?: "bento" | "grid"
}

export function ServiceCard({
  number,
  title,
  description,
  features,
  href,
  index,
  variant = "bento"
}: ServiceCardProps) {
  const { locale } = useLanguage()

  if (variant === "grid") {
    return (
      <GlowCard
        as={Link}
        href={href}
        aria-label={`${locale === "en" ? "Learn more about" : "Meer informatie over"} ${title}`}
        className={cn(
          "group border-b border-r border-border p-8 md:p-12 hover:bg-secondary/10 transition-all duration-500 animate-on-scroll cursor-pointer flex flex-col relative overflow-hidden",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "last:border-r-0",
          index % 2 === 1 && "md:border-r-0"
        )}
      >
        <span className="text-xs text-muted-foreground tracking-[0.2em] mb-6 relative z-10">
          {number}
        </span>
        <h3 className="text-2xl md:text-3xl font-serif font-light mb-6 text-balance relative z-10">
          {title}
        </h3>
        {features && (
          <ul className="space-y-2 mb-8 relative z-10">
            {features.slice(0, 2).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <span className="w-1 h-1 bg-foreground/50 rounded-full flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <span className="relative z-10 inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 group-hover:border-foreground/50 text-sm font-medium text-foreground transition-all duration-300 w-fit mt-auto">
          {locale === "en" ? "Learn more" : "Meer informatie"}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </GlowCard>
    )
  }

  // Bento variant (homepage)
  return (
    <GlowCard
      className={cn(
        "group relative bg-background p-8 md:p-12 transition-colors duration-500 animate-on-scroll overflow-hidden",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      )}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <span className="text-xs text-muted-foreground tracking-[0.2em]">
            {number}
          </span>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 text-balance">
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
            {description}
          </p>
        )}
        <span
          className="text-xs text-accent font-medium uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          {locale === "en" ? "Learn more" : "Meer informatie"} →
        </span>
        <Link
          href={href}
          className="absolute inset-0 focus:outline-none"
          aria-label={locale === "en" ? `Learn more about ${title}` : `Meer informatie over ${title}`}
        >
          <span className="sr-only">{locale === "en" ? `Learn more about ${title}` : `Meer informatie over ${title}`}</span>
        </Link>
      </div>
    </GlowCard>
  )
}
