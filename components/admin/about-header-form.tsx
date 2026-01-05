"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AboutHeaderFormProps {
  titleId?: number
  titleValue: string
  subtitleId?: number
  subtitleValue: string
}

export function AboutHeaderForm({ titleId, titleValue, subtitleId, subtitleValue }: AboutHeaderFormProps) {
  const [title, setTitle] = useState(titleValue)
  const [subtitle, setSubtitle] = useState(subtitleValue)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = async () => {
    if (!title || !subtitle) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      })
      return
    }

    if (!titleId || !subtitleId) {
      toast({
        title: "خطأ",
        description: "معرفات الحقول مفقودة",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { id: titleId, value: title, sort_order: 1 },
          { id: subtitleId, value: subtitle, sort_order: 2 },
        ]),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث عنوان القسم",
      })

      setTimeout(() => {
        router.refresh()
      }, 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">العنوان الرئيسي</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="من نحن" />
      </div>

      <div>
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="تعرف على شركتنا"
        />
      </div>

      <div className="border-t pt-4">
        <Button onClick={handleSave} disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white">
          <Save className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>
    </div>
  )
}
