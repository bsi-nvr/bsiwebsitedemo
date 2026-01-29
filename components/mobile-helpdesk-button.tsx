"use client"

import { useEffect, useState } from "react"
import { HeadphonesIcon } from "lucide-react"

export function MobileHelpdeskButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Show button after scrolling 300px
      setIsVisible(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href="https://helpdesk.brainsoftict.nl/"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 lg:hidden z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
      aria-label="Open Helpdesk"
      title="Helpdesk"
    >
      <HeadphonesIcon className="w-6 h-6" />
    </a>
  )
}
