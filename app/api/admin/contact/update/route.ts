import { NextResponse } from "next/server"
import { updateContactInfo } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id, type, label, value, icon, is_active } = await request.json()
    await updateContactInfo(id, type, label, value, icon, is_active)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
  }
}
