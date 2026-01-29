"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface PricingHeroProps {
  content: any
  isYearly: boolean
  onToggleYearly: (value: boolean) => void
}

export function PricingHero({ content, isYearly, onToggleYearly }: PricingHeroProps) {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pricing-bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAICAgIChsICQkJChAODg4ODA4YEBMNDg0GEBMRHx8fGB4fHBwgJC4nICIsIxwcHD3/2wBDAQcHBwoIChMICChMGh4aHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHD/wAARCAA8ADwDASIAAhEBAxEB/8QAGQABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAQIRkf/aAAwDAQACEAMRAD8A"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto animate-on-scroll">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-white">
            {content.title}{" "}
            <span className="font-semibold">{content.titleBold}</span>
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10 animate-on-scroll">
          <button
            onClick={() => onToggleYearly(false)}
            className={cn(
              "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
              !isYearly ? "bg-white text-black" : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            {content.monthly}
          </button>
          <button
            onClick={() => onToggleYearly(true)}
            className={cn(
              "px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
              isYearly ? "bg-white text-black" : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            {content.yearly}
          </button>
        </div>
      </div>
    </section>
  )
}
