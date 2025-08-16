"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Calendar, Trophy, Target, Zap, Clock } from "lucide-react"

interface ProgressTrackerProps {
  selectedSport: string
  currentLevel: string
}

const progressData = [
  { date: '2024-01-01', accuracy: 65, timing: 60, form: 70, overall: 65 },
  { date: '2024-01-08', accuracy: 68, timing: 63, form: 72, overall: 67 },
  { date: '2024-01-15', accuracy: 72, timing: 65, form: 75, overall: 71 },
  { date: '2024-01-22', accuracy: 75, timing: 68, form: 78, overall: 74 },
  { date: '2024-01-29', accuracy: 78, timing: 72, form: 82, overall: 77 },
  { date: '2024-02-05', accuracy: 82, timing: 75, form: 85, overall: 81 },
  { date: '2024-02-12', accuracy: 85, timing: 78, form: 88, overall: 84 },
  { date: '2024-02-19', accuracy: 87, timing: 80, form: 91, overall: 86 }
]

const milestones = [
  {
    id: 1,
    title: "First Perfect Score",
    description: "Achieved 100% accuracy in ball control drill",
    date: "2024-02-15",
    type: "accuracy",
    achieved: true
  },
  {
    id: 2,
    title: "15-Day Streak",
    description: "Completed training for 15 consecutive days",
    date: "2024-02-18",
    type: "consistency",
    achieved: true
  },
  {
    id: 3,
    title: "Level Up",
    description: "Advanced from Beginner to Intermediate",
    date: "2024-02-20",
    type: "progression",
    achieved: false
  },
  {
    id: 4,
    title: "Master Technique",
    description: "Complete all beginner modules with 90+ scores",
    date: "2024-03-01",
    type: "mastery",
    achieved: false
  }
]

const weeklyStats = {
  sessionsCompleted: 12,
  totalTime: "4h 32m",
  averageScore: 84,
  improvement: "+12%"
}

export function ProgressTracker({ selectedSport, currentLevel }: ProgressTrackerProps) {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-8">
      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.sessionsCompleted}</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.totalTime}</p>
                <p className="text-sm text-muted-foreground">Training Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{weeklyStats.averageScore}</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
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
                <p className="text-2xl font-bold text-green-600">{weeklyStats.improvement}</p>
                <p className="text-sm text-muted-foreground">Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Skill Progress Over Time
              </CardTitle>
              <CardDescription>
                Track your improvement across different skill areas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={timeRange === "week" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("week")}
              >
                Week
              </Button>
              <Button 
                variant={timeRange === "month" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("month")}
              >
                Month
              </Button>
              <Button 
                variant={timeRange === "year" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("year")}
              >
                Year
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Accuracy"
                />
                <Line 
                  type="monotone" 
                  dataKey="timing" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Timing"
                />
                <Line 
                  type="monotone" 
                  dataKey="form" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Form"
                />
                <Line 
                  type="monotone" 
                  dataKey="overall" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Overall"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Milestones & Achievements
          </CardTitle>
          <CardDescription>
            Track your major accomplishments and upcoming goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                milestone.achieved ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
                'bg-gray-50 dark:bg-gray-900/20'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.achieved ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {milestone.achieved ? (
                    <Trophy className="w-5 h-5 text-green-600" />
                  ) : (
                    <Target className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium">{milestone.title}</h4>
                    <Badge variant={
                      milestone.type === 'accuracy' ? 'default' :
                      milestone.type === 'consistency' ? 'secondary' :
                      milestone.type === 'progression' ? 'destructive' : 'outline'
                    } size="sm">
                      {milestone.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {new Date(milestone.date).toLocaleDateString()}
                  </div>
                  <div className={`text-xs ${
                    milestone.achieved ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    {milestone.achieved ? 'Completed' : 'In Progress'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Strengths</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm">Form & Technique</span>
                  <Badge variant="secondary">91% avg</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm">Consistency</span>
                  <Badge variant="secondary">15-day streak</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Areas for Improvement</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-sm">Timing Precision</span>
                  <Badge variant="outline">72% avg</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-sm">Speed Execution</span>
                  <Badge variant="outline">Needs work</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
