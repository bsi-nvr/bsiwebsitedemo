"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ServiceCard } from "@/components/service-card"
import { GlowCard } from "@/components/glow-card"


export default function Home() {
  const { t, locale } = useLanguage()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 400])
  useScrollAnimation()

  const services = [
    {
      number: "01",
      title: t.services.service1.title,
      description: t.services.service1.description,
      href: "/services/cloud-beheer",
    },
    {
      number: "02",
      title: t.services.service2.title,
      description: t.services.service2.description,
      href: "/services/databases",
    },
    {
      number: "03",
      title: t.services.service3.title,
      description: t.services.service3.description,
      href: "/services/development",
    },
    {
      number: "04",
      title: t.services.service4.title,
      description: t.services.service4.description,
      href: "/services/managed-wifi",
    },
  ]

  return (
    <>
      {/* Main content landmark for skip link */}
      <div id="main-content" />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src="/images/hero-alkmaar.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA8AFADASIAAhEBAxEB/8QAGQABAQEBAQAAAAAAAAAAAAAAAAQBAgMF/8QAGBAAAwEBAAAAAAAAAAAAAAAAAAECAxH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOgA8j0igAlqoCWgJaAloAPY9IoAJaoCWqAJaoCWgJaoCWgA9j0igAloAP/Z"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-20">
          <div className="max-w-5xl">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.2, 0.8, 0.2, 1]
                    }
                  }
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[0.95] tracking-tight text-white text-shadow-lg"
                style={{ willChange: "transform, opacity" }}
              >
                Brainsoft ICT
                <br />
                <span className="text-white/80">Talent dat werkt</span>
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.2, 0.8, 0.2, 1]
                    }
                  }
                }}
                className="mt-8 md:mt-12 text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed text-shadow-md text-pretty"
                style={{ willChange: "transform, opacity" }}
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.2, 0.8, 0.2, 1]
                    }
                  }
                }}
                className="mt-10 md:mt-14 flex flex-wrap gap-4"
                style={{ willChange: "transform, opacity" }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-[0.2em] hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {t.hero.cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  aria-label={locale === "en" ? "Learn more about our services" : "Lees meer over onze diensten"}
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-[0.2em] hover:border-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {t.hero.learnMore}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <style>{`
            @keyframes smoothScroll {
              0%, 100% { transform: translateY(0); opacity: 0.4; }
              50% { transform: translateY(6px); opacity: 0.8; }
            }
            .scroll-indicator {
              animation: smoothScroll 2.5s ease-in-out infinite;
            }
          `}</style>
          <div className="flex flex-col items-center gap-2 scroll-indicator">
            <div className="w-6 h-10 border border-white/50 rounded-full flex items-start justify-center pt-2">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-32 lg:py-40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24 animate-on-scroll">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {locale === "en" ? "Our Services" : "Wat we doen"}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-balance">
                {locale === "en" ? "What we do" : "Wat we doen"}
              </h2>
            </div>
            <Link
              href="/services"
              aria-label={locale === "en" ? "View all our services" : "Bekijk al onze diensten"}
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {locale === "en" ? "View all services" : "Bekijk onze diensten"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border transition-colors duration-500">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
                href={service.href}
                index={index}
                variant="bento"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Split Screen About Section */}
      <section className="border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[80vh]">
            <Image
              src="/images/about-studio.webp"
              alt="Our creative studio workspace"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
            />
          </div>

          {/* Content Side */}
          <div className="flex items-center p-8 md:p-12 lg:p-20">
            <div className="max-w-xl animate-on-scroll">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.about.title}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-balance">
                {t.about.subtitle}
              </h2>
              <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                {t.about.description}
              </p>
              <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
                {t.about.mission.description}
              </p>
              <Link
                href="/about"
                aria-label={locale === "en" ? "Learn more about us" : "Lees meer over ons"}
                className="group inline-flex items-center gap-3 mt-10 px-8 py-4 border border-foreground text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t.hero.learnMore}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Style */}
      <section className="py-32 lg:py-40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 animate-on-scroll">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {locale === "en" ? "Why Choose Us" : "Waarom Wij"}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-balance">
                {locale === "en" ? "Your IT Partner" : "Uw IT Partner"}
              </h2>
            </div>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large Featured Item */}
            <div className="md:col-span-8 group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden border border-border animate-on-scroll delay-100">
              <Image
                src="/images/code-background.webp"
                alt="Development and technology visualization"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 66vw, 100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAA8AFADASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAECAwQF/8QAHBAAAwEBAAMBAAAAAAAAAAAAAAECAxEhEiIx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD0gA8j0igAlqoCWgJaAloAPY9IoAJaoCWqAJaoCWgJaoCWgA9j0igAloAP/9k="
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {locale === "en" ? "Proactive Monitoring" : "Proactieve Monitoring"}
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-serif font-light text-white text-balance">
                  {locale === "en" ? "We fix issues before they impact your business" : "Wij lossen problemen op voordat ze uw bedrijf raken"}
                </h3>
              </div>
            </div>

            {/* Side Items */}
            <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
              <GlowCard
                as={Link}
                href="/contact"
                className="group relative flex-1 min-h-[200px] border border-border bg-secondary/30 p-6 md:p-8 flex flex-col justify-end hover:bg-secondary/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-on-scroll"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {locale === "en" ? "Local Support" : "Lokale Ondersteuning"}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl lg:text-3xl font-serif font-light text-foreground text-balance">
                  {locale === "en" ? "Based in Alkmaar" : "Gevestigd in Alkmaar"}
                </h3>
                <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </GlowCard>
              <GlowCard
                as={Link}
                href="/pricing"
                className="group relative flex-1 min-h-[200px] border border-border bg-secondary/30 p-6 md:p-8 flex flex-col justify-end hover:bg-secondary/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-on-scroll"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {locale === "en" ? "Fixed Monthly Costs" : "Vaste Maandkosten"}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl lg:text-3xl font-serif font-light text-foreground text-balance">
                  {locale === "en" ? "Predictable IT Budget" : "Voorspelbaar IT Budget"}
                </h3>
                <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light max-w-4xl mx-auto leading-tight text-balance">
            {t.cta.title}
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-background/80 max-w-xl mx-auto text-pretty">
            {t.cta.subtitle}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 mt-10 px-10 py-5 border border-background text-sm uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            {t.cta.button}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
