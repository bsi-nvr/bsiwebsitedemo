import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/lib/theme-context'
import { LanguageProvider } from '@/lib/language-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MobileHelpdeskButton } from '@/components/mobile-helpdesk-button'
import { HolidayEffects } from '@/components/holiday-effects'
import { ScrollToTop } from '@/components/scroll-to-top'
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd } from '@/components/json-ld'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: 'BrainSoft ICT | Managed IT Services Alkmaar',
    template: '%s | BrainSoft ICT',
  },
  description: 'BrainSoft ICT provides professional managed IT services, cloud solutions, Microsoft 365 management, and cybersecurity for businesses in Alkmaar and the Netherlands.',
  keywords: ['IT services', 'managed services', 'cloud solutions', 'Microsoft 365', 'cybersecurity', 'Alkmaar', 'Netherlands', 'IT support', 'IT beheer'],
  authors: [{ name: 'BrainSoft ICT' }],
  creator: 'BrainSoft ICT',
  publisher: 'BrainSoft ICT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brainsoftict.nl'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'nl': '/nl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    url: 'https://brainsoftict.nl',
    siteName: 'BrainSoft ICT',
    title: 'BrainSoft ICT | Managed IT Services Alkmaar',
    description: 'Professional managed IT services, cloud solutions, and cybersecurity for businesses in Alkmaar and the Netherlands.',
    images: [
      {
        url: '/brainsoft-logo-black.png',
        width: 1200,
        height: 630,
        alt: 'BrainSoft ICT - Managed IT Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrainSoft ICT | Managed IT Services',
    description: 'Professional managed IT services for businesses in Alkmaar and the Netherlands.',
    images: ['/brainsoft-logo-black.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/brainsoft-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/brainsoft-icon-white.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/brainsoft-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (prefersDark ? 'dark' : 'light');
                const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                document.documentElement.classList.add(resolved);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        <ThemeProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <MobileHelpdeskButton />
            <HolidayEffects />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
</body>
    </html>
  )
}
