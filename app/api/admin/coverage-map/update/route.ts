import { type NextRequest, NextResponse } from "next/server"
import { updateCoverageMapSection } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { mapImage } = await request.json()
    await updateCoverageMapSection(mapImage)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating coverage map:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
