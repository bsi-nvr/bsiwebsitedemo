"use client"

import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ContactHero } from "./_components/contact-hero"
import { ContactInfo } from "./_components/contact-info"
import { ContactForm } from "./_components/contact-form"
import { ContactMap } from "./_components/contact-map"

export default function ContactPage() {
  const { t, locale } = useLanguage()
  useScrollAnimation()

  return (
    <>
      <ContactHero locale={locale} t={t} />

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <ContactInfo locale={locale} t={t} />
            <ContactForm locale={locale} t={t} />
          </div>
        </div>
      </section>

      <ContactMap />
    </>
  )
}
