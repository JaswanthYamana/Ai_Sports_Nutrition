"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, 
  Activity, 
  BarChart3, 
  Search, 
  Shield, 
  Mail, 
  Trash2, 
  Edit,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  verifiedUsers: number;
  activeUsers: number;
  totalWorkouts: number;
  totalNutritionLogs: number;
  totalVitalLogs: number;
  verificationRate: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  sport: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

interface SystemStats {
  last24h: { newUsers: number; newWorkouts: number; newNutritionLogs: number };
  last7d: { newUsers: number; newWorkouts: number; newNutritionLogs: number };
  last30d: { newUsers: number; newWorkouts: number; newNutritionLogs: number };
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminStats();
      fetchUsers();
      fetchSystemStats();
    }
  }, [user, currentPage, searchTerm, roleFilter, verifiedFilter]);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      if (searchTerm) params.append('search', searchTerm);
      if (roleFilter) params.append('role', roleFilter);
      if (verifiedFilter) params.append('verified', verifiedFilter);

      const response = await fetch(`/api/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchSystemStats = async () => {
    try {
      const response = await fetch('/api/admin/system-stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSystemStats(data);
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const verifyUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="text-center">Access Denied</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor system performance, and oversee the platform</p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.verificationRate}% verified
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
                <p className="text-xs text-muted-foreground">
                  Across all users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nutrition Logs</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalNutritionLogs}</div>
                <p className="text-xs text-muted-foreground">
                  Food tracking entries
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Performance */}
        {systemStats && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Last 24 Hours</h4>
                  <div className="space-y-1 text-sm">
                    <div>New Users: {systemStats.last24h.newUsers}</div>
                    <div>New Workouts: {systemStats.last24h.newWorkouts}</div>
                    <div>New Nutrition Logs: {systemStats.last24h.newNutritionLogs}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Last 7 Days</h4>
                  <div className="space-y-1 text-sm">
                    <div>New Users: {systemStats.last7d.newUsers}</div>
                    <div>New Workouts: {systemStats.last7d.newWorkouts}</div>
                    <div>New Nutrition Logs: {systemStats.last7d.newNutritionLogs}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Last 30 Days</h4>
                  <div className="space-y-1 text-sm">
                    <div>New Users: {systemStats.last30d.newUsers}</div>
                    <div>New Workouts: {systemStats.last30d.newWorkouts}</div>
                    <div>New Nutrition Logs: {systemStats.last30d.newNutritionLogs}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
              <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Verified" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                {loadingUsers ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Sport</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user._id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                              </TableCell>
                              <TableCell>{user.sport}</TableCell>
                              <TableCell>
                                <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.isActive ? 'default' : 'destructive'}>
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {user.isEmailVerified ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateUser(user._id, { role: user.role === 'admin' ? 'user' : 'admin' })}
                                    disabled={user._id === localStorage.getItem('userId')}
                                  >
                                    <Shield className="h-4 w-4" />
                                  </Button>
                                  
                                  {!user.isEmailVerified && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => verifyUser(user._id)}
                                    >
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  )}
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateUser(user._id, { isActive: !user.isActive })}
                                    disabled={user._id === localStorage.getItem('userId')}
                                  >
                                    {user.isActive ? <Eye className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                                  </Button>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        disabled={user._id === localStorage.getItem('userId')}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete {user.name}? This action cannot be undone and will remove all their data.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteUser(user._id)}>
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage <= 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage >= totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 