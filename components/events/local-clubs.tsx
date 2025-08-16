"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Star, Phone, Mail, Globe } from "lucide-react"

interface LocalClubsProps {
  selectedSport: string
  location: string
}

export function LocalClubs({ selectedSport, location }: LocalClubsProps) {
  const [joinedClubs, setJoinedClubs] = useState<string[]>([])

  const clubs = [
    {
      id: "1",
      name: "Downtown Runners Club",
      sport: "running",
      description:
        "A friendly community of runners of all levels. We meet twice a week for group runs and organize monthly races.",
      location: "Downtown Sports Complex",
      distance: "0.8 miles",
      members: 247,
      rating: 4.8,
      meetingDays: ["Tuesday", "Saturday"],
      meetingTime: "6:00 AM",
      fees: "$25/month",
      contact: {
        phone: "(555) 123-4567",
        email: "info@downtownrunners.com",
        website: "www.downtownrunners.com",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Beginner Friendly", "Group Runs", "Races"],
      established: "2018",
    },
    {
      id: "2",
      name: "Riverside Tennis Academy",
      sport: "tennis",
      description: "Professional tennis coaching and competitive play. Facilities include 8 courts and a pro shop.",
      location: "Riverside Sports Center",
      distance: "1.2 miles",
      members: 156,
      rating: 4.9,
      meetingDays: ["Monday", "Wednesday", "Friday"],
      meetingTime: "7:00 PM",
      fees: "$80/month",
      contact: {
        phone: "(555) 234-5678",
        email: "contact@riversidetennisacademy.com",
        website: "www.riversidetennisacademy.com",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Professional Coaching", "Tournaments", "All Levels"],
      established: "2015",
    },
    {
      id: "3",
      name: "Community Basketball League",
      sport: "basketball",
      description:
        "Recreational basketball league with teams for different skill levels. Season runs from September to March.",
      location: "Community Recreation Center",
      distance: "0.5 miles",
      members: 89,
      rating: 4.6,
      meetingDays: ["Thursday", "Sunday"],
      meetingTime: "6:30 PM",
      fees: "$40/season",
      contact: {
        phone: "(555) 345-6789",
        email: "league@communitybasketball.org",
        website: "www.communitybasketball.org",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Recreational", "Seasonal", "Team Play"],
      established: "2020",
    },
    {
      id: "4",
      name: "Aquatic Masters Swimming",
      sport: "swimming",
      description:
        "Structured swimming workouts for adults. Coached sessions focus on technique, endurance, and competition preparation.",
      location: "City Aquatic Center",
      distance: "2.1 miles",
      members: 78,
      rating: 4.7,
      meetingDays: ["Monday", "Wednesday", "Friday"],
      meetingTime: "6:00 AM",
      fees: "$60/month",
      contact: {
        phone: "(555) 456-7890",
        email: "info@aquaticmasters.com",
        website: "www.aquaticmasters.com",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Coached Sessions", "Competition", "Technique"],
      established: "2012",
    },
    {
      id: "5",
      name: "Mountain Cycling Club",
      sport: "cycling",
      description:
        "Adventure cycling club focusing on mountain trails and road cycling. Weekly group rides and monthly camping trips.",
      location: "Mountain Trail Head",
      distance: "3.5 miles",
      members: 134,
      rating: 4.8,
      meetingDays: ["Saturday", "Sunday"],
      meetingTime: "8:00 AM",
      fees: "$35/month",
      contact: {
        phone: "(555) 567-8901",
        email: "rides@mountaincycling.com",
        website: "www.mountaincycling.com",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Mountain Trails", "Adventure", "Camping"],
      established: "2016",
    },
    {
      id: "6",
      name: "Zen Yoga Collective",
      sport: "yoga",
      description:
        "Mindful yoga practice in a supportive community environment. Classes for all levels with experienced instructors.",
      location: "Wellness Center",
      distance: "1.8 miles",
      members: 203,
      rating: 4.9,
      meetingDays: ["Daily"],
      meetingTime: "Various",
      fees: "$70/month",
      contact: {
        phone: "(555) 678-9012",
        email: "namaste@zenyogacollective.com",
        website: "www.zenyogacollective.com",
      },
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Mindfulness", "All Levels", "Daily Classes"],
      established: "2019",
    },
  ]

  const toggleJoin = (clubId: string) => {
    setJoinedClubs((prev) => (prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId]))
  }

  const filteredClubs = clubs.filter((club) => {
    const matchesSport = selectedSport === "all" || club.sport === selectedSport
    const matchesLocation = location === "all" || Number.parseFloat(club.distance) <= 10 // Within 10 miles for local
    return matchesSport && matchesLocation
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Found {filteredClubs.length} local clubs</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            My Clubs ({joinedClubs.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <Card key={club.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={club.image || "/placeholder.svg"}
                alt={club.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{club.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{club.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{club.location}</span>
                  </div>
                  <span>• {club.distance}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {club.meetingDays.join(", ")} at {club.meetingTime}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {club.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Membership:</span>
                  <p className="text-muted-foreground">{club.fees}</p>
                </div>
                <div>
                  <span className="font-medium">Established:</span>
                  <p className="text-muted-foreground">{club.established}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Contact Information:</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{club.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{club.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-blue-600 hover:underline cursor-pointer">{club.contact.website}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => toggleJoin(club.id)}
                  variant={joinedClubs.includes(club.id) ? "secondary" : "default"}
                >
                  {joinedClubs.includes(club.id) ? "Joined" : "Join Club"}
                </Button>
                <Button variant="outline">Contact</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
