import { NextResponse } from "next/server"
import { deleteService } from "@/lib/content"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    await deleteService(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
