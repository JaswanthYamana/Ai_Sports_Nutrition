"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ExternalLink, Heart, Share2 } from "lucide-react"
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
}

interface EquipmentGridProps {
  searchQuery: string
  selectedSport: string
  priceRange: string
  sortBy: string
}

export function EquipmentGrid({ searchQuery, selectedSport, priceRange, sortBy }: EquipmentGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { user } = useAuth()
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

  useEffect(() => {
    fetchEquipment()
  }, [searchQuery, selectedSport, priceRange, sortBy])

  const fetchEquipment = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (selectedSport && selectedSport !== 'all') params.append('sport', selectedSport)
      if (priceRange && priceRange !== 'all') params.append('priceRange', priceRange)
      if (sortBy) params.append('sortBy', sortBy)
      
      const response = await fetch(`${API_BASE_URL}/equipment?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch equipment')
      }
      
      const data = await response.json()
      setEquipment(data.equipment || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load equipment')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
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

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded mb-4" />
              <div className="h-8 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Failed to load equipment</p>
        <Button onClick={fetchEquipment}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Showing {equipment.length} results</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            View Favorites ({favorites.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <Card key={item._id} className="group hover:shadow-lg transition-shadow duration-300">
            <div className="relative overflow-hidden rounded-t-lg">
              <div className="relative w-full h-48">
                {item.images?.[0] ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              {item.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  -{item.discount}%
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => toggleFavorite(item._id)}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(item._id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                <Badge variant={item.availability === "In Stock" ? "default" : "secondary"} className="text-xs">
                  {item.availability}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
              
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="text-sm text-muted-foreground">({item.reviews?.length || 0})</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={() => handleAddToCart(item._id)}
                  disabled={item.availability !== "In Stock"}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={item.availability === "In Stock" ? "default" : "secondary"}
                    className={
                      item.availability === "In Stock"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : ""
                    }
                  >
                    {item.availability}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
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
