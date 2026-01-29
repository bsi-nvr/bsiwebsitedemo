"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, X, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const pricingData = {
  en: {
    title: "Pricing That",
    titleBold: "Makes Sense",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/ Monthly",
    perYear: "/ Yearly",
    getStarted: "Get Started",
    popular: "Most Popular",
    trustedBy: "Trusted By Hundreds of Companies",
    comparisonTitle: "Pricing Table Comparison",
    features: "Features",
    support: "Support",
    reporting: "Reporting",
    plans: [
      {
        name: "Basic",
        description: "Essential IT support for small businesses getting started",
        monthlyPrice: 299,
        yearlyPrice: 249,
        monthlyStats: { devices: "10", support: "Business hours" },
        yearlyStats: { devices: "10", support: "Business hours" },
        features: [
          { text: "Remote IT support", included: true },
          { text: "Email & phone helpdesk", included: true },
          { text: "Basic monitoring", included: true, note: "9-5" },
          { text: "Monthly reports", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "On-site support", included: false },
          { text: "24/7 monitoring", included: false },
          { text: "Advanced security", included: false },
          { text: "Dedicated account manager", included: false },
        ],
      },
      {
        name: "Professional",
        description: "Complete managed services for growing businesses",
        monthlyPrice: 599,
        yearlyPrice: 499,
        monthlyStats: { devices: "25", support: "Extended hours" },
        yearlyStats: { devices: "25", support: "Extended hours" },
        popular: true,
        features: [
          { text: "Remote IT support", included: true },
          { text: "Email & phone helpdesk", included: true },
          { text: "24/7 monitoring", included: true },
          { text: "Weekly reports", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "On-site support", included: true, note: "4 hrs/month" },
          { text: "Advanced security", included: true },
          { text: "Cloud backup", included: true },
          { text: "Dedicated account manager", included: false },
        ],
      },
      {
        name: "Enterprise",
        description: "Full IT department replacement for established businesses",
        monthlyPrice: 999,
        yearlyPrice: 849,
        monthlyStats: { devices: "50+", support: "24/7 priority" },
        yearlyStats: { devices: "50+", support: "24/7 priority" },
        features: [
          { text: "Remote IT support", included: true },
          { text: "Priority helpdesk", included: true },
          { text: "24/7 monitoring", included: true },
          { text: "Real-time reporting", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "Unlimited on-site support", included: true },
          { text: "Advanced security suite", included: true },
          { text: "Cloud backup & DR", included: true },
          { text: "Dedicated account manager", included: true },
        ],
      },
    ],
    comparisonFeatures: {
      features: [
        { name: "Remote support", basic: true, professional: true, enterprise: true },
        { name: "On-site support", basic: false, professional: "4 hrs/month", enterprise: "Unlimited" },
        { name: "Device management", basic: "Up to 10", professional: "Up to 25", enterprise: "50+" },
        { name: "Microsoft 365", basic: true, professional: true, enterprise: true },
      ],
      reporting: [
        { name: "Basic reports", basic: true, professional: true, enterprise: true },
        { name: "Advanced analytics", basic: false, professional: true, enterprise: true },
        { name: "Custom dashboards", basic: false, professional: false, enterprise: true },
        { name: "Real-time monitoring", basic: false, professional: true, enterprise: true },
      ],
      support: [
        { name: "Email support", basic: true, professional: true, enterprise: true },
        { name: "Phone support", basic: "Business hours", professional: "Extended", enterprise: "24/7" },
        { name: "Priority response", basic: false, professional: true, enterprise: true },
        { name: "Dedicated manager", basic: false, professional: false, enterprise: true },
      ],
    },
    cta: {
      title: "Start Your",
      titleBold: "Free Consultation",
      subtitle: "No commitment required",
      feature: "Free IT assessment",
      button: "Get Started",
      rating: "4.9 / 5",
      reviews: "From 100+ Customer Reviews",
    },
  },
  nl: {
    title: "Prijzen Die",
    titleBold: "Logisch Zijn",
    monthly: "Maandelijks",
    yearly: "Jaarlijks",
    perMonth: "/ Maand",
    perYear: "/ Jaar",
    getStarted: "Aan de slag",
    popular: "Meest Populair",
    trustedBy: "Vertrouwd Door Honderden Bedrijven",
    comparisonTitle: "Prijsvergelijking",
    features: "Functies",
    support: "Ondersteuning",
    reporting: "Rapportage",
    plans: [
      {
        name: "Basis",
        description: "Essentiële IT-ondersteuning voor kleine bedrijven",
        monthlyPrice: 299,
        yearlyPrice: 249,
        monthlyStats: { devices: "10", support: "Kantooruren" },
        yearlyStats: { devices: "10", support: "Kantooruren" },
        features: [
          { text: "IT-ondersteuning op afstand", included: true },
          { text: "E-mail & telefoon helpdesk", included: true },
          { text: "Basis monitoring", included: true, note: "9-5" },
          { text: "Maandelijkse rapporten", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "Ondersteuning op locatie", included: false },
          { text: "24/7 monitoring", included: false },
          { text: "Geavanceerde beveiliging", included: false },
          { text: "Dedicated accountmanager", included: false },
        ],
      },
      {
        name: "Professioneel",
        description: "Complete managed services voor groeiende bedrijven",
        monthlyPrice: 599,
        yearlyPrice: 499,
        monthlyStats: { devices: "25", support: "Uitgebreide uren" },
        yearlyStats: { devices: "25", support: "Uitgebreide uren" },
        popular: true,
        features: [
          { text: "IT-ondersteuning op afstand", included: true },
          { text: "E-mail & telefoon helpdesk", included: true },
          { text: "24/7 monitoring", included: true },
          { text: "Wekelijkse rapporten", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "Ondersteuning op locatie", included: true, note: "4 uur/maand" },
          { text: "Geavanceerde beveiliging", included: true },
          { text: "Cloud backup", included: true },
          { text: "Dedicated accountmanager", included: false },
        ],
      },
      {
        name: "Enterprise",
        description: "Volledige IT-afdeling vervanging voor gevestigde bedrijven",
        monthlyPrice: 999,
        yearlyPrice: 849,
        monthlyStats: { devices: "50+", support: "24/7 prioriteit" },
        yearlyStats: { devices: "50+", support: "24/7 prioriteit" },
        features: [
          { text: "IT-ondersteuning op afstand", included: true },
          { text: "Prioriteit helpdesk", included: true },
          { text: "24/7 monitoring", included: true },
          { text: "Real-time rapportage", included: true },
          { text: "Microsoft 365 support", included: true },
          { text: "Onbeperkte ondersteuning op locatie", included: true },
          { text: "Geavanceerde beveiligingssuite", included: true },
          { text: "Cloud backup & DR", included: true },
          { text: "Dedicated accountmanager", included: true },
        ],
      },
    ],
    comparisonFeatures: {
      features: [
        { name: "Ondersteuning op afstand", basic: true, professional: true, enterprise: true },
        { name: "Ondersteuning op locatie", basic: false, professional: "4 uur/maand", enterprise: "Onbeperkt" },
        { name: "Apparaatbeheer", basic: "Tot 10", professional: "Tot 25", enterprise: "50+" },
        { name: "Microsoft 365", basic: true, professional: true, enterprise: true },
      ],
      reporting: [
        { name: "Basis rapporten", basic: true, professional: true, enterprise: true },
        { name: "Geavanceerde analyses", basic: false, professional: true, enterprise: true },
        { name: "Aangepaste dashboards", basic: false, professional: false, enterprise: true },
        { name: "Real-time monitoring", basic: false, professional: true, enterprise: true },
      ],
      support: [
        { name: "E-mail ondersteuning", basic: true, professional: true, enterprise: true },
        { name: "Telefoon ondersteuning", basic: "Kantooruren", professional: "Uitgebreid", enterprise: "24/7" },
        { name: "Prioriteit respons", basic: false, professional: true, enterprise: true },
        { name: "Dedicated manager", basic: false, professional: false, enterprise: true },
      ],
    },
    cta: {
      title: "Start Uw",
      titleBold: "Gratis Consultatie",
      subtitle: "Geen verplichting vereist",
      feature: "Gratis IT-assessment",
      button: "Aan de slag",
      rating: "4.9 / 5",
      reviews: "Van 100+ Klantbeoordelingen",
    },
  },
}

