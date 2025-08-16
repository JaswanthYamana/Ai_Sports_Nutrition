"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, BookOpen, Apple, Heart, ShoppingBag, Calendar, Zap, User } from "lucide-react"
import { useTheme } from "next-themes"
import { Navigation } from "@/components/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { QuickActions } from "@/components/quick-actions"
import { ProgressOverview } from "@/components/progress-overview"
import { RecentActivity } from "@/components/recent-activity"
import { InteractiveElements } from "@/components/interactive-elements"

import { useAuth } from "@/contexts/AuthContext"

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse-glow" />
        <div className="relative max-w-7xl mx-auto">
          <div className={`text-center space-y-6 ${isVisible ? "slide-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium float-animation">
              <Zap className="w-4 h-4" />
              Your Personalized Performance Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Master Your Game,
              <br />
              Fuel Your Success
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Track your progress, optimize your nutrition, and connect with a global community of athletes. Everything
              you need to reach your peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/onboarding">
                <Button size="lg" className="px-8 py-6 text-lg font-semibold btn-gradient text-white hover-scale">
                  <Trophy className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg hover-scale bg-transparent">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 ${isVisible ? "slide-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Performance Dashboard</h2>
            <p className="text-lg text-muted-foreground">Real-time insights into your athletic journey</p>
          </div>

          <DashboardStats />

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <ProgressOverview />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Features</h2>
            <p className="text-lg text-muted-foreground">Experience our advanced interactive elements</p>
          </div>
          <InteractiveElements />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Actions</h2>
            <p className="text-lg text-muted-foreground">Get started with essential features</p>
          </div>
          <QuickActions />
        </div>
      </section>

      {/* Call to Action - Only show when user is NOT logged in */}
      {!user && (
        <section className="px-6 py-16 bg-gradient-to-r from-primary via-accent to-primary">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Performance?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of athletes who are already using SportsPro to reach their goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold hover-scale">
                  <User className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent hover-scale"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Overview */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SportsPro?</h2>
            <p className="text-lg text-muted-foreground">Comprehensive tools for every aspect of your athletic journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Train</h3>
                <p className="text-muted-foreground">Access expert tutorials and training programs</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nutrition Tracking</h3>
                <p className="text-muted-foreground">Monitor your diet and optimize performance</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
                <p className="text-muted-foreground">Track vital signs and overall wellness</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">Connect with fellow athletes worldwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
