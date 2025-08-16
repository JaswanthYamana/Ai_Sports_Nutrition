"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TrainingPaths } from "@/components/coach/training-paths"
import { SkillAssessment } from "@/components/coach/skill-assessment"
import { MotionCapture } from "@/components/coach/motion-capture"
import { ProgressTracker } from "@/components/coach/progress-tracker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, Camera, TrendingUp, Trophy, Zap } from "lucide-react"

export default function DigitalCoachPage() {
  const [selectedSport, setSelectedSport] = useState("football")
  const [currentLevel, setCurrentLevel] = useState("beginner")
  const [activeModule, setActiveModule] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI-Powered Training
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Coach</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master sports techniques with AI-verified skill training and motion analysis.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Skills Mastered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/20">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">+23%</p>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="training" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="training" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Training
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Assessment
              </TabsTrigger>
              <TabsTrigger value="motion" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Motion
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="training">
              <TrainingPaths 
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
                currentLevel={currentLevel}
                onLevelChange={setCurrentLevel}
                activeModule={activeModule}
                onModuleChange={setActiveModule}
              />
            </TabsContent>

            <TabsContent value="assessment">
              <SkillAssessment 
                selectedSport={selectedSport}
                currentLevel={currentLevel}
              />
            </TabsContent>

            <TabsContent value="motion">
              <MotionCapture 
                selectedSport={selectedSport}
                activeModule={activeModule}
              />
            </TabsContent>

            <TabsContent value="progress">
              <ProgressTracker 
                selectedSport={selectedSport}
                currentLevel={currentLevel}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
