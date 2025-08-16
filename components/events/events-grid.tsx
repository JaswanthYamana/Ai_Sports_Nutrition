"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Clock, Heart, Share2 } from "lucide-react"

interface EventsGridProps {
  searchQuery: string
  selectedSport: string
  eventType: string
  location: string
}

export function EventsGrid({ searchQuery, selectedSport, eventType, location }: EventsGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [registered, setRegistered] = useState<string[]>([])

  const events = [
    {
      id: "1",
      title: "City Marathon 2024",
      description: "Join thousands of runners in the annual city marathon",
      sport: "running",
      type: "competition",
      date: "2024-03-15",
      time: "07:00 AM",
      location: "Downtown Sports Complex",
      distance: "2.3 miles",
      participants: 2847,
      maxParticipants: 5000,
      price: 45,
      difficulty: "Intermediate",
      organizer: {
        name: "City Sports Association",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Marathon", "Competitive", "Medal"],
    },
    {
      id: "2",
      title: "Tennis Tournament - Spring Cup",
      description: "Competitive tennis tournament for all skill levels",
      sport: "tennis",
      type: "competition",
      date: "2024-03-20",
      time: "09:00 AM",
      location: "Riverside Tennis Club",
      distance: "1.8 miles",
      participants: 64,
      maxParticipants: 128,
      price: 75,
      difficulty: "All Levels",
      organizer: {
        name: "Riverside Tennis Club",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Tournament", "Prize Money", "Singles"],
    },
    {
      id: "3",
      title: "Community Basketball League",
      description: "Weekly basketball games for local community",
      sport: "basketball",
      type: "social",
      date: "2024-03-18",
      time: "06:00 PM",
      location: "Community Center",
      distance: "0.5 miles",
      participants: 24,
      maxParticipants: 30,
      price: 0,
      difficulty: "Beginner",
      organizer: {
        name: "Community Sports Group",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Weekly", "Free", "Social"],
    },
    {
      id: "4",
      title: "Swimming Technique Workshop",
      description: "Learn proper swimming techniques from certified instructors",
      sport: "swimming",
      type: "workshop",
      date: "2024-03-22",
      time: "10:00 AM",
      location: "Aquatic Center",
      distance: "3.1 miles",
      participants: 15,
      maxParticipants: 20,
      price: 35,
      difficulty: "All Levels",
      organizer: {
        name: "Swim Academy",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Workshop", "Technique", "Certified"],
    },
    {
      id: "5",
      title: "Virtual Yoga Session",
      description: "Join our online yoga class from the comfort of your home",
      sport: "yoga",
      type: "training",
      date: "2024-03-16",
      time: "07:30 AM",
      location: "Virtual Event",
      distance: "Virtual",
      participants: 156,
      maxParticipants: 200,
      price: 15,
      difficulty: "Beginner",
      organizer: {
        name: "Zen Yoga Studio",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Virtual", "Morning", "Relaxation"],
    },
    {
      id: "6",
      title: "Cycling Group Ride",
      description: "Scenic group ride through the countryside",
      sport: "cycling",
      type: "social",
      date: "2024-03-17",
      time: "08:00 AM",
      location: "Park Entrance",
      distance: "1.2 miles",
      participants: 32,
      maxParticipants: 50,
      price: 0,
      difficulty: "Intermediate",
      organizer: {
        name: "Cycling Enthusiasts",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Group Ride", "Scenic", "Free"],
    },
  ]

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const toggleRegistration = (id: string) => {
    setRegistered((prev) => (prev.includes(id) ? prev.filter((reg) => reg !== id) : [...prev, id]))
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "all" || event.sport === selectedSport
    const matchesType = eventType === "all" || event.type === eventType
    const matchesLocation = location === "all" || event.location.toLowerCase().includes("virtual")

    return matchesSearch && matchesSport && matchesType && matchesLocation
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "competition":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "training":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "social":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Showing {filteredEvents.length} events</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Favorites ({favorites.length})
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            My Events ({registered.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                  {event.price === 0 && <Badge className="bg-green-500 hover:bg-green-600">Free</Badge>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(event.id)}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                  {event.distance !== "Virtual" && <span>• {event.distance}</span>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{event.organizer.name}</span>
                  </div>
                  <Badge className={getDifficultyColor(event.difficulty)}>{event.difficulty}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.participants}/{event.maxParticipants} participants
                    </span>
                  </div>
                  <span className="font-bold text-lg">{event.price === 0 ? "Free" : `$${event.price}`}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => toggleRegistration(event.id)}
                    variant={registered.includes(event.id) ? "secondary" : "default"}
                  >
                    {registered.includes(event.id) ? "Registered" : "Register"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
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
