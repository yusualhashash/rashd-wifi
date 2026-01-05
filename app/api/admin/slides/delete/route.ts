import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { deleteHeroSlide } from "@/lib/content"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id } = body

    await deleteHeroSlide(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting slide:", error)
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 })
  }
}
