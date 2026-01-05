import { NextResponse } from "next/server"
import { createService } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { title, description, icon, sort_order } = await request.json()

    await createService(title, description, icon, sort_order)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
