import { ArrowRight, Users, Globe, Award, Clock, Building2, Target, Trophy, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAboutPageHero, getAboutPageStats, getAboutContent } from "@/lib/content"

const iconMap: Record<string, any> = {
  users: Users,
  globe: Globe,
  award: Award,
  clock: Clock,
  building: Building2,
  target: Target,
  trophy: Trophy,
  lightbulb: Lightbulb,
}

export default async function AboutPage() {
  const hero = await getAboutPageHero()
  const stats = await getAboutPageStats()
  const features = await getAboutContent()

  if (!hero) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white py-20 px-4 overflow-hidden"
        style={
          hero.background_image_url
            ? {
              backgroundImage: `linear-gradient(to bottom right, rgba(6, 78, 59, 0.95), rgba(6, 95, 70, 0.95), rgba(2, 44, 34, 0.95)), url(${hero.background_image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
            : undefined
        }
      >
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full">
              <span className="text-sm font-medium">{hero.badge_text}</span>
              <span className="text-emerald-300">✨</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-balance">{hero.title}</h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-emerald-100 text-center mb-6 max-w-3xl mx-auto text-balance">
            {hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-base text-emerald-50/90 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
              <Link href={hero.button1_link}>
                {hero.button1_text}
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-12 px-4 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon] || Users
                return (
                  <div key={stat.id} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features/Values Section */}
      {features.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">لماذا تختارنا؟</h2>
              <p className="text-lg text-gray-600">نقدم لك أفضل تجربة إنترنت في العراق</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon] || Building2
                return (
                  <div
                    key={feature.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon className="w-7 h-7 text-emerald-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
