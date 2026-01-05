import { NextResponse } from "next/server"
import { deleteAboutPageStat } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteAboutPageStat(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting about page stat:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
