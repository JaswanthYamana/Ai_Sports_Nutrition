"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EquipmentGrid } from "@/components/equipment/equipment-grid"
import { PersonalizedRecommendations } from "@/components/equipment/personalized-recommendations"
import { EquipmentComparison } from "@/components/equipment/equipment-comparison"
import { MaintenanceGuides } from "@/components/equipment/maintenance-guides"
import { Search, Star, TrendingUp, Award, Wrench } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface Stats {
  equipmentReviews: number
  sportsCovered: number
  priceComparisons: number
  maintenanceGuides: number
}

export default function EquipmentPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [stats, setStats] = useState<Stats>({
    equipmentReviews: 0,
    sportsCovered: 0,
    priceComparisons: 0,
    maintenanceGuides: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

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

  // Fetch dynamic stats from MongoDB
  const fetchStats = async () => {
    setStatsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/equipment/stats`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      } else {
        console.error('Failed to fetch equipment stats')
      }
    } catch (error) {
      console.error('Error fetching equipment stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+'
    }
    return num.toString()
  }

  const statsData = [
    { label: "Equipment Reviews", value: formatNumber(stats.equipmentReviews), icon: Star, color: "text-yellow-600" },
    { label: "Sports Covered", value: stats.sportsCovered + '+', icon: Award, color: "text-blue-600" },
    { label: "Price Comparisons", value: formatNumber(stats.priceComparisons), icon: TrendingUp, color: "text-green-600" },
    { label: "Maintenance Guides", value: stats.maintenanceGuides.toString(), icon: Wrench, color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              <Wrench className="w-4 h-4" />
              Find Your Perfect Gear
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Equipment Guide</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get recommendations for gear that fits your budget and needs with expert reviews and price comparisons.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {statsLoading ? (
              // Loading skeleton for stats
              [1, 2, 3, 4].map((i) => (
                <Card key={i} className="text-center animate-pulse">
                  <CardContent className="pt-6">
                    <div className="w-8 h-8 bg-muted rounded mx-auto mb-2" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))
            ) : (
              statsData.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Search and Filters */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Equipment
              </CardTitle>
              <CardDescription>Search and filter equipment by sport, price, and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment..."
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
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget ($0-$50)</SelectItem>
                    <SelectItem value="mid">Mid-range ($50-$200)</SelectItem>
                    <SelectItem value="premium">Premium ($200+)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browse">Browse Equipment</TabsTrigger>
              <TabsTrigger value="recommendations">For You</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              <EquipmentGrid
                searchQuery={searchQuery}
                selectedSport={selectedSport}
                priceRange={priceRange}
                sortBy={sortBy}
              />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <PersonalizedRecommendations />
            </TabsContent>

            <TabsContent value="compare" className="space-y-6">
              <EquipmentComparison />
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <MaintenanceGuides />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
