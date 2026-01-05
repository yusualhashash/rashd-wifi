import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ContactInfo {
  id: number
  type: string
  label: string
  value: string
  icon: string
}

interface ContactSectionProps {
  title: string
  subtitle: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  contactInfo: ContactInfo[]
  whatsappNumber: string
}

const iconMap = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
}

export function ContactSection({
  title,
  subtitle,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  contactInfo,
  whatsappNumber,
}: ContactSectionProps) {
  const getContactAction = (type: string, value: string) => {
    switch (type) {
      case "phone":
        return `tel:${value.replace(/\s/g, "")}`
      case "whatsapp":
        return `https://wa.me/${value.replace(/\D/g, "")}`
      case "email":
        return `mailto:${value}`
      case "facebook":
        return value.startsWith("http") ? value : `https://facebook.com/${value}`
      case "instagram":
        return value.startsWith("http") ? value : `https://instagram.com/${value}`
      case "twitter":
        return value.startsWith("http") ? value : `https://twitter.com/${value}`
      case "location":
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`
      default:
        return "#"
    }
  }

  return (
    <section className="py-12 bg-white" id="contact">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info) => {
            const Icon = iconMap[info.icon as keyof typeof iconMap] || Phone
            const href = getContactAction(info.type, info.value)
            const isExternal = info.type !== "location"

            return (
              <Card
                key={info.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-green-500"
              >
                <a
                  href={href}
                  target={isExternal && info.type !== "phone" && info.type !== "email" ? "_blank" : undefined}
                  rel={isExternal && info.type !== "phone" && info.type !== "email" ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{info.label}</h3>
                    <p className="text-gray-600 break-words">{info.value}</p>
                  </div>
                </a>
              </Card>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">{ctaSubtitle}</p>
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform"
            asChild
          >
            <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
              {ctaButtonText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
