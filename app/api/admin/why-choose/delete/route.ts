import { NextResponse } from "next/server"
import { deleteWhyChooseFeature } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteWhyChooseFeature(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting why choose feature:", error)
    return NextResponse.json({ error: "Failed to delete feature" }, { status: 500 })
  }
}
