"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HealthDashboard } from "@/components/health/health-dashboard"
import { VitalTracker } from "@/components/health/vital-tracker"
import { SleepMonitor } from "@/components/health/sleep-monitor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Moon, Activity } from "lucide-react"

export default function HealthPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Health Overview */}
        <div className="mb-8">
          <HealthDashboard selectedDate={selectedDate} />
        </div>

        {/* Detailed Health Tracking */}
        <Tabs defaultValue="vitals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="vitals" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Vitals
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4">
            <VitalTracker />
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <SleepMonitor />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Activity content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
