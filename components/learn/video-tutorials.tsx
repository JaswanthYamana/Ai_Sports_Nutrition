"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, ThumbsUp, Star, BookOpen, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface VideoTutorialsProps {
  sport: string
  skillLevel: string
}

export function VideoTutorials({ sport, skillLevel }: VideoTutorialsProps) {
  const getVideos = (sport: string, level: string) => {
    const baseVideos = {
      football: [
        {
          id: 1,
          title: "Perfect First Touch Technique",
          description: "Master ball control with professional tips",
          duration: "8:45",
          views: "125K",
          likes: "4.2K",
          difficulty: "Beginner",
          thumbnail: "/placeholder.svg?height=200&width=300",
          instructor: "Coach Martinez",
          rating: 4.8,
        },
        {
          id: 2,
          title: "Passing Under Pressure",
          description: "Learn to make accurate passes in tight situations",
          duration: "12:30",
          views: "89K",
          likes: "3.1K",
          difficulty: "Intermediate",
          thumbnail: "/placeholder.svg?height=200&width=300",
          instructor: "Pro Player Silva",
          rating: 4.9,
        },
        {
          id: 3,
          title: "Advanced Shooting Drills",
          description: "Improve power and accuracy with these exercises",
          duration: "15:20",
          views: "156K",
          likes: "5.8K",
          difficulty: "Advanced",
          thumbnail: "/placeholder.svg?height=200&width=300",
          instructor: "Coach Thompson",
          rating: 4.7,
        },
        {
          id: 4,
          title: "1v1 Defending Masterclass",
          description: "Essential defensive techniques for one-on-one situations",
          duration: "10:15",
          views: "78K",
          likes: "2.9K",
          difficulty: "Intermediate",
          thumbnail: "/placeholder.svg?height=200&width=300",
          instructor: "Defense Expert Jones",
          rating: 4.6,
        },
      ],
    }

    return baseVideos[sport as keyof typeof baseVideos] || baseVideos.football
  }

  const videos = getVideos(sport, skillLevel)

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Video Library
          </CardTitle>
          <CardDescription>Expert tutorials and training videos for {sport}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search tutorials..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter by Level
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-black hover:text-black shadow-lg group-hover:scale-110 transition-all duration-300"
                >
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/70 text-white">{video.duration}</Badge>
              </div>
              <div className="absolute top-4 left-4">
                <Badge
                  variant={
                    video.difficulty === "Beginner"
                      ? "secondary"
                      : video.difficulty === "Intermediate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {video.difficulty}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {video.rating}
                </div>
              </div>
              <CardDescription className="text-base">{video.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">{video.instructor}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {video.likes}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                  <Button variant="outline" size="icon">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="px-8 bg-transparent">
          Load More Videos
        </Button>
      </div>
    </div>
  )
}
