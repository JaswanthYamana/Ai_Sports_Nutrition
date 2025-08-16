"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock, Trophy, Users, Apple, Dumbbell, BookOpen } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      type: "workout",
      title: "Completed HIIT Training",
      description: "45 minutes • 320 calories burned",
      time: "2 hours ago",
      icon: Dumbbell,
      color: "text-green-500",
    },
    {
      type: "nutrition",
      title: "Logged Lunch",
      description: "Grilled chicken salad • 450 calories",
      time: "4 hours ago",
      icon: Apple,
      color: "text-orange-500",
    },
    {
      type: "learning",
      title: "Watched Tutorial",
      description: "Advanced Tennis Serve Techniques",
      time: "6 hours ago",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      type: "achievement",
      title: "New Personal Best!",
      description: "5K run in 21:30 minutes",
      time: "1 day ago",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      type: "social",
      title: "Joined Group Challenge",
      description: "30-Day Fitness Challenge",
      time: "2 days ago",
      icon: Users,
      color: "text-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest achievements and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0`}
            >
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-xs text-muted-foreground mb-1">{activity.description}</div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="text-center">
            <Link href="/activity" className="text-sm text-primary hover:underline">
              View All Activity
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
