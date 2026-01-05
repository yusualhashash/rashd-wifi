import { NextResponse } from "next/server"
import { updateFooterSocialOrder } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { links } = await request.json()

    for (const link of links) {
      await updateFooterSocialOrder(link.id, link.sort_order)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reorder error:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
