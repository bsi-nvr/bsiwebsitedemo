"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Wifi, Shield, Zap, Clock, Users, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const content = {
  en: {
    backLink: "Back to Services",
    title: "Managed WiFi",
    subtitle: "Enterprise-grade wireless networking for seamless connectivity",
    intro: "Reliable WiFi is essential for modern business operations. We design, deploy, and manage wireless networks that deliver consistent performance, security, and coverage throughout your organization.",
    features: [
      {
        icon: Wifi,
        title: "Network Design",
        description: "Custom WiFi network design optimized for your space, ensuring complete coverage and eliminating dead zones."
      },
      {
        icon: Shield,
        title: "WiFi Security",
        description: "Enterprise-grade security with WPA3, network segmentation, and intrusion detection to protect your data."
      },
      {
        icon: BarChart3,
        title: "Network Monitoring",
        description: "24/7 monitoring of network performance, usage patterns, and potential issues before they affect users."
      },
      {
        icon: Zap,
        title: "Performance Optimization",
        description: "Continuous optimization of channel selection, power levels, and load balancing for optimal performance."
      },
      {
        icon: Users,
        title: "Guest Networks",
        description: "Secure guest WiFi networks with captive portals, bandwidth limits, and usage analytics."
      },
      {
        icon: Clock,
        title: "24/7 Support",
        description: "Round-the-clock technical support to resolve any connectivity issues quickly and efficiently."
      }
    ],
    benefits: {
      title: "Why choose our Managed WiFi?",
      items: [
        { stat: "99.9%", label: "Network uptime" },
        { stat: "< 5min", label: "Issue response" },
        { stat: "100%", label: "Coverage guarantee" },
        { stat: "24/7", label: "Expert support" }
      ]
    },
    useCases: {
      title: "Ideal For",
      items: [
        { title: "Office Buildings", description: "Reliable connectivity for all employees across multiple floors" },
        { title: "Retail Spaces", description: "Customer WiFi and POS system connectivity" },
        { title: "Warehouses", description: "Coverage for mobile devices and IoT sensors" },
        { title: "Healthcare", description: "HIPAA-compliant networks for medical devices" }
      ]
    },
    cta: {
      title: "Need better WiFi coverage?",
      subtitle: "Let us design and manage a wireless network that meets your business needs.",
      button: "Get in touch"
    }
  },
  nl: {
    backLink: "Terug naar Diensten",
    title: "Managed WiFi",
    subtitle: "Enterprise-grade draadloze netwerken voor naadloze connectiviteit",
    intro: "Betrouwbare WiFi is essentieel voor moderne bedrijfsvoering. Wij ontwerpen, implementeren en beheren draadloze netwerken die consistente prestaties, beveiliging en dekking bieden in uw hele organisatie.",
    features: [
      {
        icon: Wifi,
        title: "Netwerkontwerp",
        description: "Op maat gemaakt WiFi-netwerkontwerp geoptimaliseerd voor uw ruimte, met volledige dekking en eliminatie van dode zones."
      },
      {
        icon: Shield,
        title: "WiFi Beveiliging",
        description: "Enterprise-grade beveiliging met WPA3, netwerksegmentatie en inbraakdetectie om uw gegevens te beschermen."
      },
      {
        icon: BarChart3,
        title: "Netwerkmonitoring",
        description: "24/7 monitoring van netwerkprestaties, gebruikspatronen en potentiële problemen voordat ze gebruikers beïnvloeden."
      },
      {
        icon: Zap,
        title: "Prestatie Optimalisatie",
        description: "Continue optimalisatie van kanaalselectie, vermogensniveaus en load balancing voor optimale prestaties."
      },
      {
        icon: Users,
        title: "Gastnetwerken",
        description: "Beveiligde gast-WiFi netwerken met captive portals, bandbreedtelimieten en gebruiksanalyses."
      },
      {
        icon: Clock,
        title: "24/7 Ondersteuning",
        description: "Technische ondersteuning dag en nacht om connectiviteitsproblemen snel en efficiënt op te lossen."
      }
    ],
    benefits: {
      title: "Waarom kiezen voor onze Managed WiFi?",
      items: [
        { stat: "99.9%", label: "Netwerk uptime" },
        { stat: "< 5min", label: "Reactietijd" },
        { stat: "100%", label: "Dekkingsgarantie" },
        { stat: "24/7", label: "Expert ondersteuning" }
      ]
    },
    useCases: {
      title: "Ideaal Voor",
      items: [
        { title: "Kantoorgebouwen", description: "Betrouwbare connectiviteit voor alle medewerkers op meerdere verdiepingen" },
        { title: "Winkelruimtes", description: "Klant-WiFi en POS-systeemconnectiviteit" },
        { title: "Magazijnen", description: "Dekking voor mobiele apparaten en IoT-sensoren" },
        { title: "Gezondheidszorg", description: "AVG-conforme netwerken voor medische apparatuur" }
      ]
    },
    cta: {
      title: "Betere WiFi-dekking nodig?",
      subtitle: "Laat ons een draadloos netwerk ontwerpen en beheren dat aan uw bedrijfsbehoeften voldoet.",
      button: "Neem contact op"
    }
  }
}

export default function ManagedWifiPage() {
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
              <Wifi className="w-4 h-4 inline mr-2" />
              Managed WiFi
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

      {/* Use Cases */}
      <section className="py-20 md:py-28 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 animate-on-scroll">
            {t.useCases.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.useCases.items.map((useCase, index) => (
              <div 
                key={useCase.title}
                className={`p-6 border border-background/20 animate-on-scroll delay-${(index + 1) * 100}`}
              >
                <h3 className="text-xl font-serif font-light mb-3">{useCase.title}</h3>
                <p className="text-background/70 text-sm leading-relaxed">{useCase.description}</p>
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
