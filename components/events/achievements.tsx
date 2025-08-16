"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Star, Award, Medal, Crown, Zap, Calendar } from "lucide-react"

export function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const userStats = {
    totalAchievements: 24,
    points: 1847,
    rank: "Gold Athlete",
    level: 12,
    nextLevelPoints: 2000,
  }

  const achievements = [
    {
      id: "1",
      title: "First Marathon",
      description: "Complete your first marathon race",
      category: "running",
      icon: Trophy,
      color: "text-yellow-600",
      points: 100,
      earned: true,
      earnedDate: "2024-02-15",
      rarity: "Common",
    },
    {
      id: "2",
      title: "Speed Demon",
      description: "Run 5K in under 20 minutes",
      category: "running",
      icon: Zap,
      color: "text-blue-600",
      points: 150,
      earned: true,
      earnedDate: "2024-01-28",
      rarity: "Rare",
    },
    {
      id: "3",
      title: "Century Rider",
      description: "Complete a 100-mile cycling ride",
      category: "cycling",
      icon: Medal,
      color: "text-green-600",
      points: 200,
      earned: false,
      progress: 75,
      rarity: "Epic",
    },
    {
      id: "4",
      title: "Tennis Ace",
      description: "Win 10 tennis matches in a row",
      category: "tennis",
      icon: Crown,
      color: "text-purple-600",
      points: 175,
      earned: false,
      progress: 60,
      rarity: "Rare",
    },
    {
      id: "5",
      title: "Swimming Champion",
      description: "Swim 1000m without stopping",
      category: "swimming",
      icon: Award,
      color: "text-cyan-600",
      points: 125,
      earned: true,
      earnedDate: "2024-03-02",
      rarity: "Common",
    },
    {
      id: "6",
      title: "Consistency King",
      description: "Work out for 30 consecutive days",
      category: "fitness",
      icon: Target,
      color: "text-orange-600",
      points: 300,
      earned: false,
      progress: 87,
      rarity: "Legendary",
    },
    {
      id: "7",
      title: "Social Butterfly",
      description: "Join 5 different sports clubs",
      category: "social",
      icon: Star,
      color: "text-pink-600",
      points: 100,
      earned: true,
      earnedDate: "2024-02-20",
      rarity: "Common",
    },
    {
      id: "8",
      title: "Event Organizer",
      description: "Organize and host a sports event",
      category: "social",
      icon: Calendar,
      color: "text-indigo-600",
      points: 250,
      earned: false,
      progress: 25,
      rarity: "Epic",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "running", label: "Running" },
    { value: "cycling", label: "Cycling" },
    { value: "tennis", label: "Tennis" },
    { value: "swimming", label: "Swimming" },
    { value: "fitness", label: "Fitness" },
    { value: "social", label: "Social" },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const filteredAchievements = achievements.filter((achievement) => {
    return selectedCategory === "all" || achievement.category === selectedCategory
  })

  const earnedAchievements = filteredAchievements.filter((a) => a.earned)
  const inProgressAchievements = filteredAchievements.filter((a) => !a.earned)

  return (
    <div className="space-y-8">
      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Your Achievement Progress
          </CardTitle>
          <CardDescription>Track your sports journey and unlock new achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{userStats.totalAchievements}</div>
              <p className="text-sm text-muted-foreground">Achievements Earned</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userStats.points}</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
            <div className="text-center">
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500">
                {userStats.rank}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Current Rank</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">Level {userStats.level}</div>
              <div className="mt-2">
                <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {userStats.nextLevelPoints - userStats.points} points to next level
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Tabs */}
      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="earned">Earned ({earnedAchievements.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressAchievements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => (
              <Card key={achievement.id} className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-muted/50">
                    <achievement.icon className={`w-12 h-12 ${achievement.color}`} />
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-600">+{achievement.points}</div>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {new Date(achievement.earnedDate!).toLocaleDateString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Share Achievement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressAchievements.map((achievement) => (
              <Card key={achievement.id} className="relative overflow-hidden opacity-75">
                <div className="absolute top-2 right-2">
                  <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-muted/50">
                    <achievement.icon className={`w-12 h-12 ${achievement.color} opacity-60`} />
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600">+{achievement.points}</div>
                    <p className="text-xs text-muted-foreground">Points when earned</p>
                  </div>
                  {achievement.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                    In Progress
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
