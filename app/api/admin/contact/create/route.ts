import { NextResponse } from "next/server"
import { createContactInfo } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { type, label, value, icon, sort_order } = await request.json()
    await createContactInfo(type, label, value, icon, sort_order)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create contact info" }, { status: 500 })
  }
}
