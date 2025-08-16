"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Play, Users, Star, Trophy, ArrowRight, CheckCircle } from "lucide-react"

export default function DemoPage() {
  const features = [
    "Personalized workout plans",
    "Nutrition tracking with WHO guidelines",
    "Progress analytics and insights",
    "Community features and challenges",
    "Equipment recommendations",
    "Expert video tutorials",
    "Goal setting and tracking",
    "Mobile app access"
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      sport: "Tennis",
      rating: 5,
      text: "SportsPro transformed my training routine. The personalized plans and progress tracking helped me improve my game significantly."
    },
    {
      name: "Mike Chen",
      sport: "Running",
      rating: 5,
      text: "The nutrition tracking and community features are amazing. I've never been more motivated to stay active and healthy."
    },
    {
      name: "Emma Davis",
      sport: "Swimming",
      rating: 5,
      text: "As a beginner, the structured learning paths and expert guidance made all the difference. Highly recommended!"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              See SportsPro in Action
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Interactive Demo</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience the power of SportsPro with our interactive demo. See how our platform can transform your athletic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Video Demo
              </Button>
            </div>
          </div>

          {/* Demo Sections */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Demo Interface */}
            <div>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Interactive Demo</CardTitle>
                  <CardDescription>
                    Explore the key features of SportsPro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Demo Interface</h3>
                    <p className="text-muted-foreground mb-4">
                      Click through our interactive demo to see how SportsPro works
                    </p>
                    <Button className="w-full">
                      Launch Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">45K+</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">4.9★</div>
                      <div className="text-sm text-muted-foreground">User Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <div>
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Key Features</CardTitle>
                  <CardDescription>
                    Everything you need to excel in your sport
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.sport}</div>
                      </div>
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Performance?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of athletes who are already using SportsPro to reach their goals and achieve their dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold">
                    <Users className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Explore Features
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 