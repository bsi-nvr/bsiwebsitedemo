export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrainSoft ICT",
    "alternateName": "Brainsoft ICT",
    "url": "https://brainsoftict.nl",
    "logo": "https://brainsoftict.nl/brainsoft-icon.webp",
    "description": "Professional managed IT services, cloud solutions, and cybersecurity for businesses in Alkmaar and the Netherlands.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vondelstraat 27",
      "addressLocality": "Alkmaar",
      "postalCode": "1802 EL",
      "addressCountry": "NL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-72-888-3434",
      "contactType": "customer service",
      "email": "info@brainsoftict.nl",
      "availableLanguage": ["Dutch", "English"]
    },
    "sameAs": [],
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "priceRange": "$$"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://brainsoftict.nl/#localbusiness",
    "name": "BrainSoft ICT",
    "image": "https://brainsoftict.nl/brainsoft-icon.webp",
    "url": "https://brainsoftict.nl",
    "telephone": "+31-72-888-3434",
    "email": "info@brainsoftict.nl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vondelstraat 27",
      "addressLocality": "Alkmaar",
      "postalCode": "1802 EL",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.6259634,
      "longitude": 4.7643178
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "EUR"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BrainSoft ICT",
    "url": "https://brainsoftict.nl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://brainsoftict.nl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BlogPostJsonLdProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName?: string
  image?: string
  url: string
}

export function BlogPostJsonLd({ 
  title, 
  description, 
  datePublished, 
  dateModified,
  authorName = "BrainSoft ICT",
  image,
  url 
}: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrainSoft ICT",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brainsoftict.nl/brainsoft-icon.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && { image })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ServiceJsonLdProps {
  name: string
  description: string
  url: string
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "BrainSoft ICT",
      "url": "https://brainsoftict.nl"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "url": url
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
