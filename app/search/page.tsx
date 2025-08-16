"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, BookOpen, Apple, Heart, ShoppingBag, Calendar, Users, Trophy, Clock, Star } from "lucide-react"
import { useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  const searchResults = {
    workouts: [
      { title: "HIIT Training", category: "Cardio", duration: "45 min", difficulty: "Intermediate", rating: 4.8 },
      { title: "Strength Training", category: "Strength", duration: "60 min", difficulty: "Advanced", rating: 4.9 },
      { title: "Yoga Flow", category: "Flexibility", duration: "30 min", difficulty: "Beginner", rating: 4.7 },
    ],
    nutrition: [
      { title: "Protein Smoothie", category: "Recipes", calories: 320, protein: "25g", rating: 4.6 },
      { title: "Meal Planning Guide", category: "Guides", duration: "15 min read", rating: 4.8 },
      { title: "Nutrition Basics", category: "Education", duration: "20 min read", rating: 4.9 },
    ],
    equipment: [
      { title: "Tennis Racket", category: "Tennis", price: "$89", rating: 4.7, reviews: 156 },
      { title: "Running Shoes", category: "Running", price: "$120", rating: 4.8, reviews: 234 },
      { title: "Yoga Mat", category: "Yoga", price: "$45", rating: 4.6, reviews: 89 },
    ],
    events: [
      { title: "Local Tennis Tournament", category: "Competition", date: "Next Week", location: "NYC", participants: 24 },
      { title: "Running Club Meetup", category: "Social", date: "This Weekend", location: "Central Park", participants: 45 },
      { title: "Fitness Workshop", category: "Workshop", date: "Next Month", location: "Online", participants: 120 },
    ],
    community: [
      { title: "Tennis Enthusiasts", category: "Group", members: 1247, activity: "Very Active", rating: 4.8 },
      { title: "Running Community", category: "Group", members: 2341, activity: "Active", rating: 4.7 },
      { title: "Fitness Beginners", category: "Group", members: 892, activity: "Active", rating: 4.6 },
    ],
  }

  const categories = [
    { id: "all", label: "All", icon: Search },
    { id: "workouts", label: "Workouts", icon: Heart },
    { id: "nutrition", label: "Nutrition", icon: Apple },
    { id: "equipment", label: "Equipment", icon: ShoppingBag },
    { id: "events", label: "Events", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
  ]

  const getFilteredResults = () => {
    if (selectedCategory === "all") {
      return Object.values(searchResults).flat()
    }
    return searchResults[selectedCategory as keyof typeof searchResults] || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              Find What You're Looking For
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Search</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search across workouts, nutrition, equipment, events, and community to find exactly what you need.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for workouts, nutrition, equipment, events, community..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg"
                  />
                </div>
                <Button size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Results */}
          <div className="space-y-8">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResults().map((result, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{result.title}</CardTitle>
                        <CardDescription>{result.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {result.duration && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              {result.duration}
                            </div>
                          )}
                          {result.difficulty && (
                            <Badge variant="outline">{result.difficulty}</Badge>
                          )}
                          {result.rating && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{result.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(result.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.workouts.map((workout, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{workout.title}</CardTitle>
                        <CardDescription>{workout.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            {workout.duration}
                          </div>
                          <Badge variant="outline">{workout.difficulty}</Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{workout.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(workout.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.nutrition.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {item.calories && (
                            <div className="text-sm">{item.calories} calories</div>
                          )}
                          {item.protein && (
                            <div className="text-sm">{item.protein} protein</div>
                          )}
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              {item.duration}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.equipment.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-lg font-semibold">{item.price}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.reviews} reviews</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.events.map((event, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="text-sm">{event.location}</div>
                          <div className="text-sm text-muted-foreground">{event.participants} participants</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.community.map((group, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{group.title}</CardTitle>
                        <CardDescription>{group.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm">{group.members.toLocaleString()} members</div>
                          <Badge variant="outline">{group.activity}</Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{group.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(group.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
} 