"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Square, Timer, Target, Zap, Activity, Dumbbell, Heart, TrendingUp } from "lucide-react"

export default function WorkoutPage() {
  const [workoutType, setWorkoutType] = useState("strength")
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [workoutTime, setWorkoutTime] = useState(0)

  const workoutTypes = [
    { id: "strength", name: "Strength Training", icon: Dumbbell, color: "text-blue-500" },
    { id: "cardio", name: "Cardio", icon: Heart, color: "text-red-500" },
    { id: "hiit", name: "HIIT", icon: Zap, color: "text-orange-500" },
    { id: "flexibility", name: "Flexibility", icon: Activity, color: "text-green-500" },
  ]

  const currentWorkout = {
    name: "Upper Body Strength",
    duration: 45,
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12, weight: 0, completed: false },
      { name: "Pull-ups", sets: 3, reps: 8, weight: 0, completed: false },
      { name: "Bench Press", sets: 4, reps: 10, weight: 80, completed: false },
      { name: "Overhead Press", sets: 3, reps: 12, weight: 50, completed: false },
      { name: "Bicep Curls", sets: 3, reps: 15, weight: 20, completed: false },
    ],
    calories: 320,
    difficulty: "Intermediate",
  }

  const recentWorkouts = [
    { name: "Lower Body Power", date: "Yesterday", duration: 50, calories: 380, type: "Strength" },
    { name: "Cardio Blast", date: "2 days ago", duration: 30, calories: 450, type: "HIIT" },
    { name: "Core Focus", date: "3 days ago", duration: 25, calories: 200, type: "Strength" },
    { name: "Yoga Flow", date: "4 days ago", duration: 60, calories: 150, type: "Flexibility" },
  ]

  const workoutStats = {
    thisWeek: 4,
    totalTime: 180,
    caloriesBurned: 1250,
    streak: 12,
  }

  const startWorkout = () => {
    setIsWorkoutActive(true)
    // Start timer logic would go here
  }

  const pauseWorkout = () => {
    setIsWorkoutActive(false)
    // Pause timer logic would go here
  }

  const completeWorkout = () => {
    setIsWorkoutActive(false)
    setCurrentExercise(0)
    setWorkoutTime(0)
    // Complete workout logic would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              Ready to Crush Your Goals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Workout Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your training session, track your progress, and push your limits with personalized workouts.
            </p>
          </div>

          {/* Workout Type Selection */}
          <div className="mb-8">
            <Select value={workoutType} onValueChange={setWorkoutType}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Select Workout Type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      <type.icon className={`w-4 h-4 ${type.color}`} />
                      {type.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Workout */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    {currentWorkout.name}
                  </CardTitle>
                  <CardDescription>
                    {currentWorkout.duration} minutes • {currentWorkout.calories} calories • {currentWorkout.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Workout Controls */}
                    <div className="flex justify-center gap-4">
                      {!isWorkoutActive ? (
                        <Button size="lg" onClick={startWorkout} className="px-8">
                          <Play className="w-5 h-5 mr-2" />
                          Start Workout
                        </Button>
                      ) : (
                        <>
                          <Button size="lg" variant="outline" onClick={pauseWorkout}>
                            <Pause className="w-5 h-5 mr-2" />
                            Pause
                          </Button>
                          <Button size="lg" variant="destructive" onClick={completeWorkout}>
                            <Square className="w-5 h-5 mr-2" />
                            End Workout
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Timer Display */}
                    {isWorkoutActive && (
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          <Timer className="w-6 h-6 inline mr-2" />
                          {Math.floor(workoutTime / 60)}:{(workoutTime % 60).toString().padStart(2, '0')}
                        </div>
                        <Progress value={(workoutTime / (currentWorkout.duration * 60)) * 100} className="h-2" />
                      </div>
                    )}

                    {/* Exercise List */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Exercises</h3>
                      {currentWorkout.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            index === currentExercise && isWorkoutActive
                              ? "border-primary bg-primary/5"
                              : exercise.completed
                                ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                                : "border-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {exercise.sets} sets × {exercise.reps} reps
                                {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {exercise.completed && <Badge className="bg-green-500">Completed</Badge>}
                              {index === currentExercise && isWorkoutActive && (
                                <Badge className="bg-primary">Current</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workout Stats and History */}
            <div className="space-y-6">
              {/* Weekly Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Workouts</span>
                    <span className="font-semibold">{workoutStats.thisWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Time</span>
                    <span className="font-semibold">{workoutStats.totalTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calories</span>
                    <span className="font-semibold">{workoutStats.caloriesBurned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak</span>
                    <span className="font-semibold">{workoutStats.streak} days</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Workouts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentWorkouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-medium">{workout.name}</div>
                          <div className="text-sm text-muted-foreground">{workout.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{workout.duration} min</div>
                          <div className="text-sm text-muted-foreground">{workout.calories} cal</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Dumbbell className="w-4 h-4 mr-2" />
                    Create Custom Workout
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 