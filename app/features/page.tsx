"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  BookOpen, Apple, Heart, ShoppingBag, Calendar, Users, 
  Target, TrendingUp, Zap, Award, Play, Star, 
  BarChart3, MessageCircle, MapPin, Trophy, Activity,
  CheckCircle, ArrowRight
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      category: "Learning & Development",
      items: [
        {
          title: "Sports Learning Hub",
          description: "Master techniques with expert guidance and structured learning paths",
          icon: BookOpen,
          color: "text-blue-500",
          href: "/learn",
          highlights: ["45+ sports covered", "Expert instructors", "Progress tracking", "Video tutorials"]
        },
        {
          title: "Skill Assessment",
          description: "Evaluate your current level and get personalized improvement plans",
          icon: Target,
          color: "text-green-500",
          href: "/learn",
          highlights: ["Skill evaluation", "Personalized plans", "Regular assessments", "Improvement tracking"]
        }
      ]
    },
    {
      category: "Health & Nutrition",
      items: [
        {
          title: "Nutrition Tracking",
          description: "WHO-compliant diet plans tailored to your sport and goals",
          icon: Apple,
          color: "text-green-500",
          href: "/nutrition",
          highlights: ["WHO guidelines", "Sport-specific plans", "Meal tracking", "Recipe library"]
        },
        {
          title: "Health Monitoring",
          description: "Track vitals, sleep, and recovery for optimal performance",
          icon: Heart,
          color: "text-red-500",
          href: "/health",
          highlights: ["Vital tracking", "Sleep monitoring", "Recovery analytics", "Health alerts"]
        }
      ]
    },
    {
      category: "Equipment & Gear",
      items: [
        {
          title: "Equipment Guide",
          description: "Get recommendations for gear that fits your budget and needs",
          icon: ShoppingBag,
          color: "text-purple-500",
          href: "/equipment",
          highlights: ["Personalized recommendations", "Price comparisons", "Expert reviews", "Maintenance guides"]
        }
      ]
    },
    {
      category: "Community & Events",
      items: [
        {
          title: "Events & Opportunities",
          description: "Discover competitions, scholarships, and community events",
          icon: Calendar,
          color: "text-orange-500",
          href: "/events",
          highlights: ["Local events", "Competitions", "Scholarships", "Training camps"]
        },
        {
          title: "Global Community",
          description: "Connect with athletes worldwide and share your journey",
          icon: Users,
          color: "text-cyan-500",
          href: "/community",
          highlights: ["45K+ members", "Local clubs", "Group challenges", "Achievement sharing"]
        }
      ]
    },
    {
      category: "Progress & Analytics",
      items: [
        {
          title: "Progress Tracking",
          description: "Monitor your improvements and celebrate achievements",
          icon: TrendingUp,
          color: "text-blue-500",
          href: "/progress",
          highlights: ["Detailed analytics", "Goal tracking", "Achievement system", "Progress reports"]
        },
        {
          title: "Workout Management",
          description: "Plan, track, and optimize your training sessions",
          icon: Activity,
          color: "text-green-500",
          href: "/workout",
          highlights: ["Custom workouts", "Exercise library", "Timer & tracking", "Performance metrics"]
        }
      ]
    }
  ]

  const stats = [
    { label: "Active Users", value: "45,892", icon: Users },
    { label: "Sports Covered", value: "25+", icon: BookOpen },
    { label: "Expert Instructors", value: "150+", icon: Star },
    { label: "Success Stories", value: "12,456", icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Discover What Makes SportsPro Special
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Platform Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Everything you need to excel in your sport. From learning and training to nutrition and community, 
              we've got you covered with comprehensive tools and expert guidance.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-16">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-3xl font-bold mb-8 text-center">{category.category}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {category.items.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                              <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            {feature.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                          <Link href={feature.href}>
                            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              Explore Feature
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of athletes who are already using SportsPro to reach their goals and transform their performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold">
                      <Users className="w-5 h-5 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-6 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      View Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 