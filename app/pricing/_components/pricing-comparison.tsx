"use client"

import Link from "next/link"
import { Check, X } from "lucide-react"

interface PricingComparisonProps {
  content: any
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-accent mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
    )
  }
  return <span className="text-sm text-muted-foreground">{value}</span>
}

export function PricingComparison({ content }: PricingComparisonProps) {
  return (
    <section className="py-24 md:py-32 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-serif font-light text-center mb-12 animate-on-scroll">
          {content.comparisonTitle}
        </h2>

        <div className="max-w-5xl mx-auto overflow-x-auto animate-on-scroll delay-100">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-normal text-muted-foreground"></th>
                {content.plans.map((plan: any) => (
                  <th key={plan.name} className="text-center py-4 px-4">
                    <div className="font-semibold">{plan.name}</div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:underline"
                    >
                      {content.getStarted}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-secondary/30">
                <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                  {content.features}
                </td>
              </tr>
              {content.comparisonFeatures.features.map((feature: any) => (
                <tr key={feature.name} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.basic} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.professional} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.enterprise} />
                  </td>
                </tr>
              ))}

              <tr className="border-b border-border bg-secondary/30">
                <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                  {content.reporting}
                </td>
              </tr>
              {content.comparisonFeatures.reporting.map((feature: any) => (
                <tr key={feature.name} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.basic} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.professional} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.enterprise} />
                  </td>
                </tr>
              ))}

              <tr className="border-b border-border bg-secondary/30">
                <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                  {content.support}
                </td>
              </tr>
              {content.comparisonFeatures.support.map((feature: any) => (
                <tr key={feature.name} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.basic} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.professional} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <ComparisonCell value={feature.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
