"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { authAPI } from "@/lib/api"
import { toast } from "react-toastify"


export default function SignupPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required")
      return false
    }
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address")
      return false
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return false
    }
    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      })

      if (response.data.success) {
        toast.success("Account created successfully! Please check your email for verification.")
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else if (error.response?.status === 409) {
        toast.error("An account with this email already exists. Please try logging in instead.")
      } else if (error.response?.status === 400) {
        toast.error("Please check your input and try again.")
      } else if (error.code === "NETWORK_ERROR") {
        toast.error("Network error. Please check your connection and try again.")
      } else {
        toast.error("Something went wrong. Please try again later.")
      }
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
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription>
                Join thousands of athletes on their fitness journey
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
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
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isLoading}
                        required
                        minLength={6}
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
                  <div>
                    <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 