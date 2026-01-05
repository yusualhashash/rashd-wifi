import { NextResponse } from "next/server"
import { updateFooterLink } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id, title, url, is_active } = await request.json()

    await updateFooterLink(id, title, url, is_active)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
