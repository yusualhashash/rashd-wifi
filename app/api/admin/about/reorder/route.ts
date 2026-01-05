import { type NextRequest, NextResponse } from "next/server"
import { updateAboutContentOrder } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { id, sort_order } = await request.json()
    await updateAboutContentOrder(id, sort_order)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering about content:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
