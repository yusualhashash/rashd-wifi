import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCoverageAreas, getCoverageMapSection, getCoveragePageHero } from "@/lib/content"
import { ArrowRight, MapPin, Radio } from "lucide-react"
import Link from "next/link"

export default async function CoveragePage() {
  const hero = await getCoveragePageHero()
  const areas = await getCoverageAreas()
  const mapSection = await getCoverageMapSection()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          background: hero?.background_image
            ? `linear-gradient(rgba(6, 78, 59, 0.9), rgba(6, 78, 59, 0.9)), url(${hero.background_image})`
            : "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-400/30 hover:bg-emerald-500/30"
          >
            <Radio className="w-4 h-4 ml-2" />
            {hero?.badge_text || "تعرف علينا"}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            {hero?.title || "نحن شركة RASHD-WIFI"}
          </h1>

          <p className="text-xl md:text-2xl text-emerald-100 mb-6 text-balance">
            {hero?.subtitle || "نقدم لك أفضل خدمات الإنترنت في العراق منذ عام 2020"}
          </p>

          <p className="text-lg text-emerald-50/90 max-w-3xl mx-auto mb-8 leading-relaxed text-pretty">
            {hero?.description ||
              "نحن شركة رائدة في تقديم خدمات الإنترنت عالي السرعة في العراق. نؤمن بأن الإنترنت السريع والموثوق هو حق للجميع، ونعمل جاهدين لتوفير أفضل تجربة إنترنت لعملائنا."}
          </p>

          <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
            <Link href={hero?.button_link || "/contact"}>
              {hero?.button_text || "تواصل معنا"}
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-16 px-4 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          {/* Map Image */}
          {mapSection?.map_image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img src={mapSection.map_image || "/placeholder.svg"} alt="خريطة التغطية" className="w-full h-auto" />
            </div>
          )}

          {/* Coverage Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div
                key={area.id}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                  </div>

                  <Badge
                    variant={area.status === "available" ? "default" : "secondary"}
                    className={
                      area.status === "available"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {area.status === "available" ? "متاح" : "قريباً"}
                  </Badge>
                </div>

                {area.status === "available" && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Radio className="w-4 h-4" />
                    <span className="text-sm">عدد الأبراج: {area.tower_count}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
