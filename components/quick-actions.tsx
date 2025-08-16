"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Plus, BookOpen, Apple, Dumbbell, Calendar, Users, ShoppingBag } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Start Workout",
      description: "Begin your daily training session",
      icon: Play,
      color: "bg-green-500 hover:bg-green-600",
      action: "primary",
      href: "/workout",
    },
    {
      title: "Log Meal",
      description: "Track your nutrition intake",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      action: "secondary",
      href: "/nutrition",
    },
    {
      title: "Learn Technique",
      description: "Watch tutorial videos",
      icon: BookOpen,
      color: "bg-purple-500 hover:bg-purple-600",
      action: "secondary",
      href: "/learn",
    },
    {
      title: "Plan Diet",
      description: "Create meal plans",
      icon: Apple,
      color: "bg-orange-500 hover:bg-orange-600",
      action: "secondary",
      href: "/nutrition",
    },
    {
      title: "Track Progress",
      description: "View your improvements",
      icon: Dumbbell,
      color: "bg-red-500 hover:bg-red-600",
      action: "secondary",
      href: "/progress",
    },
    {
      title: "Find Events",
      description: "Discover competitions",
      icon: Calendar,
      color: "bg-indigo-500 hover:bg-indigo-600",
      action: "secondary",
      href: "/events",
    },
    {
      title: "Join Community",
      description: "Connect with athletes",
      icon: Users,
      color: "bg-pink-500 hover:bg-pink-600",
      action: "secondary",
      href: "/community",
    },
    {
      title: "Shop Gear",
      description: "Find equipment deals",
      icon: ShoppingBag,
      color: "bg-cyan-500 hover:bg-cyan-600",
      action: "secondary",
      href: "/equipment",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div
                className={`w-16 h-16 mx-auto rounded-2xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="text-sm">{action.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full" variant={action.action === "primary" ? "default" : "outline"}>
                {action.action === "primary" ? "Start Now" : "Open"}
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
