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
  variant = "bento",
  className,
}: ServiceCardProps & { className?: string }) {
  const { locale } = useLanguage()



  // Premium Tech Grid variant
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-background/50 p-8 transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:shadow-lg md:p-10",
        className
      )}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-accent">
            {number}
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </div>

        <h3 className="text-2xl font-medium leading-tight text-foreground md:text-3xl">
          {title}
        </h3>
      </div>

      <div className="relative z-10 mt-12 flex-1 flex flex-col justify-between">
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground/80 md:text-lg mb-6">
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <ul className="space-y-2 mt-auto pt-6">
            {features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1 h-1 bg-accent/50 rounded-full flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hover Gradient Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
      </div>

      <Link
        href={href}
        className="absolute inset-0 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={locale === "en" ? `Learn more about ${title}` : `Meer informatie over ${title}`}
      >
        <span className="sr-only">{locale === "en" ? `Learn more about ${title}` : `Meer informatie over ${title}`}</span>
      </Link>
    </div>
  )
}
