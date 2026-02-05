export type Locale = "en" | "nl"

export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Brainsoft ICT - Talent dat werkt",
      subtitle: "Brainsoft ICT provides managed IT services that help businesses focus on what matters most - while we take care of the technology.",
      cta: "Get in touch",
      learnMore: "Learn more",
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive IT solutions for your business",
      service1: {
        title: "Cloud based beheer",
        description: "Secure, scalable cloud infrastructure. Migration, management, and optimization of your cloud environment.",
      },
      service2: {
        title: "Databases",
        description: "Reliable database solutions with backup, security, and performance optimization to ensure data integrity.",
      },
      service3: {
        title: "Development",
        description: "Custom software development tailored to your business needs. From concept to deployment and support.",
      },
      service4: {
        title: "Managed wifi",
        description: "Enterprise-grade wireless networking solutions with security, monitoring, and seamless connectivity.",
      },
    },
    about: {
      title: "About Us",
      subtitle: "Technology that works for you",
      description: "Brainsoft ICT is a managed service provider based in Alkmaar, dedicated to helping businesses leverage technology effectively and securely.",
      mission: {
        title: "Our Mission",
        description: "BrainSoft ICT has the mission of making ICT work environments sustainable. This means that the people who do the work do so in an environment where they are seen and valued. It is important to us that the environment radiates inspiration and positivity so that the negative stress monster on the work floor has no chance of gaining the upper hand.",
        fullText: "We do this through intensive guidance of our people who are ICT talents and specialists, but who just need that little bit extra to flourish. By working closely with social institutions and the environment where these people come to work, we achieve the best results. BrainSoft ICT provides high-quality ICT solutions that efficiently extract the highest return from mostly existing solutions, just like many other ICT companies. What makes us different is that we do this from the desire to create a win-win-win situation: for you as a customer, for us as a company, and for our people for whom a sustainable workplace is available.",
      },
      values: {
        title: "Our Values",
        honest: "We do what we say",
        transparent: "No hidden agendas",
        safety: "Safety for everyone",
        learning: "Learning at your own pace",
        description: "We give honest advice with honest people: we do what we say and we say what we do. No double layers or strange profit models from scarcity. Safety for everyone. Learning at your own pace. At us, the person is central, not profit.",
        themes: [
          {
            title: "We do what we say and we say what we do",
            description: "Honesty and integrity guide everything we do"
          },
          {
            title: "No double layers or strange profit models",
            description: "Transparent pricing and straightforward solutions"
          },
          {
            title: "Safety for everyone",
            description: "Security and peace of mind are fundamental"
          },
          {
            title: "Learning at your own pace",
            description: "Growth and development tailored to your needs"
          }
        ]
      },
      team: {
        title: "Meet Our Team",
        description: "A dedicated team of IT professionals committed to delivering exceptional service and support.",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Let's discuss your IT needs",
      description: "Looking for reliable IT support? Let's talk about how we can help your business thrive.",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        organization: "Company",
        role: "Role",
        message: "Message",
        submit: "Send message",
      },
      info: {
        email: "info@brainsoftict.nl",
        phone: "+31 (0)85 7010329",
        address: "Marconistraat 5, 1821 BX Alkmaar",
        postalAddress: "P.O. Box 500, 1800 AM Alkmaar, Netherlands",
        kvkNumber: "82383650",
      },
      team: [
        {
          name: "Mark van Staden",
          role: "Technical Director & Operations Manager",
          bio: "With over 15 years of IT experience, Mark leads our technical strategy and ensures every client receives world-class support.",
          email: "mark@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Niek van Rijswijk",
          role: "Senior System Administrator",
          bio: "Niek specializes in cloud infrastructure and network security. His expertise keeps our clients' systems running smoothly.",
          email: "niek@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Sander Tensen",
          role: "Board Member",
          bio: "Sander brings strategic business perspective to our operations, ensuring sustainable growth and client satisfaction.",
          email: "sander@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Sabine van Staden",
          role: "Board Member",
          bio: "Sabine drives our vision for customer-centric service delivery and operational excellence.",
          email: "sabine@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Mike Jansen",
          role: "Trainee",
          bio: "Mike brings fresh perspectives to our team as he develops his IT expertise under our guidance.",
          email: "mike@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
      ],
    },
    footer: {
      newsletter: {
        title: "Stay Updated",
        placeholder: "Enter your email",
        submit: "Subscribe",
      },
      copyright: "All rights reserved.",
    },
    cta: {
      title: "Ready to optimize your IT?",
      subtitle: "Let's work together to build a technology foundation that supports your growth.",
      button: "Get in touch",
    },
  },
  nl: {
    nav: {
      home: "Home",
      services: "Diensten",
      pricing: "Prijzen",
      about: "Over ons",
      contact: "Contact",
    },
    hero: {
      title: "Brainsoft ICT - Talent dat werkt",
      subtitle: "Brainsoft ICT biedt managed IT-diensten waarmee bedrijven zich kunnen richten op wat het belangrijkst is - terwijl wij zorgen voor de technologie.",
      cta: "Neem contact op",
      learnMore: "Meer informatie",
    },
    services: {
      title: "Wat we doen",
      subtitle: "Uitgebreide IT-oplossingen voor uw bedrijf",
      service1: {
        title: "Cloud based beheer",
        description: "Veilige, schaalbare cloud-infrastructuur. Migratie, beheer en optimalisatie van uw cloud-omgeving.",
      },
      service2: {
        title: "Databases",
        description: "Betrouwbare databaseoplossingen met backup, beveiliging en prestatie-optimalisatie voor gegevensintegriteit.",
      },
      service3: {
        title: "Development",
        description: "Aangepaste softwareontwikkeling op maat van uw bedrijfsbehoeften. Van concept tot implementatie en ondersteuning.",
      },
      service4: {
        title: "Managed wifi",
        description: "Draadloze netwerkoplossingen op ondernemingsniveau met beveiliging, monitoring en naadloze verbinding.",
      },
    },
    about: {
      title: "Over Ons",
      subtitle: "Technologie die voor u werkt",
      description: "Brainsoft ICT is een managed service provider gevestigd in Alkmaar, toegewijd aan het helpen van bedrijven om technologie effectief en veilig te benutten.",
      mission: {
        title: "Onze Missie",
        description: "Brainsoft ICT heeft als missie ICT werkomgevingen duurzaam te maken. Dit houdt in dat de mensen die het werk uitvoeren, dit doen in een omgeving waar ze gezien en gewaardeerd worden. Daarbij is het voor ons belangrijk dat de omgeving inspiratie en positiviteit uitstraald zodat het negatieve stressmonstertje op de werkvloer geen kans krijgt om de overhand te krijgen.",
        fullText: "Dit doen wij door een intensieve begeleiding van onze mensen die ICT talenten en specialisten zijn, maar die net dát beetje meer nodig hebben om tot bloei te komen. Door nauw samen te werken met maatschappelijke instanties en de omgeving waar deze mensen komen te werken krijgen we het beste resultaat. Brainsoft ICT biedt hoogwaardige ICT-oplossingen waardoor efficiënt het hoogste rendement uit veelal bestaande oplossingen gehaald kan worden, net als veel andere ICT-bedrijven. Wat ons anders maakt is dat we dit doen vanuit het streven een win-win-win situatie te creëren: voor jou als klant, voor ons als bedrijf én voor onze mensen waarvoor een duurzame arbeidsplaats beschikbaar is.",
      },
      values: {
        title: "Onze Waarden",
        honest: "We doen wat we zeggen",
        transparent: "Geen verborgen agenda's",
        safety: "Veiligheid voor iedereen",
        learning: "Leren in eigen tempo",
        description: "Wij geven eerlijk advies met eerlijke mensen: we doen wat we zeggen en zeggen wat we doen. Geen dubbele lagen of rare verdienmodellen uit schaarste. Veiligheid voor eenieder. Leren in eigen tempo. Bij ons staat dan ook de mens centraal en niet de winst.",
        themes: [
          {
            title: "We doen wat we zeggen en zeggen wat we doen",
            description: "Eerlijkheid en integriteit bepalen alles wat we doen"
          },
          {
            title: "Geen dubbele lagen of rare verdienmodellen",
            description: "Transparante prijsstelling en duidelijke oplossingen"
          },
          {
            title: "Veiligheid voor iedereen",
            description: "Beveiliging en gemoedsrust zijn fundamenteel"
          },
          {
            title: "Leren in eigen tempo",
            description: "Groei en ontwikkeling afgestemd op uw behoeften"
          }
        ]
      },
      team: {
        title: "Ons Team",
        description: "Een toegewijd team van IT-professionals die zich inzetten voor uitzonderlijke service en ondersteuning.",
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Laten we praten",
      description: "Heeft u vragen over onze diensten of wilt u een vrijblijvend gesprek? Neem contact met ons op.",
      form: {
        name: "Naam",
        email: "E-mail",
        organization: "Bedrijf",
        role: "Functie",
        message: "Bericht",
        submit: "Verzend bericht",
      },
      info: {
        email: "info@brainsoftict.nl",
        phone: "+31 (0)85 7010329",
        address: "Marconistraat 5, 1821 BX Alkmaar",
        postalAddress: "Postbus 500, 1800 AM Alkmaar, Nederland",
        kvkNumber: "82383650",
      },
      team: [
        {
          name: "Mark van Staden",
          role: "Technisch Directeur & Operationeel Manager",
          bio: "Met meer dan 15 jaar IT-ervaring leidt Mark onze technische strategie en zorgt voor wereldklasse ondersteuning.",
          email: "mark@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Niek van Rijswijk",
          role: "Senior System Administrator",
          bio: "Niek specialiseert zich in cloud-infrastructuur en netwerkbeveiliging. Zijn expertise houdt de systemen van onze klanten soepel draaiende.",
          email: "niek@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Sander Tensen",
          role: "Bestuurslid",
          bio: "Sander brengt strategisch zakelijk perspectief in onze operaties, wat duurzame groei en klanttevredenheid waarborgt.",
          email: "sander@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Sabine van Staden",
          role: "Bestuurslid",
          bio: "Sabine stuurt onze visie voor klantgerichte serviceverlening en operationele uitmuntendheid.",
          email: "sabine@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
        {
          name: "Mike Jansen",
          role: "Trainee",
          bio: "Mike brengt frisse ideeën naar ons team terwijl hij onder onze begeleiding zijn IT-expertise ontwikkelt.",
          email: "mike@brainsoftict.nl",
          phone: "+31 (0)85 7010329"
        },
      ],
    },
    footer: {
      newsletter: {
        title: "Blijf op de hoogte",
        placeholder: "Voer uw e-mail in",
        submit: "Abonneren",
      },
      copyright: "Alle rechten voorbehouden.",
    },
    cta: {
      title: "Klaar om uw IT te optimaliseren?",
      subtitle: "Laten we samenwerken aan een technologiefundament dat uw groei ondersteunt.",
      button: "Neem contact op",
    },
  },
} as const

export type TranslationKey = typeof translations.en

function getTranslation(locale: Locale, key: keyof TranslationKey): string {
  const translation = translations[locale][key] as any
  if (typeof translation === 'string') return translation
  if (translation && typeof translation === 'object' && 'description' in translation) {
    return String((translation as any).description)
  }
  return String(translation ?? '')
}

export { getTranslation };
