import type { AboutContent } from "@/lib/content"
import { Building2, Target, Trophy, Users, Lightbulb, Award } from "lucide-react"

interface AboutSectionProps {
  title: string
  subtitle: string
  content: AboutContent[]
}

const iconMap: Record<string, any> = {
  building: Building2,
  target: Target,
  trophy: Trophy,
  users: Users,
  lightbulb: Lightbulb,
  award: Award,
}

export function AboutSection({ title, subtitle, content }: AboutSectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* About Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.map((item) => {
            const Icon = iconMap[item.icon] || Building2
            return (
              <div key={item.id} className="group">
                <div className="bg-gray-50 rounded-lg p-8 h-full hover:shadow-lg transition-shadow duration-300">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
