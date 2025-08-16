"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SportSelector } from "@/components/learn/sport-selector"
import { LearningPath } from "@/components/learn/learning-path"
import { VideoTutorials } from "@/components/learn/video-tutorials"
import { SkillAssessment } from "@/components/learn/skill-assessment"
import { CommonMistakes } from "@/components/learn/common-mistakes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Trophy, Target, AlertTriangle, Play, Star } from "lucide-react"

export default function LearnPage() {
  const [selectedSport, setSelectedSport] = useState("football")
  const [skillLevel, setSkillLevel] = useState("beginner")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Master Your Game with Expert Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sports Learning Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed for every skill level. From beginner basics to professional techniques.
            </p>
          </div>

          {/* Sport Selection */}
          <div className="mb-12">
            <SportSelector
              selectedSport={selectedSport}
              onSportChange={setSelectedSport}
              skillLevel={skillLevel}
              onSkillLevelChange={setSkillLevel}
            />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="path" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
              <TabsTrigger value="path" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Path
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Mistakes
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="path">
              <LearningPath sport={selectedSport} skillLevel={skillLevel} />
            </TabsContent>

            <TabsContent value="tutorials">
              <VideoTutorials sport={selectedSport} skillLevel={skillLevel} />
            </TabsContent>

            <TabsContent value="assessment">
              <SkillAssessment sport={selectedSport} skillLevel={skillLevel} />
            </TabsContent>

            <TabsContent value="mistakes">
              <CommonMistakes sport={selectedSport} skillLevel={skillLevel} />
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Your Learning Progress
                  </CardTitle>
                  <CardDescription>Track your improvement across different skills and techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Complete lessons to see your progress here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
