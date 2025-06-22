"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  bio?: string
  location?: string
  joinDate: string
  isVerified: boolean
  preferences: {
    privacy: "public" | "friends" | "private"
    notifications: boolean
    newsletter: boolean
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  location?: string
  agreeToTerms: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("actsfile_token")
      if (!token) {
        setLoading(false)
        return
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("/api/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const userData = await response.json()
          if (userData.success && userData.user) {
            setUser(userData.user)
          } else {
            console.warn("Invalid user data received")
            localStorage.removeItem("actsfile_token")
          }
        } else {
          console.warn("Non-JSON response from verify endpoint")
          localStorage.removeItem("actsfile_token")
        }
      } else {
        console.warn("Token verification failed:", response.status)
        localStorage.removeItem("actsfile_token")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("actsfile_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Input validation
      if (!email?.trim() || !password?.trim()) {
        return { success: false, error: "Email and password are required" }
      }

      console.log("🔐 Attempting login for:", email)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const requestBody = JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      })

      console.log("📤 Sending login request...")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: requestBody,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("📥 Login response status:", response.status)
      console.log("📥 Login response headers:", Object.fromEntries(response.headers.entries()))

      // Check content type first
      const contentType = response.headers.get("content-type")
      console.log("📄 Response content type:", contentType)

      if (!contentType || !contentType.includes("application/json")) {
        console.error("❌ Invalid response content type:", contentType)

        // Try to get the response text for debugging
        try {
          const responseText = await response.text()
          console.error("📄 Response text:", responseText.substring(0, 500))

          // Check if it's an HTML error page
          if (responseText.includes("<!DOCTYPE html>") || responseText.includes("<html")) {
            return { success: false, error: "Server error occurred. Please try again later." }
          }
        } catch (textError) {
          console.error("❌ Could not read response text:", textError)
        }

        return { success: false, error: "Server returned invalid response format. Please try again." }
      }

      // Parse JSON response
      let data
      try {
        data = await response.json()
        console.log("✅ Parsed response data:", {
          success: data.success,
          hasToken: !!data.token,
          hasUser: !!data.user,
          error: data.error,
        })
      } catch (jsonError) {
        console.error("❌ Failed to parse JSON response:", jsonError)
        return { success: false, error: "Invalid server response format. Please try again." }
      }

      if (response.ok && data.success) {
        if (!data.token || !data.user) {
          console.error("❌ Missing token or user data in response")
          return { success: false, error: "Invalid server response. Please try again." }
        }

        localStorage.setItem("actsfile_token", data.token)
        setUser(data.user)
        console.log("✅ Login successful for user:", data.user.email)
        return { success: true }
      } else {
        console.warn("❌ Login failed:", data.error || "Unknown error")
        return { success: false, error: data.error || "Login failed. Please check your credentials." }
      }
    } catch (error) {
      console.error("💥 Login error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return { success: false, error: "Request timed out. Please check your connection and try again." }
        } else if (error.message.includes("fetch") || error.message.includes("network")) {
          return { success: false, error: "Network error. Please check your internet connection and try again." }
        } else if (error.message.includes("JSON")) {
          return { success: false, error: "Server response error. Please try again later." }
        }
      }

      return { success: false, error: "An unexpected error occurred. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    try {
      setLoading(true)

      if (!data.name?.trim() || !data.email?.trim() || !data.password?.trim()) {
        return { success: false, error: "Name, email, and password are required" }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      console.log("📝 Attempting registration for:", data.email)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
          phone: data.phone?.trim() || undefined,
          location: data.location?.trim() || undefined,
          agreeToTerms: data.agreeToTerms,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("❌ Invalid response content type:", contentType)
        return { success: false, error: "Server returned invalid response format. Please try again." }
      }

      const result = await response.json()

      if (response.ok && result.success) {
        console.log("✅ Registration successful for user:", data.email)
        return { success: true }
      } else {
        console.warn("❌ Registration failed:", result.error || "Unknown error")
        return { success: false, error: result.error || "Registration failed" }
      }
    } catch (error) {
      console.error("💥 Registration error:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return { success: false, error: "Request timed out. Please check your connection and try again." }
        } else if (error.message.includes("fetch") || error.message.includes("network")) {
          return { success: false, error: "Network error. Please check your internet connection and try again." }
        }
      }

      return { success: false, error: "Network error. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("actsfile_token")
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem("actsfile_token")
      if (!token) {
        return { success: false, error: "Not authenticated" }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return { success: false, error: "Server returned invalid response format" }
      }

      const result = await response.json()

      if (response.ok && result.success) {
        setUser(result.user)
        return { success: true }
      } else {
        return { success: false, error: result.error || "Update failed" }
      }
    } catch (error) {
      console.error("Profile update error:", error)
      if (error instanceof Error && error.name === "AbortError") {
        return { success: false, error: "Request timed out. Please try again." }
      }
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const verifyEmail = async (token: string) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return { success: false, error: "Server returned invalid response format" }
      }

      const result = await response.json()

      if (response.ok && result.success) {
        return { success: true }
      } else {
        return { success: false, error: result.error || "Verification failed" }
      }
    } catch (error) {
      console.error("Email verification error:", error)
      if (error instanceof Error && error.name === "AbortError") {
        return { success: false, error: "Request timed out. Please try again." }
      }
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return { success: false, error: "Server returned invalid response format" }
      }

      const result = await response.json()

      if (response.ok && result.success) {
        return { success: true }
      } else {
        return { success: false, error: result.error || "Reset failed" }
      }
    } catch (error) {
      console.error("Password reset error:", error)
      if (error instanceof Error && error.name === "AbortError") {
        return { success: false, error: "Request timed out. Please try again." }
      }
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem("actsfile_token")
      if (!token) {
        return { success: false, error: "Not authenticated" }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return { success: false, error: "Server returned invalid response format" }
      }

      const result = await response.json()

      if (response.ok && result.success) {
        return { success: true }
      } else {
        return { success: false, error: result.error || "Password change failed" }
      }
    } catch (error) {
      console.error("Password change error:", error)
      if (error instanceof Error && error.name === "AbortError") {
        return { success: false, error: "Request timed out. Please try again." }
      }
      return { success: false, error: "Network error. Please try again." }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    verifyEmail,
    resetPassword,
    changePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
