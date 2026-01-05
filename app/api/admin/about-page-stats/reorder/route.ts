import { NextResponse } from "next/server"
import { updateAboutPageStatOrder } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { updates } = await request.json()
    await Promise.all(
      updates.map((update: { id: number; sort_order: number }) =>
        updateAboutPageStatOrder(update.id, update.sort_order),
      ),
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering about page stats:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
