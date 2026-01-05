import { updatePackage } from "@/lib/content"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id, name, speed, price, currency, features, is_featured, is_active } = await request.json()
    await updatePackage(id, name, speed, price, currency, features, is_featured, is_active)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ success: false, error: "Failed to update package" }, { status: 500 })
  }
}
