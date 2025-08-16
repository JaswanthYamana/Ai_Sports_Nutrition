"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Target, Calendar, Trophy, Activity, Zap, Award, BarChart3 } from "lucide-react"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("overall")

  const progressData = {
    overall: {
      current: 78,
      target: 100,
      trend: "+12%",
      color: "text-blue-500",
    },
    strength: {
      current: 85,
      target: 100,
      trend: "+8%",
      color: "text-green-500",
    },
    endurance: {
      current: 72,
      target: 100,
      trend: "+15%",
      color: "text-orange-500",
    },
    flexibility: {
      current: 65,
      target: 100,
      trend: "+5%",
      color: "text-purple-500",
    },
  }

  const weeklyProgress = [
    { day: "Mon", workout: 90, nutrition: 85, sleep: 75, overall: 83 },
    { day: "Tue", workout: 75, nutrition: 90, sleep: 80, overall: 82 },
    { day: "Wed", workout: 85, nutrition: 80, sleep: 85, overall: 83 },
    { day: "Thu", workout: 95, nutrition: 75, sleep: 70, overall: 80 },
    { day: "Fri", workout: 80, nutrition: 95, sleep: 90, overall: 88 },
    { day: "Sat", workout: 100, nutrition: 85, sleep: 85, overall: 90 },
    { day: "Sun", workout: 70, nutrition: 80, sleep: 95, overall: 82 },
  ]

  const achievements = [
    {
      title: "First Workout",
      description: "Completed your first training session",
      icon: Zap,
      earned: true,
      date: "2 weeks ago",
    },
    {
      title: "Week Warrior",
      description: "Trained for 7 consecutive days",
      icon: Calendar,
      earned: true,
      date: "1 week ago",
    },
    {
      title: "Goal Crusher",
      description: "Achieved your first fitness goal",
      icon: Target,
      earned: true,
      date: "3 days ago",
    },
    {
      title: "Champion",
      description: "Reached advanced skill level",
      icon: Trophy,
      earned: false,
      date: "In progress",
    },
    {
      title: "Consistency King",
      description: "30 days of consistent training",
      icon: Award,
      earned: false,
      date: "15 days remaining",
    },
  ]

  const goals = [
    { title: "Weight Loss", current: 75, target: 80, unit: "kg", progress: 60 },
    { title: "5K Run Time", current: 22, target: 20, unit: "min", progress: 75 },
    { title: "Bench Press", current: 80, target: 100, unit: "kg", progress: 80 },
    { title: "Body Fat", current: 15, target: 12, unit: "%", progress: 70 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Track Your Journey to Excellence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Progress Tracking</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your improvements, celebrate achievements, and stay motivated on your fitness journey.
            </p>
          </div>

          {/* Time Range and Metric Selection */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall Progress</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Progress Overview */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Progress Overview
                  </CardTitle>
                  <CardDescription>Your performance across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="weekly" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="goals">Goals</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>

                    <TabsContent value="weekly" className="space-y-4">
                      <div className="space-y-4">
                        {weeklyProgress.map((day, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{day.day}</span>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Workout: {day.workout}%
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Nutrition: {day.nutrition}%
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Sleep: {day.sleep}%
                                </Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <Progress value={day.workout} className="h-2" />
                              <Progress value={day.nutrition} className="h-2" />
                              <Progress value={day.sleep} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-4">
                      {goals.map((goal, index) => (
                        <div key={index} className="space-y-2 p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{goal.title}</span>
                            <Badge variant="secondary">
                              {goal.current}
                              {goal.unit} / {goal.target}
                              {goal.unit}
                            </Badge>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{goal.progress}% complete</span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              On track
                            </span>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      <div className="grid gap-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                              achievement.earned
                                ? "bg-primary/5 border-primary/20"
                                : "bg-muted/30 border-muted"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <achievement.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold">{achievement.title}</div>
                              <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            </div>
                            <div className="text-right">
                              {achievement.earned ? (
                                <Badge className="bg-green-500 text-white">Earned</Badge>
                              ) : (
                                <Badge variant="secondary">{achievement.date}</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Progress Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Current Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${progressData[selectedMetric as keyof typeof progressData].color}`}>
                      {progressData[selectedMetric as keyof typeof progressData].current}%
                    </div>
                    <div className="text-sm text-muted-foreground">of target reached</div>
                    <Progress
                      value={progressData[selectedMetric as keyof typeof progressData].current}
                      className="mt-4"
                    />
                  </div>
                  <div className="text-center">
                    <Badge className="text-sm">
                      {progressData[selectedMetric as keyof typeof progressData].trend} this month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Workouts Completed</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Streak</span>
                    <span className="font-semibold">12 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Hours</span>
                    <span className="font-semibold">48.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calories Burned</span>
                    <span className="font-semibold">12,450</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button size="lg" className="px-8">
              <Target className="w-5 h-5 mr-2" />
              Set New Goals
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Trophy className="w-4 h-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 