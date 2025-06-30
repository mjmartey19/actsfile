"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { NetworkDiagnostics } from "@/lib/network-utils"
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [networkStatus, setNetworkStatus] = useState<{
    online: boolean
    checking: boolean
    lastCheck?: Date
  }>({
    online: navigator.onLine,
    checking: false,
  })

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus((prev) => ({ ...prev, online: true }))
      if (error.includes("network") || error.includes("connection")) {
        setError("")
      }
    }

    const handleOffline = () => {
      setNetworkStatus((prev) => ({ ...prev, online: false }))
      setError("You appear to be offline. Please check your internet connection.")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [error])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const checkNetworkHealth = async () => {
    setNetworkStatus((prev) => ({ ...prev, checking: true }))

    try {
      const diagnosis = await NetworkDiagnostics.diagnoseNetworkIssue()

      if (!diagnosis.connectivity) {
        setError("Unable to connect to the internet. Please check your connection.")
      } else if (!diagnosis.apiHealth) {
        setError("Unable to reach our servers. Please try again in a moment.")
      } else {
        setError("")
        toast({
          title: "Connection OK",
          description: "Your connection to our servers is working properly.",
        })
      }

      setNetworkStatus((prev) => ({
        ...prev,
        online: diagnosis.connectivity,
        lastCheck: new Date(),
        checking: false,
      }))
    } catch (error) {
      setNetworkStatus((prev) => ({ ...prev, checking: false }))
      setError("Unable to perform network diagnostics.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if offline
    if (!networkStatus.online) {
      setError("You appear to be offline. Please check your internet connection.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Pre-flight network check for critical errors
      const isConnected = await NetworkDiagnostics.checkConnectivity()
      if (!isConnected) {
        setError("Unable to connect to our servers. Please check your internet connection and try again.")
        return
      }

      const result = await login(formData.email, formData.password)

      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
        router.push("/home")
      } else {
        setError(result.error || "Login failed")

        // If it's a network error, suggest network diagnostics
        if (result.error?.includes("network") || result.error?.includes("connection")) {
          setTimeout(() => {
            setError((prev) => prev + " Click 'Check Connection' to diagnose the issue.")
          }, 1000)
        }
      }
    } catch (error) {
      console.error("Login submission error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Implement social login
    console.log(`Login with ${provider}`)
    toast({
      title: "Coming Soon",
      description: `${provider} login will be available soon!`,
    })
  }

  const isNetworkError = error.includes("network") || error.includes("connection") || error.includes("server")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Network Status Indicator */}
        {!networkStatus.online && (
          <Alert className="mb-4 border-orange-200 bg-orange-50">
            <WifiOff className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You appear to be offline. Please check your internet connection.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your ActsFile account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  {isNetworkError && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={checkNetworkHealth}
                      disabled={networkStatus.checking}
                      className="ml-2"
                    >
                      {networkStatus.checking ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading || !networkStatus.online}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={isLoading || !networkStatus.online}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {networkStatus.online ? (
                    <Wifi className="h-3 w-3 text-green-500" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-red-500" />
                  )}
                  <span className="text-xs">{networkStatus.online ? "Online" : "Offline"}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !networkStatus.online}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading || !networkStatus.online}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading || !networkStatus.online}
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>


        {/* Network Status Footer */}
        {networkStatus.lastCheck && (
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Last connection check: {networkStatus.lastCheck.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}
