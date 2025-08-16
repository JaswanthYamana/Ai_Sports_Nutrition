"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, CheckCircle, XCircle, Clock, Trophy, Target, Zap, Award } from "lucide-react"

interface SkillAssessmentProps {
  sport: string
  skillLevel: string
}

export function SkillAssessment({ sport, skillLevel }: SkillAssessmentProps) {
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, number>>({})

  const getSkillTests = (sport: string) => {
    const baseTests = {
      football: [
        {
          id: "ball-control",
          name: "Ball Control",
          description: "Test your ability to control the ball in various situations",
          duration: "5 min",
          questions: 10,
          difficulty: "Medium",
          currentScore: 85,
          bestScore: 92,
          attempts: 3,
        },
        {
          id: "passing-accuracy",
          name: "Passing Accuracy",
          description: "Evaluate your passing precision and decision making",
          duration: "7 min",
          questions: 12,
          difficulty: "Easy",
          currentScore: 78,
          bestScore: 88,
          attempts: 5,
        },
        {
          id: "tactical-awareness",
          name: "Tactical Awareness",
          description: "Assess your understanding of game situations and positioning",
          duration: "10 min",
          questions: 15,
          difficulty: "Hard",
          currentScore: 0,
          bestScore: 0,
          attempts: 0,
        },
        {
          id: "shooting-technique",
          name: "Shooting Technique",
          description: "Test your shooting form and accuracy under pressure",
          duration: "6 min",
          questions: 8,
          difficulty: "Medium",
          currentScore: 91,
          bestScore: 91,
          attempts: 2,
        },
      ],
    }

    return baseTests[sport as keyof typeof baseTests] || baseTests.football
  }

  const skillTests = getSkillTests(sport)
  const completedTests = skillTests.filter((test) => test.attempts > 0).length
  const averageScore = skillTests.reduce((sum, test) => sum + test.bestScore, 0) / skillTests.length

  return (
    <div className="space-y-8">
      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Skill Assessment Dashboard
          </CardTitle>
          <CardDescription>Track your progress and identify areas for improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {completedTests}/{skillTests.length}
              </div>
              <div className="text-sm text-muted-foreground">Tests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{Math.round(averageScore)}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">{skillLevel}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Tests */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Available Assessments</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {skillTests.map((test) => (
            <Card key={test.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription className="mt-1">{test.description}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      test.difficulty === "Easy"
                        ? "secondary"
                        : test.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {test.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Test Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {test.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {test.questions} questions
                  </div>
                </div>

                {/* Scores */}
                {test.attempts > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Best Score</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-500">{test.bestScore}%</span>
                        {test.bestScore >= 90 && <Trophy className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                    <Progress value={test.bestScore} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Attempts: {test.attempts}</span>
                      <span>
                        {test.bestScore >= 90
                          ? "Excellent"
                          : test.bestScore >= 75
                            ? "Good"
                            : test.bestScore >= 60
                              ? "Fair"
                              : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Not attempted yet</p>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={test.attempts > 0 ? "outline" : "default"}
                  onClick={() => setCurrentTest(test.id)}
                >
                  {test.attempts > 0 ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Retake Test
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Start Assessment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Strong Areas</div>
                  <div className="text-sm text-muted-foreground">Shooting, Ball Control</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <div className="font-medium">Focus Areas</div>
                  <div className="text-sm text-muted-foreground">Tactical Awareness</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">View Detailed Report</Button>
              <Button>Get Training Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
