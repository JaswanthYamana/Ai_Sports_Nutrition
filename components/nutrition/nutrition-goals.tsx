"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, User, Activity, Utensils, AlertCircle, CheckCircle, Leaf } from "lucide-react"

interface NutritionGoalsProps {
  dietType: string
  onDietTypeChange: (type: string) => void
}

export function NutritionGoals({ dietType, onDietTypeChange }: NutritionGoalsProps) {
  const [userProfile, setUserProfile] = useState({
    age: 25,
    weight: 70,
    height: 175,
    gender: "male",
    activityLevel: "moderate",
    sport: "football",
    goal: "maintain",
  })

  const dietTypes = [
    {
      id: "balanced",
      name: "Balanced Diet",
      description: "WHO-recommended balanced nutrition",
      icon: Target,
      suitable: ["All sports", "General fitness"],
    },
    {
      id: "vegetarian",
      name: "Vegetarian",
      description: "Plant-based with dairy and eggs",
      icon: Leaf,
      suitable: ["Endurance sports", "Yoga", "General fitness"],
    },
    {
      id: "vegan",
      name: "Vegan",
      description: "100% plant-based nutrition",
      icon: Leaf,
      suitable: ["Endurance sports", "Yoga"],
    },
    {
      id: "high-protein",
      name: "High Protein",
      description: "Enhanced protein for muscle building",
      icon: Activity,
      suitable: ["Strength training", "Bodybuilding", "Rugby"],
    },
    {
      id: "endurance",
      name: "Endurance",
      description: "Carb-focused for endurance athletes",
      icon: Activity,
      suitable: ["Running", "Cycling", "Swimming"],
    },
  ]

  const calculateGoals = () => {
    // Simplified BMR calculation (Harris-Benedict)
    let bmr
    if (userProfile.gender === "male") {
      bmr = 88.362 + 13.397 * userProfile.weight + 4.799 * userProfile.height - 5.677 * userProfile.age
    } else {
      bmr = 447.593 + 9.247 * userProfile.weight + 3.098 * userProfile.height - 4.33 * userProfile.age
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }

    const tdee = bmr * activityMultipliers[userProfile.activityLevel as keyof typeof activityMultipliers]

    // Goal adjustment
    let calories = tdee
    if (userProfile.goal === "lose") calories *= 0.85
    if (userProfile.goal === "gain") calories *= 1.15

    // Macronutrient distribution based on diet type
    const macroDistributions = {
      balanced: { protein: 0.15, carbs: 0.55, fat: 0.3 },
      vegetarian: { protein: 0.15, carbs: 0.6, fat: 0.25 },
      vegan: { protein: 0.15, carbs: 0.65, fat: 0.2 },
      "high-protein": { protein: 0.25, carbs: 0.45, fat: 0.3 },
      endurance: { protein: 0.12, carbs: 0.65, fat: 0.23 },
    }

    const distribution = macroDistributions[dietType as keyof typeof macroDistributions] || macroDistributions.balanced

    return {
      calories: Math.round(calories),
      protein: Math.round((calories * distribution.protein) / 4),
      carbs: Math.round((calories * distribution.carbs) / 4),
      fat: Math.round((calories * distribution.fat) / 9),
      fiber: Math.round(userProfile.weight * 0.35),
      water: Math.round(userProfile.weight * 0.035 * 10) / 10,
    }
  }

  const goals = calculateGoals()

  return (
    <div className="space-y-8">
      {/* Profile Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Profile
          </CardTitle>
          <CardDescription>Your information helps us calculate accurate nutrition goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={userProfile.age}
                onChange={(e) => setUserProfile({ ...userProfile, age: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={userProfile.weight}
                onChange={(e) => setUserProfile({ ...userProfile, weight: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={userProfile.height}
                onChange={(e) => setUserProfile({ ...userProfile, height: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={userProfile.gender}
                onValueChange={(value) => setUserProfile({ ...userProfile, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diet Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Diet Type
          </CardTitle>
          <CardDescription>Choose the nutrition approach that fits your lifestyle and sport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dietTypes.map((diet) => (
              <Card
                key={diet.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  dietType === diet.id ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => onDietTypeChange(diet.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <diet.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{diet.name}</CardTitle>
                      {dietType === diet.id && <CheckCircle className="w-4 h-4 text-green-500 mt-1" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">{diet.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs font-medium">Suitable for:</div>
                    <div className="flex flex-wrap gap-1">
                      {diet.suitable.map((sport, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calculated Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Nutrition Goals
          </CardTitle>
          <CardDescription>WHO-compliant daily targets based on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
              <div className="text-2xl font-bold text-red-600">{goals.calories}</div>
              <div className="text-sm text-muted-foreground">Calories (kcal)</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="text-2xl font-bold text-blue-600">{goals.protein}</div>
              <div className="text-sm text-muted-foreground">Protein (g)</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
              <div className="text-2xl font-bold text-orange-600">{goals.carbs}</div>
              <div className="text-sm text-muted-foreground">Carbs (g)</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <div className="text-2xl font-bold text-green-600">{goals.fat}</div>
              <div className="text-sm text-muted-foreground">Fat (g)</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-600">{goals.fiber}</div>
              <div className="text-sm text-muted-foreground">Fiber (g)</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/20">
              <div className="text-2xl font-bold text-cyan-600">{goals.water}</div>
              <div className="text-sm text-muted-foreground">Water (L)</div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">WHO Guidelines Applied</div>
                <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                  These goals follow World Health Organization recommendations for optimal health and athletic
                  performance. Adjust based on your training intensity and personal response.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button>Save Goals</Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
