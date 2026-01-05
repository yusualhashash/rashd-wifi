"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { HeroSlide } from "@/lib/content"

interface HeroSliderProps {
  slides: HeroSlide[]
  whatsappNumber: string
}

export function HeroSlider({ slides, whatsappNumber }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const getButtonHref = (buttonText: string, buttonLink: string | null) => {
    const lowerText = (buttonText || "").toLowerCase().trim()
    const phoneNumber = whatsappNumber.replace(/[^0-9]/g, "")

    // ✅ Always respect explicit link first
    if (buttonLink && buttonLink !== "#") {
      return buttonLink
    }

    // ✅ WhatsApp subscription
    if (lowerText.includes("اشترك")) {
      return `https://wa.me/${phoneNumber}`
    }

    // ✅ Coverage
    if (lowerText.includes("التغطية") || lowerText.includes("اكتشف التغطية")) {
      return "/coverage"
    }

    // ✅ Packages — match only when clearly package-related
    if (
      lowerText === "احصل على العرض" ||
      lowerText === "الباقات" ||
      lowerText.startsWith("احصل على")
    ) {
      return "/packages"
    }

    // ✅ Default fallback
    return "/contact"
  }

  const isExternalLink = (href: string) => {
    return href.startsWith("http")
  }

  if (slides.length === 0) return null

  return (
    <div className="relative w-full h-[calc(100vh-80px)] md:min-h-[700px] min-h-[500px] overflow-hidden bg-gray-900">

      {/* Slides */}
      {slides.map((slide, index) => {

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={slide.image_url || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-8">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 drop-shadow-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Arrows */}
      {mounted && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden sm:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {mounted && slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 md:w-12 h-1 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
