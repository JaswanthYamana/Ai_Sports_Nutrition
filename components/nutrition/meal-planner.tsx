"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChefHat, Clock, Users, Utensils, Plus, RefreshCw } from "lucide-react"

interface MealPlannerProps {
  dietType: string
}

export function MealPlanner({ dietType }: MealPlannerProps) {
  const [selectedWeek, setSelectedWeek] = useState(0)

  const mealPlans = {
    balanced: {
      monday: {
        breakfast: {
          name: "Overnight Oats with Berries",
          calories: 350,
          prepTime: "5 min",
          ingredients: ["Oats", "Greek yogurt", "Berries", "Honey", "Chia seeds"],
        },
        lunch: {
          name: "Grilled Chicken Quinoa Bowl",
          calories: 520,
          prepTime: "25 min",
          ingredients: ["Chicken breast", "Quinoa", "Mixed vegetables", "Olive oil"],
        },
        dinner: {
          name: "Baked Salmon with Sweet Potato",
          calories: 480,
          prepTime: "30 min",
          ingredients: ["Salmon fillet", "Sweet potato", "Broccoli", "Lemon"],
        },
        snacks: [
          { name: "Apple with Almond Butter", calories: 180 },
          { name: "Greek Yogurt", calories: 120 },
        ],
      },
      tuesday: {
        breakfast: {
          name: "Avocado Toast with Eggs",
          calories: 380,
          prepTime: "10 min",
          ingredients: ["Whole grain bread", "Avocado", "Eggs", "Tomato"],
        },
        lunch: {
          name: "Mediterranean Wrap",
          calories: 450,
          prepTime: "15 min",
          ingredients: ["Whole wheat tortilla", "Hummus", "Vegetables", "Feta cheese"],
        },
        dinner: {
          name: "Lean Beef Stir-fry",
          calories: 520,
          prepTime: "20 min",
          ingredients: ["Lean beef", "Mixed vegetables", "Brown rice", "Soy sauce"],
        },
        snacks: [
          { name: "Mixed Nuts", calories: 160 },
          { name: "Banana", calories: 90 },
        ],
      },
    },
  }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const currentPlan = mealPlans.balanced

  return (
    <div className="space-y-8">
      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Meal Plan
              </CardTitle>
              <CardDescription>Personalized meal plans for optimal performance</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <RefreshCw className="w-4 h-4" />
                Generate New
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Custom Plan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              <Utensils className="w-3 h-3" />
              {dietType.charAt(0).toUpperCase() + dietType.slice(1)} Diet
            </Badge>
            <div className="text-sm text-muted-foreground">Week of {new Date().toLocaleDateString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Meal Plans */}
      <div className="space-y-6">
        {weekDays.slice(0, 2).map((day, dayIndex) => {
          const dayKey = day.toLowerCase() as keyof typeof currentPlan
          const dayPlan = currentPlan[dayKey]

          if (!dayPlan) return null

          const totalCalories =
            dayPlan.breakfast.calories +
            dayPlan.lunch.calories +
            dayPlan.dinner.calories +
            dayPlan.snacks.reduce((sum, snack) => sum + snack.calories, 0)

          return (
            <Card key={day}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{day}</CardTitle>
                  <Badge className="flex items-center gap-1">
                    <ChefHat className="w-3 h-3" />
                    {totalCalories} kcal
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Breakfast */}
                  <br />
                  <div className="space-y-3">
                    <div className="font-medium text-orange-600">Breakfast</div>
                    <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                      <div className="font-medium text-sm mb-1">{dayPlan.breakfast.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {dayPlan.breakfast.calories} kcal • {dayPlan.breakfast.prepTime}
                      </div>
                      <div className="space-y-1">
                        {dayPlan.breakfast.ingredients.slice(0, 3).map((ingredient, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {ingredient}
                          </div>
                        ))}
                        {dayPlan.breakfast.ingredients.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayPlan.breakfast.ingredients.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="space-y-3">
                    <div className="font-medium text-green-600">Lunch</div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                      <div className="font-medium text-sm mb-1">{dayPlan.lunch.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {dayPlan.lunch.calories} kcal • {dayPlan.lunch.prepTime}
                      </div>
                      <div className="space-y-1">
                        {dayPlan.lunch.ingredients.slice(0, 3).map((ingredient, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="space-y-3">
                    <div className="font-medium text-blue-600">Dinner</div>
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <div className="font-medium text-sm mb-1">{dayPlan.dinner.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {dayPlan.dinner.calories} kcal • {dayPlan.dinner.prepTime}
                      </div>
                      <div className="space-y-1">
                        {dayPlan.dinner.ingredients.slice(0, 3).map((ingredient, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Snacks */}
                  <div className="space-y-3">
                    <div className="font-medium text-purple-600">Snacks</div>
                    <div className="space-y-2">
                      {dayPlan.snacks.map((snack, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800"
                        >
                          <div className="font-medium text-xs">{snack.name}</div>
                          <div className="text-xs text-muted-foreground">{snack.calories} kcal</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    Prep Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    Shopping List
                  </Button>
                  <Button size="sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Meal Prep Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Meal Prep Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Sunday Prep</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cook grains and proteins in bulk</li>
                <li>• Wash and chop vegetables</li>
                <li>• Prepare overnight oats</li>
                <li>• Portion snacks into containers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Storage Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use glass containers for freshness</li>
                <li>• Label with dates and contents</li>
                <li>• Keep proteins separate from vegetables</li>
                <li>• Freeze extra portions for later</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
