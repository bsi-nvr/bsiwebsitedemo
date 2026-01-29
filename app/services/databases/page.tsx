"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Database, Shield, Zap, RefreshCw, Lock, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const content = {
  en: {
    backLink: "Back to Services",
    title: "Database Solutions",
    subtitle: "Reliable, secure database management for your business-critical data",
    intro: "Your data is the backbone of your business. We provide comprehensive database management services ensuring your data is always available, secure, and performing at its best.",
    features: [
      {
        icon: Database,
        title: "Database Management",
        description: "Complete management of SQL Server, MySQL, PostgreSQL, and other database platforms with expert administration."
      },
      {
        icon: Zap,
        title: "Performance Optimization",
        description: "Query optimization, indexing strategies, and performance tuning to ensure your databases run at peak efficiency."
      },
      {
        icon: RefreshCw,
        title: "Backup & Recovery",
        description: "Automated backup solutions with tested recovery procedures to protect against data loss."
      },
      {
        icon: Shield,
        title: "Security & Compliance",
        description: "Data encryption, access controls, and audit logging to meet security and compliance requirements."
      },
      {
        icon: BarChart3,
        title: "Monitoring & Reporting",
        description: "24/7 monitoring with detailed reports on performance, capacity, and potential issues."
      },
      {
        icon: Lock,
        title: "Data Protection",
        description: "Comprehensive data protection strategies including encryption at rest and in transit."
      }
    ],
    benefits: {
      title: "Why trust us with your data?",
      items: [
        { stat: "0", label: "Data loss incidents" },
        { stat: "99.99%", label: "Database uptime" },
        { stat: "< 1hr", label: "Recovery time" },
        { stat: "24/7", label: "Expert support" }
      ]
    },
    databases: {
      title: "Databases We Support",
      items: ["Microsoft SQL Server", "MySQL", "PostgreSQL", "MariaDB", "MongoDB", "Oracle", "Azure SQL", "Amazon RDS"]
    },
    cta: {
      title: "Need reliable database management?",
      subtitle: "Let us handle your data so you can focus on growing your business.",
      button: "Get in touch"
    }
  },
  nl: {
    backLink: "Terug naar Diensten",
    title: "Database Oplossingen",
    subtitle: "Betrouwbaar, veilig databasebeheer voor uw bedrijfskritische data",
    intro: "Uw data is de ruggengraat van uw bedrijf. Wij bieden uitgebreide databasebeheerdiensten die ervoor zorgen dat uw data altijd beschikbaar, veilig en optimaal presteerend is.",
    features: [
      {
        icon: Database,
        title: "Databasebeheer",
        description: "Volledig beheer van SQL Server, MySQL, PostgreSQL en andere databaseplatforms met deskundig beheer."
      },
      {
        icon: Zap,
        title: "Prestatie Optimalisatie",
        description: "Query-optimalisatie, indexeringsstrategieën en performance tuning om ervoor te zorgen dat uw databases optimaal draaien."
      },
      {
        icon: RefreshCw,
        title: "Backup & Recovery",
        description: "Geautomatiseerde backup-oplossingen met geteste herstelprocedures om gegevensverlies te voorkomen."
      },
      {
        icon: Shield,
        title: "Beveiliging & Compliance",
        description: "Gegevensversleuteling, toegangscontroles en audit logging om aan beveiligings- en compliance-eisen te voldoen."
      },
      {
        icon: BarChart3,
        title: "Monitoring & Rapportage",
        description: "24/7 monitoring met gedetailleerde rapporten over prestaties, capaciteit en mogelijke problemen."
      },
      {
        icon: Lock,
        title: "Gegevensbescherming",
        description: "Uitgebreide gegevensbeschermingsstrategieën inclusief versleuteling in rust en tijdens transport."
      }
    ],
    benefits: {
      title: "Waarom uw data aan ons toevertrouwen?",
      items: [
        { stat: "0", label: "Dataverlies incidenten" },
        { stat: "99.99%", label: "Database uptime" },
        { stat: "< 1 uur", label: "Hersteltijd" },
        { stat: "24/7", label: "Expert ondersteuning" }
      ]
    },
    databases: {
      title: "Databases die wij ondersteunen",
      items: ["Microsoft SQL Server", "MySQL", "PostgreSQL", "MariaDB", "MongoDB", "Oracle", "Azure SQL", "Amazon RDS"]
    },
    cta: {
      title: "Betrouwbaar databasebeheer nodig?",
      subtitle: "Laat ons uw data beheren zodat u zich kunt richten op de groei van uw bedrijf.",
      button: "Neem contact op"
    }
  }
}

export default function DatabasesPage() {
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
              <Database className="w-4 h-4 inline mr-2" />
              Databases
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

      {/* Supported Databases */}
      <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 animate-on-scroll">
            {t.databases.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.databases.items.map((db, index) => (
              <div 
                key={db}
                className={`p-6 border border-background/20 text-center animate-on-scroll delay-${(index + 1) * 50}`}
              >
                <span className="text-lg font-serif font-light">{db}</span>
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