export default function PricingPage() {
  const { locale } = useLanguage()
  const [isYearly, setIsYearly] = useState(false)
  const content = pricingData[locale]

  useScrollAnimation()

  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
        <Image
          src="/images/pricing-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAICAgIChsICQkJChAODg4ODA4YEBMNDg0GEBMRHx8fGB4fHBwgJC4nICIsIxwcHD3/2wBDAQcHBwoIChMICChMGh4aHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHD/wAARCAA8ADwDASIAAhEBAxEB/8QAGQABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAQIRkf/aAAwDAQACEAMRAD8A"
        />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-white">
              {content.title}{" "}
              <span className="font-semibold">{content.titleBold}</span>
            </h1>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10 animate-on-scroll">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                !isYearly
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              {content.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                isYearly
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              {content.yearly}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {content.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border transition-all duration-300 hover:shadow-lg",
                  plan.popular
                    ? "border-accent bg-accent/5 scale-[1.02] shadow-md"
                    : "border-border bg-card hover:border-accent/50"
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
                        {locale === "en" ? "Save" : "Bespaar"} €{(plan.monthlyPrice - plan.yearlyPrice) * 12}{locale === "en" ? "/year" : "/jaar"}
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

                  {/* Stats */}
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

                {/* Features */}
                <div className="p-6 lg:p-8 pt-0">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
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

      {/* Comparison Table */}
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
                  {content.plans.map((plan) => (
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
                {/* Features Section */}
                <tr className="border-b border-border bg-secondary/30">
                  <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                    {content.features}
                  </td>
                </tr>
                {content.comparisonFeatures.features.map((feature) => (
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

                {/* Reporting Section */}
                <tr className="border-b border-border bg-secondary/30">
                  <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                    {content.reporting}
                  </td>
                </tr>
                {content.comparisonFeatures.reporting.map((feature) => (
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

                {/* Support Section */}
                <tr className="border-b border-border bg-secondary/30">
                  <td colSpan={4} className="py-3 px-4 font-semibold text-sm">
                    {content.support}
                  </td>
                </tr>
                {content.comparisonFeatures.support.map((feature) => (
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

      {/* CTA Section */}
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
    </>
  )
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
