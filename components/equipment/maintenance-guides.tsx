"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, CheckCircle, Wrench, Calendar, Plus, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "react-toastify"
import Image from "next/image"

interface MaintenanceTask {
  _id: string
  title: string
  description: string
  equipment: string
  frequency: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'pending' | 'completed'
  dueDate: string
  completedAt?: string
}

interface MaintenanceGuide {
  _id: string
  title: string
  category: string
  difficulty: string
  duration: string
  frequency: string
  equipment: string[]
  steps: string[]
  tips: string[]
  image?: string
  description: string
}

export function MaintenanceGuides() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [maintenanceSchedule, setMaintenanceSchedule] = useState<MaintenanceTask[]>([])
  const [maintenanceGuides, setMaintenanceGuides] = useState<MaintenanceGuide[]>([])
  const [loading, setLoading] = useState(true)
  const [guidesLoading, setGuidesLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState<{
    title: string
    description: string
    equipment: string
    frequency: string
    priority: 'Low' | 'Medium' | 'High'
  }>({
    title: '',
    description: '',
    equipment: '',
    frequency: 'weekly',
    priority: 'Medium'
  })

  // Fetch maintenance guides from backend
  const fetchMaintenanceGuides = async () => {
    setGuidesLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/guides`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setMaintenanceGuides(data.guides || [])
      } else {
        console.error('Failed to fetch maintenance guides')
        // Fallback to empty array if API fails
        setMaintenanceGuides([])
      }
    } catch (error) {
      console.error('Error fetching maintenance guides:', error)
      setMaintenanceGuides([])
    } finally {
      setGuidesLoading(false)
    }
  }

  // Fetch maintenance schedule from backend
  const fetchMaintenanceSchedule = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/schedule`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setMaintenanceSchedule(data.schedule || [])
      } else {
        console.error('Failed to fetch maintenance schedule')
      }
    } catch (error) {
      console.error('Error fetching maintenance schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaintenanceSchedule()
    fetchMaintenanceGuides()
  }, [user])



  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const markTaskComplete = async (taskId: string) => {
    if (!user) {
      toast.error('Please login to mark tasks complete')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/schedule/${taskId}/complete`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        toast.success('Task marked as complete!')
        fetchMaintenanceSchedule() // Refresh the list
      } else {
        toast.error('Failed to mark task complete')
      }
    } catch (error) {
      console.error('Error marking task complete:', error)
      toast.error('Error marking task complete')
    }
  }

  const addMaintenanceTask = async () => {
    if (!user) {
      toast.error('Please login to add maintenance tasks')
      return
    }

    if (!newTask.title || !newTask.equipment) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/schedule`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            equipment: newTask.equipment,
            frequency: newTask.frequency,
            priority: newTask.priority,
          }),
        }
      )

      if (response.ok) {
        toast.success('Maintenance task added successfully!')
        setIsAddDialogOpen(false)
        setNewTask({
          title: '',
          description: '',
          equipment: '',
          frequency: 'weekly',
          priority: 'Medium'
        })
        fetchMaintenanceSchedule() // Refresh the list
      } else {
        toast.error('Failed to add maintenance task')
      }
    } catch (error) {
      console.error('Error adding maintenance task:', error)
      toast.error('Error adding maintenance task')
    }
  }

  const removeMaintenanceTask = async (taskId: string) => {
    if (!user) {
      toast.error('Please login to remove maintenance tasks')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/schedule/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        toast.success('Maintenance task removed!')
        fetchMaintenanceSchedule() // Refresh the list
      } else {
        toast.error('Failed to remove maintenance task')
      }
    } catch (error) {
      console.error('Error removing maintenance task:', error)
      toast.error('Error removing maintenance task')
    }
  }

  const filteredGuides = maintenanceGuides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">Maintenance Guides</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Equipment Maintenance Guides
              </CardTitle>
              <CardDescription>Learn how to properly maintain your sports equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search maintenance guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {guidesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader className="pb-3">
                        <div className="aspect-video bg-muted rounded-lg mb-3" />
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="h-4 bg-muted rounded w-20" />
                            <div className="h-4 bg-muted rounded w-16" />
                          </div>
                          <div className="h-5 bg-muted rounded w-3/4" />
                          <div className="flex gap-4">
                            <div className="h-3 bg-muted rounded w-16" />
                            <div className="h-3 bg-muted rounded w-16" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-3 bg-muted rounded w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : maintenanceGuides.length === 0 ? (
                <div className="text-center py-12">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Maintenance Guides Available</h3>
                  <p className="text-muted-foreground">Maintenance guides will appear here when available.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                    <Card key={guide._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="aspect-video relative mb-3 rounded-lg overflow-hidden bg-muted">
                          {guide.image ? (
                            <Image
                              src={guide.image}
                              alt={guide.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Wrench className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {guide.category}
                            </Badge>
                            <Badge className={getDifficultyColor(guide.difficulty)}>
                              {guide.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {guide.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Wrench className="w-4 h-4" />
                              {guide.frequency}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Equipment Needed:</h4>
                          <div className="flex flex-wrap gap-1">
                            {guide.equipment.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Steps:</h4>
                          <ol className="space-y-1 text-sm">
                            {guide.steps.slice(0, 3).map((step, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">
                                  {index + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                            {guide.steps.length > 3 && (
                              <li className="text-muted-foreground text-xs">+{guide.steps.length - 3} more steps...</li>
                            )}
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Pro Tips:</h4>
                          <ul className="space-y-1 text-sm">
                            {guide.tips.slice(0, 2).map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full">View Full Guide</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                My Maintenance Schedule
              </CardTitle>
              <CardDescription>Keep track of your equipment maintenance tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading maintenance schedule...</p>
                  </div>
                ) : maintenanceSchedule.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No maintenance tasks scheduled</p>
                    <p className="text-sm text-muted-foreground mt-2">Add your first maintenance task below</p>
                  </div>
                ) : (
                  maintenanceSchedule.map((task) => (
                    <div key={task._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.equipment}</p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <span className="text-sm font-medium">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        {task.status === 'pending' ? (
                          <Button 
                            size="sm" 
                            onClick={() => markTaskComplete(task._id)}
                          >
                            Mark Complete
                          </Button>
                        ) : (
                          <Badge variant="secondary">Completed</Badge>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeMaintenanceTask(task._id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Maintenance Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Maintenance Task</DialogTitle>
                      <DialogDescription>
                        Schedule a new maintenance task for your equipment
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Task Title *</Label>
                        <Input
                          id="title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          placeholder="e.g., Clean running shoes"
                        />
                      </div>
                      <div>
                        <Label htmlFor="equipment">Equipment *</Label>
                        <Input
                          id="equipment"
                          value={newTask.equipment}
                          onChange={(e) => setNewTask({...newTask, equipment: e.target.value})}
                          placeholder="e.g., Nike Air Zoom Pegasus"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          placeholder="Optional task details"
                        />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select value={newTask.frequency} onValueChange={(value) => setNewTask({...newTask, frequency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value as 'Low' | 'Medium' | 'High'})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addMaintenanceTask}>
                        Add Task
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
