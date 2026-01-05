import type { Package } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PackagesSectionProps {
  title: string
  subtitle: string
  packages: Package[]
  whatsappNumber: string
}

export function PackagesSection({ title, subtitle, packages, whatsappNumber }: PackagesSectionProps) {
  const formatWhatsAppLink = (packageName: string) => {
    const message = `مرحباً، أرغب في الاشتراك في ${packageName}`
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="py-12 px-4 bg-gray-50" id="packages">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const features = JSON.parse(pkg.features) as string[]

            return (
              <Card
                key={pkg.id}
                className={`relative transition-all hover:shadow-xl ${pkg.is_featured
                  ? "border-green-600 border-2 shadow-lg scale-105"
                  : "border-green-500 border-2 hover:scale-102"
                  }`}
              >
                {pkg.is_featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-6 py-1 hover:bg-green-700">الأكثر شعبية</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-green-600">{pkg.speed}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center border-y py-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {pkg.price.toLocaleString()}
                      <span className="text-lg font-normal text-gray-600 mr-2">{pkg.currency}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">شهرياً</p>
                  </div>

                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                    <Link
                      href={formatWhatsAppLink(pkg.name)}
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
          })}
        </div>
      </div>
    </section>
  )
}
