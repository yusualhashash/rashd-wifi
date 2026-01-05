import {
  getPackages,
  getContactInfo,
  getPackagesHero,
  getPackagesStats,
  getWhyChooseFeatures,
  getWhyChooseSection,
} from "@/lib/content"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Zap, Shield, Headphones, TrendingUp, Users, Check } from "lucide-react"

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    users: Users,
    zap: Zap,
    "trending-up": TrendingUp,
    headphones: Headphones,
    wifi: Wifi,
    shield: Shield,
    check: Check,
  }
  return icons[iconName] || Users
}

export default async function PackagesPage() {
  const packages = await getPackages()
  const contactInfo = await getContactInfo()
  const heroData = await getPackagesHero()
  const statsData = await getPackagesStats()
  const whyChooseFeatures = await getWhyChooseFeatures()
  const whyChooseSection = await getWhyChooseSection()

  const whatsappContact = contactInfo.find((item) => item.type === "whatsapp" || item.icon === "whatsapp")
  const whatsappNumber = whatsappContact?.value || "+964 775 173 5156"

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white pt-32 pb-20 px-4">
        {heroData?.background_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroData.background_image})` }}
          />
        )}

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full mb-4">
              <span className="text-emerald-300 text-xs font-medium">
                ✨ {heroData?.badge_text || "باقات مصممة خصيصاً لك"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-emerald-100">
                {heroData?.title || "اختر الباقة المثالية لاحتياجاتك"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-emerald-100 text-balance leading-relaxed max-w-3xl mx-auto">
              {heroData?.description || "باقات إنترنت عالية السرعة مع دعم فني متميز على مدار الساعة"}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-900 hover:bg-emerald-50 text-lg px-8 py-3 h-auto"
              >
                <a href={heroData?.button1_link || "#packages"}>{heroData?.button1_text || "استكشف الباقات"}</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
            {statsData.map((stat) => {
              const IconComponent = getIconComponent(stat.icon)
              return (
                <Card key={stat.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center space-y-2">
                    <IconComponent className="w-8 h-8 mx-auto text-emerald-300" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-emerald-200 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">باقاتنا المميزة</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">اختر الباقة التي تناسب احتياجاتك من السرعة والسعر</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} whatsappNumber={whatsappNumber} />
            ))}
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              {whyChooseSection?.section_title || "لماذا تختار RASHD-WIFI؟"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseFeatures.map((feature) => {
                const IconComponent = getIconComponent(feature.icon)
                return (
                  <Card
                    key={feature.id}
                    className="border-2 border-emerald-100 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
