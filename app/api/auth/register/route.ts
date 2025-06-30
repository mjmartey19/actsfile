import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with actual database
const users: any[] = []

export async function POST(request: NextRequest) {
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  }

  try {
    console.log("📝 Register API called")

    // Parse request body with error handling
    let body
    try {
      const text = await request.text()
      console.log("📝 Raw request body length:", text.length)

      if (!text.trim()) {
        return NextResponse.json(
          { success: false, error: "Request body is empty" },
          { status: 400, headers: jsonHeaders },
        )
      }

      body = JSON.parse(text)
      console.log("✅ Parsed request body:", {
        name: body.name,
        email: body.email,
        password: "[REDACTED]",
        agreeToTerms: body.agreeToTerms,
      })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400, headers: jsonHeaders },
      )
    }

    const { name, email, password, phone, location, agreeToTerms } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400, headers: jsonHeaders },
      )
    }

    if (!agreeToTerms) {
      return NextResponse.json(
        { success: false, error: "You must agree to the terms and conditions" },
        { status: 400, headers: jsonHeaders },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400, headers: jsonHeaders },
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long" },
        { status: 400, headers: jsonHeaders },
      )
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 409, headers: jsonHeaders },
      )
    }

    // Create new user (simplified for demo)
    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password: "hashed_password", // hash the password
      name,
      phone: phone || null,
      avatar: null,
      bio: null,
      location: location || null,
      joinDate: new Date().toISOString(),
      isVerified: false, // Require email verification
      preferences: {
        privacy: "public" as const,
        notifications: true,
        newsletter: true,
      },
    }

    // Add to mock database
    users.push(newUser)

    console.log("✅ Registration successful for user:", email)

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Please check your email to verify your account.",
      },
      { status: 201, headers: jsonHeaders },
    )
  } catch (error) {
    console.error("💥 Registration API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500, headers: jsonHeaders },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST",
      },
    },
  )
}
