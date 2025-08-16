"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Target, Award, ChevronRight } from "lucide-react"

export function InteractiveElements() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const interactiveCards = [
    {
      icon: Zap,
      title: "Quick Workouts",
      description: "15-minute high-intensity sessions",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time performance analytics",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Personalized achievement targets",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Unlock badges and rewards",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Animated Progress Demo */}
      <Card className={`hover-lift ${isVisible ? "slide-in-up" : "opacity-0"}`}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Daily Goal Progress</h3>
              <Badge className="pulse-glow">{progress}%</Badge>
            </div>
            <Progress value={progress} className="h-3 progress-fill" />
            <p className="text-sm text-muted-foreground">Keep going! You're making great progress today.</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {interactiveCards.map((card, index) => (
          <Card
            key={index}
            className={`interactive-card stagger-animation hover-glow cursor-pointer ${
              activeCard === index ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActiveCard(activeCard === index ? null : index)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
              <Button variant="ghost" size="sm" className="micro-bounce hover-scale">
                Explore
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Elements */}
      <div className="relative">
        <Card className="gradient-border">
          <CardContent className="p-8 text-center">
            <div className="float-animation inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">Join thousands of athletes on their fitness journey</p>
            <Button className="btn-gradient text-white">Start Your Journey</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
