"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Heart, Droplets, Activity, TrendingUp, Moon, AlertTriangle } from "lucide-react"
import { healthAPI } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "next-themes"
import { toast } from "react-toastify"

interface HealthDashboardProps {
  selectedDate: Date
}

export function HealthDashboard({ selectedDate }: HealthDashboardProps) {
  const { user } = useAuth()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    heartRate: { current: 0, resting: 0, max: 185, zone: 'Resting' },
    hydration: { current: 0, target: 3.0, percentage: 0 },
    sleep: { lastNight: 0, target: 8.0, quality: 'Good' },
    activity: { steps: 0, target: 10000, percentage: 0 }
  })
  const [trends, setTrends] = useState({
    heartRate: { data: [], direction: '', change: 0 },
    hydration: { data: [], direction: '', change: 0 },
    steps: { data: [], direction: '', change: 0 },
    sleep: { data: [], consistency: 0 }
  })
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData()
      fetchRecommendations()
    }
  }, [user, selectedDate])

  const fetchDashboardData = async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      const dashData = await healthAPI.getDashboard(user.id)
      
      // Update metrics with real data
      setMetrics({
        heartRate: {
          current: dashData.latest?.heartRate?.value || 0,
          resting: dashData.averages?.heartRate || 0,
          max: 185,
          zone: getHeartRateZone(dashData.latest?.heartRate?.value || 0)
        },
        hydration: {
          current: dashData.latest?.hydration?.value || 0,
          target: 3.0,
          percentage: Math.round(((dashData.latest?.hydration?.value || 0) / 3.0) * 100)
        },
        sleep: {
          lastNight: dashData.latest?.sleep?.duration || 0,
          target: 8.0,
          quality: dashData.latest?.sleep?.quality || "Good"
        },
        activity: {
          steps: dashData.latest?.steps?.value || 0,
          target: 10000,
          percentage: Math.round(((dashData.latest?.steps?.value || 0) / 10000) * 100)
        }
      })

      // Update trends
      const [heartRateTrend, hydrationTrend, stepsTrend, sleepStats] = await Promise.all([
        healthAPI.getVitalTrends(user.id, 'heartRate'),
        healthAPI.getVitalTrends(user.id, 'hydration'),
        healthAPI.getVitalTrends(user.id, 'steps'),
        healthAPI.getSleepStats(user.id)
      ])

      setTrends({
        heartRate: {
          data: heartRateTrend.data?.trends?.data || [],
          direction: heartRateTrend.data?.trends?.direction || '',
          change: heartRateTrend.data?.trends?.change || 0
        },
        hydration: {
          data: hydrationTrend.data?.trends?.data || [],
          direction: hydrationTrend.data?.trends?.direction || '',
          change: hydrationTrend.data?.trends?.change || 0
        },
        steps: {
          data: stepsTrend.data?.trends?.data || [],
          direction: stepsTrend.data?.trends?.direction || '',
          change: stepsTrend.data?.trends?.change || 0
        },
        sleep: {
          data: sleepStats.data?.stats?.trend || [],
          consistency: sleepStats.data?.stats?.consistency || 0
        }
      })
    } catch (error) {
      console.error('Error fetching health data:', error)
      toast.error('Failed to load health data')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    if (!user?.id) return

    try {
      const response = await healthAPI.getSleepRecommendations(user.id)
      setRecommendations(response.data.recommendations)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  const getHeartRateZone = (hr: number) => {
    if (hr < 60) return "Resting"
    if (hr < 100) return "Light"
    if (hr < 140) return "Moderate"
    if (hr < 170) return "Vigorous"
    return "Maximum"
  }

  return (
    <div className="space-y-8">
      {/* Health Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Heart Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Heart Rate
            </CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.heartRate.current} BPM</div>
            <p className="text-xs text-muted-foreground mt-1">
              Zone: {metrics.heartRate.zone}
            </p>
            <Progress 
              value={(metrics.heartRate.current / metrics.heartRate.max) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        {/* Hydration Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Hydration
            </CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.hydration.current}L</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: {metrics.hydration.target}L
            </p>
            <Progress 
              value={metrics.hydration.percentage} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        {/* Sleep Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Sleep
            </CardTitle>
            <Moon className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sleep.lastNight}h</div>
            <p className="text-xs text-muted-foreground mt-1">
              Quality: {metrics.sleep.quality}
            </p>
            <Progress 
              value={(metrics.sleep.lastNight / metrics.sleep.target) * 100} 
              className="mt-3"
            />
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activity.steps.toLocaleString()} steps</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: {metrics.activity.target.toLocaleString()}
            </p>
            <Progress 
              value={metrics.activity.percentage} 
              className="mt-3"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Health Insights</AlertTitle>
          <AlertDescription>
            {recommendations[0]}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
