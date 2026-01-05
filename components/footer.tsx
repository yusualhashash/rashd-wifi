import Link from "next/link"
import { Facebook, Instagram, Twitter, MessageCircle, Phone, Mail, MapPin } from "lucide-react"

interface FooterLink {
  id: number
  title: string
  url: string
}

interface FooterSocial {
  id: number
  platform: string
  url: string
  icon: string
}

interface ContactInfo {
  id: number
  type: string
  label: string
  value: string
  icon: string
}

interface FooterProps {
  aboutTitle: string
  aboutDescription: string
  copyrightText: string
  links: FooterLink[]
  socialLinks: FooterSocial[]
  contactInfo: ContactInfo[]
}

const iconMap: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  "message-circle": MessageCircle,
  phone: Phone,
  whatsapp: MessageCircle,
  mail: Mail,
  email: Mail,
  "map-pin": MapPin,
  location: MapPin,
  // TikTok custom SVG icon
  tiktok: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  // Snapchat custom SVG icon
  snapchat: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.091-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  ),
}

export function Footer({ aboutTitle, aboutDescription, copyrightText, links, socialLinks, contactInfo }: FooterProps) {
  const getContactHref = (type: string, value: string) => {
    const cleanValue = value.replace(/\s+/g, "").replace(/\+/g, "")

    switch (type) {
      case "whatsapp":
        return `https://wa.me/${cleanValue}`
      case "phone":
        return `tel:${value.replace(/\s+/g, "")}`
      case "email":
        return `mailto:${value}`
      case "location":
        return `https://maps.google.com/?q=${encodeURIComponent(value)}`
      default:
        return "#"
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">{aboutTitle}</h3>
            <p className="text-gray-300 leading-relaxed">{aboutDescription}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-emerald-400">روابط سريعة</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-emerald-400">تواصل معنا</h4>
            <ul className="space-y-3">
              {contactInfo.slice(0, 3).map((info) => {
                const Icon = iconMap[info.icon] || Phone
                return (
                  <li key={info.id}>
                    <a
                      href={getContactHref(info.type, info.value)}
                      className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                      target={info.type === "location" ? "_blank" : undefined}
                      rel={info.type === "location" ? "noopener noreferrer" : undefined}
                    >
                      <Icon className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm">{info.value}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-emerald-400">تابعنا</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || MessageCircle
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-emerald-500 p-3 rounded-lg transition-colors duration-200"
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}
