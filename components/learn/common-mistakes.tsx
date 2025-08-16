"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, Play, BookOpen, Target } from "lucide-react"

interface CommonMistakesProps {
  sport: string
  skillLevel: string
}

export function CommonMistakes({ sport, skillLevel }: CommonMistakesProps) {
  const getMistakes = (sport: string, level: string) => {
    const baseMistakes = {
      football: {
        beginner: [
          {
            id: 1,
            title: "Looking at the Ball While Dribbling",
            description: "Many beginners keep their eyes glued to the ball, losing awareness of their surroundings.",
            impact: "High",
            frequency: "Very Common",
            solution:
              "Practice dribbling with your head up. Start slow and gradually increase pace while maintaining field vision.",
            videoTip: "Head Up Dribbling Drills",
            category: "Ball Control",
          },
          {
            id: 2,
            title: "Using Only Dominant Foot",
            description: "Relying solely on your stronger foot makes you predictable and limits your options.",
            impact: "Medium",
            frequency: "Common",
            solution: "Dedicate 30% of practice time to your weaker foot. Start with simple touches and passes.",
            videoTip: "Weak Foot Development",
            category: "Technical Skills",
          },
          {
            id: 3,
            title: "Poor First Touch",
            description: "Heavy or misdirected first touches give opponents time to close you down.",
            impact: "High",
            frequency: "Very Common",
            solution: "Practice receiving balls from different angles. Focus on cushioning the ball into space.",
            videoTip: "Perfect First Touch Technique",
            category: "Ball Control",
          },
        ],
        intermediate: [
          {
            id: 4,
            title: "Not Checking Shoulders",
            description: "Failing to look around before receiving the ball limits decision-making options.",
            impact: "High",
            frequency: "Common",
            solution: "Make it a habit to check over both shoulders before the ball arrives. Practice scanning drills.",
            videoTip: "Scanning and Awareness",
            category: "Tactical",
          },
          {
            id: 5,
            title: "Rushing Shots",
            description: "Taking shots too quickly without proper setup or aim reduces accuracy significantly.",
            impact: "Medium",
            frequency: "Common",
            solution: "Take an extra touch to set yourself up. Practice shooting with proper technique over power.",
            videoTip: "Composed Finishing",
            category: "Shooting",
          },
        ],
      },
    }

    const sportMistakes = baseMistakes[sport as keyof typeof baseMistakes] || baseMistakes.football
    return sportMistakes[level as keyof typeof sportMistakes] || sportMistakes.beginner
  }

  const mistakes = getMistakes(sport, skillLevel)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-950/20"
      case "Medium":
        return "text-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "Low":
        return "text-green-500 bg-green-50 dark:bg-green-950/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Very Common":
        return "destructive"
      case "Common":
        return "default"
      case "Occasional":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Common Mistakes & Solutions
          </CardTitle>
          <CardDescription>Learn from typical errors and improve your game faster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-500 mb-1">{mistakes.length}</div>
              <div className="text-sm text-muted-foreground">Key Mistakes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500 mb-1">{skillLevel}</div>
              <div className="text-sm text-muted-foreground">Your Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Fixable</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mistakes List */}
      <div className="space-y-6">
        {mistakes.map((mistake, index) => (
          <Card key={mistake.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-lg">{mistake.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{mistake.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={getFrequencyColor(mistake.frequency)}>{mistake.frequency}</Badge>
                  <Badge className={getImpactColor(mistake.impact)}>{mistake.impact} Impact</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Solution */}
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-700 dark:text-green-300 mb-1">Solution</div>
                    <p className="text-green-600 dark:text-green-400 text-sm">{mistake.solution}</p>
                  </div>
                </div>
              </div>

              {/* Category and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Category: {mistake.category}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    {mistake.videoTip}
                  </Button>
                  <Button size="sm">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Practice Drill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prevention Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">During Practice</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus on quality over quantity</li>
                <li>• Practice at game speed gradually</li>
                <li>• Get feedback from coaches</li>
                <li>• Record yourself training</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">During Games</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Stay calm under pressure</li>
                <li>• Think one step ahead</li>
                <li>• Communicate with teammates</li>
                <li>• Learn from every mistake</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Complete Guide
            </Button>
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Watch Examples
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
