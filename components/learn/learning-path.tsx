"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Lock, Play, Clock, Star, Trophy, Target, Zap } from "lucide-react"

interface LearningPathProps {
  sport: string
  skillLevel: string
}

export function LearningPath({ sport, skillLevel }: LearningPathProps) {
  const getLessons = (sport: string, level: string) => {
    const baseLessons = {
      football: [
        {
          id: 1,
          title: "Basic Ball Control",
          description: "Learn to control the ball with different parts of your foot",
          duration: "15 min",
          difficulty: "Easy",
          completed: true,
        },
        {
          id: 2,
          title: "Passing Fundamentals",
          description: "Master short and long passing techniques",
          duration: "20 min",
          difficulty: "Easy",
          completed: true,
        },
        {
          id: 3,
          title: "Shooting Techniques",
          description: "Develop power and accuracy in your shots",
          duration: "25 min",
          difficulty: "Medium",
          completed: false,
          current: true,
        },
        {
          id: 4,
          title: "Dribbling Skills",
          description: "Learn to beat defenders with effective dribbling",
          duration: "30 min",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 5,
          title: "Defensive Positioning",
          description: "Understand how to defend effectively",
          duration: "20 min",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Set Pieces",
          description: "Master free kicks, corners, and penalties",
          duration: "25 min",
          difficulty: "Hard",
          completed: false,
          locked: true,
        },
      ],
      basketball: [
        {
          id: 1,
          title: "Dribbling Basics",
          description: "Master ball handling with both hands",
          duration: "18 min",
          difficulty: "Easy",
          completed: true,
        },
        {
          id: 2,
          title: "Shooting Form",
          description: "Perfect your shooting technique",
          duration: "22 min",
          difficulty: "Easy",
          completed: true,
        },
        {
          id: 3,
          title: "Layup Techniques",
          description: "Score close to the basket consistently",
          duration: "20 min",
          difficulty: "Medium",
          completed: false,
          current: true,
        },
        {
          id: 4,
          title: "Defensive Stance",
          description: "Learn proper defensive positioning",
          duration: "15 min",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 5,
          title: "Rebounding",
          description: "Secure the ball after missed shots",
          duration: "25 min",
          difficulty: "Medium",
          completed: false,
        },
        {
          id: 6,
          title: "Advanced Moves",
          description: "Crossovers, step-backs, and fadeaways",
          duration: "30 min",
          difficulty: "Hard",
          completed: false,
          locked: true,
        },
      ],
    }

    return baseLessons[sport as keyof typeof baseLessons] || baseLessons.football
  }

  const lessons = getLessons(sport, skillLevel)
  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const progressPercentage = (completedLessons / lessons.length) * 100

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Progress
              </CardTitle>
              <CardDescription>
                {completedLessons} of {lessons.length} lessons completed
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex items-center justify-between mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} Level
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />~
              {lessons.reduce((total, lesson) => total + Number.parseInt(lesson.duration), 0)} min total
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Path */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Learning Path</h3>
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`transition-all duration-300 ${
                lesson.current
                  ? "ring-2 ring-primary shadow-lg"
                  : lesson.completed
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : lesson.locked
                      ? "opacity-60"
                      : "hover:shadow-md hover:-translate-y-1"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {lesson.completed ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : lesson.locked ? (
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    ) : lesson.current ? (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                        <Play className="w-4 h-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <Circle className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <Badge
                        variant={
                          lesson.difficulty === "Easy"
                            ? "secondary"
                            : lesson.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </div>
                    </div>
                    <Button
                      variant={lesson.current ? "default" : lesson.completed ? "secondary" : "outline"}
                      disabled={lesson.locked}
                      className="min-w-[100px]"
                    >
                      {lesson.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review
                        </>
                      ) : lesson.current ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : lesson.locked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Complete your current lesson to unlock advanced techniques and drills.
            </p>
            <div className="flex gap-4">
              <Button className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Continue Learning
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Star className="w-4 h-4" />
                Take Skill Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
