import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with actual database
const users = [
    {
        id: "1",
        email: "john@example.com",
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
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
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
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

// Simple token verification for demo
function verifyToken(token: string): { userId: string; email: string } | null {
    try {
        const payload = JSON.parse(atob(token))

        // Check if token is expired
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null
        }

        return { userId: payload.userId, email: payload.email }
    } catch {
        return null
    }
}

export async function GET(request: NextRequest) {
    const jsonHeaders = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
    }

    try {
        console.log("🔍 Verify API called")

        const authHeader = request.headers.get("authorization")
        console.log("🔑 Auth header present:", !!authHeader)

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No valid authorization header")
            return NextResponse.json({ success: false, error: "No token provided" }, { status: 401, headers: jsonHeaders })
        }

        const token = authHeader.substring(7)
        console.log("🎫 Token extracted, length:", token.length)

        // Verify token (simplified for demo)
        const decoded = verifyToken(token)

        if (!decoded) {
            console.log("❌ Token verification failed")
            return NextResponse.json(
                { success: false, error: "Invalid or expired token" },
                { status: 401, headers: jsonHeaders },
            )
        }

        console.log("✅ Token verified for user ID:", decoded.userId)

        // Find user
        const user = users.find((u) => u.id === decoded.userId)
        if (!user) {
            console.log("❌ User not found for ID:", decoded.userId)
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404, headers: jsonHeaders })
        }

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user

        console.log("✅ Verification successful for user:", user.email)

        return NextResponse.json(
            {
                success: true,
                user: userWithoutPassword,
            },
            { status: 200, headers: jsonHeaders },
        )
    } catch (error) {
        console.error("💥 Token verification error:", error)
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
export async function POST() {
    return NextResponse.json(
        { success: false, error: "Method not allowed. Use GET." },
        {
            status: 405,
            headers: {
                "Content-Type": "application/json",
                Allow: "GET",
            },
        },
    )
}
