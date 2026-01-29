"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Cloud, Shield, Zap, RefreshCw, Server, Lock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const content = {
  en: {
    backLink: "Back to Services",
    title: "Cloud Based Management",
    subtitle: "Secure, scalable cloud infrastructure that grows with your business",
    intro: "We help businesses migrate to and manage their cloud environments, ensuring security, performance, and cost-efficiency. From Microsoft 365 to Azure, we handle it all.",
    features: [
      {
        icon: Cloud,
        title: "Microsoft 365 & Azure",
        description: "Full management of your Microsoft cloud environment including Exchange, SharePoint, Teams, and Azure services."
      },
      {
        icon: RefreshCw,
        title: "Cloud Migration",
        description: "Seamless migration from on-premise systems to the cloud with minimal downtime and data integrity guaranteed."
      },
      {
        icon: Server,
        title: "Hybrid Cloud Setup",
        description: "Connect your on-premise infrastructure with cloud services for the best of both worlds."
      },
      {
        icon: Shield,
        title: "Backup & Disaster Recovery",
        description: "Automated backups and disaster recovery solutions to protect your business-critical data."
      },
      {
        icon: Lock,
        title: "Security & Compliance",
        description: "Enterprise-grade security measures and compliance management for regulations like GDPR."
      },
      {
        icon: Zap,
        title: "Performance Optimization",
        description: "Continuous monitoring and optimization to ensure your cloud resources are performing at their best."
      }
    ],
    benefits: {
      title: "Why choose our Cloud Management?",
      items: [
        { stat: "99.9%", label: "Uptime guaranteed" },
        { stat: "24/7", label: "Monitoring & support" },
        { stat: "50%", label: "Average cost reduction" },
        { stat: "100%", label: "Data security" }
      ]
    },
    process: {
      title: "Our Approach",
      steps: [
        { number: "01", title: "Assessment", description: "We analyze your current infrastructure and identify opportunities for cloud optimization." },
        { number: "02", title: "Planning", description: "We create a detailed migration plan with timelines, costs, and risk mitigation strategies." },
        { number: "03", title: "Migration", description: "We execute the migration with minimal disruption to your daily operations." },
        { number: "04", title: "Management", description: "Ongoing monitoring, maintenance, and optimization of your cloud environment." }
      ]
    },
    cta: {
      title: "Ready to move to the cloud?",
      subtitle: "Let's discuss how we can help transform your IT infrastructure.",
      button: "Get in touch"
    }
  },
  nl: {
    backLink: "Terug naar Diensten",
    title: "Cloud Based Beheer",
    subtitle: "Veilige, schaalbare cloudinfrastructuur die meegroeit met uw bedrijf",
    intro: "Wij helpen bedrijven bij de migratie naar en het beheer van hun cloudomgevingen, met garantie voor veiligheid, prestaties en kostenefficiency. Van Microsoft 365 tot Azure, wij regelen het allemaal.",
    features: [
      {
        icon: Cloud,
        title: "Microsoft 365 & Azure",
        description: "Volledig beheer van uw Microsoft cloudomgeving inclusief Exchange, SharePoint, Teams en Azure diensten."
      },
      {
        icon: RefreshCw,
        title: "Cloud Migratie",
        description: "Naadloze migratie van on-premise systemen naar de cloud met minimale downtime en gegarandeerde data-integriteit."
      },
      {
        icon: Server,
        title: "Hybride Cloud Setup",
        description: "Verbind uw on-premise infrastructuur met clouddiensten voor het beste van beide werelden."
      },
      {
        icon: Shield,
        title: "Backup & Disaster Recovery",
        description: "Geautomatiseerde backups en disaster recovery oplossingen om uw bedrijfskritische data te beschermen."
      },
      {
        icon: Lock,
        title: "Beveiliging & Compliance",
        description: "Enterprise-grade beveiligingsmaatregelen en compliance management voor regelgeving zoals AVG."
      },
      {
        icon: Zap,
        title: "Prestatie Optimalisatie",
        description: "Continue monitoring en optimalisatie om ervoor te zorgen dat uw cloudresources optimaal presteren."
      }
    ],
    benefits: {
      title: "Waarom kiezen voor ons Cloud Beheer?",
      items: [
        { stat: "99.9%", label: "Uptime gegarandeerd" },
        { stat: "24/7", label: "Monitoring & support" },
        { stat: "50%", label: "Gemiddelde kostenbesparing" },
        { stat: "100%", label: "Databeveiliging" }
      ]
    },
    process: {
      title: "Onze Aanpak",
      steps: [
        { number: "01", title: "Beoordeling", description: "We analyseren uw huidige infrastructuur en identificeren mogelijkheden voor cloudoptimalisatie." },
        { number: "02", title: "Planning", description: "We maken een gedetailleerd migratieplan met tijdlijnen, kosten en risicobeperkende strategieën." },
        { number: "03", title: "Migratie", description: "We voeren de migratie uit met minimale verstoring van uw dagelijkse werkzaamheden." },
        { number: "04", title: "Beheer", description: "Doorlopende monitoring, onderhoud en optimalisatie van uw cloudomgeving." }
      ]
    },
    cta: {
      title: "Klaar om naar de cloud te gaan?",
      subtitle: "Laten we bespreken hoe we uw IT-infrastructuur kunnen transformeren.",
      button: "Neem contact op"
    }
  }
}

export default function CloudBeheerPage() {
  const { locale } = useLanguage()
  useScrollAnimation()
  const t = content[locale]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA8AFADASIAAhEBAxEB/8QAGQABAQEBAQAAAAAAAAAAAAAAAAQBAgMF/8QAGBAAAwEBAAAAAAAAAAAAAAAAAAECAxH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APQ9j0igAlqoCWgJaAloAPY9IoAJaoCWqAJaoCWgJaoCWgA9j0igAloAP//Z"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 md:pb-24 pt-40">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backLink}
          </Link>
          <div className="max-w-4xl fade-in-up">
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              <Cloud className="w-4 h-4 inline mr-2" />
              Cloud Based Beheer
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.1] text-white">
              {t.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl animate-on-scroll">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {t.features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-background p-8 md:p-10 animate-on-scroll delay-${(index + 1) * 100}`}
              >
                <feature.icon className="w-8 h-8 mb-6 text-foreground" />
                <h3 className="text-xl font-serif font-light mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-16 animate-on-scroll">
            {t.benefits.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {t.benefits.items.map((item, index) => (
              <div 
                key={item.label}
                className={`text-center animate-on-scroll delay-${(index + 1) * 100}`}
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-light">{item.stat}</span>
                <p className="mt-2 text-sm text-muted-foreground uppercase tracking-[0.15em]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-16 animate-on-scroll">
            {t.process.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {t.process.steps.map((step, index) => (
              <div 
                key={step.number}
                className={`animate-on-scroll delay-${(index + 1) * 100}`}
              >
                <span className="text-5xl md:text-6xl font-serif font-light opacity-30">{step.number}</span>
                <h3 className="mt-4 text-xl font-serif font-light">{step.title}</h3>
                <p className="mt-3 text-background/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light max-w-3xl mx-auto leading-tight">
            {t.cta.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 mt-10 px-10 py-5 bg-foreground text-background text-sm uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
          >
            {t.cta.button}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  )
}
