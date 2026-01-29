"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function TermsAndConditions() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-8">
            {locale === "en" ? "Terms & Conditions" : "Algemene Voorwaarden"}
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            {locale === "en" ? (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using the BrainSoft ICT website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">2. Use License</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials (information or software) on BrainSoft ICT's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose</li>
                    <li>Attempt to decompile or reverse engineer any software</li>
                    <li>Remove any copyright or other proprietary notations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">3. Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The materials on BrainSoft ICT's website are provided on an 'as is' basis. BrainSoft ICT makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">4. Limitations</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall BrainSoft ICT or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BrainSoft ICT's website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">5. Accuracy of Materials</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The materials appearing on BrainSoft ICT's website could include technical, typographical, or photographic errors. BrainSoft ICT does not warrant that any of the materials on its website are accurate, complete, or current. BrainSoft ICT may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">6. Links</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BrainSoft ICT of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">7. Modifications</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">8. Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of the Netherlands, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms & Conditions, please contact us at legal@brainsoftict.nl
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">1. Acceptatie van Voorwaarden</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Door toegang tot en gebruik van de website en diensten van BrainSoft ICT, accepteert u deze voorwaarden. Als u niet akkoord gaat, dient u deze diensten niet te gebruiken.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">2. Gebruikslicentie</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    U mag materialen op de website van BrainSoft ICT voor persoonlijk, niet-commercieel gebruik downloaden. Dit is een licentie, geen eigendomsoverdracht. U mag niet:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>De materialen wijzigen of kopiëren</li>
                    <li>De materialen voor commerciële doeleinden gebruiken</li>
                    <li>Proberen software te decompileren of reverse engineeren</li>
                    <li>Auteursrecht- of andere propriëtaire aantekeningen verwijderen</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">3. Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    De materialen op de website van BrainSoft ICT worden zonder enige garantie ter beschikking gesteld. BrainSoft ICT geeft geen uitdrukkelijke of impliciete garanties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">4. Beperkingen</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT is in geen geval aansprakelijk voor enige schadevergoeding voortvloeiend uit het gebruik of onmogelijkheid van gebruik van de website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">5. Nauwkeurigheid van Materialen</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    De materialen op de website kunnen fouten bevatten. BrainSoft ICT geeft geen garantie over de nauwkeurigheid of volledigheid van materialen.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">6. Links</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT is niet verantwoordelijk voor gekoppelde websites. Het opnemen van een link betekent geen goedkeuring.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">7. Wijzigingen</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT kan deze voorwaarden op elk moment wijzigen. Door de website te gebruiken, gaat u akkoord met de huidige versie van deze voorwaarden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">8. Toepasselijk Recht</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Deze voorwaarden worden beheerst door de wetten van Nederland. U onderwerpt zich onherroepelijk aan de exclusieve rechtsmacht van de rechtbanken aldaar.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Als u vragen heeft over deze Algemene Voorwaarden, neem contact op met legal@brainsoftict.nl
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
