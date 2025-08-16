"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClubIcon as Football, Trophy, Target, Zap, Users, Timer, Activity, Award, Play, ChevronRight, Star, Clock } from "lucide-react"
import { toast } from 'react-toastify'

interface SportSelectorProps {
  selectedSport: string
  onSportChange: (sport: string) => void
  skillLevel: string
  onSkillLevelChange: (level: string) => void
}

export function SportSelector({ selectedSport, onSportChange, skillLevel, onSkillLevelChange }: SportSelectorProps) {
  const sports = [
    {
      id: "football",
      name: "Football",
      icon: Football,
      description: "Master ball control, passing, and tactical play",
      lessons: 45,
      duration: "6-8 weeks",
      difficulty: "Medium",
      color: "bg-green-500",
    },
    {
      id: "basketball",
      name: "Basketball",
      icon: Trophy,
      description: "Develop shooting, dribbling, and court awareness",
      lessons: 38,
      duration: "5-7 weeks",
      difficulty: "Medium",
      color: "bg-orange-500",
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: Target,
      description: "Perfect your serve, groundstrokes, and strategy",
      lessons: 42,
      duration: "7-9 weeks",
      difficulty: "Hard",
      color: "bg-blue-500",
    },
    {
      id: "badminton",
      name: "Badminton",
      icon: Zap,
      description: "Learn smashes, drops, and court positioning",
      lessons: 35,
      duration: "4-6 weeks",
      difficulty: "Easy",
      color: "bg-purple-500",
    },
    {
      id: "cricket",
      name: "Cricket",
      icon: Activity,
      description: "Batting, bowling, and fielding fundamentals",
      lessons: 50,
      duration: "8-10 weeks",
      difficulty: "Hard",
      color: "bg-red-500",
    },
    {
      id: "athletics",
      name: "Athletics",
      icon: Timer,
      description: "Running, jumping, and throwing techniques",
      lessons: 40,
      duration: "6-8 weeks",
      difficulty: "Medium",
      color: "bg-cyan-500",
    },
  ]

  const skillLevels = [
    { id: "beginner", name: "Beginner", description: "New to the sport", icon: Users },
    { id: "intermediate", name: "Intermediate", description: "Some experience", icon: Target },
    { id: "advanced", name: "Advanced", description: "Experienced player", icon: Award },
  ]

  const handleSportSelection = (sportId: string) => {
    onSportChange(sportId)
    const sport = sports.find((s) => s.id === sportId)
    if (sport) {
      console.log(`Selected sport: ${sport.name}`)
      // Show success feedback
      const event = new CustomEvent("showNotification", {
        detail: {
          type: "success",
          title: "Sport Selected!",
          message: `You've selected ${sport.name}. Ready to start learning?`,
        },
      })
      window.dispatchEvent(event)
    }
  }

  const handleSkillLevelSelection = (levelId: string) => {
    onSkillLevelChange(levelId)
    const level = skillLevels.find((l) => l.id === levelId)
    if (level) {
      console.log(`Selected skill level: ${level.name}`)
      // Show success feedback
      const event = new CustomEvent("showNotification", {
        detail: {
          type: "info",
          title: "Level Set!",
          message: `Your skill level is set to ${level.name}. Let's customize your learning path!`,
        },
      })
      window.dispatchEvent(event)
    }
  }

  const handleStartLearning = () => {
    if (selectedSport && skillLevel) {
      const sport = sports.find((s) => s.id === selectedSport)
      const level = skillLevels.find((l) => l.id === skillLevel)
      console.log(`Starting learning: ${sport?.name} at ${level?.name} level`)
      toast.success(`Starting your ${sport?.name} journey at ${level?.name} level! 🚀`)
    } else {
      toast.warning("Please select both a sport and skill level to continue.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Sport Selection */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Choose Your Sport</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <Card
              key={sport.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                selectedSport === sport.id ? "ring-2 ring-primary shadow-lg" : "hover:border-primary/50"
              }`}
              onClick={() => handleSportSelection(sport.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${sport.color} flex items-center justify-center`}>
                    <sport.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={
                      sport.difficulty === "Easy"
                        ? "secondary"
                        : sport.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {sport.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{sport.name}</CardTitle>
                <CardDescription>{sport.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{sport.lessons} lessons</span>
                  <span>{sport.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skill Level Selection */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Select Your Level</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {skillLevels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                skillLevel === level.id ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"
              }`}
              onClick={() => handleSkillLevelSelection(level.id)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <level.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{level.name}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Start Learning Button */}
      {selectedSport && skillLevel && (
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3"
            onClick={handleStartLearning}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Learning Journey
          </Button>
        </div>
      )}
    </div>
  )
}
