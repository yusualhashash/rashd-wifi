import { type NextRequest, NextResponse } from "next/server"
import { createPackagesStat } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { icon, value, label, sort_order } = body

    await createPackagesStat(icon, value, label, sort_order)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating packages stat:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
