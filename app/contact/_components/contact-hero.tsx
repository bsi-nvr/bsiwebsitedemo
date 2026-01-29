"use client"

import Image from "next/image"

interface ContactHeroProps {
  locale: string
  t: any
}

export function ContactHero({ locale, t }: ContactHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-hero.webp"
          alt=""
          fill
          className="object-cover fade-in-up"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container relative z-10 mx-auto px-6 lg:px-12 pb-16">
        <div className="max-w-4xl fade-in-up">
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">
            {t.contact.title}
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] text-white">
            {t.contact.subtitle}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            {t.contact.description}
          </p>
        </div>
      </div>
    </section>
  )
}
