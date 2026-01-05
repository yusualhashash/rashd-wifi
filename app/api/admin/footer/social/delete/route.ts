import { NextResponse } from "next/server"
import { deleteFooterSocial } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteFooterSocial(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
