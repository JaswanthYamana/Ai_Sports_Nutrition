"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Clock, Trophy, Users, Apple, Dumbbell, BookOpen, Calendar, Filter } from "lucide-react"
import { useState } from "react"

export default function ActivityPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("week")

  const activities = [
    {
      type: "workout",
      title: "Completed HIIT Training",
      description: "45 minutes • 320 calories burned • Upper body focus",
      time: "2 hours ago",
      icon: Dumbbell,
      color: "text-green-500",
      category: "workout",
    },
    {
      type: "nutrition",
      title: "Logged Lunch",
      description: "Grilled chicken salad • 450 calories • High protein meal",
      time: "4 hours ago",
      icon: Apple,
      color: "text-orange-500",
      category: "nutrition",
    },
    {
      type: "learning",
      title: "Watched Tutorial",
      description: "Advanced Tennis Serve Techniques • 15 minutes • Skill improved",
      time: "6 hours ago",
      icon: BookOpen,
      color: "text-blue-500",
      category: "learning",
    },
    {
      type: "achievement",
      title: "New Personal Best!",
      description: "5K run in 21:30 minutes • Previous: 22:15 • Improvement: 45 seconds",
      time: "1 day ago",
      icon: Trophy,
      color: "text-yellow-500",
      category: "achievement",
    },
    {
      type: "social",
      title: "Joined Group Challenge",
      description: "30-Day Fitness Challenge • 1,247 participants • Started today",
      time: "2 days ago",
      icon: Users,
      color: "text-purple-500",
      category: "social",
    },
    {
      type: "workout",
      title: "Completed Strength Training",
      description: "60 minutes • 280 calories burned • Lower body focus",
      time: "3 days ago",
      icon: Dumbbell,
      color: "text-green-500",
      category: "workout",
    },
    {
      type: "nutrition",
      title: "Logged Breakfast",
      description: "Oatmeal with berries • 320 calories • Balanced meal",
      time: "3 days ago",
      icon: Apple,
      color: "text-orange-500",
      category: "nutrition",
    },
    {
      type: "achievement",
      title: "Week Warrior Badge",
      description: "Completed 7 workouts in a row • Consistency champion",
      time: "1 week ago",
      icon: Trophy,
      color: "text-yellow-500",
      category: "achievement",
    },
    {
      type: "learning",
      title: "Completed Course Module",
      description: "Tennis Fundamentals • Module 3 of 8 • 85% score",
      time: "1 week ago",
      icon: BookOpen,
      color: "text-blue-500",
      category: "learning",
    },
    {
      type: "social",
      title: "Shared Progress",
      description: "Posted workout summary • 23 likes • 5 comments",
      time: "1 week ago",
      icon: Users,
      color: "text-purple-500",
      category: "social",
    },
  ]

  const stats = {
    totalActivities: 156,
    thisWeek: 23,
    thisMonth: 89,
    achievements: 12,
  }

  const getFilteredActivities = () => {
    if (selectedFilter === "all") return activities
    return activities.filter(activity => activity.category === selectedFilter)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              Track Your Journey
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Activity Feed</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Review your complete activity history, track your progress, and celebrate your achievements.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.totalActivities}</div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stats.thisWeek}</div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{stats.thisMonth}</div>
                <p className="text-sm text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.achievements}</div>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="workout">Workouts</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="social">Social</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Activity History
                  </CardTitle>
                  <CardDescription>
                    Your complete activity timeline and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="timeline" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeline" className="space-y-4">
                      {getFilteredActivities().map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200 border-l-4 border-l-primary/20"
                        >
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0`}
                          >
                            <activity.icon className={`w-6 h-6 ${activity.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-semibold">{activity.title}</div>
                              <Badge variant="outline" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">{activity.description}</div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      <div className="text-center py-12 text-muted-foreground">
                        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Your achievements will appear here</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-4">
                      <div className="text-center py-12 text-muted-foreground">
                        <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Activity analytics will appear here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Activity
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Set Goals
                  </Button>
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Activity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Workouts</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Hours</span>
                    <span className="font-semibold">156.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calories Burned</span>
                    <span className="font-semibold">45,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Hours</span>
                    <span className="font-semibold">23.5</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 