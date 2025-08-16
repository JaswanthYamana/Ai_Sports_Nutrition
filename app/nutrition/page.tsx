"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { NutritionDashboard } from "@/components/nutrition/nutrition-dashboard"
import { FoodLogger } from "@/components/nutrition/food-logger"
import { MealPlanner } from "@/components/nutrition/meal-planner"
import { RecipeLibrary } from "@/components/nutrition/recipe-library"
import { NutritionGoals } from "@/components/nutrition/nutrition-goals"
import { AIFoodRecognition } from "@/components/nutrition/ai-food-recognition"
import { HydrationTracker } from "@/components/nutrition/hydration-tracker"
import { SupplementGuide } from "@/components/nutrition/supplement-guide"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Target, BookOpen, Calendar, Plus, TrendingUp, Camera, Droplets, Pill } from "lucide-react"

export default function NutritionPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dietType, setDietType] = useState("balanced") // balanced, vegetarian, vegan, keto, etc.

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Apple className="w-4 h-4" />
              Fuel Your Body Right
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nutrition Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered nutrition tracking with food recognition, personalized meal plans, and WHO-compliant guidance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mb-12">
            <NutritionDashboard selectedDate={selectedDate} />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="today" className="space-y-8">
            <TabsList className="grid w-full grid-cols-8 max-w-4xl mx-auto">
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Today
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Goals
              </TabsTrigger>
              <TabsTrigger value="planner" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Planner
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Recipes
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                AI Scan
              </TabsTrigger>
              <TabsTrigger value="hydration" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Hydration
              </TabsTrigger>
              <TabsTrigger value="supplements" className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Supplements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <FoodLogger selectedDate={selectedDate} dietType={dietType} />
            </TabsContent>

            <TabsContent value="goals">
              <NutritionGoals dietType={dietType} onDietTypeChange={setDietType} />
            </TabsContent>

            <TabsContent value="planner">
              <MealPlanner dietType={dietType} />
            </TabsContent>

            <TabsContent value="recipes">
              <RecipeLibrary dietType={dietType} />
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Nutrition Progress
                  </CardTitle>
                  <CardDescription>Track your nutrition trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Log meals for a few days to see your progress trends</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="camera">
              <AIFoodRecognition selectedDate={selectedDate} dietType={dietType} />
            </TabsContent>

            <TabsContent value="hydration">
              <HydrationTracker selectedDate={selectedDate} />
            </TabsContent>

            <TabsContent value="supplements">
              <SupplementGuide dietType={dietType} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
