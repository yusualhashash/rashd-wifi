import { NextResponse } from "next/server"
import { updateWhyChooseFeatureOrder } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { features } = await request.json()

    for (const feature of features) {
      await updateWhyChooseFeatureOrder(feature.id, feature.sort_order)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering why choose features:", error)
    return NextResponse.json({ error: "Failed to reorder features" }, { status: 500 })
  }
}
