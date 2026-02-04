"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Languages, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LanguageDropdownProps {
    locale: string
    scrolled: boolean
    onToggleLocale: () => void // Legacy, but we'll use setLocale logic if passed, or just toggle
}

import { useLanguage } from "@/lib/language-context"

export function LanguageDropdown({ scrolled }: { scrolled: boolean }) {
    const { locale, setLocale } = useLanguage()
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // Close on outside click
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const languages = [
        { code: "en", label: "English" },
        { code: "nl", label: "Nederlands" },
    ]

    const handleSelect = (code: string) => {
        setLocale(code)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-1.5 font-medium rounded-full transition-all duration-300",
                    "bg-secondary/50 hover:bg-secondary text-secondary-foreground border border-transparent hover:border-border/50",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
                    isOpen && "bg-secondary border-border/50"
                )}
                aria-label="Select language"
                aria-expanded={isOpen}
            >
                <Languages className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown
                    className={cn(
                        "w-3 h-3 opacity-50 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 min-w-[140px] p-1.5 rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
                                    "hover:bg-accent/50 hover:text-accent-foreground",
                                    locale === lang.code ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground"
                                )}
                            >
                                <span>{lang.label}</span>
                                {locale === lang.code && (
                                    <Check className="w-3.5 h-3.5 text-accent" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
