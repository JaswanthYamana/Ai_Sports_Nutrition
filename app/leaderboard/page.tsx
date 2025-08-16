"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, TrendingUp, Users, Target, Zap } from "lucide-react"
import { useState } from "react"

export default function LeaderboardPage() {
  const [selectedSport, setSelectedSport] = useState("all")
  const [timeFrame, setTimeFrame] = useState("month")

  const leaderboards = {
    overall: [
      { rank: 1, name: "Alex Johnson", sport: "Tennis", points: 2847, streak: 45, achievements: 23, medal: "gold" },
      { rank: 2, name: "Sarah Chen", sport: "Swimming", points: 2723, streak: 38, achievements: 21, medal: "silver" },
      { rank: 3, name: "Mike Rodriguez", sport: "Basketball", points: 2654, streak: 42, achievements: 19, medal: "bronze" },
      { rank: 4, name: "Emma Davis", sport: "Running", points: 2512, streak: 35, achievements: 18 },
      { rank: 5, name: "David Kim", sport: "Football", points: 2489, streak: 31, achievements: 17 },
      { rank: 6, name: "Lisa Wang", sport: "Tennis", points: 2345, streak: 28, achievements: 16 },
      { rank: 7, name: "James Wilson", sport: "Cycling", points: 2218, streak: 33, achievements: 15 },
      { rank: 8, name: "Maria Garcia", sport: "Swimming", points: 2187, streak: 26, achievements: 14 },
      { rank: 9, name: "Tom Anderson", sport: "Basketball", points: 2156, streak: 29, achievements: 13 },
      { rank: 10, name: "Anna Lee", sport: "Running", points: 2123, streak: 24, achievements: 12 },
    ],
    weekly: [
      { rank: 1, name: "Sarah Chen", sport: "Swimming", points: 847, streak: 7, achievements: 5, medal: "gold" },
      { rank: 2, name: "Alex Johnson", sport: "Tennis", points: 823, streak: 7, achievements: 4, medal: "silver" },
      { rank: 3, name: "Mike Rodriguez", sport: "Basketball", points: 789, streak: 7, achievements: 4, medal: "bronze" },
      { rank: 4, name: "Emma Davis", sport: "Running", points: 756, streak: 6, achievements: 3 },
      { rank: 5, name: "David Kim", sport: "Football", points: 723, streak: 6, achievements: 3 },
    ],
    monthly: [
      { rank: 1, name: "Alex Johnson", sport: "Tennis", points: 2847, streak: 45, achievements: 23, medal: "gold" },
      { rank: 2, name: "Sarah Chen", sport: "Swimming", points: 2723, streak: 38, achievements: 21, medal: "silver" },
      { rank: 3, name: "Mike Rodriguez", sport: "Basketball", points: 2654, streak: 42, achievements: 19, medal: "bronze" },
      { rank: 4, name: "Emma Davis", sport: "Running", points: 2512, streak: 35, achievements: 18 },
      { rank: 5, name: "David Kim", sport: "Football", points: 2489, streak: 31, achievements: 17 },
    ]
  }

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case "gold":
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case "silver":
        return <Medal className="w-6 h-6 text-gray-400" />
      case "bronze":
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return null
    }
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500"
    if (rank === 2) return "text-gray-400"
    if (rank === 3) return "text-orange-500"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              Compete with the Best
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaderboard</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how you rank among athletes worldwide. Track your progress and compete for the top spots.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Rankings based on points, streaks, and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overall" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overall">Overall</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overall" className="space-y-4">
                      {leaderboards.overall.map((player) => (
                        <div key={player.rank} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                              {player.rank}
                            </div>
                            {getMedalIcon(player.medal)}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.sport}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{player.points.toLocaleString()} pts</div>
                            <div className="text-sm text-muted-foreground">
                              {player.streak} day streak
                            </div>
                          </div>
                          <Badge variant="secondary">{player.achievements} achievements</Badge>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="weekly" className="space-y-4">
                      {leaderboards.weekly.map((player) => (
                        <div key={player.rank} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                              {player.rank}
                            </div>
                            {getMedalIcon(player.medal)}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.sport}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{player.points.toLocaleString()} pts</div>
                            <div className="text-sm text-muted-foreground">
                              {player.streak} day streak
                            </div>
                          </div>
                          <Badge variant="secondary">{player.achievements} achievements</Badge>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="monthly" className="space-y-4">
                      {leaderboards.monthly.map((player) => (
                        <div key={player.rank} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                              {player.rank}
                            </div>
                            {getMedalIcon(player.medal)}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.sport}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{player.points.toLocaleString()} pts</div>
                            <div className="text-sm text-muted-foreground">
                              {player.streak} day streak
                            </div>
                          </div>
                          <Badge variant="secondary">{player.achievements} achievements</Badge>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Your Ranking */}
            <div className="space-y-6">
              {/* Your Ranking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Your Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">#127</div>
                    <div className="text-sm text-muted-foreground">out of 45,892 athletes</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Your Points</span>
                      <span className="font-semibold">1,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-semibold">12 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Achievements</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Your Progress
                  </Button>
                </CardContent>
              </Card>

              {/* Leaderboard Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Leaderboard Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Participants</span>
                    <span className="font-semibold">45,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active This Week</span>
                    <span className="font-semibold">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Points</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Score</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set New Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Your Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    Join Challenges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 