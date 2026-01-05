import { NextResponse } from "next/server"
import { createWhyChooseFeature } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { icon, title, description, sort_order } = await request.json()

    await createWhyChooseFeature(icon, title, description, sort_order)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating why choose feature:", error)
    return NextResponse.json({ error: "Failed to create feature" }, { status: 500 })
  }
}
