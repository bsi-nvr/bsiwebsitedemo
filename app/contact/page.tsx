"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowUpRight, Mail, Phone, MapPin, Send, AlertCircle, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { LoadingSpinner } from "@/components/loading"

type FormStatus = "idle" | "submitting" | "success" | "error"

interface FormValidation {
  firstName: boolean | null
  lastName: boolean | null
  email: boolean | null
  message: boolean | null
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function ContactPage() {
  const { t, locale } = useLanguage()
  const [formStatus, setFormStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  })
  const [validation, setValidation] = useState<FormValidation>({
    firstName: null,
    lastName: null,
    email: null,
    message: null,
  })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  })
  useScrollAnimation()

  useEffect(() => {
    setValidation({
      firstName: touched.firstName ? formData.firstName.trim().length > 0 : null,
      lastName: touched.lastName ? formData.lastName.trim().length > 0 : null,
      email: touched.email ? validateEmail(formData.email) : null,
      message: touched.message ? formData.message.trim().length > 10 : null,
    })
  }, [formData, touched])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const isFormValid =
    validation.firstName === true &&
    validation.lastName === true &&
    validation.email === true &&
    validation.message === true

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      message: true,
    })

    if (!isFormValid) {
      return
    }

    setFormStatus("submitting")
    setErrorMessage("")
    
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFormStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        role: "",
        message: "",
      })
      setTouched({
        firstName: false,
        lastName: false,
        email: false,
        message: false,
      })
    } catch {
      setFormStatus("error")
      setErrorMessage(locale === "en" 
        ? "Something went wrong. Please try again." 
        : "Er is iets misgegaan. Probeer het opnieuw.")
    }
  }

  const isSubmitting = formStatus === "submitting"
  const submitted = formStatus === "success"

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero.jpg"
            alt=""
            fill
            className="object-cover fade-in-up"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto px-6 lg:px-12 pb-16">
          <div className="max-w-4xl fade-in-up">
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              {t.contact.title}
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] text-white">
              {t.contact.subtitle}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              {t.contact.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 animate-on-scroll">
                <h2 className="text-2xl md:text-3xl font-serif font-light mb-12">
                  {locale === "en" ? "Get in touch" : "Neem contact op"}
                </h2>

                <div className="space-y-10">
                  {/* Email */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 border border-border flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Email
                      </span>
                    </div>
                    <a
                      href={`mailto:${t.contact.info.email}`}
                      className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                    >
                      {t.contact.info.email}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 border border-border flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {locale === "en" ? "Phone" : "Telefoon"}
                      </span>
                    </div>
                    <a
                      href={`tel:${t.contact.info.phone.replace(/\s/g, "")}`}
                      className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                    >
                      {t.contact.info.phone}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Address - Bezoekadres */}
                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 border border-border flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {locale === "en" ? "Visit Address" : "Bezoekadres"}
                      </span>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Brainsoft+ICT/@52.625963,4.764318,17z/data=!3m1!4b1!4m6!3m5!1s0x47cf5762e19df105:0x9bc1d80b97342e6e!8m2!3d52.6259634!4d4.7643178!16s%2Fg%2F11c1q5_1qy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl md:text-2xl font-serif font-light hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                    >
                      {t.contact.info.address}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Postal Address */}
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 border border-border flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {locale === "en" ? "Postal Address" : "Postadres"}
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl font-serif font-light">
                      {t.contact.info.postalAddress}
                    </p>
                  </div>

                  {/* KVK Number */}
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 border border-border flex items-center justify-center">
                        <span className="text-xs font-semibold">K</span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {locale === "en" ? "KVK Number" : "KVK nummer"}
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl font-serif font-light">
                      {t.contact.info.kvkNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - Right Side */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border border-border p-8 md:p-12 animate-on-scroll delay-200">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 border border-border mx-auto flex items-center justify-center mb-8">
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light">
                      {locale === "en" ? "Message sent" : "Bericht verzonden"}
                    </h3>
                    <p className="mt-4 text-muted-foreground text-pretty">
                      {locale === "en"
                        ? "Thank you for reaching out. We'll get back to you within 24 hours."
                        : "Bedankt voor uw bericht. We nemen binnen 24 uur contact met u op."}
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus("idle")
                        setValidation({
                          firstName: null,
                          lastName: null,
                          email: null,
                          message: null,
                        })
                      }}
                      className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    >
                      {locale === "en" ? "Send another message" : "Stuur nog een bericht"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Error Message */}
                    {formStatus === "error" && (
                      <div className="flex items-center gap-3 p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t.contact.form.firstName}
                        </label>
                        <div className="relative">
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Elliot"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            required
                            className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground pr-8 placeholder:text-muted-foreground"
                          />
                          {touched.firstName && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                              {validation.firstName ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <X className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t.contact.form.lastName}
                        </label>
                        <div className="relative">
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Alderson"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            required
                            className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground pr-8 placeholder:text-muted-foreground"
                          />
                          {touched.lastName && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                              {validation.lastName ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <X className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t.contact.form.email}
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="elliotalderson@protonmail.ch"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          className={`border-0 border-b rounded-none bg-transparent px-0 focus-visible:ring-0 pr-8 placeholder:text-muted-foreground ${
                            validation.email === true
                              ? "border-green-500 focus-visible:border-green-500"
                              : validation.email === false
                              ? "border-red-500 focus-visible:border-red-500"
                              : "border-border focus-visible:border-foreground"
                          }`}
                        />
                        {touched.email && formData.email !== "elliotalderson@protonmail.ch" && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                            {validation.email ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {validation.email === false && touched.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {locale === "en" ? "Please enter a valid email address" : "Voer een geldig e-mailadres in"}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="organization" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t.contact.form.organization}
                        </label>
                        <Input
                          id="organization"
                          name="organization"
                          placeholder="Allsafe"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="role" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t.contact.form.role}
                        </label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t.contact.form.message}
                      </label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          rows={5}
                          placeholder={
                            locale === "en"
                              ? "Tell us about your project..."
                              : "Vertel ons over uw project..."
                          }
                          className={`border-0 border-b rounded-none bg-transparent px-0 focus-visible:ring-0 resize-none pr-8 ${
                            validation.message === true
                              ? "border-green-500 focus-visible:border-green-500"
                              : validation.message === false
                              ? "border-red-500 focus-visible:border-red-500"
                              : "border-border focus-visible:border-foreground"
                          }`}
                        />
                        {touched.message && (
                          <div className="absolute right-0 top-5 flex items-center">
                            {validation.message ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {validation.message === false && touched.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {locale === "en" 
                            ? "Message must be at least 10 characters long" 
                            : "Bericht moet minstens 10 tekens lang zijn"}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-foreground text-background text-sm uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="border-background/20 border-t-background" />
                          <span>{locale === "en" ? "Sending..." : "Verzenden..."}</span>
                        </>
                      ) : (
                        <>
                          {t.contact.form.submit}
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t border-border">
        <div className="relative w-full h-[450px] md:h-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.88272178228!2d4.764317877592597!3d52.62596342837766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf5762e19df105%3A0x9bc1d80b97342e6e!2sBrainsoft%20ICT!5e0!3m2!1snl!2snl!4v1769454637869!5m2!1snl!2snl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Brainsoft ICT Location"
          />
        </div>
      </section>
    </>
  )
}
