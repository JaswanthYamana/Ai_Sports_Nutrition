"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Droplets, Activity, Plus, Clock } from "lucide-react"
import { toast } from 'react-toastify'
import { healthAPI } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

interface VitalTrackerProps {
  selectedDate: Date
}

interface VitalLog {
  time: string
  type: string
  value: number
  unit: string
}

export function VitalTracker({ selectedDate }: VitalTrackerProps) {
  const { user } = useAuth()
  const [hydrationInput, setHydrationInput] = useState("")
  const [heartRateInput, setHeartRateInput] = useState("")
  const [stepsInput, setStepsInput] = useState("")

  const [vitals, setVitals] = useState({
    hydration: {
      current: 2.1,
      target: 3.0,
      logs: [] as VitalLog[]
    },
    heartRate: {
      current: 72,
      readings: [] as VitalLog[]
    },
    activity: {
      steps: 8420,
      target: 10000
    }
  })

  const logVital = async (type: string, value: number, unit: string) => {
    if (!user?.id) {
      toast.error("Please login to log vitals")
      return
    }

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    try {
      await healthAPI.logVitals({
        userId: user.id,
        type,
        value,
        unit,
        time
      })

      // Update local state
      setVitals(prev => {
        const updated = { ...prev }
        switch (type) {
          case 'hydration':
            updated.hydration.current = Math.round((prev.hydration.current + value) * 10) / 10
            updated.hydration.logs = [
              { time, type: "Water", value, unit },
              ...prev.hydration.logs
            ]
            break
          case 'heartRate':
            updated.heartRate.current = value
            updated.heartRate.readings = [
              { time, type: "Manual", value, unit },
              ...prev.heartRate.readings
            ]
            break
          case 'steps':
            updated.activity.steps = value
            break
        }
        return updated
      })

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} logged successfully!`)
    } catch (error) {
      console.error(`Error logging ${type}:`, error)
      toast.error(`Failed to log ${type}`)
    }
  }

  const handleHydrationLog = () => {
    const amount = Number.parseFloat(hydrationInput)
    if (amount && amount > 0 && amount <= 2) {
      logVital('hydration', amount, 'L')
      setHydrationInput("")
    } else {
      toast.error("Please enter a valid amount between 0.1 and 2.0 liters")
    }
  }

  const handleHeartRateLog = () => {
    const hr = Number.parseInt(heartRateInput)
    if (hr && hr >= 40 && hr <= 200) {
      logVital('heartRate', hr, 'bpm')
      setHeartRateInput("")
    } else {
      toast.error("Please enter a valid heart rate between 40 and 200 BPM")
    }
  }

  const handleStepsLog = () => {
    const steps = Number.parseInt(stepsInput)
    if (steps && steps > 0 && steps <= 50000) {
      logVital('steps', steps, 'steps')
      setStepsInput("")
    } else {
      toast.error("Please enter a valid step count between 1 and 50,000")
    }
  }

  return (
    <div className="space-y-8">
      {/* Quick Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Quick Log
          </CardTitle>
          <CardDescription>Log your vital signs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Hydration Log */}
            <div className="space-y-2">
              <Label>Add Water (L)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0.5"
                  value={hydrationInput}
                  onChange={(e) => setHydrationInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleHydrationLog}>Add</Button>
              </div>
            </div>

            {/* Heart Rate Log */}
            <div className="space-y-2">
              <Label>Heart Rate (BPM)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="72"
                  value={heartRateInput}
                  onChange={(e) => setHeartRateInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleHeartRateLog}>Log</Button>
              </div>
            </div>

            {/* Steps Log */}
            <div className="space-y-2">
              <Label>Steps Count</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="1000"
                  value={stepsInput}
                  onChange={(e) => setStepsInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleStepsLog}>Log</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hydration Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-500" />
            Hydration Tracking
          </CardTitle>
          <CardDescription>Monitor your daily water intake</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-cyan-600">{vitals.hydration.current}L</div>
              <div className="text-sm text-muted-foreground">of {vitals.hydration.target}L target</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                {Math.round((vitals.hydration.current / vitals.hydration.target) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          <Progress value={(vitals.hydration.current / vitals.hydration.target) * 100} className="h-3" />

          <div className="space-y-3">
            <h4 className="font-medium">Today's Intake</h4>
            <div className="space-y-2">
              {vitals.hydration.logs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-4 h-4 text-cyan-500" />
                    <div>
                      <div className="font-medium text-sm">{log.value}L {log.type}</div>
                      <div className="text-xs text-muted-foreground">{log.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heart Rate Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Heart Rate Monitoring
          </CardTitle>
          <CardDescription>Track your heart rate throughout the day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">{vitals.heartRate.current}</div>
            <div className="text-sm text-muted-foreground">Current BPM</div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recent Readings</h4>
            <div className="space-y-2">
              {vitals.heartRate.readings.map((reading, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-red-500" />
                    <div>
                      <div className="font-medium text-sm">{reading.value} BPM</div>
                      <div className="text-xs text-muted-foreground">{reading.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {reading.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Activity Progress
          </CardTitle>
          <CardDescription>Track your daily steps and movement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-600">{vitals.activity.steps.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">of {vitals.activity.target.toLocaleString()} steps</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                {Math.round((vitals.activity.steps / vitals.activity.target) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          <Progress value={(vitals.activity.steps / vitals.activity.target) * 100} className="h-3" />

          <div className="text-sm text-muted-foreground text-center">
            {vitals.activity.target - vitals.activity.steps > 0
              ? `${(vitals.activity.target - vitals.activity.steps).toLocaleString()} steps to go!`
              : "Daily goal achieved! 🎉"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
