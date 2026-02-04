"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ServiceCard } from "@/components/service-card"
import { DotPattern } from "@/components/dot-pattern"

const serviceLinks = {
  service1: "/services/cloud-beheer",
  service2: "/services/databases",
  service3: "/services/development",
  service4: "/services/managed-wifi",
}

const serviceFeatures = {
  en: {
    service1: [
      "Microsoft 365 & Azure",
      "Cloud Migration",
      "Hybrid Cloud Setup",
      "Backup & Disaster Recovery",
    ],
    service2: [
      "Database Management",
      "Performance Optimization",
      "Backup & Recovery",
      "Security & Compliance",
    ],
    service3: [
      "Custom Software Solutions",
      "Web Applications",
      "API Development",
      "Maintenance & Support",
    ],
    service4: [
      "WiFi Security",
      "Network Monitoring",
      "Performance Optimization",
      "24/7 Support",
    ],
  },
  nl: {
    service1: [
      "Microsoft 365 & Azure",
      "Cloud Migratie",
      "Hybride Cloud Setup",
      "Backup & Disaster Recovery",
    ],
    service2: [
      "Databasebeheer",
      "Prestatie Optimalisatie",
      "Backup & Recovery",
      "Beveiliging & Compliance",
    ],
    service3: [
      "Aangepaste Softwareoplossingen",
      "Web Applicaties",
      "API Ontwikkeling",
      "Onderhoud & Ondersteuning",
    ],
    service4: [
      "WiFi Beveiliging",
      "Netwerkmonitoring",
      "Prestatie Optimalisatie",
      "24/7 Ondersteuning",
    ],
  },
}

export default function ServicesPage() {
  const { t, locale } = useLanguage()
  useScrollAnimation()

  const services = [
    { key: "service1" as const, number: "01", ...t.services.service1 },
    { key: "service2" as const, number: "02", ...t.services.service2 },
    { key: "service3" as const, number: "03", ...t.services.service3 },
    { key: "service4" as const, number: "04", ...t.services.service4 },
  ]

  const features = serviceFeatures[locale]

  const processSteps = [
    {
      number: "01",
      title: locale === "en" ? "Assess" : "Beoordelen",
      description: locale === "en"
        ? "We analyze your current IT infrastructure, identify pain points, and understand your business needs."
        : "We analyseren uw huidige IT-infrastructuur, identificeren knelpunten en begrijpen uw bedrijfsbehoeften.",
    },
    {
      number: "02",
      title: locale === "en" ? "Plan" : "Plannen",
      description: locale === "en"
        ? "We create a tailored IT strategy with clear priorities, timelines, and budget considerations."
        : "We maken een IT-strategie op maat met duidelijke prioriteiten, tijdlijnen en budgetoverwegingen.",
    },
    {
      number: "03",
      title: locale === "en" ? "Implement" : "Implementeren",
      description: locale === "en"
        ? "We deploy solutions with minimal disruption, ensuring smooth transitions and proper training."
        : "We implementeren oplossingen met minimale verstoring, zorgen voor soepele overgangen en goede training.",
    },
    {
      number: "04",
      title: locale === "en" ? "Manage" : "Beheren",
      description: locale === "en"
        ? "We provide ongoing monitoring, maintenance, and support to keep your systems running optimally."
        : "We bieden doorlopende monitoring, onderhoud en ondersteuning om uw systemen optimaal te laten draaien.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.webp"
            alt=""
            fill
            className="object-cover fade-in-up"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 md:pb-24 pt-40">
          <div className="max-w-4xl fade-in-up">
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              {t.services.title}
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] text-white text-balance">
              {t.services.subtitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Services Tech Grid */}
      <section className="relative py-32 lg:py-40 border-t border-border overflow-hidden">
        <DotPattern
          width={24}
          height={24}
          cx={1}
          cy={1}
          cr={1}
          className="absolute inset-0 h-full w-full opacity-[0.3]"
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          {/* Large Intro Card */}
          <div className="animate-on-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-2 border border-border">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light leading-tight text-balance">
                  {locale === "en"
                    ? "Complete IT solutions for growing businesses"
                    : "Complete IT-oplossingen voor groeiende bedrijven"}
                </h2>
                <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                  {locale === "en"
                    ? "From infrastructure to security, we provide comprehensive managed services that let you focus on your core business."
                    : "Van infrastructuur tot beveiliging, wij bieden uitgebreide managed services waardoor u zich kunt richten op uw kernactiviteiten."}
                </p>
              </div>
              <div className="relative aspect-square lg:aspect-auto">
                <Image
                  src="/images/services-it-solutions.webp"
                  alt="IT solutions for growing businesses"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA8AFADASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAECAwQF/8QAHBAAAwEBAAMBAAAAAAAAAAAAAAECAxEhEiIx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD0gA8j0igAlqoCWgJaAloAPY9IoAJaoCWqAJaoCWgJaoCWgA9j0igAloAP/9k="
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.key}
                  number={service.number}
                  title={service.title}
                  features={features[service.key]}
                  href={serviceLinks[service.key]}
                  index={index}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Split Screen */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Sticky Title Side */}
          <div className="bg-foreground text-background p-8 md:p-12 lg:p-20 lg:sticky lg:top-0 lg:h-screen flex items-center">
            <div className="animate-on-scroll">
              <span className="text-xs uppercase tracking-[0.3em] opacity-60">
                {locale === "en" ? "How we work" : "Hoe wij werken"}
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light leading-tight text-balance">
                {locale === "en" ? "Our Process" : "Ons Proces"}
              </h2>
              <p className="mt-8 text-lg lg:text-xl opacity-70 leading-relaxed max-w-md text-pretty">
                {locale === "en"
                  ? "A structured approach that ensures every project is delivered with excellence and on time."
                  : "Een gestructureerde aanpak die ervoor zorgt dat elk project met excellentie en op tijd wordt opgeleverd."}
              </p>
            </div>
          </div>

          {/* Scrolling Steps Side */}
          <div className="divide-y divide-border">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="p-8 md:p-12 lg:p-16 animate-on-scroll"
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <span className="text-6xl md:text-7xl font-serif font-light text-muted-foreground/30">
                  {step.number}
                </span>
                <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-serif font-light text-balance">
                  {step.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-md text-pretty">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light max-w-3xl mx-auto leading-tight text-balance">
            {t.cta.title}
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto text-pretty">
            {t.cta.subtitle}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 mt-10 px-10 py-5 bg-foreground text-background text-sm uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t.cta.button}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
