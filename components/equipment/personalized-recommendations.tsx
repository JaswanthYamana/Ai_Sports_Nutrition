"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, Award, Target, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from 'react-toastify'
import Image from "next/image"

interface Equipment {
  _id: string
  name: string
  category: string
  sport: string
  price: number
  originalPrice?: number
  rating: number
  reviews: any[]
  images: string[]
  brand: string
  features: string[]
  availability: string
  discount?: number
  description: string
  reason?: string
  match?: number
}

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { user } = useAuth()
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'
  
  const userProfile = {
    sports: user?.sport ? [user.sport] : ["Running", "Tennis", "Gym/Fitness"],
    skillLevel: user?.experience || "Intermediate",
    budget: "Mid-range ($50-$200)",
    preferences: ["Durability", "Performance", "Value for money"],
  }

  useEffect(() => {
    if (user) {
      fetchRecommendations()
    }
  }, [user])

  const updateSportsPreference = async (sport: string) => {
    if (!user) {
      toast.error('Please login to update preferences')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const currentSports = user.preferences?.sports || []
      const updatedSports = currentSports.includes(sport)
        ? currentSports.filter((s: string) => s !== sport)
        : [...currentSports, sport]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/preferences`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sports: updatedSports
          }),
        }
      )

      if (response.ok) {
        toast.success(`Sports preference updated!`)
        // Refresh recommendations after preference update
        setTimeout(() => fetchRecommendations(), 500)
      } else {
        toast.error('Failed to update sports preference')
      }
    } catch (error) {
      console.error('Error updating sports preference:', error)
      toast.error('Error updating sports preference')
    }
  }

  const updateBudgetPreference = async (budget: string) => {
    if (!user) {
      toast.error('Please login to update preferences')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/preferences`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            budget: budget
          }),
        }
      )

      if (response.ok) {
        toast.success(`Budget preference updated!`)
        // Refresh recommendations after preference update
        setTimeout(() => fetchRecommendations(), 500)
      } else {
        toast.error('Failed to update budget preference')
      }
    } catch (error) {
      console.error('Error updating budget preference:', error)
      toast.error('Error updating budget preference')
    }
  }

  const refreshRecommendations = () => {
    fetchRecommendations()
    toast.success('Recommendations refreshed!')
  }

  const fetchRecommendations = async () => {
    if (!user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/recommendations/${user._id || user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }
      
      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (equipmentId: string) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }
    
    try {
      await addToCart(equipmentId, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleRefreshRecommendations = () => {
    fetchRecommendations()
    toast.success('Recommendations refreshed!')
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Sign in to get personalized equipment recommendations based on your profile.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded mb-1" />
                <div className="h-3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const recommendationCategories = [
    {
      category: "Based on Your Sports",
      items: recommendations.slice(0, 3),
    },
    {
      category: "Trending in Your Skill Level", 
      items: recommendations.slice(3, 6),
    },
  ]

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-600"
    if (match >= 80) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <div className="space-y-8">
      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Profile
          </CardTitle>
          <CardDescription>Recommendations based on your preferences and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="font-medium mb-2">Sports</p>
              <div className="flex flex-wrap gap-1">
                {userProfile.sports.map((sport) => (
                  <Badge key={sport} variant="secondary">
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Skill Level</p>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                {userProfile.skillLevel}
              </Badge>
            </div>
            <div>
              <p className="font-medium mb-2">Budget Range</p>
              <Badge variant="outline">{userProfile.budget}</Badge>
            </div>
            <div>
              <p className="font-medium mb-2">Preferences</p>
              <div className="flex flex-wrap gap-1">
                {userProfile.preferences.slice(0, 2).map((pref) => (
                  <Badge key={pref} variant="outline" className="text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Categories */}
      {recommendations.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{category.category}</h3>
            {categoryIndex === 0 && <Award className="w-5 h-5 text-yellow-600" />}
            {categoryIndex === 1 && <TrendingUp className="w-5 h-5 text-blue-600" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((item: Equipment, itemIndex: number) => (
              <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      {item.images?.[0] ? (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.reason || 'Recommended for you'}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Match Score</span>
                          <span className={`font-bold ${getMatchColor(item.match || 85)}`}>{item.match || 85}%</span>
                        </div>
                        <Progress value={item.match || 85} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold">${item.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => addToCart(item._id, 1)}
                          disabled={addingToCart === item._id}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {addingToCart === item._id ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Recommendation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Improve Your Recommendations</CardTitle>
          <CardDescription>Help us suggest better equipment for you by updating your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Sports Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Running', 'Cycling', 'Swimming', 'Gym', 'Tennis', 'Basketball'].map((sport) => (
                    <Button
                      key={sport}
                      variant={user?.preferences?.sports?.includes(sport.toLowerCase()) ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSportsPreference(sport.toLowerCase())}
                    >
                      {sport}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Budget Range</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Budget ($0-$50)', value: 'budget' },
                    { label: 'Mid-range ($50-$200)', value: 'mid' },
                    { label: 'Premium ($200+)', value: 'premium' }
                  ].map((range) => (
                    <Button
                      key={range.value}
                      variant={user?.preferences?.budget === range.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateBudgetPreference(range.value)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Recommendation Quality</h4>
                  <p className="text-xs text-muted-foreground">
                    {user?.preferences ? 'Personalized recommendations active' : 'Set preferences for better recommendations'}
                  </p>
                </div>
                <Button 
                  onClick={refreshRecommendations}
                  disabled={loading}
                  size="sm"
                >
                  {loading ? 'Refreshing...' : 'Refresh Recommendations'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
