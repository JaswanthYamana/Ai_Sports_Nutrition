"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventsGrid } from "@/components/events/events-grid"
import { CommunityFeed } from "@/components/events/community-feed"
import { LocalClubs } from "@/components/events/local-clubs"
import { Achievements } from "@/components/events/achievements"
import { Search, Calendar, Users, Trophy, MapPin } from "lucide-react"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [eventType, setEventType] = useState("all")
  const [location, setLocation] = useState("all")

  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Swimming",
    "Running",
    "Cycling",
    "Gym/Fitness",
    "Yoga",
    "Boxing",
    "Golf",
  ]

  const stats = [
    { label: "Active Events", value: "1,247", icon: Calendar, color: "text-blue-600" },
    { label: "Community Members", value: "45,892", icon: Users, color: "text-green-600" },
    { label: "Local Clubs", value: "328", icon: MapPin, color: "text-purple-600" },
    { label: "Achievements Earned", value: "12,456", icon: Trophy, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Discover Opportunities
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Community</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover sports events, connect with athletes, and join the global sports community
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Discover Events & Communities
              </CardTitle>
              <CardDescription>Find events, clubs, and communities that match your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events, clubs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    {sports.map((sport) => (
                      <SelectItem key={sport} value={sport.toLowerCase()}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="competition">Competitions</SelectItem>
                    <SelectItem value="training">Training Sessions</SelectItem>
                    <SelectItem value="social">Social Events</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="local">Local (10 miles)</SelectItem>
                    <SelectItem value="regional">Regional (50 miles)</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="virtual">Virtual Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="clubs">Local Clubs</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6">
              <EventsGrid
                searchQuery={searchQuery}
                selectedSport={selectedSport}
                eventType={eventType}
                location={location}
              />
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <CommunityFeed />
            </TabsContent>

            <TabsContent value="clubs" className="space-y-6">
              <LocalClubs selectedSport={selectedSport} location={location} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Achievements />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
