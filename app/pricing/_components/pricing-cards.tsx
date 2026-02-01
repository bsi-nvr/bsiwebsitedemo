"use client"

import Link from "next/link"
import { ArrowRight, Check, X, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardsProps {
  content: any
  isYearly: boolean
  locale: string
}

export function PricingCards({ content, isYearly, locale }: PricingCardsProps) {
  return (
    <section className="pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {content.plans.map((plan: any) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border border-border/60 transition-all duration-500 shadow-sm hover:shadow-md",
                plan.popular
                  ? "border-accent bg-accent/5 scale-[1.02] shadow-md hover:shadow-lg"
                  : "bg-card hover:border-accent/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    {content.popular}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-semibold">
                      €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {isYearly ? content.perYear : content.perMonth}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="mt-1 text-xs text-accent">
                      {locale === "en" ? "Save" : "Bespaar"} €{(plan.monthlyPrice - plan.yearlyPrice) * 12}
                      {locale === "en" ? "/year" : "/jaar"}
                    </p>
                  )}
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all duration-200",
                    plan.popular
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {content.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary/50 rounded-xl">
                    <div className="text-lg font-semibold">
                      {isYearly ? plan.yearlyStats.devices : plan.monthlyStats.devices}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {locale === "en" ? "Devices" : "Apparaten"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-xl">
                    <div className="text-sm font-medium">
                      {isYearly ? plan.yearlyStats.support : plan.monthlyStats.support}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {locale === "en" ? "Support" : "Ondersteuning"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature: any) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included ? "text-foreground" : "text-muted-foreground/60"
                        )}
                      >
                        {feature.text}
                        {feature.note && (
                          <span className="ml-1 text-accent font-medium">
                            {feature.note}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
