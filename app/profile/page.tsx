"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, Settings, Trophy, Activity, Target, Calendar, 
  Edit, Camera, Shield, Bell, Globe, Heart, Save, X, LogOut
} from "lucide-react"
import { toast } from 'react-toastify'


export default function ProfilePage() {
  const { user, loading, updateUser, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    sport: '',
    experience: '',
    location: ''
  });
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      achievements: true,
      reminders: true
    },
    privacy: {
      profilePublic: true,
      showProgress: true,
      showActivity: true
    },
    units: {
      weight: 'kg',
      distance: 'km',
      temperature: 'celsius'
    }
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        sport: user.sport || '',
        experience: user.experience || '',
        location: user.location || ''
      });
    }
  }, [user]);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('sportspro-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateUser(editForm);
      setIsEditing(false);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      console.log('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      bio: user?.bio || '',
      sport: user?.sport || '',
      experience: user?.experience || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSignOut = () => {
    logout();
    toast.success("Successfully signed out!");
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  if (!user) {
    return null;
  }

  const userProfile = {
    name: user.name,
    email: user.email,
    avatar: user.avatar || "/placeholder-user.jpg",
    sport: user.sport || "Not specified",
    level: user.experience || "Not specified",
    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    location: user.location || "Not specified",
    bio: user.bio || "No bio added yet.",
  }

  const stats = {
    workouts: user.stats?.workouts || 0,
    totalHours: user.stats?.totalHours || 0,
    achievements: user.stats?.achievements || 0,
    currentStreak: user.stats?.currentStreak || 0,
    totalPoints: user.stats?.totalPoints || 0,
    rank: user.stats?.rank || 0,
  }

  const achievements = (user as any).achievements || [
    { title: "First Workout", description: "Completed your first training session", earned: false, date: "Not earned yet" },
    { title: "Week Warrior", description: "Trained for 7 consecutive days", earned: false, date: "Not earned yet" },
    { title: "Goal Crusher", description: "Achieved your first fitness goal", earned: false, date: "Not earned yet" },
    { title: "Champion", description: "Reached advanced skill level", earned: false, date: "Not earned yet" },
  ]

  const recentActivity = (user as any).recentActivity || [
    { type: "info", title: "Welcome to SportsPro!", time: "Just now" },
    { type: "info", title: "Complete your profile to get started", time: "Just now" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <User className="w-4 h-4" />
              Your Profile
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Profile</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your profile, track your progress, and customize your experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                      onClick={() => console.log("Avatar upload feature coming soon!")}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant="secondary">{userProfile.sport}</Badge>
                    <Badge variant="outline">{userProfile.level}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Member since {userProfile.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{userProfile.location}</span>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                      </div>
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button 
                        onClick={handleSignOut} 
                        variant="destructive" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sport">Sport</Label>
                        <Select value={editForm.sport} onValueChange={(value) => setEditForm(prev => ({ ...prev, sport: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select sport" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Football">Football</SelectItem>
                            <SelectItem value="Basketball">Basketball</SelectItem>
                            <SelectItem value="Tennis">Tennis</SelectItem>
                            <SelectItem value="Swimming">Swimming</SelectItem>
                            <SelectItem value="Running">Running</SelectItem>
                            <SelectItem value="Cycling">Cycling</SelectItem>
                            <SelectItem value="Gym/Fitness">Gym/Fitness</SelectItem>
                            <SelectItem value="Yoga">Yoga</SelectItem>
                            <SelectItem value="Boxing">Boxing</SelectItem>
                            <SelectItem value="Golf">Golf</SelectItem>
                            <SelectItem value="Cricket">Cricket</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select value={editForm.experience} onValueChange={(value) => setEditForm(prev => ({ ...prev, experience: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={handleSaveProfile} size="sm" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm" className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {/* Camera button for avatar upload */}
                  <Button className="w-full" variant="outline" onClick={() => console.log("Avatar upload feature coming soon!")}>
                    <Camera className="w-4 h-4 mr-2" />
                    Change Avatar
                  </Button>
                  
                  {/* Settings button that opens the settings tab */}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => {
                      // Find the settings tab and click it
                      const settingsTab = document.querySelector('[data-value="settings"]') as HTMLElement;
                      if (settingsTab) {
                        settingsTab.click();
                      }
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.workouts}</div>
                      <div className="text-sm text-muted-foreground">Workouts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{stats.totalHours}h</div>
                      <div className="text-sm text-muted-foreground">Total Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">{stats.achievements}</div>
                      <div className="text-sm text-muted-foreground">Achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{stats.currentStreak}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">{stats.totalPoints}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">#{stats.rank}</div>
                      <div className="text-sm text-muted-foreground">Global Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="achievements" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="achievements" className="space-y-4">
                      <div className="grid gap-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                              achievement.earned
                                ? "bg-primary/5 border-primary/20"
                                : "bg-muted/30 border-muted"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Trophy className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold">{achievement.title}</div>
                              <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            </div>
                            <div className="text-right">
                              {achievement.earned ? (
                                <Badge className="bg-green-500 text-white">Earned</Badge>
                              ) : (
                                <Badge variant="secondary">{achievement.date}</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Activity className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground">{activity.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                      <div className="space-y-6">
                        {/* Notifications */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Bell className="w-5 h-5 text-primary" />
                            Notifications
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Email Notifications</div>
                                <div className="text-sm text-muted-foreground">Receive updates via email</div>
                              </div>
                              <Switch
                                checked={settings.notifications.email}
                                onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Push Notifications</div>
                                <div className="text-sm text-muted-foreground">Receive push notifications</div>
                              </div>
                              <Switch
                                checked={settings.notifications.push}
                                onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Achievement Alerts</div>
                                <div className="text-sm text-muted-foreground">Get notified of achievements</div>
                              </div>
                              <Switch
                                checked={settings.notifications.achievements}
                                onCheckedChange={(checked) => updateSetting('notifications', 'achievements', checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Reminder Notifications</div>
                                <div className="text-sm text-muted-foreground">Receive workout reminders</div>
                              </div>
                              <Switch
                                checked={settings.notifications.reminders}
                                onCheckedChange={(checked) => updateSetting('notifications', 'reminders', checked)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Privacy */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Privacy
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Public Profile</div>
                                <div className="text-sm text-muted-foreground">Allow others to view your profile</div>
                              </div>
                              <Switch
                                checked={settings.privacy.profilePublic}
                                onCheckedChange={(checked) => updateSetting('privacy', 'profilePublic', checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Show Progress</div>
                                <div className="text-sm text-muted-foreground">Display your progress publicly</div>
                              </div>
                              <Switch
                                checked={settings.privacy.showProgress}
                                onCheckedChange={(checked) => updateSetting('privacy', 'showProgress', checked)}
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Show Activity</div>
                                <div className="text-sm text-muted-foreground">Display your recent activity</div>
                              </div>
                              <Switch
                                checked={settings.privacy.showActivity}
                                onCheckedChange={(checked) => updateSetting('privacy', 'showActivity', checked)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Units */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            Units & Preferences
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="weight-unit">Weight Unit</Label>
                              <Select value={settings.units.weight} onValueChange={(value) => updateSetting('units', 'weight', value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="distance-unit">Distance Unit</Label>
                              <Select value={settings.units.distance} onValueChange={(value) => updateSetting('units', 'distance', value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="km">Kilometers (km)</SelectItem>
                                  <SelectItem value="miles">Miles</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="temperature-unit">Temperature Unit</Label>
                              <Select value={settings.units.temperature} onValueChange={(value) => updateSetting('units', 'temperature', value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Save Settings Button */}
                        <div className="pt-4 border-t">
                          <Button 
                            onClick={() => {
                              // Save settings to localStorage or backend
                              localStorage.setItem('sportspro-settings', JSON.stringify(settings));
                              console.log('Settings saved successfully!');
                            }} 
                            className="w-full"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Settings
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 