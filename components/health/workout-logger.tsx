"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Clock, Zap, Target, Plus, Play, Pause, Square } from "lucide-react"

interface WorkoutLoggerProps {
  selectedDate: Date
}

export function WorkoutLogger({ selectedDate }: WorkoutLoggerProps) {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [workoutTimer, setWorkoutTimer] = useState(0)
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("")

  const workoutTypes = [
    { id: "cardio", name: "Cardio", icon: Activity, color: "bg-red-500" },
    { id: "strength", name: "Strength Training", icon: Zap, color: "bg-blue-500" },
    { id: "flexibility", name: "Flexibility", icon: Target, color: "bg-green-500" },
    { id: "sports", name: "Sports Practice", icon: Play, color: "bg-purple-500" },
    { id: "recovery", name: "Recovery", icon: Clock, color: "bg-orange-500" },
  ]

  const todaysWorkouts = [
    {
      id: 1,
      type: "Strength Training",
      duration: 45,
      intensity: "High",
      calories: 320,
      exercises: ["Squats", "Bench Press", "Deadlifts"],
      time: "7:00 AM",
      completed: true,
    },
    {
      id: 2,
      type: "Cardio",
      duration: 30,
      intensity: "Medium",
      calories: 280,
      exercises: ["Running"],
      time: "6:00 PM",
      completed: false,
      planned: true,
    },
  ]

  const exerciseTemplates = {
    strength: [
      { name: "Squats", sets: 3, reps: 12, weight: "70kg" },
      { name: "Bench Press", sets: 3, reps: 10, weight: "60kg" },
      { name: "Deadlifts", sets: 3, reps: 8, weight: "80kg" },
      { name: "Pull-ups", sets: 3, reps: 8, weight: "Bodyweight" },
    ],
    cardio: [
      { name: "Running", duration: "30 min", intensity: "Medium", distance: "5km" },
      { name: "Cycling", duration: "45 min", intensity: "Low", distance: "15km" },
      { name: "Swimming", duration: "30 min", intensity: "High", distance: "1km" },
    ],
  }

  return (
    <div className="space-y-8">
      {/* Active Workout Timer */}
      {isWorkoutActive && (
        <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Play className="w-5 h-5" />
              Workout in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {Math.floor(workoutTimer / 60)}:{(workoutTimer % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setIsWorkoutActive(false)}>
                  <Square className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Start Workout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Start New Workout
          </CardTitle>
          <CardDescription>Begin tracking your training session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workoutTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedWorkoutType === type.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedWorkoutType(type.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-lg ${type.color} flex items-center justify-center mb-3`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-medium text-sm">{type.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedWorkoutType && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Workout Name</Label>
                  <Input placeholder="e.g., Morning Strength Session" />
                </div>
                <div className="space-y-2">
                  <Label>Intensity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsWorkoutActive(true)}>
                <Play className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Today's Workouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Today's Workouts
          </CardTitle>
          <CardDescription>Your scheduled and completed training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysWorkouts.map((workout) => (
              <div
                key={workout.id}
                className={`p-4 rounded-lg border-2 ${
                  workout.completed
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : workout.planned
                      ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                      : "bg-muted/50 border-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{workout.type}</div>
                    <div className="text-sm text-muted-foreground">{workout.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        workout.intensity === "High"
                          ? "destructive"
                          : workout.intensity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {workout.intensity}
                    </Badge>
                    {workout.completed && <Badge className="bg-green-500 text-white">Completed</Badge>}
                    {workout.planned && <Badge variant="outline">Planned</Badge>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="font-semibold">{workout.duration} min</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{workout.calories} kcal</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{workout.exercises.length}</div>
                    <div className="text-xs text-muted-foreground">Exercises</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {workout.exercises.map((exercise, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {exercise}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {workout.completed ? (
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  ) : (
                    <>
                      <Button size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Exercise Templates
          </CardTitle>
          <CardDescription>Pre-built workout routines for quick logging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Strength Training</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {exerciseTemplates.strength.map((exercise, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                    <div className="font-medium text-sm">{exercise.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Cardio</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {exerciseTemplates.cardio.map((exercise, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                    <div className="font-medium text-sm">{exercise.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {exercise.duration} • {exercise.intensity} intensity • {exercise.distance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
