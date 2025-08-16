"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

interface User {
  id: string
  name: string
  email: string
  role: string
  stats?: {
    currentStreak: number
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
  getAuthHeaders: () => { Authorization: string }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        toast.success('Logged in successfully!')
      } else {
        toast.error(data.error || 'Login failed')
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (response.ok) {
        toast.success('Registration successful! Please verify your email.')
      } else {
        toast.error(result.error || 'Registration failed')
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
      toast.success('Logged out successfully!')
    }
  }

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}