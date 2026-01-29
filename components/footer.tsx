"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t, locale } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="!bg-black text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            {/* Logo & Description */}
            <div className="lg:w-[35%] lg:pr-12">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/" className="inline-block">
                  <Image
                    src="/brainsoft-logo-white.webp"
                    alt="BrainSoft ICT"
                    width={140}
                    height={42}
                    sizes="140px"
                    className="h-auto w-32"
                  />
                </Link>
                <div>
                  <p className="text-sm font-medium text-gray-300">BrainSoft ICT</p>
                  <p className="text-xs text-gray-400">Talent dat werkt</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                {locale === "en" 
                  ? "BrainSoft ICT is an Alkmaar-based IT company founded in 2020. Our mission is to make IT work environments sustainable by providing high-quality ICT solutions."
                  : "BrainSoft ICT is een ICT-bedrijf uit Alkmaar, opgericht in 2020. Onze missie is om ICT-werkomgevingen duurzaam te maken door hoogwaardige ICT-oplossingen te bieden."}
              </p>
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px bg-gray-800 self-stretch" />

            {/* Link Columns Container */}
            <div className="flex-1 flex flex-col md:flex-row lg:pl-12 gap-8 md:gap-0">
              {/* Quick Links */}
              <div className="flex-1 md:pr-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {locale === "en" ? "Quick Links" : "Snelle Links"}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/pricing" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Pricing" : "Prijzen"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Services" : "Diensten"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "About" : "Over ons"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Contact" : "Contact"}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Separator */}
              <div className="hidden md:block w-px bg-gray-800" />

              {/* Resources */}
              <div className="flex-1 md:px-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {locale === "en" ? "Resources" : "Bronnen"}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/blog" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Blog" : "Blog"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Security" : "Beveiliging"}
                    </Link>
                  </li>
                  <li>
                    <a href={`mailto:${t.contact.info.email}`} className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {t.contact.info.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${t.contact.info.phone.replace(/\s/g, '')}`} className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {t.contact.info.phone}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Separator */}
              <div className="hidden md:block w-px bg-gray-800" />

              {/* Legal */}
              <div className="flex-1 md:pl-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {locale === "en" ? "Legal" : "Juridisch"}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/terms-conditions" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Terms & Conditions" : "Algemene Voorwaarden"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Privacy Policy" : "Privacybeleid"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="text-base text-gray-400 hover:text-yellow-500 transition-colors">
                      {locale === "en" ? "Report Vulnerability" : "Meld Kwetsbaarheid"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left side - Legal links */}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Link href="/terms-conditions" className="hover:text-gray-300 transition-colors">
                {locale === "en" ? "Terms & Conditions" : "Algemene Voorwaarden"}
              </Link>
              <span className="text-amber-500">•</span>
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                {locale === "en" ? "Privacy Policy" : "Privacybeleid"}
              </Link>
              <span className="text-amber-500">•</span>
              <Link href="/security" className="hover:text-gray-300 transition-colors">
                {locale === "en" ? "Report Vulnerability" : "Meld Kwetsbaarheid"}
              </Link>
            </div>

            {/* Right side - Copyright */}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>Copyright {currentYear}</span>
              <span className="text-amber-500">/</span>
              <span>{locale === "en" ? "All Rights Reserved By BrainSoft ICT" : "Alle rechten voorbehouden door BrainSoft ICT"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
