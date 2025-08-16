"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Camera, Barcode, Clock, Trash2, Edit } from "lucide-react"

interface FoodLoggerProps {
  selectedDate: Date
  dietType: string
}

export function FoodLogger({ selectedDate, dietType }: FoodLoggerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMeal, setSelectedMeal] = useState("breakfast")

  const mealTypes = [
    { id: "breakfast", name: "Breakfast", time: "6:00 - 10:00 AM" },
    { id: "lunch", name: "Lunch", time: "12:00 - 2:00 PM" },
    { id: "dinner", name: "Dinner", time: "6:00 - 9:00 PM" },
    { id: "snacks", name: "Snacks", time: "Anytime" },
  ]

  const foodSuggestions = [
    {
      name: "Grilled Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      serving: "100g",
      category: "Protein",
    },
    {
      name: "Brown Rice",
      calories: 112,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      serving: "100g cooked",
      category: "Carbs",
    },
    {
      name: "Avocado",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      serving: "100g",
      category: "Healthy Fats",
    },
    {
      name: "Greek Yogurt",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      serving: "100g",
      category: "Protein",
    },
    {
      name: "Banana",
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      serving: "1 medium",
      category: "Fruits",
    },
    {
      name: "Almonds",
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      serving: "100g",
      category: "Nuts",
    },
  ]

  const loggedMeals = {
    breakfast: [
      {
        name: "Oatmeal with Berries",
        calories: 300,
        protein: 8,
        carbs: 54,
        fat: 6,
        serving: "1 bowl",
        time: "8:30 AM",
      },
      {
        name: "Greek Yogurt",
        calories: 150,
        protein: 15,
        carbs: 8,
        fat: 4,
        serving: "150g",
        time: "8:30 AM",
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 15,
        fat: 28,
        serving: "1 large bowl",
        time: "1:15 PM",
      },
    ],
    dinner: [],
    snacks: [
      {
        name: "Apple with Almond Butter",
        calories: 200,
        protein: 4,
        carbs: 25,
        fat: 8,
        serving: "1 apple + 1 tbsp",
        time: "4:00 PM",
      },
    ],
  }

  const filteredFoods = foodSuggestions.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-8">
      {/* Food Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Food
          </CardTitle>
          <CardDescription>Search and log your meals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Camera className="w-4 h-4" />
              Photo
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Barcode className="w-4 h-4" />
              Scan
            </Button>
          </div>

          {/* Food Suggestions */}
          {searchQuery && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredFoods.map((food, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {food.calories} kcal • {food.protein}g protein • {food.serving}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{food.category}</Badge>
                    <Button size="sm">Add</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meal Tabs */}
      <Tabs value={selectedMeal} onValueChange={setSelectedMeal}>
        <TabsList className="grid w-full grid-cols-4">
          {mealTypes.map((meal) => (
            <TabsTrigger key={meal.id} value={meal.id} className="flex flex-col gap-1">
              <span>{meal.name}</span>
              <span className="text-xs text-muted-foreground">{meal.time}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {mealTypes.map((meal) => (
          <TabsContent key={meal.id} value={meal.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{meal.name}</CardTitle>
                    <CardDescription>
                      {loggedMeals[meal.id as keyof typeof loggedMeals].length} items logged
                    </CardDescription>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Food
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loggedMeals[meal.id as keyof typeof loggedMeals].length > 0 ? (
                    loggedMeals[meal.id as keyof typeof loggedMeals].map((food, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                        <div className="flex-1">
                          <div className="font-medium">{food.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">{food.serving}</div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{food.calories} kcal</span>
                            <span>{food.protein}g protein</span>
                            <span>{food.carbs}g carbs</span>
                            <span>{food.fat}g fat</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {food.time}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No foods logged for {meal.name.toLowerCase()} yet</p>
                      <p className="text-sm">Add your first item to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Add Favorites */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
          <CardDescription>Your frequently logged foods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodSuggestions.slice(0, 6).map((food, index) => (
              <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="font-medium text-sm">{food.name}</div>
                <div className="text-xs text-muted-foreground">
                  {food.calories} kcal • {food.serving}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
