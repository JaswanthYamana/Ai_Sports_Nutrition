"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Trophy, Target, TrendingUp, Plus } from "lucide-react"

export function CommunityFeed() {
  const [newPost, setNewPost] = useState("")
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    "1": 24,
    "2": 18,
    "3": 31,
    "4": 12,
    "5": 45,
  })
  const [userLikes, setUserLikes] = useState<string[]>([])

  const posts = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Pro Athlete",
        sport: "Running",
      },
      content:
        "Just completed my first marathon in under 3 hours! 🏃‍♀️ The training paid off. Thanks to everyone who supported me along the way!",
      timestamp: "2 hours ago",
      type: "achievement",
      achievement: {
        title: "Sub-3 Marathon",
        icon: Trophy,
        color: "text-yellow-600",
      },
      image: "/placeholder.svg?height=300&width=400",
      comments: 8,
      tags: ["Marathon", "Personal Best", "Running"],
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
        sport: "Tennis",
      },
      content:
        "Looking for a tennis partner for weekend matches. I'm intermediate level and play at Riverside Courts. Anyone interested?",
      timestamp: "4 hours ago",
      type: "social",
      comments: 5,
      tags: ["Tennis", "Partner Needed", "Weekend"],
    },
    {
      id: "3",
      user: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Beginner",
        sport: "Swimming",
      },
      content:
        "Started my swimming journey 3 months ago. Today I swam 1000m non-stop for the first time! Small victories matter 💪",
      timestamp: "6 hours ago",
      type: "progress",
      achievement: {
        title: "1000m Milestone",
        icon: Target,
        color: "text-blue-600",
      },
      comments: 12,
      tags: ["Swimming", "Milestone", "Progress"],
    },
    {
      id: "4",
      user: {
        name: "David Park",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Advanced",
        sport: "Cycling",
      },
      content:
        "Great group ride this morning! 50km through the mountains. The weather was perfect and the company even better. Next ride is scheduled for Sunday.",
      timestamp: "8 hours ago",
      type: "social",
      image: "/placeholder.svg?height=300&width=400",
      comments: 6,
      tags: ["Cycling", "Group Ride", "Mountains"],
    },
    {
      id: "5",
      user: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Pro Athlete",
        sport: "Basketball",
      },
      content:
        "Excited to announce I'll be hosting a basketball clinic next weekend! Open to all skill levels. Focus will be on shooting techniques and defensive positioning.",
      timestamp: "12 hours ago",
      type: "event",
      comments: 15,
      tags: ["Basketball", "Clinic", "Coaching"],
    },
  ]

  const toggleLike = (postId: string) => {
    if (userLikes.includes(postId)) {
      setUserLikes(userLikes.filter((id) => id !== postId))
      setLikes((prev) => ({ ...prev, [postId]: prev[postId] - 1 }))
    } else {
      setUserLikes([...userLikes, postId])
      setLikes((prev) => ({ ...prev, [postId]: prev[postId] + 1 }))
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "social":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Pro Athlete":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Share Your Journey
          </CardTitle>
          <CardDescription>Share achievements, ask questions, or connect with the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share your latest achievement, ask for advice, or connect with fellow athletes..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Add Photo
              </Button>
              <Button variant="outline" size="sm">
                Add Achievement
              </Button>
              <Button variant="outline" size="sm">
                Tag Sport
              </Button>
            </div>
            <Button disabled={!newPost.trim()}>Post</Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-sm text-muted-foreground">Posts This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">892</div>
            <p className="text-sm text-muted-foreground">Achievements Shared</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-sm text-muted-foreground">Comments & Replies</p>
          </CardContent>
        </Card>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{post.user.name}</h4>
                      <Badge className={getLevelColor(post.user.level)} variant="secondary">
                        {post.user.level}
                      </Badge>
                      <Badge variant="outline">{post.user.sport}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Badge className={getPostTypeColor(post.type)}>{post.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{post.content}</p>

              {post.achievement && (
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <post.achievement.icon className={`w-5 h-5 ${post.achievement.color}`} />
                  <span className="font-medium">{post.achievement.title}</span>
                </div>
              )}

              {post.image && (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post image"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        userLikes.includes(post.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`}
                    />
                    <span>{likes[post.id]}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
