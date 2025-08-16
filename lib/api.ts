import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

// Simple in-memory cache for health data
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 60 * 1000 // 1 minute TTL

// Helper function to get cached data
const getCachedData = (key: string) => {
  const cached = cache.get(key)
  if (!cached) return null
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return cached.data
}

// Helper function to set cached data
const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() })
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Auth API
export const authAPI = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
}

// Digital Coach API
export const coachAPI = {
  getTrainingPaths: (sport: string) => api.get(`/coach/paths/${sport}`),
  verifyMotion: (data: any) => api.post('/coach/verify-motion', data),
  getProgress: (userId: string) => api.get(`/coach/progress/${userId}`),
  updateSkillLevel: (userId: string, data: any) => api.put(`/coach/skill-level/${userId}`, data),
}

// Health API
export const healthAPI = {
  // Get health dashboard data with caching
  getDashboard: async (userId: string) => {
    const cacheKey = `health-dashboard-${userId}`
    const cached = getCachedData(cacheKey)
    if (cached) return { data: cached }

    try {
      const response = await axios.get(`${API_BASE_URL}/health/dashboard/${userId}`)
      setCachedData(cacheKey, response.data)
      return response
    } catch (error) {
      console.error('Error fetching health dashboard:', error)
      throw error
    }
  },

  // Log vital signs
  logVitals: async (data: {
    userId: string
    type: string
    value: number
    unit: string
    time: string
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/health/vitals`, data)
      // Invalidate dashboard cache on new data
      cache.delete(`health-dashboard-${data.userId}`)
      return response
    } catch (error) {
      console.error('Error logging vitals:', error)
      throw error
    }
  },

  // Get vital signs with pagination and filtering
  getVitals: async (userId: string, params?: {
    type?: string
    days?: number
    page?: number
    limit?: number
  }) => {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append('type', params.type)
    if (params?.days) queryParams.append('days', params.days.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    try {
      return await axios.get(
        `${API_BASE_URL}/health/vitals/${userId}?${queryParams.toString()}`
      )
    } catch (error) {
      console.error('Error fetching vitals:', error)
      throw error
    }
  },

  // Get vital trends analysis
  getVitalTrends: async (userId: string, type: string, days: number = 30) => {
    try {
      return await axios.get(
        `${API_BASE_URL}/health/vitals/${userId}/trends?type=${type}&days=${days}`
      )
    } catch (error) {
      console.error('Error fetching vital trends:', error)
      throw error
    }
  },

  // Get sleep data with caching
  getSleep: async (userId: string, days: number = 30) => {
    const cacheKey = `sleep-data-${userId}-${days}`
    const cached = getCachedData(cacheKey)
    if (cached) return { data: cached }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/health/sleep/${userId}?days=${days}`
      )
      setCachedData(cacheKey, response.data)
      return response
    } catch (error) {
      console.error('Error fetching sleep data:', error)
      throw error
    }
  },

  // Log sleep data
  logSleep: async (data: {
    userId: string
    bedtime: string
    wakeTime: string
    duration: number
    quality: string
    deepSleep?: number
    remSleep?: number
    lightSleep?: number
    interruptions?: number
    factors?: string[]
    notes?: string
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/health/sleep`, data)
      // Invalidate sleep caches on new data
      cache.delete(`sleep-data-${data.userId}-30`)
      cache.delete(`sleep-stats-${data.userId}-30`)
      return response
    } catch (error) {
      console.error('Error logging sleep:', error)
      throw error
    }
  },

  // Get sleep statistics with caching
  getSleepStats: async (userId: string, days: number = 30) => {
    const cacheKey = `sleep-stats-${userId}-${days}`
    const cached = getCachedData(cacheKey)
    if (cached) return { data: cached }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/health/sleep/${userId}/stats?days=${days}`
      )
      setCachedData(cacheKey, response.data)
      return response
    } catch (error) {
      console.error('Error fetching sleep stats:', error)
      throw error
    }
  },

  // Get sleep recommendations
  getSleepRecommendations: async (userId: string) => {
    try {
      return await axios.get(
        `${API_BASE_URL}/health/sleep/${userId}/recommendations`
      )
    } catch (error) {
      console.error('Error fetching sleep recommendations:', error)
      throw error
    }
  }
}

// Nutrition API
export const nutritionAPI = {
  getLogs: (userId: string, params?: any) => api.get(`/nutrition/logs/${userId}`, { params }),
  logFood: (data: any) => api.post('/nutrition/logs', data),
  getGoals: (userId: string) => api.get(`/nutrition/goals/${userId}`),
  updateGoals: (userId: string, data: any) => api.put(`/nutrition/goals/${userId}`, data),
  getDailySummary: (userId: string, date?: string) => 
    api.get(`/nutrition/daily/${userId}`, { params: { date } }),
}

// Events API
export const eventsAPI = {
  getAll: (params?: any) => api.get('/events', { params }),
  getById: (id: string) => api.get(`/events/${id}`),
  register: (eventId: string, userId: string) => api.post(`/events/${eventId}/register`, { userId }),
  getRegistered: (userId: string) => api.get(`/events/registered/${userId}`),
}

// Community API
export const communityAPI = {
  getFeed: (params?: any) => api.get('/community/feed', { params }),
  getGroups: () => api.get('/community/groups'),
  joinGroup: (groupId: string, userId: string) => api.post(`/community/groups/${groupId}/join`, { userId }),
  createPost: (data: any) => api.post('/community/posts', data),
  interact: (postId: string, data: any) => api.post(`/community/posts/${postId}/interact`, data),
}

// Career API
export const careerAPI = {
  getProfile: (userId: string) => api.get(`/career/profile/${userId}`),
  updateProfile: (userId: string, data: any) => api.put(`/career/profile/${userId}`, data),
  getMentors: (params?: any) => api.get('/career/mentors', { params }),
  getOpportunities: (userId: string) => api.get(`/career/opportunities/${userId}`),
}

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api