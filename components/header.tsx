"use client"
import Link from "next/link"
import { Wifi, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Header({
  branding,
  navigationItems,
  action,
  whatsappNumber,
}: {
  branding: Record<string, string>
  navigationItems: Array<{ id: number; value: string }>
  action: Record<string, string>
  whatsappNumber: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleWhatsAppClick = () => {
    // Remove spaces and special characters except +
    const cleanNumber = whatsappNumber.replace(/\s/g, "")
    const whatsappUrl = `https://wa.me/${cleanNumber}`
    window.open(whatsappUrl, "_blank")
  }

  const getNavigationHref = (value: string) => {
    const lowerValue = value.toLowerCase()
    if (lowerValue.includes("الرئيسية") || lowerValue.includes("home")) return "/"
    if (lowerValue.includes("الباقات") || lowerValue.includes("packages")) return "/packages"
    if (lowerValue.includes("التغطية") || lowerValue.includes("coverage")) return "/coverage"
    if (lowerValue.includes("من نحن") || lowerValue.includes("about")) return "/about"
    if (lowerValue.includes("تواصل") || lowerValue.includes("contact")) return "/contact"
    return "/"
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header className="w-full bg-white border-b border-gray-200" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Branding - Always visible */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold">{branding.brand_name}</span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => {
              const href = getNavigationHref(item.value)
              const active = isActive(href)

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`font-medium transition-colors ${active ? "text-emerald-500" : "text-gray-700 hover:text-emerald-500"
                    }`}
                >
                  {item.value}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Action Button - Hidden on mobile */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
          >
            {action.subscribe_button}
          </button>

          {/* Mobile Menu Toggle - Visible only on mobile */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-emerald-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mounted && mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => {
                const href = getNavigationHref(item.value)
                const active = isActive(href)

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={`font-medium transition-colors text-right ${active ? "text-emerald-500" : "text-gray-700 hover:text-emerald-500"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.value}
                  </Link>
                )
              })}
              <button
                onClick={handleWhatsAppClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors w-full"
              >
                {action.subscribe_button}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
