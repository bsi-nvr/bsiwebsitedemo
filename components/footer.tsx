"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

import { DotPattern } from "@/components/dot-pattern"

export function Footer() {
  const { t, locale } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative !bg-black text-white overflow-hidden border-t border-white/10">
      {/* Technical Background Pattern */}
      <DotPattern
        width={32}
        height={32}
        cx={2}
        cy={2}
        cr={2}
        className="absolute inset-0 h-full w-full opacity-[0.15] fill-white"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-20 md:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">
            {/* Logo & Description */}
            <div className="lg:w-[35%] lg:pr-12">
              <div className="flex items-center gap-3 mb-8">
                <Link href="/" className="inline-block">
                  <Image
                    src="/brainsoft-logo-white.webp"
                    alt="BrainSoft ICT"
                    width={140}
                    height={42}
                    sizes="140px"
                    className="h-auto w-36"
                  />
                </Link>
              </div>
              <p className="text-base text-gray-400 leading-relaxed max-w-sm mb-8">
                {locale === "en"
                  ? "BrainSoft ICT is an Alkmaar-based IT company founded in 2020. Our mission is to make IT work environments sustainable by providing high-quality ICT solutions."
                  : "BrainSoft ICT is een ICT-bedrijf uit Alkmaar, opgericht in 2020. Onze missie is om ICT-werkomgevingen duurzaam te maken door hoogwaardige ICT-oplossingen te bieden."}
              </p>

              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  BrainSoft ICT
                </h4>
                <p className="text-sm text-gray-400">Talent dat werkt</p>
              </div>
            </div>

            {/* Link Columns Container */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 lg:pl-12 lg:border-l lg:border-white/10">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/50 mb-6">
                  {locale === "en" ? "Navigation" : "Navigatie"}
                </h3>
                <ul className="space-y-4">
                  {["Pricing", "Services", "About", "Contact"].map((item) => {
                    const dutchMap: Record<string, string> = { "Pricing": "Prijzen", "Services": "Diensten", "About": "Over ons", "Contact": "Contact" }
                    const href = `/${item.toLowerCase()}`.replace("pricing", "pricing") // Pricing has no page in demo but map implies it exists. Keep simplistic.
                    return (
                      <li key={item}>
                        <Link
                          href={href}
                          className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200"
                        >
                          {locale === "en" ? item : (dutchMap[item] || item)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/50 mb-6">
                  {locale === "en" ? "Resources" : "Bronnen"}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/blog" className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {locale === "en" ? "Blog" : "Blog"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {locale === "en" ? "Security" : "Beveiliging"}
                    </Link>
                  </li>
                  <li>
                    <a href={`mailto:${t.contact.info.email}`} className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {t.contact.info.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`} className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {t.contact.info.phone}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-white/50 mb-6">
                  {locale === "en" ? "Legal" : "Juridisch"}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/terms-conditions" className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {locale === "en" ? "Terms & Conditions" : "Algemene Voorwaarden"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {locale === "en" ? "Privacy Policy" : "Privacybeleid"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="text-base text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                      {locale === "en" ? "Report Vulnerability" : "Meld Kwetsbaarheid"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-mono">
              © {currentYear} BrainSoft ICT. {locale === "en" ? "All Rights Reserved." : "Alle rechten voorbehouden."}
            </p>
            <div className="flex items-center gap-6">
              {/* Socials or extra links can go here */}
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {locale === "en" ? "Systems Operational" : "Systemen Operationeel"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
