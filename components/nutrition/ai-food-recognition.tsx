"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Scan, CheckCircle, AlertCircle, Zap } from "lucide-react"

interface AIFoodRecognitionProps {
  selectedDate: Date
  dietType: string
}

const recognizedFoods = [
  {
    name: "Grilled Chicken Breast",
    confidence: 95,
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    portion: "100g"
  },
  {
    name: "Brown Rice",
    confidence: 88,
    calories: 112,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    portion: "100g"
  },
  {
    name: "Steamed Broccoli",
    confidence: 92,
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    portion: "100g"
  }
]

export function AIFoodRecognition({ selectedDate, dietType }: AIFoodRecognitionProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setHasImage(true)
      analyzeFood()
    }
  }

  const analyzeFood = () => {
    setIsScanning(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsScanning(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const resetAnalysis = () => {
    setHasImage(false)
    setAnalysisComplete(false)
    setIsScanning(false)
  }

  const totalCalories = recognizedFoods.reduce((sum, food) => sum + food.calories, 0)
  const totalProtein = recognizedFoods.reduce((sum, food) => sum + food.protein, 0)
  const totalCarbs = recognizedFoods.reduce((sum, food) => sum + food.carbs, 0)
  const totalFat = recognizedFoods.reduce((sum, food) => sum + food.fat, 0)

  return (
    <div className="space-y-8">
      {/* Camera/Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            AI Food Recognition
          </CardTitle>
          <CardDescription>
            Snap a photo of your meal for instant nutrition analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-video">
              {!hasImage ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Take a photo or upload an image</p>
                    <p className="text-sm opacity-75">Position your meal clearly in the frame</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    {isScanning ? (
                      <>
                        <Scan className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                        <p className="text-lg">Analyzing food...</p>
                        <Progress value={66} className="mt-4 w-48 mx-auto" />
                      </>
                    ) : analysisComplete ? (
                      <>
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                        <p className="text-lg">Analysis Complete!</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg">Image uploaded</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {!hasImage ? (
                <>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Button onClick={resetAnalysis} variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  {analysisComplete && (
                    <Button>
                      <Zap className="w-4 h-4 mr-2" />
                      Add to Log
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisComplete && (
        <div className="space-y-6">
          {/* Nutrition Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Summary</CardTitle>
              <CardDescription>
                AI-detected food items and their nutritional content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {totalCalories}
                  </div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {totalProtein.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {totalCarbs.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {totalFat.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </div>
              </div>

              {/* Detected Foods */}
              <div className="space-y-4">
                <h4 className="font-medium">Detected Foods:</h4>
                {recognizedFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        food.confidence >= 90 ? 'bg-green-100 dark:bg-green-900/20' :
                        food.confidence >= 80 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                        'bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {food.confidence >= 90 ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium">{food.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {food.portion} • {food.calories} cal
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant={
                        food.confidence >= 90 ? 'default' :
                        food.confidence >= 80 ? 'secondary' : 'destructive'
                      }>
                        {food.confidence}% confident
                      </Badge>
                      <div className="text-right text-sm">
                        <div>P: {food.protein}g</div>
                        <div>C: {food.carbs}g</div>
                        <div>F: {food.fat}g</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Nutrition Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Excellent Protein Balance
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    This meal provides {totalProtein.toFixed(1)}g of high-quality protein, perfect for muscle recovery after training.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Balanced Macronutrients
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Great macro distribution for {dietType} athletes. The carb-to-protein ratio supports energy and recovery.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                    Hydration Reminder
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Don't forget to drink water with this meal to aid digestion and nutrient absorption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
