import { NextResponse } from "next/server"
import { updateAboutPageStat } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id, icon, value, label, is_active } = await request.json()
    await updateAboutPageStat(id, icon, value, label, is_active)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating about page stat:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
