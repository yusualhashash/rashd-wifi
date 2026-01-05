import { NextResponse } from "next/server"
import { deleteContactInfo } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteContactInfo(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete contact info" }, { status: 500 })
  }
}
