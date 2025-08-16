"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Utensils, Activity, Plus, Edit } from "lucide-react"

export function WeeklySchedule() {
  const weeklySchedule = {
    monday: {
      meals: [
        { time: "7:00 AM", type: "Breakfast", name: "Protein Smoothie Bowl", calories: 420 },
        { time: "12:30 PM", type: "Lunch", name: "Quinoa Power Salad", calories: 380 },
        { time: "7:00 PM", type: "Dinner", name: "Grilled Salmon & Vegetables", calories: 520 },
      ],
      workouts: [
        { time: "6:00 AM", type: "Strength Training", duration: 45, intensity: "High" },
        { time: "8:00 PM", type: "Yoga", duration: 30, intensity: "Low" },
      ],
      sleep: { bedtime: "10:30 PM", wakeTime: "6:00 AM", target: 7.5 },
      hydration: { target: 3.0, reminders: ["9:00 AM", "1:00 PM", "5:00 PM"] },
    },
    tuesday: {
      meals: [
        { time: "7:30 AM", type: "Breakfast", name: "Avocado Toast & Eggs", calories: 380 },
        { time: "1:00 PM", type: "Lunch", name: "Mediterranean Wrap", calories: 450 },
        { time: "7:30 PM", type: "Dinner", name: "Lean Beef Stir-fry", calories: 520 },
      ],
      workouts: [{ time: "6:30 PM", type: "Cardio", duration: 30, intensity: "Medium" }],
      sleep: { bedtime: "10:30 PM", wakeTime: "6:00 AM", target: 7.5 },
      hydration: { target: 3.0, reminders: ["9:00 AM", "1:00 PM", "5:00 PM"] },
    },
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Schedule Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Your personalized training, nutrition, and recovery plan</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Edit className="w-4 h-4" />
                Edit Schedule
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Schedules */}
      <div className="space-y-6">
        {days.slice(0, 2).map((day) => {
          const dayKey = day.toLowerCase() as keyof typeof weeklySchedule
          const daySchedule = weeklySchedule[dayKey]

          if (!daySchedule) {
            return (
              <Card key={day}>
                <CardHeader>
                  <CardTitle>{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No schedule planned for {day}</p>
                    <Button className="mt-4 bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{day}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Utensils className="w-3 h-3" />
                      {daySchedule.meals.length} meals
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {daySchedule.workouts.length} workouts
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Meals */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      Meals
                    </h4>
                    <div className="space-y-3">
                      {daySchedule.meals.map((meal, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{meal.time}</span>
                            <Badge variant="secondary" className="text-xs">
                              {meal.calories} cal
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{meal.type}</p>
                          <p className="text-sm font-medium">{meal.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Workouts */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Workouts
                    </h4>
                    <div className="space-y-3">
                      {daySchedule.workouts.map((workout, index) => (
                        <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{workout.time}</span>
                            <Badge className={`text-xs ${getIntensityColor(workout.intensity)}`}>
                              {workout.intensity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{workout.type}</p>
                          <p className="text-xs text-muted-foreground">{workout.duration} minutes</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recovery & Wellness */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Recovery & Wellness</h4>
                    <div className="space-y-3">
                      {/* Sleep */}
                      <div className="p-3 rounded-lg bg-muted/50 border">
                        <p className="font-medium text-sm mb-1">Sleep Schedule</p>
                        <p className="text-xs text-muted-foreground">
                          {daySchedule.sleep.bedtime} - {daySchedule.sleep.wakeTime}
                        </p>
                        <p className="text-xs text-muted-foreground">Target: {daySchedule.sleep.target}h</p>
                      </div>

                      {/* Hydration */}
                      <div className="p-3 rounded-lg bg-muted/50 border">
                        <p className="font-medium text-sm mb-1">Hydration</p>
                        <p className="text-xs text-muted-foreground">Target: {daySchedule.hydration.target}L</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {daySchedule.hydration.reminders.map((time, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
