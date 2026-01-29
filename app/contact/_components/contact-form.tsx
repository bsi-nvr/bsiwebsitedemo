"use client"

import React, { useState, useEffect } from "react"
import { ArrowUpRight, Send, AlertCircle, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LoadingSpinner } from "@/components/loading"

type FormStatus = "idle" | "submitting" | "success" | "error"

interface FormValidation {
  firstName: boolean | null
  lastName: boolean | null
  email: boolean | null
  message: boolean | null
}

interface ContactFormProps {
  locale: string
  t: any
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function ContactForm({ locale, t }: ContactFormProps) {
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
      setErrorMessage(
        locale === "en"
          ? "Something went wrong. Please try again."
          : "Er is iets misgegaan. Probeer het opnieuw."
      )
    }
  }

  const isSubmitting = formStatus === "submitting"
  const submitted = formStatus === "success"

  return (
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
  )
}
