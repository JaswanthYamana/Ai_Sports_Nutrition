"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Beef, Wheat, Apple, Droplets, AlertTriangle, CheckCircle, Plus } from "lucide-react"

interface NutritionDashboardProps {
  selectedDate: Date
}

export function NutritionDashboard({ selectedDate }: NutritionDashboardProps) {
  // Mock data - in real app this would come from API
  const dailyGoals = {
    calories: { current: 1850, target: 2400, unit: "kcal" },
    protein: { current: 85, target: 120, unit: "g" },
    carbs: { current: 220, target: 300, unit: "g" },
    fat: { current: 65, target: 80, unit: "g" },
    fiber: { current: 18, target: 25, unit: "g" },
    water: { current: 1.8, target: 3.0, unit: "L" },
  }

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage < 50) return "bg-red-500"
    if (percentage < 80) return "bg-orange-500"
    if (percentage < 100) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStatusIcon = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 90 && percentage <= 110) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    return <AlertTriangle className="w-4 h-4 text-orange-500" />
  }

  const macros = [
    {
      name: "Calories",
      icon: Flame,
      data: dailyGoals.calories,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
    {
      name: "Protein",
      icon: Beef,
      data: dailyGoals.protein,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      name: "Carbs",
      icon: Wheat,
      data: dailyGoals.carbs,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      name: "Fat",
      icon: Apple,
      data: dailyGoals.fat,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
  ]

  const micronutrients = [
    { name: "Fiber", data: dailyGoals.fiber, color: "text-purple-500" },
    { name: "Water", data: dailyGoals.water, color: "text-cyan-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Date and Quick Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's Nutrition</CardTitle>
              <CardDescription>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Log Food
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Macronutrients */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {macros.map((macro) => {
          const percentage = (macro.data.current / macro.data.target) * 100
          return (
            <Card key={macro.name} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${macro.bgColor} flex items-center justify-center`}>
                    <macro.icon className={`w-5 h-5 ${macro.color}`} />
                  </div>
                  {getStatusIcon(macro.data.current, macro.data.target)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{macro.name}</span>
                      <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {macro.data.current}
                      <span className="text-sm text-muted-foreground ml-1">{macro.data.unit}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {macro.data.target}
                      {macro.data.unit}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {macro.data.target - macro.data.current > 0
                      ? `${macro.data.target - macro.data.current}${macro.data.unit} remaining`
                      : `${macro.data.current - macro.data.target}${macro.data.unit} over target`}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Micronutrients and Hydration */}
      <div className="grid sm:grid-cols-2 gap-6">
        {micronutrients.map((nutrient) => {
          const percentage = (nutrient.data.current / nutrient.data.target) * 100
          return (
            <Card key={nutrient.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className={`w-5 h-5 ${nutrient.color}`} />
                  {nutrient.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {nutrient.data.current}
                      {nutrient.data.unit}
                    </span>
                    <Badge variant={percentage >= 90 ? "default" : "secondary"}>{Math.round(percentage)}%</Badge>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    Target: {nutrient.data.target}
                    {nutrient.data.unit}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Meal Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
          <CardDescription>Your logged meals and snacks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { meal: "Breakfast", calories: 450, time: "8:30 AM", items: "Oatmeal with berries, Greek yogurt" },
              { meal: "Lunch", calories: 650, time: "1:15 PM", items: "Grilled chicken salad, quinoa" },
              { meal: "Snack", calories: 200, time: "4:00 PM", items: "Apple with almond butter" },
              { meal: "Dinner", calories: 550, time: "7:30 PM", items: "Salmon, sweet potato, broccoli" },
            ].map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium">{meal.meal}</div>
                  <div className="text-sm text-muted-foreground">{meal.items}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{meal.calories} kcal</div>
                  <div className="text-sm text-muted-foreground">{meal.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
