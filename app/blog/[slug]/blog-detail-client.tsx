"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { blogPostsData } from "@/lib/blog-data"
import { notFound } from "next/navigation"

export function BlogDetailClient({ slug }: { slug: string }) {
  const { locale } = useLanguage()
  
  const post = blogPostsData.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }

  const title = locale === "en" ? post.titleEn : post.titleNl
  const date = locale === "en" ? post.dateEn : post.dateNl
  const category = locale === "en" ? post.categoryEn : post.categoryNl
  const content = locale === "en" ? post.contentEn : post.contentNl

  // Get related posts (exclude current post, show 3 others)
  const relatedPosts = blogPostsData
    .filter(p => p.id !== post.id)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      title: locale === "en" ? p.titleEn : p.titleNl,
      excerpt: locale === "en" ? p.excerptEn : p.excerptNl,
      image: p.image,
      category: locale === "en" ? p.categoryEn : p.categoryNl
    }))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "en" ? "Back to News" : "Terug naar Nieuws"}
          </Link>

          {/* Post Header */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-wider font-medium text-accent">
                {category}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <time className="text-sm text-muted-foreground">{date}</time>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight mb-6 text-balance">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden border-y border-border mb-16 md:mb-24">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Content Section */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-invert max-w-none space-y-8">
            {content.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('-')) {
                // Handle bullet points
                const bullets = paragraph.split('\n').filter(line => line.trim().startsWith('-'))
                return (
                  <ul key={index} className="list-disc list-inside space-y-3 text-muted-foreground">
                    {bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="leading-relaxed">
                        {bullet.replace(/^-\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )
              }
              
              if (paragraph.trim().match(/^\d+\./)) {
                // Handle numbered lists
                const lines = paragraph.split('\n')
                return (
                  <ol key={index} className="list-decimal list-inside space-y-3 text-muted-foreground">
                    {lines.filter(line => line.trim()).map((line, lineIndex) => (
                      <li key={lineIndex} className="leading-relaxed">
                        {line.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                )
              }

              return (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph}
                </p>
              )
            })}
          </article>

          {/* Author Info */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium text-foreground">BrainSoft ICT</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "en" 
                    ? "Experts in managed IT services and digital solutions"
                    : "Experts in managed IT-services en digitale oplossingen"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 lg:px-12 py-24 border-t border-border">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-12 mt-8">
              {locale === "en" ? "Related Articles" : "Gerelateerde Artikelen"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-border mb-6">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 text-xs font-medium">
                      {relatedPost.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-light text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium text-sm"
                  >
                    {locale === "en" ? "Read More" : "Lees Meer"}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-24 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            {locale === "en"
              ? "Have a question or need expert advice?"
              : "Heeft u een vraag of heeft u deskundig advies nodig?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {locale === "en"
              ? "Get in touch with our team and let's discuss how we can help your business thrive."
              : "Neem contact op met ons team en laten we bespreken hoe we uw bedrijf kunnen helpen bloeien."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
          >
            {locale === "en" ? "Get in Touch" : "Neem Contact Op"}
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
