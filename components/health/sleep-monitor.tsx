"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Clock, TrendingUp, Bed } from "lucide-react"
import { healthAPI } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

interface SleepMonitorProps {
  selectedDate: Date
}

export function SleepMonitor({ selectedDate }: SleepMonitorProps) {
  const { user } = useAuth()
  const [bedtime, setBedtime] = useState("")
  const [wakeTime, setWakeTime] = useState("")
  const [quality, setQuality] = useState("good")
  const [loading, setLoading] = useState(false)

  const [sleepData, setSleepData] = useState({
    lastNight: {
      duration: 0,
      quality: "Good",
      bedtime: "",
      wakeTime: "",
      deepSleep: 0,
      remSleep: 0,
      lightSleep: 0,
      efficiency: 0,
    },
    weeklyAverage: {
      duration: 0,
      quality: "Good",
      efficiency: 0,
    }
  })

  useEffect(() => {
    fetchSleepData()
  }, [user])

  const fetchSleepData = async () => {
    if (!user?.id) return

    try {
      const [sleepLogs, stats] = await Promise.all([
        healthAPI.getSleep(user.id),
        healthAPI.getSleepStats(user.id)
      ])

      const latestSleep = sleepLogs.data.sleepLogs[0] || null
      const weekStats = stats.data.stats || null

      if (latestSleep) {
        setSleepData(prev => ({
          ...prev,
          lastNight: {
            duration: latestSleep.duration,
            quality: latestSleep.quality,
            bedtime: latestSleep.bedtime,
            wakeTime: latestSleep.wakeTime,
            deepSleep: latestSleep.deepSleep || 0,
            remSleep: latestSleep.remSleep || 0,
            lightSleep: latestSleep.lightSleep || 0,
            efficiency: Math.round((latestSleep.duration / 8) * 100),
          }
        }))
      }

      if (weekStats) {
        setSleepData(prev => ({
          ...prev,
          weeklyAverage: {
            duration: weekStats.averageDuration,
            quality: weekStats.bestQuality,
            efficiency: Math.round((weekStats.averageDuration / 8) * 100),
          }
        }))
      }
    } catch (error) {
      console.error('Error fetching sleep data:', error)
    }
  }

  const handleSleepLog = async () => {
    if (!user?.id) return
    if (!bedtime || !wakeTime) {
      alert("Please enter both bedtime and wake time")
      return
    }

    setLoading(true)

    try {
      // Calculate duration in hours
      const bedDate = new Date(`2000/01/01 ${bedtime}`)
      const wakeDate = new Date(`2000/01/01 ${wakeTime}`)
      if (wakeDate < bedDate) wakeDate.setDate(wakeDate.getDate() + 1)
      const duration = (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60 * 60)

      await healthAPI.logSleep({
        userId: user.id,
        bedtime,
        wakeTime,
        duration,
        quality,
        deepSleep: duration * 0.25, // Estimate deep sleep as 25% of total
        remSleep: duration * 0.25,  // Estimate REM sleep as 25% of total
        lightSleep: duration * 0.5,  // Estimate light sleep as 50% of total
      })

      // Refresh sleep data
      await fetchSleepData()

      // Reset form
      setBedtime("")
      setWakeTime("")
      setQuality("good")
    } catch (error) {
      console.error('Error logging sleep:', error)
      alert("Failed to log sleep data")
    } finally {
      setLoading(false)
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "good":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "fair":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "poor":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      {/* Sleep Log Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            Log Sleep
          </CardTitle>
          <CardDescription>Record your sleep schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Bedtime</Label>
              <Input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Wake Time</Label>
              <Input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sleep Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full" 
                onClick={handleSleepLog}
                disabled={loading}
              >
                {loading ? "Logging..." : "Log Sleep"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-500" />
              Last Night's Sleep
            </CardTitle>
            <CardDescription>
              {sleepData.lastNight.bedtime} - {sleepData.lastNight.wakeTime}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">{sleepData.lastNight.duration}h</div>
              <Badge className={getQualityColor(sleepData.lastNight.quality)}>
                {sleepData.lastNight.quality}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{sleepData.lastNight.efficiency}%</div>
                <div className="text-sm text-muted-foreground">Efficiency</div>
              </div>
              <div>
                <div className="text-lg font-semibold">8.0h</div>
                <div className="text-sm text-muted-foreground">Target</div>
              </div>
            </div>

            <Progress value={(sleepData.lastNight.duration / 8) * 100} className="h-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Weekly Average
            </CardTitle>
            <CardDescription>Your sleep patterns this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{sleepData.weeklyAverage.duration}h</div>
              <Badge className={getQualityColor(sleepData.weeklyAverage.quality)}>
                {sleepData.weeklyAverage.quality}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{sleepData.weeklyAverage.efficiency}%</div>
                <div className="text-sm text-muted-foreground">Avg Efficiency</div>
              </div>
              <div>
                <div className="text-lg font-semibold">7</div>
                <div className="text-sm text-muted-foreground">Days Tracked</div>
              </div>
            </div>

            <Progress value={(sleepData.weeklyAverage.duration / 8) * 100} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Sleep Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-500" />
            Sleep Stages
          </CardTitle>
          <CardDescription>Last night's sleep breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500 flex items-center justify-center mb-3">
                <span className="text-white font-bold">
                  {Math.round((sleepData.lastNight.deepSleep / sleepData.lastNight.duration) * 100)}%
                </span>
              </div>
              <div className="font-medium">Deep Sleep</div>
              <div className="text-sm text-muted-foreground">{sleepData.lastNight.deepSleep}h</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500 flex items-center justify-center mb-3">
                <span className="text-white font-bold">
                  {Math.round((sleepData.lastNight.remSleep / sleepData.lastNight.duration) * 100)}%
                </span>
              </div>
              <div className="font-medium">REM Sleep</div>
              <div className="text-sm text-muted-foreground">{sleepData.lastNight.remSleep}h</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 flex items-center justify-center mb-3">
                <span className="text-white font-bold">
                  {Math.round((sleepData.lastNight.lightSleep / sleepData.lastNight.duration) * 100)}%
                </span>
              </div>
              <div className="font-medium">Light Sleep</div>
              <div className="text-sm text-muted-foreground">{sleepData.lastNight.lightSleep}h</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
