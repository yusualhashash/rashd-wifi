import { NextResponse } from "next/server"
import { updateWhyChooseFeature } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id, icon, title, description, is_active } = await request.json()

    await updateWhyChooseFeature(id, icon, title, description, is_active)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating why choose feature:", error)
    return NextResponse.json({ error: "Failed to update feature" }, { status: 500 })
  }
}
