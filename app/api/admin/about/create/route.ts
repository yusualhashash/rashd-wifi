import { type NextRequest, NextResponse } from "next/server"
import { createAboutContent } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { title, description, icon, sort_order } = await request.json()
    await createAboutContent(title, description, icon, sort_order)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating about content:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
