import { Zap, Signal, Headphones, Infinity, Wifi, Shield } from "lucide-react"
import type { Service } from "@/lib/content"

const iconMap: Record<string, any> = {
  zap: Zap,
  signal: Signal,
  headphones: Headphones,
  infinity: Infinity,
  wifi: Wifi,
  shield: Shield,
}

interface ServicesSectionProps {
  title: string
  subtitle: string
  services: Service[]
}

export function ServicesSection({ title, subtitle, services }: ServicesSectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Wifi
            return (
              <div
                key={service.id}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
