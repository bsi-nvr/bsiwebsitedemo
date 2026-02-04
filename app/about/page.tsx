"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"
import { GlowCard } from "@/components/glow-card"

import { GridPattern } from "@/components/grid-pattern"

export default function AboutPage() {
  const { t, locale } = useLanguage()
  useScrollAnimation()

  const values = [
    {
      title: locale === "en"
        ? "We do what we say and we say what we do"
        : "We doen wat we zeggen en zeggen wat we doen",
      description: locale === "en"
        ? "Honesty and integrity guide everything we do"
        : "Eerlijkheid en integriteit bepalen alles wat we doen"
    },
    {
      title: locale === "en"
        ? "No double layers or strange profit models"
        : "Geen dubbele lagen of rare verdienmodellen",
      description: locale === "en"
        ? "Transparent pricing and straightforward solutions"
        : "Transparante prijsstelling en duidelijke oplossingen"
    },
    {
      title: locale === "en"
        ? "Safety for everyone"
        : "Veiligheid voor iedereen",
      description: locale === "en"
        ? "Security and peace of mind are fundamental"
        : "Beveiliging en gemoedsrust zijn fundamenteel"
    },
    {
      title: locale === "en"
        ? "Learning at your own pace"
        : "Leren in eigen tempo",
      description: locale === "en"
        ? "Growth and development tailored to your needs"
        : "Groei en ontwikkeling afgestemd op uw behoeften"
    },
  ]

  const team: TeamMember[] = [
    {
      name: "Mark van Staden",
      role: "Technisch Directeur",
      bio: "Leiding geven aan onze technische strategie en innovatie",
      email: "mark@brainsoftict.nl",
      phone: "+31 (0)72 888 3434"
    },
    {
      name: "Niek van Rijswijk",
      role: "Senior System Administrator",
      bio: "Beheer en optimalisatie van uw IT-infrastructuur",
      email: "niek@brainsoftict.nl",
      phone: "+31 (0)72 888 3434"
    },
    {
      name: "Sander Tensen",
      role: "Bestuurslid",
      bio: "Strategische bedrijfsleiding en client relaties",
      email: "sander@brainsoftict.nl",
      phone: "+31 (0)72 888 3434"
    },
    {
      name: "Sabine van Staden",
      role: "Bestuurslid",
      bio: "Operationeel management en projectcoördinatie",
      email: "sabine@brainsoftict.nl",
      phone: "+31 (0)72 888 3434"
    },
    {
      name: "Mike Jansen",
      role: "Trainee",
      bio: "Aankomend IT-professional in training",
      email: "mike@brainsoftict.nl",
      phone: "+31 (0)72 888 3434"
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-studio.webp"
            alt=""
            fill
            className="object-cover fade-in-up"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12 pb-16">
          <div className="max-w-3xl fade-in-up">
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              {t.about.title}
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light leading-[1.1] text-white text-balance">
              {t.about.subtitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 lg:py-40 border-b border-border overflow-hidden">
        <GridPattern
          width={40}
          height={40}
          id="mission-grid"
          className="absolute inset-0 h-full w-full opacity-[0.2] stroke-black/10 dark:stroke-white/10"
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 max-w-6xl">
            <div className="animate-on-scroll md:min-w-[280px] lg:min-w-[320px]">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.about.mission.title}
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-serif font-light text-balance">
                {t.about.mission.title}
              </h2>
            </div>
            <div className="animate-on-scroll delay-200">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6 text-pretty">
                {t.about.mission.description}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                {t.about.mission.fullText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 lg:py-40 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16 md:mb-24 animate-on-scroll">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {locale === "en" ? "What Drives Us" : "Wat Ons Drijft"}
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance">
              {t.about.values.title}
            </h2>
            <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
              {t.about.values.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {values.map((value, index) => {
              const isTopRow = index < 2
              const isLeftCol = index % 2 === 0

              return (
                <GlowCard
                  key={value.title}
                  className={cn(
                    "p-8 md:p-12 lg:p-16 min-h-[320px] flex flex-col group hover:bg-secondary/20 transition-colors duration-500",
                    !isTopRow && "border-t border-border",
                    !isLeftCol && "border-l border-border"
                  )}
                >
                  <div className="mb-8">
                    <span className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
                      0{index + 1}
                    </span>
                    <h3 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-tight text-foreground text-balance">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                    {value.description}
                  </p>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-32 lg:py-40 border-t border-border overflow-hidden">
        <GridPattern
          width={24}
          height={24}
          id="team-grid"
          className="absolute inset-0 h-full w-full opacity-[0.2] stroke-black/10 dark:stroke-white/10"
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24 animate-on-scroll">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.about.team.title}
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance">
                {locale === "en" ? "The people behind Brainsoft ICT" : "De mensen achter Brainsoft ICT"}
              </h2>
              <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                {t.about.team.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light max-w-3xl mx-auto leading-tight text-balance">
            {locale === "en" ? "Want to work with us?" : "Wil je met ons werken?"}
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
