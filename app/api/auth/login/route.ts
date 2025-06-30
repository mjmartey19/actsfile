import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with actual database
const users = [
  {
    id: "1",
    email: "scholar@gmail.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "John Doe",
    phone: "+233123456789",
    avatar: "/placeholder-user.jpg",
    bio: "Passionate about sustainable development and community empowerment.",
    location: "Accra, Ghana",
    joinDate: "2024-01-15",
    isVerified: true,
    preferences: {
      privacy: "public" as const,
      notifications: true,
      newsletter: true,
    },
  },
  {
    id: "2",
    email: "test@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "Test User",
    phone: "+1234567890",
    avatar: "/placeholder-user.jpg",
    bio: "Test user for development purposes.",
    location: "New York, USA",
    joinDate: "2024-01-20",
    isVerified: true,
    preferences: {
      privacy: "public" as const,
      notifications: true,
      newsletter: false,
    },
  },
]

// Simple password hash for demo (password = "password")
const DEMO_PASSWORD_HASH = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"

// Simple password verification for demo
function verifyPassword(password: string, hash: string): boolean {
  // For demo purposes, just check if password is "password"
  return password === "password"
}

// Simple JWT creation for demo
function createToken(userId: string, email: string): string {
  // For demo purposes, create a simple token
  const payload = {
    userId,
    email,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  }
  return btoa(JSON.stringify(payload))
}

export async function POST(request: NextRequest) {
  // Ensure we always return JSON, even on errors
  const jsonHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  }

  try {
    console.log("🔐 Login API called")

    // Parse request body with error handling
    let body
    try {
      const text = await request.text()
      console.log("📝 Raw request body:", text)

      if (!text.trim()) {
        console.log("❌ Empty request body")
        return NextResponse.json(
          { success: false, error: "Request body is empty" },
          { status: 400, headers: jsonHeaders },
        )
      }

      body = JSON.parse(text)
      console.log("✅ Parsed request body:", { email: body.email, password: "[REDACTED]" })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400, headers: jsonHeaders },
      )
    }

    const { email, password } = body

    console.log("🔍 Login attempt for email:", email)

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing email or password")
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400, headers: jsonHeaders },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email)
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400, headers: jsonHeaders })
    }

    // Find user
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      console.log("❌ User not found:", email)
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401, headers: jsonHeaders },
      )
    }

    console.log("✅ User found:", user.email)

    // Verify password (simplified for demo)
    const isValidPassword = verifyPassword(password, user.password)

    if (!isValidPassword) {
      console.log("❌ Invalid password for user:", email)
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401, headers: jsonHeaders },
      )
    }

    // Check if email is verified
    if (!user.isVerified) {
      console.log("❌ Email not verified for user:", email)
      return NextResponse.json(
        { success: false, error: "Please verify your email before logging in" },
        { status: 401, headers: jsonHeaders },
      )
    }

    // Generate token (simplified for demo)
    const token = createToken(user.id, user.email)

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user

    console.log("✅ Login successful for user:", user.email)

    return NextResponse.json(
      {
        success: true,
        token,
        user: userWithoutPassword,
      },
      { status: 200, headers: jsonHeaders },
    )
  } catch (error) {
    console.error("💥 Login API error:", error)

    // Always return JSON even on unexpected errors
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

export async function PUT() {
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

export async function DELETE() {
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
