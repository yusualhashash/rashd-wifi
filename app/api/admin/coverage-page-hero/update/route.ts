import { type NextRequest, NextResponse } from "next/server"
import { updateCoveragePageHero } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    await updateCoveragePageHero(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating coverage hero:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
