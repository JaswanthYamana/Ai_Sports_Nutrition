"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { User, Save, Plus, X } from "lucide-react"
import { toast } from "react-toastify"

interface DetailedProfileFormProps {
  onProfileUpdated?: () => void
}

export function DetailedProfileForm({ onProfileUpdated }: DetailedProfileFormProps) {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bodyType: '',
    activityLevel: '',
    medicalConditions: [] as string[],
    allergies: [] as string[],
    goals: [] as string[]
  })
  const [newMedicalCondition, setNewMedicalCondition] = useState('')
  const [newAllergy, setNewAllergy] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        height: user.height?.toString() || '',
        weight: user.weight?.toString() || '',
        bodyType: user.bodyType || '',
        activityLevel: user.activityLevel || '',
        medicalConditions: user.medicalConditions || [],
        allergies: user.allergies || [],
        goals: user.goals || []
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addMedicalCondition = () => {
    if (newMedicalCondition.trim() && !formData.medicalConditions.includes(newMedicalCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, newMedicalCondition.trim()]
      }))
      setNewMedicalCondition('')
    }
  }

  const removeMedicalCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter(c => c !== condition)
    }))
  }

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }))
      setNewAllergy('')
    }
  }

  const removeAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }))
  }

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            height: formData.height ? parseFloat(formData.height) : undefined,
            weight: formData.weight ? parseFloat(formData.weight) : undefined,
            bodyType: formData.bodyType,
            activityLevel: formData.activityLevel,
            medicalConditions: formData.medicalConditions,
            allergies: formData.allergies,
            goals: formData.goals
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        updateUser(data.user)
        toast.success('Profile updated successfully! Your AI assistant now has more personalized data.')
        onProfileUpdated?.()
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const bodyTypes = [
    { value: 'Ectomorph', label: 'Ectomorph (Lean, hard to gain weight)' },
    { value: 'Mesomorph', label: 'Mesomorph (Muscular, athletic build)' },
    { value: 'Endomorph', label: 'Endomorph (Rounder, easier to gain weight)' },
    { value: 'Not Sure', label: 'Not Sure' }
  ]

  const activityLevels = [
    { value: 'Sedentary', label: 'Sedentary (Little to no exercise)' },
    { value: 'Lightly Active', label: 'Lightly Active (Light exercise 1-3 days/week)' },
    { value: 'Moderately Active', label: 'Moderately Active (Moderate exercise 3-5 days/week)' },
    { value: 'Very Active', label: 'Very Active (Hard exercise 6-7 days/week)' },
    { value: 'Extremely Active', label: 'Extremely Active (Very hard exercise, physical job)' }
  ]

  const goalOptions = [
    'weight-loss',
    'muscle-gain',
    'endurance',
    'flexibility',
    'strength',
    'general'
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Detailed Profile Information
        </CardTitle>
        <CardDescription>
          Complete your profile to get personalized AI recommendations for diet plans, workouts, and health advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Physical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                min="100"
                max="250"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                min="30"
                max="300"
              />
            </div>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select value={formData.bodyType} onValueChange={(value) => handleInputChange('bodyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <Label>Fitness Goals</Label>
            <div className="flex flex-wrap gap-2">
              {goalOptions.map((goal) => (
                <Badge
                  key={goal}
                  variant={formData.goals.includes(goal) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleGoal(goal)}
                >
                  {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-2">
            <Label>Medical Conditions (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add medical condition"
                value={newMedicalCondition}
                onChange={(e) => setNewMedicalCondition(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMedicalCondition())}
              />
              <Button type="button" onClick={addMedicalCondition} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.medicalConditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {condition}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeMedicalCondition(condition)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2">
            <Label>Allergies (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add allergy"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
              />
              <Button type="button" onClick={addAllergy} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map((allergy, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {allergy}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeAllergy(allergy)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Updating Profile...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile Information
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
