"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Plus, X, Check, Minus, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "react-toastify"
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
  specs?: Record<string, string>
}

export function EquipmentComparison() {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [compareList, setCompareList] = useState<Equipment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  // Fetch equipment based on search query
  const searchEquipment = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/equipment?search=${encodeURIComponent(query)}&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.equipment || [])
      } else {
        toast.error('Failed to search equipment')
      }
    } catch (error) {
      console.error('Error searching equipment:', error)
      toast.error('Error searching equipment')
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchEquipment(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const availableProducts = searchResults.slice(0, 5)

  const addToComparison = (product: Equipment) => {
    if (compareList.length >= 3) {
      toast.warning("You can only compare up to 3 products at a time")
      return
    }
    if (compareList.find((p) => p._id === product._id)) {
      toast.warning("This product is already in your comparison")
      return
    }
    setCompareList([...compareList, product])
    toast.success(`${product.name} added to comparison`)
  }

  const removeFromComparison = (productId: string) => {
    const product = compareList.find(p => p._id === productId)
    setCompareList(compareList.filter((p) => p._id !== productId))
    if (product) {
      toast.success(`${product.name} removed from comparison`)
    }
  }

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    setAddingToCart(productId)
    try {
      await addToCart(productId, 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(null)
    }
  }

  const getSpecIcon = (value: string) => {
    const goodValues = ["Excellent", "Very High", "Very Good"]
    const okValues = ["High", "Good"]

    if (goodValues.includes(value)) return <Check className="w-4 h-4 text-green-600" />
    if (okValues.includes(value)) return <Minus className="w-4 h-4 text-yellow-600" />
    return <X className="w-4 h-4 text-red-600" />
  }

  return (
    <div className="space-y-8">
      {/* Add Products to Compare */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Products to Compare
          </CardTitle>
          <CardDescription>Compare up to 4 products side by side ({compareList.length}/4 selected)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search products to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => addToComparison(product)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {compareList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Comparison</CardTitle>
            <CardDescription>Compare features, specs, and prices side by side</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-medium">Feature</th>
                    {compareList.map((product) => (
                      <th key={product._id} className="text-center p-4 min-w-[200px]">
                        <div className="space-y-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeFromComparison(product._id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted mx-auto">
                            {product.images?.[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <div className="flex items-center justify-center gap-2 mt-1">
                              <span className="font-bold">${product.price}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{product.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(compareList[0]?.specs || {}).map(([key, value]) => (
                    <tr key={key} className="border-t">
                      <td className="p-4 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                      {compareList.map((product) => (
                        <td key={product._id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getSpecIcon(product.specs?.[key as keyof typeof product.specs] || 'N/A')}
                            <span>{product.specs?.[key as keyof typeof product.specs] || 'N/A'}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t bg-muted/50">
                    <td className="p-4 font-medium">Action</td>
                    {compareList.map((product) => (
                      <td key={product._id} className="p-4 text-center">
                        <Button 
                          className="w-full"
                          onClick={() => handleAddToCart(product._id)}
                          disabled={addingToCart === product._id}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {addingToCart === product._id ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
