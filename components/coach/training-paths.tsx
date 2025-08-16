"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Lock, Play, Star, Clock, Target } from "lucide-react"

interface TrainingPathsProps {
  selectedSport: string
  onSportChange: (sport: string) => void
  currentLevel: string
  onLevelChange: (level: string) => void
  activeModule: any
  onModuleChange: (module: any) => void
}

const sports = [
  { id: "football", name: "Football", icon: "⚽" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "running", name: "Running", icon: "🏃" },
  { id: "swimming", name: "Swimming", icon: "🏊" }
]

const trainingModules = {
  football: {
    beginner: [
      {
        id: 1,
        title: "Basic Ball Control",
        description: "Master fundamental ball handling and first touch",
        duration: "15 min",
        difficulty: "Easy",
        completed: true,
        locked: false,
        steps: ["Grip & Touch", "Ball Positioning", "Basic Dribbling", "Control Drills"]
      },
      {
        id: 2,
        title: "Passing Fundamentals",
        description: "Learn accurate short and medium-range passing",
        duration: "20 min",
        difficulty: "Easy",
        completed: true,
        locked: false,
        steps: ["Foot Positioning", "Power Control", "Accuracy Training", "Moving Targets"]
      },
      {
        id: 3,
        title: "Shooting Technique",
        description: "Develop proper shooting form and accuracy",
        duration: "25 min",
        difficulty: "Medium",
        completed: false,
        locked: false,
        steps: ["Stance & Balance", "Foot Placement", "Follow Through", "Target Practice"]
      },
      {
        id: 4,
        title: "Defensive Positioning",
        description: "Learn proper defensive stance and movement",
        duration: "30 min",
        difficulty: "Medium",
        completed: false,
        locked: true,
        steps: ["Body Position", "Footwork", "Timing", "1v1 Defense"]
      }
    ],
    intermediate: [
      {
        id: 5,
        title: "Advanced Dribbling",
        description: "Master complex dribbling moves and combinations",
        duration: "35 min",
        difficulty: "Hard",
        completed: false,
        locked: true,
        steps: ["Step-overs", "Cuts & Turns", "Speed Changes", "Combination Moves"]
      }
    ]
  }
}

export function TrainingPaths({ 
  selectedSport, 
  onSportChange, 
  currentLevel, 
  onLevelChange,
  activeModule,
  onModuleChange 
}: TrainingPathsProps) {
  const currentModules = trainingModules[selectedSport]?.[currentLevel] || []

  return (
    <div className="space-y-8">
      {/* Sport and Level Selection */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Select Sport</label>
          <Select value={selectedSport} onValueChange={onSportChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport.id} value={sport.id}>
                  <span className="flex items-center gap-2">
                    <span>{sport.icon}</span>
                    {sport.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Skill Level</label>
          <Select value={currentLevel} onValueChange={onLevelChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Training Modules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Training Modules</h3>
          <Badge variant="outline" className="capitalize">
            {currentLevel} Level
          </Badge>
        </div>

        <div className="grid gap-6">
          {currentModules.map((module, index) => (
            <Card key={module.id} className={`transition-all duration-200 ${
              module.locked ? 'opacity-60' : 'hover:shadow-lg'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        module.completed 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : module.locked 
                            ? 'bg-gray-100 dark:bg-gray-900/20'
                            : 'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : module.locked ? (
                          <Lock className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Play className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={
                      module.difficulty === 'Easy' ? 'secondary' :
                      module.difficulty === 'Medium' ? 'default' : 'destructive'
                    }>
                      {module.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.completed ? '100%' : '0%'}</span>
                    </div>
                    <Progress value={module.completed ? 100 : 0} className="h-2" />
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Training Steps:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {module.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            module.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span className={module.completed ? 'text-green-700 dark:text-green-300' : ''}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    disabled={module.locked}
                    variant={module.completed ? "outline" : "default"}
                    onClick={() => onModuleChange(module)}
                  >
                    {module.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Previous Module
                      </>
                    ) : module.completed ? (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Review Module
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Start Training
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentModules.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No training modules available for this level yet.</p>
                <p className="text-sm mt-2">Check back soon for new content!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
