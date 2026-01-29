"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { PricingHero } from "./_components/pricing-hero"
import { PricingCards } from "./_components/pricing-cards"
import { PricingComparison } from "./_components/pricing-comparison"
import { PricingCta } from "./_components/pricing-cta"

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
      <PricingHero content={content} isYearly={isYearly} onToggleYearly={setIsYearly} />
      <PricingCards content={content} isYearly={isYearly} locale={locale} />
      <PricingComparison content={content} />
      <PricingCta content={content} />
    </>
  )
}
