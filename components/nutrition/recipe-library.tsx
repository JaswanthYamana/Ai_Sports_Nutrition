"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, Users, ChefHat, Heart, Leaf, Zap, Filter } from "lucide-react"

interface RecipeLibraryProps {
  dietType: string
}

export function RecipeLibrary({ dietType }: RecipeLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const recipes = [
    {
      id: 1,
      name: "Power Protein Smoothie Bowl",
      description: "Perfect post-workout recovery meal with complete amino acids",
      image: "/placeholder.svg?height=200&width=300",
      calories: 420,
      protein: 28,
      carbs: 45,
      fat: 12,
      prepTime: "10 min",
      servings: 1,
      difficulty: "Easy",
      category: "breakfast",
      tags: ["High Protein", "Post-Workout", "Quick"],
      dietTypes: ["balanced", "vegetarian"],
      sport: "strength",
      ingredients: [
        "1 banana",
        "1 cup Greek yogurt",
        "1 scoop protein powder",
        "1/2 cup berries",
        "1 tbsp almond butter",
        "1 tbsp chia seeds",
      ],
      instructions: [
        "Blend banana, yogurt, and protein powder until smooth",
        "Pour into bowl and top with berries",
        "Add almond butter and chia seeds",
        "Serve immediately",
      ],
    },
    {
      id: 2,
      name: "Quinoa Power Salad",
      description: "Nutrient-dense meal perfect for endurance athletes",
      image: "/placeholder.svg?height=200&width=300",
      calories: 380,
      protein: 18,
      carbs: 52,
      fat: 14,
      prepTime: "25 min",
      servings: 2,
      difficulty: "Medium",
      category: "lunch",
      tags: ["High Fiber", "Endurance", "Meal Prep"],
      dietTypes: ["balanced", "vegetarian", "vegan"],
      sport: "endurance",
      ingredients: [
        "1 cup quinoa",
        "2 cups mixed greens",
        "1/2 cup chickpeas",
        "1/4 cup pumpkin seeds",
        "2 tbsp olive oil",
        "1 lemon (juiced)",
      ],
      instructions: [
        "Cook quinoa according to package directions",
        "Mix greens, chickpeas, and seeds in large bowl",
        "Add cooled quinoa",
        "Whisk olive oil and lemon juice, pour over salad",
        "Toss and serve",
      ],
    },
    {
      id: 3,
      name: "Recovery Salmon Bowl",
      description: "Omega-3 rich meal for optimal recovery and inflammation reduction",
      image: "/placeholder.svg?height=200&width=300",
      calories: 520,
      protein: 35,
      carbs: 38,
      fat: 24,
      prepTime: "30 min",
      servings: 1,
      difficulty: "Medium",
      category: "dinner",
      tags: ["Anti-Inflammatory", "Recovery", "Omega-3"],
      dietTypes: ["balanced"],
      sport: "all",
      ingredients: [
        "150g salmon fillet",
        "1 cup brown rice",
        "1 cup broccoli",
        "1/2 avocado",
        "1 tbsp sesame oil",
        "1 tsp ginger",
      ],
      instructions: [
        "Season salmon with salt and pepper",
        "Pan-fry salmon for 4-5 minutes each side",
        "Steam broccoli until tender",
        "Serve over brown rice with avocado",
        "Drizzle with sesame oil and ginger",
      ],
    },
    {
      id: 4,
      name: "Energy Balls",
      description: "Quick energy boost for training sessions",
      image: "/placeholder.svg?height=200&width=300",
      calories: 150,
      protein: 6,
      carbs: 18,
      fat: 8,
      prepTime: "15 min",
      servings: 8,
      difficulty: "Easy",
      category: "snacks",
      tags: ["Pre-Workout", "Natural", "No-Bake"],
      dietTypes: ["balanced", "vegetarian", "vegan"],
      sport: "all",
      ingredients: [
        "1 cup dates",
        "1/2 cup almonds",
        "2 tbsp chia seeds",
        "1 tbsp coconut oil",
        "1 tsp vanilla",
        "Pinch of salt",
      ],
      instructions: [
        "Process dates until paste forms",
        "Add almonds and pulse until chopped",
        "Mix in remaining ingredients",
        "Roll into balls",
        "Refrigerate for 30 minutes",
      ],
    },
  ]

  const categories = [
    { id: "all", name: "All Recipes", count: recipes.length },
    { id: "breakfast", name: "Breakfast", count: recipes.filter((r) => r.category === "breakfast").length },
    { id: "lunch", name: "Lunch", count: recipes.filter((r) => r.category === "lunch").length },
    { id: "dinner", name: "Dinner", count: recipes.filter((r) => r.category === "dinner").length },
    { id: "snacks", name: "Snacks", count: recipes.filter((r) => r.category === "snacks").length },
  ]

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory
    const matchesDiet = recipe.dietTypes.includes(dietType)
    return matchesSearch && matchesCategory && matchesDiet
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Recipe Library
          </CardTitle>
          <CardDescription>Sport-specific recipes tailored to your nutrition goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1">
              <span>{category.name}</span>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white">{recipe.calories} kcal</Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{recipe.name}</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-base">{recipe.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Recipe Stats */}
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">{recipe.protein}g</div>
                      <div className="text-xs text-muted-foreground">Protein</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{recipe.carbs}g</div>
                      <div className="text-xs text-muted-foreground">Carbs</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{recipe.fat}g</div>
                      <div className="text-xs text-muted-foreground">Fat</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{recipe.servings}</div>
                      <div className="text-xs text-muted-foreground">Servings</div>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings} serving{recipe.servings > 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ChefHat className="w-4 h-4 mr-2" />
                      View Recipe
                    </Button>
                    <Button variant="outline" size="icon">
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <ChefHat className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No recipes found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Featured Collection */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Featured: Recovery Meals
          </CardTitle>
          <CardDescription>Specially curated recipes for post-workout recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {recipes
              .filter((r) => r.tags.includes("Recovery") || r.tags.includes("Post-Workout"))
              .slice(0, 3)
              .map((recipe) => (
                <div key={recipe.id} className="p-3 rounded-lg bg-background/50 border">
                  <div className="font-medium text-sm">{recipe.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {recipe.calories} kcal • {recipe.prepTime}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
