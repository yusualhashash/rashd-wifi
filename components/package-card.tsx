import type { Package } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PackageCardProps {
  package: Package
  whatsappNumber: string
}

export function PackageCard({ package: pkg, whatsappNumber }: PackageCardProps) {
  const features = JSON.parse(pkg.features) as string[]

  const formatWhatsAppLink = () => {
    const message = `مرحباً، أرغب في الاشتراك في ${pkg.name}`
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
  }

  return (
    <Card
      className={`relative transition-all duration-300 hover:shadow-2xl ${
        pkg.is_featured
          ? "border-emerald-600 border-[3px] shadow-2xl scale-105 bg-gradient-to-br from-white to-emerald-50"
          : "border-emerald-200 border-2 hover:scale-105 hover:border-emerald-400"
      }`}
    >
      {pkg.is_featured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 text-sm font-bold shadow-lg border-2 border-white">
            <Sparkles className="w-4 h-4 ml-1 inline-block" />
            الأكثر شعبية
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4 pt-8">
        <CardTitle className="text-3xl mb-3 font-bold text-gray-900">{pkg.name}</CardTitle>
        <CardDescription className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
          {pkg.speed}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 px-6">
        {/* Price Section */}
        <div className="text-center bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-100">
          <div className="text-5xl font-bold text-gray-900 mb-1">
            {pkg.price.toLocaleString()}
            <span className="text-xl font-normal text-gray-600 mr-2">{pkg.currency}</span>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-2">شهرياً</p>
        </div>

        {/* Features List */}
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 group">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 transition-colors">
                <Check className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button
          asChild
          className={`w-full h-14 text-lg font-bold transition-all ${
            pkg.is_featured
              ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          <Link
            href={formatWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>اشترك الآن</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
