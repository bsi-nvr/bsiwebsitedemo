"use client"

import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

interface PricingCtaProps {
  content: any
}

export function PricingCta({ content }: PricingCtaProps) {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight">
            {content.cta.title}
            <br />
            <span className="font-semibold">{content.cta.titleBold}</span>
          </h2>
          <p className="mt-4 text-lg opacity-70">{content.cta.subtitle}</p>
          <p className="mt-2 text-sm opacity-50">{content.cta.feature}</p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 mt-8 px-8 py-4 bg-background text-foreground text-sm font-medium rounded-full hover:bg-background/90 transition-all duration-200"
          >
            {content.cta.button}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">{content.cta.rating}</span>
            <span className="text-sm opacity-50">{content.cta.reviews}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
