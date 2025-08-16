"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pill, AlertTriangle, CheckCircle, Info, Heart, Zap } from "lucide-react"

interface SupplementGuideProps {
  dietType: string
}

const supplements = [
  {
    name: "Whey Protein",
    category: "Protein",
    safety: "WHO Approved",
    benefits: ["Muscle recovery", "Protein synthesis", "Post-workout nutrition"],
    dosage: "20-30g post-workout",
    timing: "Within 30 minutes after exercise",
    suitability: ["balanced", "vegetarian"],
    priority: "high",
    evidence: "Strong scientific evidence"
  },
  {
    name: "Creatine Monohydrate",
    category: "Performance",
    safety: "FDA Approved",
    benefits: ["Increased power output", "Muscle strength", "Recovery"],
    dosage: "3-5g daily",
    timing: "Any time of day",
    suitability: ["balanced", "vegetarian", "vegan"],
    priority: "high",
    evidence: "Extensive research backing"
  },
  {
    name: "Vitamin D3",
    category: "Vitamins",
    safety: "WHO Approved",
    benefits: ["Bone health", "Immune function", "Muscle function"],
    dosage: "1000-2000 IU daily",
    timing: "With meals containing fat",
    suitability: ["balanced", "vegetarian", "vegan"],
    priority: "medium",
    evidence: "Well-established benefits"
  },
  {
    name: "Omega-3 Fish Oil",
    category: "Essential Fats",
    safety: "FDA Approved",
    benefits: ["Anti-inflammatory", "Heart health", "Brain function"],
    dosage: "1-2g EPA/DHA daily",
    timing: "With meals",
    suitability: ["balanced"],
    priority: "medium",
    evidence: "Strong clinical evidence"
  },
  {
    name: "Magnesium",
    category: "Minerals",
    safety: "WHO Approved",
    benefits: ["Muscle function", "Sleep quality", "Energy metabolism"],
    dosage: "200-400mg daily",
    timing: "Evening with food",
    suitability: ["balanced", "vegetarian", "vegan"],
    priority: "medium",
    evidence: "Good research support"
  },
  {
    name: "B-Complex",
    category: "Vitamins",
    safety: "FDA Approved",
    benefits: ["Energy metabolism", "Nervous system", "Red blood cell formation"],
    dosage: "1 tablet daily",
    timing: "Morning with breakfast",
    suitability: ["balanced", "vegetarian", "vegan"],
    priority: "low",
    evidence: "Established benefits"
  }
]

const nutritionalGaps = [
  {
    nutrient: "Protein",
    current: 85,
    target: 120,
    unit: "g",
    status: "low"
  },
  {
    nutrient: "Iron",
    current: 12,
    target: 18,
    unit: "mg",
    status: "low"
  },
  {
    nutrient: "Vitamin D",
    current: 15,
    target: 25,
    unit: "μg",
    status: "low"
  },
  {
    nutrient: "Omega-3",
    current: 0.8,
    target: 2.0,
    unit: "g",
    status: "low"
  }
]

export function SupplementGuide({ dietType }: SupplementGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const filteredSupplements = supplements.filter(supplement => {
    const categoryMatch = selectedCategory === "all" || supplement.category.toLowerCase() === selectedCategory
    const suitabilityMatch = supplement.suitability.includes(dietType)
    return categoryMatch && suitabilityMatch
  })

  const categories = ["all", "protein", "vitamins", "minerals", "performance", "essential fats"]

  return (
    <div className="space-y-8">
      {/* Nutritional Gaps Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Nutritional Gap Analysis
          </CardTitle>
          <CardDescription>
            Based on your recent food logs and dietary goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nutritionalGaps.map((gap, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{gap.nutrient}</span>
                  <span className="text-muted-foreground">
                    {gap.current}{gap.unit} / {gap.target}{gap.unit}
                  </span>
                </div>
                <Progress 
                  value={(gap.current / gap.target) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between items-center">
                  <Badge variant={gap.status === "low" ? "destructive" : "default"} size="sm">
                    {gap.status === "low" ? "Below Target" : "Adequate"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(((gap.target - gap.current) / gap.target) * 100)}% below target
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5" />
            WHO/FDA Approved Supplements
          </CardTitle>
          <CardDescription>
            Evidence-based supplement recommendations for {dietType} athletes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredSupplements.map((supplement, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{supplement.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{supplement.category}</Badge>
                          <Badge variant={
                            supplement.priority === "high" ? "default" :
                            supplement.priority === "medium" ? "secondary" : "outline"
                          }>
                            {supplement.priority} priority
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{supplement.safety}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {supplement.evidence}
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h5 className="font-medium mb-2">Benefits:</h5>
                      <div className="flex flex-wrap gap-2">
                        {supplement.benefits.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Dosage & Timing */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Pill className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-sm">Dosage</span>
                        </div>
                        <p className="text-sm">{supplement.dosage}</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-sm">Best Timing</span>
                        </div>
                        <p className="text-sm">{supplement.timing}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Safety Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                    Important Safety Notice
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Always consult with a healthcare provider before starting any supplement regimen, 
                    especially if you have medical conditions or take medications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Quality Matters
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Choose supplements that are third-party tested and certified by organizations 
                    like NSF, USP, or Informed Sport for purity and potency.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Food First Approach
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Supplements should complement, not replace, a balanced diet. Focus on whole foods 
                    as your primary source of nutrients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
