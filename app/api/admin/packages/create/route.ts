import { createPackage } from "@/lib/content"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, speed, price, currency, features, is_featured, sort_order } = await request.json()
    await createPackage(name, speed, price, currency, features, is_featured, sort_order)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 })
  }
}
