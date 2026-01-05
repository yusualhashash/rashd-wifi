import { type NextRequest, NextResponse } from "next/server"
import { deleteCoverageArea } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteCoverageArea(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting coverage area:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
