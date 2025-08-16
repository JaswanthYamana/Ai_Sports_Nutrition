"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Target, User, Heart, Trophy } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sport: "",
    experience: "",
    goals: [],
    fitnessLevel: "",
  })

  const totalSteps = 4

  const sports = [
    "Football", "Basketball", "Tennis", "Swimming", "Running", "Cycling",
    "Gym/Fitness", "Yoga", "Boxing", "Golf", "Cricket", "Badminton"
  ]

  const experienceLevels = [
    "Beginner", "Intermediate", "Advanced", "Professional"
  ]

  const fitnessLevels = [
    "Just Starting", "Some Experience", "Regular Exerciser", "Very Active"
  ]

  const goals = [
    { id: "weight-loss", label: "Weight Loss", icon: Target },
    { id: "muscle-gain", label: "Muscle Gain", icon: Heart },
    { id: "endurance", label: "Improve Endurance", icon: Trophy },
    { id: "flexibility", label: "Increase Flexibility", icon: User },
    { id: "strength", label: "Build Strength", icon: Target },
    { id: "general", label: "General Fitness", icon: Heart },
  ]

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to SportsPro!</h2>
              <p className="text-muted-foreground">Let's get to know you better to personalize your experience.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Age</label>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What's Your Sport?</h2>
              <p className="text-muted-foreground">Choose your primary sport or activity.</p>
            </div>
            <div className="space-y-4">
              <Select value={formData.sport} onValueChange={(value) => updateFormData("sport", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport.toLowerCase()}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What Are Your Goals?</h2>
              <p className="text-muted-foreground">Select all that apply to help us customize your experience.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.goals.includes(goal.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <CardContent className="p-4 text-center">
                    <goal.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{goal.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Almost There!</h2>
              <p className="text-muted-foreground">Tell us about your current fitness level.</p>
            </div>
            <div className="space-y-4">
              <Select value={formData.fitnessLevel} onValueChange={(value) => updateFormData("fitnessLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your fitness level" />
                </SelectTrigger>
                <SelectContent>
                  {fitnessLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Great! We'll use this information to create your personalized experience.
                </p>
                <Link href="/">
                  <Button size="lg" className="px-8">
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
          </div>

          {/* Main Content */}
          <Card className="p-8">
            {renderStep()}
          </Card>

          {/* Navigation Buttons */}
          {step < totalSteps && (
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 