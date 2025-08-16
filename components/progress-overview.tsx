"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Target, Calendar, Trophy, Zap } from "lucide-react"

export function ProgressOverview() {
  const weeklyProgress = [
    { day: "Mon", workout: 90, nutrition: 85, sleep: 75 },
    { day: "Tue", workout: 75, nutrition: 90, sleep: 80 },
    { day: "Wed", workout: 85, nutrition: 80, sleep: 85 },
    { day: "Thu", workout: 95, nutrition: 75, sleep: 70 },
    { day: "Fri", workout: 80, nutrition: 95, sleep: 90 },
    { day: "Sat", workout: 100, nutrition: 85, sleep: 85 },
    { day: "Sun", workout: 70, nutrition: 80, sleep: 95 },
  ]

  const goals = [
    { title: "Weight Loss", current: 75, target: 80, unit: "kg", progress: 60 },
    { title: "5K Run Time", current: 22, target: 20, unit: "min", progress: 75 },
    { title: "Bench Press", current: 80, target: 100, unit: "kg", progress: 80 },
    { title: "Body Fat", current: 15, target: 12, unit: "%", progress: 70 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Progress Overview
        </CardTitle>
        <CardDescription>Track your performance across different areas</CardDescription>
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
              {[
                {
                  title: "First Workout",
                  description: "Completed your first training session",
                  icon: Zap,
                  earned: true,
                },
                { title: "Week Warrior", description: "Trained for 7 consecutive days", icon: Calendar, earned: true },
                { title: "Goal Crusher", description: "Achieved your first fitness goal", icon: Target, earned: true },
                { title: "Champion", description: "Reached advanced skill level", icon: Trophy, earned: false },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 ${achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-muted"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                  {achievement.earned && <Badge className="bg-green-500 text-white">Earned</Badge>}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
