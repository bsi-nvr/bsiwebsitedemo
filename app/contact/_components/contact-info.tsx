"use client"

import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react"

interface ContactInfoProps {
  locale: string
  t: any
}

export function ContactInfo({ locale, t }: ContactInfoProps) {
  return (
    <div className="lg:col-span-5">
      <div className="lg:sticky lg:top-32 animate-on-scroll">
        <h2 className="text-2xl md:text-3xl font-serif font-light mb-12">
          {locale === "en" ? "Get in touch" : "Neem contact op"}
        </h2>

        <div className="space-y-10">
          <div className="group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </span>
            </div>
            <a
              href={`mailto:${t.contact.info.email}`}
              className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
            >
              {t.contact.info.email}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Phone" : "Telefoon"}
              </span>
            </div>
            <a
              href={`tel:${t.contact.info.phone.replace(/\s/g, "")}`}
              className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
            >
              {t.contact.info.phone}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="group">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Visit Address" : "Bezoekadres"}
              </span>
            </div>
            <a
              href="https://www.google.com/maps/place/Brainsoft+ICT/@52.625963,4.764318,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf5762e19df105:0x9bc1d80b97342e6e!8m2!3d52.6259634!4d4.7643178!16s%2Fg%2F11c1q5_1qy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
            >
              {t.contact.info.address}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "Postal Address" : "Postadres"}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-serif font-light">
              {t.contact.info.postalAddress}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 border border-border flex items-center justify-center">
                <span className="text-xs font-semibold">K</span>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {locale === "en" ? "KVK Number" : "KVK nummer"}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-serif font-light">
              {t.contact.info.kvkNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
