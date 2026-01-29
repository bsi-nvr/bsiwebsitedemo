"use client"

import { useLanguage } from "@/lib/language-context"

export default function PrivacyPolicy() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-8">
            {locale === "en" ? "Privacy Policy" : "Privacybeleid"}
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            {locale === "en" ? (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT ("we", "us", "our") operates the brainsoft-ict.nl website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Information Collection and Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect several different types of information for various purposes to provide and improve our Service to you.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Contact information (name, email, phone)</li>
                    <li>Usage data and analytics</li>
                    <li>Device information</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Use of Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT uses the collected data for various purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service</li>
                    <li>To provide customer support</li>
                    <li>To monitor the usage of our Service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Security of Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at privacy@brainsoft-ict.nl
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Inleiding</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT ("wij", "ons", "onze") is exploitant van de website brainsoft-ict.nl. Deze pagina informeert u over ons beleid inzake de verzameling, het gebruik en de openbaarmaking van persoonsgegevens wanneer u onze Service gebruikt en de keuzes die u met betrekking tot die gegevens kunt maken.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Verzameling en Gebruik van Informatie</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Wij verzamelen verschillende soorten informatie voor verschillende doeleinden om onze Service aan u te bieden en te verbeteren.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Contactgegevens (naam, e-mail, telefoonnummer)</li>
                    <li>Gebruiksgegevens en analyses</li>
                    <li>Apparaatinformatie</li>
                    <li>Communicatievoorkeuren</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Gebruik van Gegevens</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    BrainSoft ICT gebruikt de verzamelde gegevens voor verschillende doeleinden:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                    <li>Om onze Service te leveren en te onderhouden</li>
                    <li>U op de hoogte te stellen van wijzigingen in onze Service</li>
                    <li>U in staat te stellen deel te nemen aan interactieve functies van onze Service</li>
                    <li>Klantenondersteuning te bieden</li>
                    <li>Het gebruik van onze Service te controleren</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Beveiliging van Gegevens</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    De veiligheid van uw gegevens is voor ons van groot belang, maar onthoud dat geen transmissiemethode via het Internet of opslagmethode elektronisch 100% veilig is. Hoewel wij naar commercieel aanvaardbare middelen streven om uw persoonsgegevens te beschermen, kunnen we de absolute veiligheid ervan niet garanderen.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-light mb-4">Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Als u vragen hebt over dit privacybeleid, neem dan contact met ons op via privacy@brainsoft-ict.nl
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
