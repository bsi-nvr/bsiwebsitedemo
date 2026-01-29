"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function SecurityPage() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-8">
            {locale === "en" ? "Report Vulnerability" : "Meld Kwetsbaarheid"}
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            {locale === "en" ? (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Security at BrainSoft ICT</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At BrainSoft ICT, we take security seriously. We appreciate the efforts of security researchers and the responsible disclosure of vulnerabilities. If you discover a security vulnerability in our systems or services, we encourage you to report it to us as soon as possible.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Reporting a Vulnerability</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To report a vulnerability, please follow these guidelines:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Send a detailed description of the vulnerability to security@brainsoft-ict.nl</li>
                    <li>Include steps to reproduce the vulnerability</li>
                    <li>Include proof of concept or screenshots if possible</li>
                    <li>Allow us time to investigate and respond before public disclosure</li>
                    <li>Do not access or modify any data beyond what is necessary to demonstrate the vulnerability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">What to Expect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon receiving a vulnerability report:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                    <li>We will acknowledge receipt of your report within 24 hours</li>
                    <li>We will investigate the vulnerability and determine its severity</li>
                    <li>We will work on a fix and notify you of the progress</li>
                    <li>We will coordinate the disclosure timeline with you</li>
                    <li>We may recognize your contribution in our security acknowledgments</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact Security Team</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    For security concerns, please contact us at:
                  </p>
                  <a 
                    href="mailto:info@brainsoftict.nl"
                    className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-opacity font-medium"
                  >
                    {"info@brainsoftict.nl"}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Appreciation</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We appreciate your responsible disclosure and commitment to making BrainSoft ICT and the internet more secure. Thank you for helping us protect our systems and our users' data.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Beveiliging bij BrainSoft ICT</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bij BrainSoft ICT nemen we beveiliging serieus. We waarderen de inspanningen van veiligheidsbevorderaars en de verantwoorde openbaarmaking van beveiligingsproblemen. Als u een beveiligingskwetsbaarheid in onze systemen of diensten ontdekt, moedigen we u aan dit zo snel mogelijk aan ons te melden.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Een Kwetsbaarheid Melden</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Volg deze richtlijnen om een kwetsbaarheid te melden:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Stuur een gedetailleerde beschrijving van de kwetsbaarheid naar security@brainsoft-ict.nl</li>
                    <li>Voeg stappen in om de kwetsbaarheid te reproduceren</li>
                    <li>Voeg proof of concept of schermafbeeldingen toe indien mogelijk</li>
                    <li>Geef ons tijd om te onderzoeken en te reageren voordat u openbaar maakt</li>
                    <li>Krijg geen toegang tot of wijzig geen gegevens buiten wat nodig is om de kwetsbaarheid aan te tonen</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Wat te Verwachten</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Na ontvangst van een kwetsbaarheidrapport:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                    <li>Wij zullen ontvangst van uw rapport binnen 24 uur bevestigen</li>
                    <li>Wij zullen de kwetsbaarheid onderzoeken en de ernst bepalen</li>
                    <li>Wij werken aan een fix en stellen u op de hoogte van de voortgang</li>
                    <li>Wij zullen de openbaarmakingstijdlijn met u coördineren</li>
                    <li>Wij kunnen uw bijdrage erkennen in onze beveiligingsverklaringen</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact Beveiligingsteam</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Neem voor beveiligingsproblemen contact met ons op via:
                  </p>
                  <a 
                    href="mailto:security@brainsoft-ict.nl"
                    className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-opacity font-medium"
                  >
                    security@brainsoft-ict.nl
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Waardering</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We waarderen uw verantwoorde openbaarmaking en toewijding aan het veiliger maken van BrainSoft ICT en het internet. Dank je wel dat je ons helpt onze systemen en de gegevens van onze gebruikers te beschermen.
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
