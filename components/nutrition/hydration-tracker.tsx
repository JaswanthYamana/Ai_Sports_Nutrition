"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Plus, Minus, Target, TrendingUp, Clock } from "lucide-react"

interface HydrationTrackerProps {
  selectedDate: Date
}

const hydrationGoal = 2500 // ml
const currentIntake = 1800 // ml

const hydrationLog = [
  { time: "07:00", amount: 250, type: "water" },
  { time: "09:30", amount: 300, type: "water" },
  { time: "11:15", amount: 200, type: "sports drink" },
  { time: "13:00", amount: 350, type: "water" },
  { time: "15:30", amount: 400, type: "water" },
  { time: "17:45", amount: 300, type: "water" }
]

const quickAmounts = [125, 250, 350, 500]

export function HydrationTracker({ selectedDate }: HydrationTrackerProps) {
  const [todayIntake, setTodayIntake] = useState(currentIntake)
  
  const progressPercentage = Math.min((todayIntake / hydrationGoal) * 100, 100)
  const remainingIntake = Math.max(hydrationGoal - todayIntake, 0)

  const addIntake = (amount: number) => {
    setTodayIntake(prev => prev + amount)
  }

  const removeIntake = (amount: number) => {
    setTodayIntake(prev => Math.max(prev - amount, 0))
  }

  return (
    <div className="space-y-8">
      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Daily Hydration Goal
          </CardTitle>
          <CardDescription>
            Track your water intake and stay optimally hydrated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress Circle Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progressPercentage * 2.83} 283`}
                    className="text-blue-500 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {todayIntake}ml / {hydrationGoal}ml
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{todayIntake}ml</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{remainingIntake}ml</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-muted-foreground">Glasses</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge variant={
                progressPercentage >= 100 ? "default" :
                progressPercentage >= 75 ? "secondary" :
                progressPercentage >= 50 ? "outline" : "destructive"
              } className="px-4 py-2">
                {progressPercentage >= 100 ? "Goal Achieved! 🎉" :
                 progressPercentage >= 75 ? "Almost There!" :
                 progressPercentage >= 50 ? "Good Progress" : "Need More Water"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add */}
      <Card>
        <CardHeader>
          <CardTitle>Log Water Intake</CardTitle>
          <CardDescription>
            Quick add common serving sizes or custom amounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => addIntake(amount)}
                  className="h-16 flex flex-col gap-1"
                >
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm">{amount}ml</span>
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeIntake(50)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-lg font-medium">Custom Amount</div>
                <div className="text-sm text-muted-foreground">Adjust as needed</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addIntake(50)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Hydration Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hydrationLog.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{entry.amount}ml</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {entry.type}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hydration Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Smart Hydration Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Pre-Workout Hydration
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Drink 400-600ml of water 2-3 hours before exercise for optimal performance.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                During Exercise
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Aim for 150-250ml every 15-20 minutes during intense training sessions.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                Recovery Hydration
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Replace 150% of fluid lost through sweat within 6 hours post-exercise.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
