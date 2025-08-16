"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login, user } = useAuth()
  const router = useRouter()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      toast.success("You are already logged in!")
      router.push("/")
    }
  }, [user, router])

  // If user is logged in, don't render the form
  if (user) {
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success("Login successful! Welcome back!")
      router.push("/")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to continue your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit"
                  className="w-full" 
                  size="lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 