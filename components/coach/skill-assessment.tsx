"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Target, Trophy, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface SkillAssessmentProps {
  selectedSport: string
  currentLevel: string
}

const skillData = [
  { skill: 'Balance', score: 85, maxScore: 100 },
  { skill: 'Accuracy', score: 72, maxScore: 100 },
  { skill: 'Timing', score: 68, maxScore: 100 },
  { skill: 'Power', score: 91, maxScore: 100 },
  { skill: 'Endurance', score: 78, maxScore: 100 },
  { skill: 'Technique', score: 82, maxScore: 100 }
]

const assessmentTests = [
  {
    id: 1,
    name: "Ball Control Test",
    description: "Test your ability to control the ball under pressure",
    duration: "5 min",
    difficulty: "Medium",
    lastScore: 87,
    bestScore: 92,
    status: "completed"
  },
  {
    id: 2,
    name: "Accuracy Challenge",
    description: "Hit targets with precision from various distances",
    duration: "8 min",
    difficulty: "Hard",
    lastScore: 74,
    bestScore: 78,
    status: "completed"
  },
  {
    id: 3,
    name: "Speed & Agility",
    description: "Test your movement speed and directional changes",
    duration: "6 min",
    difficulty: "Medium",
    lastScore: null,
    bestScore: null,
    status: "available"
  },
  {
    id: 4,
    name: "Endurance Test",
    description: "Measure your stamina and consistency over time",
    duration: "15 min",
    difficulty: "Hard",
    lastScore: null,
    bestScore: null,
    status: "locked"
  }
]

export function SkillAssessment({ selectedSport, currentLevel }: SkillAssessmentProps) {
  const [selectedTest, setSelectedTest] = useState(null)

  const overallScore = Math.round(skillData.reduce((acc, skill) => acc + skill.score, 0) / skillData.length)

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Skill Assessment Overview
          </CardTitle>
          <CardDescription>
            Your current skill level based on AI analysis and performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <div className="space-y-4">
              <h4 className="font-medium">Skill Breakdown</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Score Details */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore}</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
                <Badge variant="secondary" className="mt-2 capitalize">
                  {currentLevel} Level
                </Badge>
              </div>

              <div className="space-y-3">
                {skillData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.skill}</span>
                      <span className="font-medium">{skill.score}/100</span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tests */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Assessment Tests</h3>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            View History
          </Button>
        </div>

        <div className="grid gap-4">
          {assessmentTests.map((test) => (
            <Card key={test.id} className={`transition-all duration-200 ${
              test.status === 'locked' ? 'opacity-60' : 'hover:shadow-lg cursor-pointer'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        test.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : test.status === 'locked'
                            ? 'bg-gray-100 dark:bg-gray-900/20'
                            : 'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        {test.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : test.status === 'locked' ? (
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Target className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">{test.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Duration: {test.duration}</span>
                      <Badge variant={
                        test.difficulty === 'Easy' ? 'secondary' :
                        test.difficulty === 'Medium' ? 'default' : 'destructive'
                      } size="sm">
                        {test.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {test.status === 'completed' && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {test.lastScore}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Best: {test.bestScore}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      size="sm"
                      disabled={test.status === 'locked'}
                      variant={test.status === 'completed' ? 'outline' : 'default'}
                    >
                      {test.status === 'locked' ? 'Locked' :
                       test.status === 'completed' ? 'Retake' : 'Start Test'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Focus Area: Timing & Accuracy
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your timing and accuracy scores could be improved. Consider practicing the "Accuracy Challenge" 
                test more frequently and focus on the timing drills in your training modules.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Strength: Power & Balance
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Excellent power and balance scores! You're ready to advance to more complex techniques 
                that leverage these strengths.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
