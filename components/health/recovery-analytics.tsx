"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, AlertTriangle, CheckCircle, Heart, Moon, Droplets, Activity } from "lucide-react"

export function RecoveryAnalytics() {
  const recoveryData = {
    overallScore: 78,
    status: "Good",
    trend: "improving",
    factors: {
      sleep: { score: 85, status: "Excellent", impact: "high" },
      hrv: { score: 72, status: "Good", impact: "high" },
      hydration: { score: 65, status: "Fair", impact: "medium" },
      workoutLoad: { score: 80, status: "Good", impact: "high" },
      stress: { score: 70, status: "Fair", impact: "medium" },
      nutrition: { score: 88, status: "Excellent", impact: "medium" },
    },
    recommendations: [
      {
        title: "Increase Hydration",
        description: "Your hydration levels are below optimal. Aim for 3L of water today.",
        priority: "high",
        action: "Drink 500ml now",
      },
      {
        title: "Reduce Training Intensity",
        description: "Consider a lighter workout today to allow for better recovery.",
        priority: "medium",
        action: "Plan active recovery",
      },
      {
        title: "Stress Management",
        description: "Your stress levels are elevated. Try 10 minutes of meditation.",
        priority: "medium",
        action: "Start meditation",
      },
    ],
    weeklyTrend: [
      { day: "Mon", score: 82 },
      { day: "Tue", score: 75 },
      { day: "Wed", score: 68 },
      { day: "Thu", score: 72 },
      { day: "Fri", score: 78 },
      { day: "Sat", score: 85 },
      { day: "Sun", score: 78 },
    ],
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Fair":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "Poor":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const factorIcons = {
    sleep: Moon,
    hrv: Heart,
    hydration: Droplets,
    workoutLoad: Activity,
    stress: AlertTriangle,
    nutrition: CheckCircle,
  }

  return (
    <div className="space-y-8">
      {/* Recovery Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Recovery Score
          </CardTitle>
          <CardDescription>Your overall readiness for training</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(recoveryData.overallScore)}`}>
                {recoveryData.overallScore}
              </div>
              <div className="text-sm text-muted-foreground">Recovery Score</div>
            </div>
            <div className="text-center">
              <Badge className={getStatusColor(recoveryData.status)}>{recoveryData.status}</Badge>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="capitalize">{recoveryData.trend}</span>
              </div>
            </div>
          </div>

          <Progress value={recoveryData.overallScore} className="h-4 mb-4" />

          <div className="text-center text-sm text-muted-foreground">
            {recoveryData.overallScore >= 80
              ? "Excellent recovery! You're ready for intense training."
              : recoveryData.overallScore >= 60
                ? "Good recovery. Moderate training recommended."
                : "Poor recovery. Consider rest or light activity."}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Factors</CardTitle>
          <CardDescription>Breakdown of factors affecting your recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(recoveryData.factors).map(([key, factor]) => {
              const IconComponent = factorIcons[key as keyof typeof factorIcons]
              return (
                <div key={key} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    </div>
                    <Badge
                      variant={
                        factor.impact === "high" ? "destructive" : factor.impact === "medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {factor.impact}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-lg font-bold ${getScoreColor(factor.score)}`}>{factor.score}</span>
                      <Badge className={getStatusColor(factor.status)} variant="outline">
                        {factor.status}
                      </Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Weekly Recovery Trend
          </CardTitle>
          <CardDescription>Your recovery scores over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryData.weeklyTrend.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1">
                  <Progress value={day.score} className="h-3" />
                </div>
                <div className={`w-12 text-sm font-bold ${getScoreColor(day.score)}`}>{day.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Recovery Recommendations
          </CardTitle>
          <CardDescription>Personalized actions to improve your recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryData.recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === "high"
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                    : "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium">{rec.title}</div>
                  <Badge variant={rec.priority === "high" ? "destructive" : "default"} className="capitalize">
                    {rec.priority}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">{rec.description}</div>
                <Button size="sm" variant="outline">
                  {rec.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
