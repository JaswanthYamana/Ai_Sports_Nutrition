"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommunityFeed } from "@/components/events/community-feed"
import { LocalClubs } from "@/components/events/local-clubs"
import { Achievements } from "@/components/events/achievements"
import { Search, Users, Trophy, MapPin, MessageCircle, Heart, Share2 } from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
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
    { label: "Community Members", value: "45,892", icon: Users, color: "text-green-600" },
    { label: "Active Groups", value: "1,247", icon: MessageCircle, color: "text-blue-600" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Connect with Athletes Worldwide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global Community</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the world's largest sports community. Share experiences, find training partners, and celebrate achievements together.
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
                Find Your Community
              </CardTitle>
              <CardDescription>Search for athletes, groups, and clubs that match your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search athletes, groups..."
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
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="local">Local (10 miles)</SelectItem>
                    <SelectItem value="regional">Regional (50 miles)</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="feed" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Community Feed
              </TabsTrigger>
              <TabsTrigger value="clubs" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Local Clubs
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Groups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <CommunityFeed />
            </TabsContent>

            <TabsContent value="clubs" className="space-y-6">
              <LocalClubs selectedSport={selectedSport} location={location} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Achievements />
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Sports Groups
                  </CardTitle>
                  <CardDescription>Join groups based on your interests and skill level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Beginner Runners", members: 1247, sport: "Running", level: "Beginner" },
                      { name: "Advanced Tennis Players", members: 892, sport: "Tennis", level: "Advanced" },
                      { name: "Fitness Enthusiasts", members: 2341, sport: "Gym/Fitness", level: "All Levels" },
                      { name: "Swimming Masters", members: 567, sport: "Swimming", level: "Intermediate+" },
                      { name: "Basketball Legends", members: 1103, sport: "Basketball", level: "All Levels" },
                      { name: "Yoga Community", members: 1892, sport: "Yoga", level: "All Levels" },
                    ].map((group, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription>{group.sport} • {group.level}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{group.members} members</span>
                            <button className="text-primary hover:underline text-sm">Join Group</button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 