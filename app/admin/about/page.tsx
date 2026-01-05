import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllContent, getAllAboutContent, AboutContent } from "@/lib/content"
import { AboutHeaderForm } from "@/components/admin/about-header-form"
import { AboutContentList } from "@/components/admin/about-content-list"

export default async function AboutManagementPage() {
  let aboutHeader: any[] = []
  let aboutContent: AboutContent[] = []

  try {
    aboutHeader = await getAllContent("about_section_header")
    aboutContent = await getAllAboutContent()
  } catch (error) {
    console.error("[v0] Error fetching about content:", error)
  }

  const headerTitle = aboutHeader.find((item) => item.key === "title")
  const headerSubtitle = aboutHeader.find((item) => item.key === "subtitle")

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard">
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">إدارة قسم من نحن</h1>
            <p className="text-gray-600 mt-1">يمكنك تعديل عنوان القسم ومحتوى الشركة</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>عنوان القسم</CardTitle>
            </CardHeader>
            <CardContent>
              <AboutHeaderForm
                titleId={headerTitle?.id}
                titleValue={headerTitle?.value || ""}
                subtitleId={headerSubtitle?.id}
                subtitleValue={headerSubtitle?.value || ""}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>محتوى الشركة</CardTitle>
            </CardHeader>
            <CardContent>
              {/* ✅ pass prop name = content */}
              <AboutContentList content={aboutContent} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
