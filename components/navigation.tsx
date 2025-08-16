"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Menu,
  X,
  Trophy,
  Brain,
  Apple,
  Heart,
  Calendar,
  Users,
  Target,
  Bell,
  User,
  Sun,
  Moon,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from 'react-toastify'
import { useTheme } from "next-themes"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { icon: Brain, label: "Digital Coach", href: "/coach" },
    { icon: Apple, label: "Nutrition", href: "/nutrition" },
    { icon: Heart, label: "Health", href: "/health" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: Target, label: "Career", href: "/profile" },
  ]

  const handleNotifications = () => {
    console.log("Opening notifications")
    toast.success(`You have ${notifications} new notifications`)
    setNotifications(0)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-7xl mx-auto glass-effect border rounded-2xl shadow-lg backdrop-blur-md bg-background/80">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-200">
                SportsPro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    className="gap-2 hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-200 rounded-xl"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl hover:scale-105 transition-transform duration-200"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              <Button variant="ghost" size="sm" className="relative rounded-xl hover:scale-105 transition-transform duration-200" onClick={handleNotifications}>
                <Bell className="w-4 h-4" />
                {notifications > 0 && <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />}
              </Button>

              <Link href="/profile">
                <Button variant="ghost" size="sm" className="hidden sm:flex rounded-xl hover:scale-105 transition-transform duration-200">
                  <User className="w-4 h-4" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden rounded-xl hover:scale-105 transition-transform duration-200" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-muted/20">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <Button 
                      variant={pathname === item.href ? "default" : "ghost"} 
                      className="justify-start gap-2 h-12 w-full rounded-xl hover:scale-105 transition-transform duration-200" 
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
