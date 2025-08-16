"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, Award, Activity, Timer, Droplets, Heart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { healthAPI, nutritionAPI, workoutAPI } from "@/lib/api"

export function DashboardStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0])
  const [stats, setStats] = useState([
    {
      title: "Weekly Goal",
      value: "0%",
      progress: 0,
      icon: Target,
      trend: "0%",
      color: "text-green-500",
    },
    {
      title: "Training Streak",
      value: "0 days",
      progress: 0,
      icon: Zap,
      trend: "0 days",
      color: "text-blue-500",
    },
    {
      title: "Skill Level",
      value: "Beginner",
      progress: 0,
      icon: Award,
      trend: "Getting Started",
      color: "text-purple-500",
    },
    {
      title: "Calories Today",
      value: "0",
      progress: 0,
      icon: Activity,
      trend: "Target: 0",
      color: "text-orange-500",
    },
  ])
  const [vitals, setVitals] = useState([
    { label: "Heart Rate", value: "0 bpm", icon: Heart, color: "text-red-500" },
    { label: "Sleep", value: "0h", icon: Timer, color: "text-indigo-500" },
    { label: "Hydration", value: "0L", icon: Droplets, color: "text-cyan-500" },
    { label: "Recovery", value: "Good", icon: TrendingUp, color: "text-green-500" },
  ])

  const { user } = useAuth()

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return

      try {
        // Fetch health dashboard data
        const healthResponse = await healthAPI.getDashboard(user.id)
        const healthData = healthResponse.data.dashboardData

        // Fetch nutrition daily summary
        const nutritionResponse = await nutritionAPI.getDailySummary(user.id)
        const nutritionData = nutritionResponse.data.summary

        // Fetch workout stats
        const workoutResponse = await workoutAPI.getWorkoutStats(user.id, 7)
        const workoutData = workoutResponse.data.stats

        // Update stats with real data
        const updatedStats = [
          {
            title: "Weekly Goal",
            value: `${Math.round((workoutData.totalWorkouts / 5) * 100)}%`,
            progress: Math.min((workoutData.totalWorkouts / 5) * 100, 100),
            icon: Target,
            trend: workoutData.totalWorkouts > 0 ? `+${workoutData.totalWorkouts} workouts` : "No workouts",
            color: "text-green-500",
          },
          {
            title: "Training Streak",
            value: `${user.stats?.currentStreak || 0} days`,
            progress: Math.min(((user.stats?.currentStreak || 0) / 30) * 100, 100),
            icon: Zap,
            trend: user.stats?.currentStreak > 0 ? `+${user.stats.currentStreak} days` : "Start your streak",
            color: "text-blue-500",
          },
          {
            title: "Skill Level",
            value: user.experience || "Beginner",
            progress: user.experience === "Beginner" ? 25 : user.experience === "Intermediate" ? 50 : user.experience === "Advanced" ? 75 : 100,
            icon: Award,
            trend: "Keep improving",
            color: "text-purple-500",
          },
          {
            title: "Calories Today",
            value: nutritionData.totals?.calories?.toString() || "0",
            progress: Math.min((nutritionData.totals?.calories / (nutritionData.goals?.calories || 2000)) * 100, 100),
            icon: Activity,
            trend: `Target: ${nutritionData.goals?.calories || 2000}`,
            color: "text-orange-500",
          },
        ]

        // Update vitals with real data
        const updatedVitals = [
          { 
            label: "Heart Rate", 
            value: `${healthData.latest?.heartRate?.value || 0} bpm`, 
            icon: Heart, 
            color: "text-red-500" 
          },
          { 
            label: "Sleep", 
            value: `${healthData.latest?.sleep?.duration || 0}h`, 
            icon: Timer, 
            color: "text-indigo-500" 
          },
          { 
            label: "Hydration", 
            value: `${nutritionData.waterIntake || 0}L`, 
            icon: Droplets, 
            color: "text-cyan-500" 
          },
          { 
            label: "Recovery", 
            value: healthData.latest?.sleep?.quality === "excellent" ? "Excellent" : 
                   healthData.latest?.sleep?.quality === "good" ? "Good" : 
                   healthData.latest?.sleep?.quality === "fair" ? "Fair" : "Poor", 
            icon: TrendingUp, 
            color: "text-green-500" 
          },
        ]

        setStats(updatedStats)
        setVitals(updatedVitals)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [user])

  useEffect(() => {
    setIsVisible(true)

    // Animate progress values
    stats.forEach((stat, index) => {
      let current = 0
      const target = stat.progress
      const increment = target / 50

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }

        setAnimatedValues((prev) => {
          const newValues = [...prev]
          newValues[index] = Math.round(current)
          return newValues
        })
      }, 20)
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`group hover-lift stagger-animation hover-glow ${isVisible ? "scale-in" : "opacity-0"}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-glow`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 micro-bounce">{stat.value}</div>
              <Progress value={animatedValues[index]} className="mb-2 progress-fill" />
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs hover-scale">
                  {stat.trend}
                </Badge>
                <span className="text-xs text-muted-foreground">{animatedValues[index]}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vitals */}
      <Card className={`hover-lift ${isVisible ? "slide-in-up" : "opacity-0"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 float-animation" />
            Today's Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitals.map((vital, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 hover-scale interactive-card"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center pulse-glow`}
                >
                  <vital.icon className={`w-5 h-5 ${vital.color}`} />
                </div>
                <div>
                  <div className="font-semibold">{vital.value}</div>
                  <div className="text-sm text-muted-foreground">{vital.label}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
