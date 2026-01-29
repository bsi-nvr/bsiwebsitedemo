"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { blogPostsData } from "@/lib/blog-data"

export default function Blog() {
  const { locale } = useLanguage()
  useScrollAnimation()

  const blogPosts = blogPostsData.map(post => ({
    id: post.id,
    slug: post.slug,
    date: locale === "en" ? post.dateEn : post.dateNl,
    title: locale === "en" ? post.titleEn : post.titleNl,
    excerpt: locale === "en" ? post.excerptEn : post.excerptNl,
    image: post.image,
    category: locale === "en" ? post.categoryEn : post.categoryNl
  }))

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-foreground mb-6 text-balance">
              {locale === "en" ? "News & Insights" : "Nieuws & Inzichten"}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {locale === "en"
                ? "Stay informed with the latest updates, industry trends, and expert insights from BrainSoft ICT."
                : "Blijf geïnformeerd met de laatste updates, industrietrends en deskundig inzicht van BrainSoft ICT."}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="group animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden border border-border mb-6 transition-all duration-300 group-hover:border-foreground/30 group-hover:shadow-lg group-hover:-translate-y-1">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/title inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  <h2 className="text-2xl lg:text-3xl font-serif font-light text-foreground mb-3 group-hover/title:text-accent transition-colors text-balance">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-6 line-clamp-2 text-pretty">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  {locale === "en" ? "Read More" : "Lees Meer"}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-32 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6 text-balance">
            {locale === "en"
              ? "Have a question or need expert advice?"
              : "Heeft u een vraag of heeft u deskundig advies nodig?"}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-pretty">
            {locale === "en"
              ? "Get in touch with our team and let's discuss how we can help your business thrive."
              : "Neem contact op met ons team en laten we bespreken hoe we uw bedrijf kunnen helpen bloeien."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {locale === "en" ? "Get in Touch" : "Neem Contact Op"}
            <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
