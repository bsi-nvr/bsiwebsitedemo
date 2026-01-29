"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft, Code, Smartphone, Globe, Cog, Layers, Wrench } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const content = {
  en: {
    backLink: "Back to Services",
    title: "Custom Development",
    subtitle: "Tailored software solutions that drive your business forward",
    intro: "We build custom software solutions that solve real business problems. From web applications to APIs, we deliver high-quality code that scales with your needs.",
    features: [
      {
        icon: Globe,
        title: "Web Applications",
        description: "Modern, responsive web applications built with the latest technologies. From simple websites to complex enterprise platforms."
      },
      {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "Applications designed to work seamlessly across all devices, ensuring your users have a great experience everywhere."
      },
      {
        icon: Cog,
        title: "API Development",
        description: "RESTful and GraphQL APIs that connect your systems and enable seamless data flow between applications."
      },
      {
        icon: Layers,
        title: "System Integration",
        description: "Connect your existing systems and third-party services to create a unified, efficient workflow."
      },
      {
        icon: Code,
        title: "Custom Software",
        description: "Bespoke software solutions designed specifically for your unique business requirements and processes."
      },
      {
        icon: Wrench,
        title: "Maintenance & Support",
        description: "Ongoing maintenance, updates, and support to keep your applications running smoothly and securely."
      }
    ],
    technologies: {
      title: "Technologies We Use",
      items: ["React", "Next.js", "Node.js", "TypeScript", ".NET", "Python", "Azure", "AWS"]
    },
    process: {
      title: "Our Development Process",
      steps: [
        { number: "01", title: "Discovery", description: "We understand your requirements, goals, and challenges through detailed discussions." },
        { number: "02", title: "Design", description: "We create wireframes, prototypes, and technical specifications for your solution." },
        { number: "03", title: "Development", description: "We build your solution using agile methodologies with regular updates and feedback." },
        { number: "04", title: "Deployment", description: "We launch your solution with thorough testing and provide ongoing support." }
      ]
    },
    cta: {
      title: "Have a project in mind?",
      subtitle: "Let's discuss how we can bring your ideas to life with custom software.",
      button: "Get in touch"
    }
  },
  nl: {
    backLink: "Terug naar Diensten",
    title: "Maatwerk Ontwikkeling",
    subtitle: "Op maat gemaakte softwareoplossingen die uw bedrijf vooruit helpen",
    intro: "Wij bouwen aangepaste softwareoplossingen die echte bedrijfsproblemen oplossen. Van webapplicaties tot API's, wij leveren hoogwaardige code die meegroeit met uw behoeften.",
    features: [
      {
        icon: Globe,
        title: "Web Applicaties",
        description: "Moderne, responsieve webapplicaties gebouwd met de nieuwste technologieën. Van eenvoudige websites tot complexe enterprise platforms."
      },
      {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "Applicaties ontworpen om naadloos te werken op alle apparaten, zodat uw gebruikers overal een geweldige ervaring hebben."
      },
      {
        icon: Cog,
        title: "API Ontwikkeling",
        description: "RESTful en GraphQL API's die uw systemen verbinden en naadloze datastromen tussen applicaties mogelijk maken."
      },
      {
        icon: Layers,
        title: "Systeemintegratie",
        description: "Verbind uw bestaande systemen en diensten van derden om een uniforme, efficiënte workflow te creëren."
      },
      {
        icon: Code,
        title: "Aangepaste Software",
        description: "Op maat gemaakte softwareoplossingen speciaal ontworpen voor uw unieke bedrijfsvereisten en processen."
      },
      {
        icon: Wrench,
        title: "Onderhoud & Support",
        description: "Doorlopend onderhoud, updates en ondersteuning om uw applicaties soepel en veilig te laten draaien."
      }
    ],
    technologies: {
      title: "Technologieën die wij gebruiken",
      items: ["React", "Next.js", "Node.js", "TypeScript", ".NET", "Python", "Azure", "AWS"]
    },
    process: {
      title: "Ons Ontwikkelproces",
      steps: [
        { number: "01", title: "Ontdekking", description: "We begrijpen uw vereisten, doelen en uitdagingen door gedetailleerde gesprekken." },
        { number: "02", title: "Ontwerp", description: "We maken wireframes, prototypes en technische specificaties voor uw oplossing." },
        { number: "03", title: "Ontwikkeling", description: "We bouwen uw oplossing met agile methodologieën met regelmatige updates en feedback." },
        { number: "04", title: "Oplevering", description: "We lanceren uw oplossing met grondige tests en bieden doorlopende ondersteuning." }
      ]
    },
    cta: {
      title: "Heeft u een project in gedachten?",
      subtitle: "Laten we bespreken hoe we uw ideeën tot leven kunnen brengen met aangepaste software.",
      button: "Neem contact op"
    }
  }
}

export default function DevelopmentPage() {
  const { locale } = useLanguage()
  useScrollAnimation()
  const t = content[locale]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/code-background.webp"
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
              <Code className="w-4 h-4 inline mr-2" />
              Development
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

      {/* Technologies */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 animate-on-scroll">
            {t.technologies.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.technologies.items.map((tech, index) => (
              <div 
                key={tech}
                className={`p-6 border border-border text-center hover:bg-secondary/50 transition-colors animate-on-scroll delay-${(index + 1) * 50}`}
              >
                <span className="text-lg font-serif font-light">{tech}</span>
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
