import { deletePackage } from "@/lib/content"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deletePackage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 })
  }
}
