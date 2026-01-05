import { type NextRequest, NextResponse } from "next/server"
import { updateAboutContent } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { id, title, description, icon, is_active } = await request.json()
    await updateAboutContent(id, title, description, icon, is_active)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating about content:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
