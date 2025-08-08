import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, User, MapPin, Calendar, DollarSign, TrendingUp, Award, Clock, Target, AlertTriangle, BarChart3, GraduationCap, Star, Users, Shield, Home, Brain, Settings, Package, Wrench, FileText, Settings2 } from 'lucide-react';
import { MagikButtonModals } from './MagikButtonModals';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

interface PayrollRecord {
  week: string;
  grossPay: number;
  hoursWorked: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netPay: number;
}

interface ProductTypePerformance {
  productType: 'Refrigerator' | 'Washer' | 'Dryer' | 'HVAC' | 'Plumbing' | 'Electrical' | 'Dishwasher' | 'Range' | 'Microwave' | 'Garbage Disposal';
  attempts: number;
  completions: number;
  completionRate: number;
  avgAttemptsPerRepair: number;
  revenue: number;
  partsRecommendations: number;
  avgPartsValue: number;
}

interface JobCodePerformance {
  jobCode: string;
  description: string;
  attempts: number;
  completions: number;
  completionRate: number;
  avgAttemptsPerRepair: number;
  revenue: number;
  partsUsed: number;
  avgRepairTime: number;
}

interface TechnicianProfile {
  techId: string;
  name: string;
  district: string;
  planningArea: string;
  status: string;
  jobTitle: string;
  joiningDate: string;
  terminationDate?: string;
  payRate: string;
  weeklyAttempts: number;
  weeklyCompletes: number;
  weeklyRevenue: number;
  performanceTier: string;
  completionRate: number;
  payrollHistory?: PayrollRecord[];
  productTypePerformance?: ProductTypePerformance[];
  jobCodePerformance?: JobCodePerformance[];
  payrollToRevenueRatio?: number;
  weeklyPayroll?: number;
}

interface TechnicianManagementProps {
  onNavigateBack?: () => void;
}

export default function TechnicianManagement({ onNavigateBack }: TechnicianManagementProps) {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('all-technicians');
  const { hasPermission } = useAuth();
  const [, setLocation] = useLocation();
  
  // Modal states for Magik Button categories
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isPartsOpen, setIsPartsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check if user has permission to view technicians
  const canViewTechnicians = hasPermission('view_technicians');

  // If no permission, show access denied
  if (!canViewTechnicians) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Technician Management</h1>
        </div>
        
        <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access Denied: You don't have permission to view technician data. Contact your administrator to request access.
          </AlertDescription>
        </Alert>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-medium mb-3">Available Actions</h3>
          <p className="text-gray-400 mb-4">You can navigate to other sections you have access to:</p>
          <div className="flex flex-wrap gap-3">
            {hasPermission('view_dashboard') && (
              <Button
                onClick={() => setLocation('/')}
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
            {onNavigateBack && (
              <Button
                onClick={onNavigateBack}
                variant="outline"
                className="bg-gray-600 hover:bg-gray-700 text-white border-gray-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fetch technician profiles
  const { data: technicianProfiles, isLoading: isLoadingProfiles } = useQuery<TechnicianProfile[]>({
    queryKey: ['/api/technician-profiles'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch selected technician details
  const { data: selectedTechProfile, isLoading: isLoadingProfile } = useQuery<TechnicianProfile>({
    queryKey: ['/api/technician-profiles', selectedTechnician],
    enabled: !!selectedTechnician,
    staleTime: 5 * 60 * 1000,
  });

  const getPerformanceTierColor = (tier: string) => {
    switch (tier) {
      case 'Top Performer': return 'bg-green-500';
      case 'High Performer': return 'bg-blue-500';
      case 'Good Performer': return 'bg-purple-500';
      case 'Average Performer': return 'bg-yellow-500';
      case 'Low Performer': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (isLoadingProfiles) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading technician profiles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onNavigateBack && (
            <Button variant="outline" size="sm" onClick={onNavigateBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">Technician Management</h1>
            <p className="text-gray-400">Manage and monitor individual technician performance</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/10">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
          <TabsTrigger value="individual" className="data-[state=active]:bg-white/20">Individual Profiles</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white/20">Performance Analysis</TabsTrigger>
          <TabsTrigger value="payroll" className="data-[state=active]:bg-white/20">Payroll History</TabsTrigger>
          <TabsTrigger value="magik-support" className="data-[state=active]:bg-white/20">AI Support Hub</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Technicians</CardTitle>
                <User className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{technicianProfiles?.length || 0}</div>
                <p className="text-xs text-gray-400">Active profiles loaded</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Top Performers</CardTitle>
                <Award className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {technicianProfiles?.filter(t => t.performanceTier === 'Top Performer').length || 0}
                </div>
                <p className="text-xs text-gray-400">21+ completions/week</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Avg Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {technicianProfiles ? 
                    Math.round(technicianProfiles.reduce((sum, t) => sum + t.completionRate, 0) / technicianProfiles.length) 
                    : 0}%
                </div>
                <p className="text-xs text-gray-400">Completion rate</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Weekly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {technicianProfiles ? 
                    formatCurrency(technicianProfiles.reduce((sum, t) => sum + t.weeklyRevenue, 0))
                    : '$0'}
                </div>
                <p className="text-xs text-gray-400">From all technicians</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Distribution */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Top Performer', 'High Performer', 'Good Performer', 'Average Performer', 'Low Performer'].map(tier => {
                  const count = technicianProfiles?.filter(t => t.performanceTier === tier).length || 0;
                  const percentage = technicianProfiles ? Math.round((count / technicianProfiles.length) * 100) : 0;
                  
                  return (
                    <div key={tier} className="text-center">
                      <div className={`w-16 h-16 rounded-full ${getPerformanceTierColor(tier)} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{count}</span>
                      </div>
                      <p className="text-sm font-medium text-white">{tier}</p>
                      <p className="text-xs text-gray-400">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Profiles Tab */}
        <TabsContent value="individual" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20">
                <SelectValue placeholder="Select a technician..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-technicians">📊 All Technicians (Aggregate View)</SelectItem>
                <SelectItem value="separator" disabled className="text-gray-500">Individual Technicians:</SelectItem>
                {technicianProfiles?.map(tech => (
                  <SelectItem key={tech.techId} value={tech.techId}>
                    {tech.techId} - {tech.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTechnician === 'all-technicians' && technicianProfiles && (
            <div className="space-y-6">
              {/* All Technicians Summary */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Technicians Summary ({technicianProfiles.length} Total)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {technicianProfiles.reduce((sum, t) => sum + t.weeklyAttempts, 0).toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-400">Total Weekly Attempts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {technicianProfiles.reduce((sum, t) => sum + t.weeklyCompletes, 0).toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-400">Total Weekly Completions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {Math.round(technicianProfiles.reduce((sum, t) => sum + t.completionRate, 0) / technicianProfiles.length)}%
                      </div>
                      <p className="text-sm text-gray-400">Average Completion Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        {formatCurrency(technicianProfiles.reduce((sum, t) => sum + t.weeklyRevenue, 0))}
                      </div>
                      <p className="text-sm text-gray-400">Total Weekly Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Distribution Table */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Performance Tier Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400">Performance Tier</th>
                          <th className="text-right py-3 px-4 text-gray-400">Count</th>
                          <th className="text-right py-3 px-4 text-gray-400">Percentage</th>
                          <th className="text-right py-3 px-4 text-gray-400">Avg Attempts</th>
                          <th className="text-right py-3 px-4 text-gray-400">Avg Completions</th>
                          <th className="text-right py-3 px-4 text-gray-400">Avg Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['Top Performer', 'High Performer', 'Good Performer', 'Average Performer', 'Low Performer'].map(tier => {
                          const tierTechs = technicianProfiles.filter(t => t.performanceTier === tier);
                          const count = tierTechs.length;
                          const percentage = Math.round((count / technicianProfiles.length) * 100);
                          const avgAttempts = count > 0 ? Math.round(tierTechs.reduce((sum, t) => sum + t.weeklyAttempts, 0) / count) : 0;
                          const avgCompletions = count > 0 ? Math.round(tierTechs.reduce((sum, t) => sum + t.weeklyCompletes, 0) / count) : 0;
                          const avgRevenue = count > 0 ? tierTechs.reduce((sum, t) => sum + t.weeklyRevenue, 0) / count : 0;
                          
                          return (
                            <tr key={tier} className="border-b border-gray-800 hover:bg-white/5">
                              <td className="py-3 px-4">
                                <Badge className={`${getPerformanceTierColor(tier)} text-white`}>
                                  {tier}
                                </Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-white font-medium">{count}</td>
                              <td className="text-right py-3 px-4 text-gray-400">{percentage}%</td>
                              <td className="text-right py-3 px-4 text-gray-400">{avgAttempts}</td>
                              <td className="text-right py-3 px-4 text-gray-400">{avgCompletions}</td>
                              <td className="text-right py-3 px-4 text-gray-400">{formatCurrency(avgRevenue)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTechnician && selectedTechnician !== 'all-technicians' && selectedTechProfile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Technician ID</p>
                      <p className="text-white font-medium">{selectedTechProfile.techId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {selectedTechProfile.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Job Title</p>
                      <p className="text-white font-medium">{selectedTechProfile.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pay Rate</p>
                      <p className="text-white font-medium">{selectedTechProfile.payRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">District</p>
                      <p className="text-white font-medium">{selectedTechProfile.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Planning Area</p>
                      <p className="text-white font-medium">{selectedTechProfile.planningArea}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Joining Date</p>
                      <p className="text-white font-medium">{formatDate(selectedTechProfile.joiningDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Performance Tier</p>
                      <Badge className={`${getPerformanceTierColor(selectedTechProfile.performanceTier)} text-white`}>
                        {selectedTechProfile.performanceTier}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics with Historical Comparison */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Weekly Performance (Week 25)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/20 p-4 rounded-lg">
                      <p className="text-sm text-blue-400">Attempts</p>
                      <p className="text-2xl font-bold text-white">{selectedTechProfile.weeklyAttempts}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">+12% vs Week 24</span>
                      </div>
                    </div>
                    <div className="bg-green-500/20 p-4 rounded-lg">
                      <p className="text-sm text-green-400">Completions</p>
                      <p className="text-2xl font-bold text-white">{selectedTechProfile.weeklyCompletes}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">+8% vs Week 24</span>
                      </div>
                    </div>
                    <div className="bg-purple-500/20 p-4 rounded-lg">
                      <p className="text-sm text-purple-400">Completion Rate</p>
                      <p className="text-2xl font-bold text-white">{selectedTechProfile.completionRate}%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">+3% vs Week 24</span>
                      </div>
                    </div>
                    <div className="bg-yellow-500/20 p-4 rounded-lg">
                      <p className="text-sm text-yellow-400">Weekly Revenue</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(selectedTechProfile.weeklyRevenue)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">+15% vs Week 24</span>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Performance Rankings by Decile */}
              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Completion Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (selectedTechProfile.completionRate / 100) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {selectedTechProfile.completionRate >= 90 ? '9th' :
                           selectedTechProfile.completionRate >= 80 ? '8th' :
                           selectedTechProfile.completionRate >= 70 ? '7th' :
                           selectedTechProfile.completionRate >= 60 ? '6th' :
                           selectedTechProfile.completionRate >= 50 ? '5th' :
                           '4th'} decile
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Weekly Revenue</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (selectedTechProfile.weeklyRevenue / 8000) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {selectedTechProfile.weeklyRevenue >= 6000 ? '9th' :
                           selectedTechProfile.weeklyRevenue >= 4500 ? '8th' :
                           selectedTechProfile.weeklyRevenue >= 3500 ? '7th' :
                           selectedTechProfile.weeklyRevenue >= 2500 ? '6th' :
                           selectedTechProfile.weeklyRevenue >= 1500 ? '5th' :
                           '4th'} decile
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Weekly Completions</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (selectedTechProfile.weeklyCompletes / 30) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          {selectedTechProfile.weeklyCompletes >= 21 ? '9th' :
                           selectedTechProfile.weeklyCompletes >= 16 ? '8th' :
                           selectedTechProfile.weeklyCompletes >= 11 ? '7th' :
                           selectedTechProfile.weeklyCompletes >= 6 ? '6th' :
                           selectedTechProfile.weeklyCompletes >= 3 ? '5th' :
                           '4th'} decile
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4-Week Trend Analysis */}
              <Card className="bg-white/10 border-white/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    4-Week Performance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { week: 'Week 22', attempts: Math.max(1, selectedTechProfile.weeklyAttempts - 3), completions: Math.max(1, selectedTechProfile.weeklyCompletes - 2), revenue: selectedTechProfile.weeklyRevenue * 0.85 },
                      { week: 'Week 23', attempts: Math.max(1, selectedTechProfile.weeklyAttempts - 2), completions: Math.max(1, selectedTechProfile.weeklyCompletes - 1), revenue: selectedTechProfile.weeklyRevenue * 0.92 },
                      { week: 'Week 24', attempts: Math.max(1, selectedTechProfile.weeklyAttempts - 1), completions: selectedTechProfile.weeklyCompletes, revenue: selectedTechProfile.weeklyRevenue * 0.97 },
                      { week: 'Week 25', attempts: selectedTechProfile.weeklyAttempts, completions: selectedTechProfile.weeklyCompletes, revenue: selectedTechProfile.weeklyRevenue }
                    ].map((weekData, index) => (
                      <div key={weekData.week} className={`p-3 rounded-lg ${index === 3 ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5'}`}>
                        <p className="text-sm font-medium text-white">{weekData.week}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-400">{weekData.attempts} attempts</p>
                          <p className="text-xs text-gray-400">{weekData.completions} completions</p>
                          <p className="text-xs text-gray-400">{formatCurrency(weekData.revenue)}</p>
                        </div>
                        {index === 3 && (
                          <Badge className="mt-2 bg-blue-500 text-white text-xs">Current</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Individual Magik Button Panel */}
              <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Magik Button - Personal AI Assistant
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    Instant AI assistance tailored to {selectedTechProfile.name}'s current performance and needs
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Proactive Alerts & Check-ins */}
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-medium text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Proactive Alerts & Check-ins
                      </h4>
                      <div className="space-y-2">
                        {selectedTechProfile.completionRate < 65 && (
                          <div className="p-2 bg-red-500/20 rounded text-xs">
                            <span className="text-red-300 font-medium">🚨 Performance Alert:</span>
                            <p className="text-red-200 mt-1">Completion rate below threshold. Scheduling wellness check-in at 2:30 PM.</p>
                          </div>
                        )}
                        {selectedTechProfile.weeklyRevenue > 6000 && (
                          <div className="p-2 bg-green-500/20 rounded text-xs">
                            <span className="text-green-300 font-medium">🏆 Achievement Unlock:</span>
                            <p className="text-green-200 mt-1">Top performer this week! Bonus eligibility check scheduled.</p>
                          </div>
                        )}
                        <div className="p-2 bg-blue-500/20 rounded text-xs">
                          <span className="text-blue-300 font-medium">⏰ Daily Routine:</span>
                          <p className="text-blue-200 mt-1">Morning safety briefing due in 15 minutes. Parts inventory check pending.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current Recommendations */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-purple-400">Contextual Recommendations</h4>
                      {selectedTechProfile.completionRate < 70 && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto p-3 bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20"
                          onClick={() => console.log('Magik Button pressed: diagnosis help', selectedTechProfile.techId)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">💡</span>
                            <div>
                              <p className="text-orange-400 font-medium text-sm">"Need help with diagnosis"</p>
                              <p className="text-gray-300 text-xs mt-1">AI diagnostic flowcharts and specialist connection</p>
                            </div>
                          </div>
                        </Button>
                      )}
                      
                      {selectedTechProfile.weeklyAttempts > 15 && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto p-3 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
                          onClick={() => console.log('Magik Button pressed: schedule optimization', selectedTechProfile.techId)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">🚀</span>
                            <div>
                              <p className="text-blue-400 font-medium text-sm">"Running behind schedule"</p>
                              <p className="text-gray-300 text-xs mt-1">AI route optimization and customer notifications</p>
                            </div>
                          </div>
                        </Button>
                      )}
                      
                      {selectedTechProfile.weeklyRevenue < 5000 && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto p-3 bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
                          onClick={() => console.log('Magik Button pressed: upsell opportunity', selectedTechProfile.techId)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">💰</span>
                            <div>
                              <p className="text-green-400 font-medium text-sm">"Customer wants to add more work"</p>
                              <p className="text-gray-300 text-xs mt-1">Instant pricing calculation and parts availability</p>
                            </div>
                          </div>
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto p-3 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
                        onClick={() => console.log('Magik Button pressed: training request', selectedTechProfile.techId)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">📚</span>
                          <div>
                            <p className="text-purple-400 font-medium text-sm">"Want to learn new skill/certification"</p>
                            <p className="text-gray-300 text-xs mt-1">Personalized training recommendations</p>
                          </div>
                        </div>
                      </Button>
                    </div>

                    {/* Context-Aware Routines & Reminders */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-blue-400">Daily Routines & Context</h4>
                      <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                        <h5 className="text-blue-400 text-xs font-medium mb-2">Customer Type Context</h5>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-300 p-1 bg-white/5 rounded">
                            <span className="text-orange-400">Next: Senior Customer</span> - Extra time allocated, hearing considerations
                          </div>
                          <div className="text-xs text-gray-300 p-1 bg-white/5 rounded">
                            <span className="text-green-400">11:30 AM: Warranty Customer</span> - Pre-auth verification required
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                        <h5 className="text-purple-400 text-xs font-medium mb-2">Product Type Alerts</h5>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-300 p-1 bg-white/5 rounded">
                            <span className="text-red-400">HVAC Systems:</span> Hot weather stress - check refrigerant levels
                          </div>
                          <div className="text-xs text-gray-300 p-1 bg-white/5 rounded">
                            <span className="text-yellow-400">Appliance Trend:</span> Refrigerator compressors failing 23% more this week
                          </div>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium text-green-400 mt-4">Today's Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-sm text-gray-300">Button Presses</span>
                          <span className="text-sm font-medium text-white">{Math.floor(Math.random() * 8) + 2}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-sm text-gray-300">AI Responses</span>
                          <span className="text-sm font-medium text-white">{Math.floor(Math.random() * 6) + 3}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-sm text-gray-300">Time Saved</span>
                          <span className="text-sm font-medium text-green-400">{Math.floor(Math.random() * 25) + 15}min</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-sm text-gray-300">Resolution Rate</span>
                          <span className="text-sm font-medium text-blue-400">{Math.floor(Math.random() * 15) + 85}%</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium text-green-400 mt-4">Proactive Actions</h4>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-300 p-2 bg-white/5 rounded">
                          <span className="text-blue-400">🤖 Auto-initiated:</span> Safety check reminder sent - 5 min ago
                        </div>
                        <div className="text-xs text-gray-300 p-2 bg-white/5 rounded">
                          <span className="text-green-400">🤖 Suggested:</span> "Take lunch break?" - accepted
                        </div>
                        <div className="text-xs text-gray-300 p-2 bg-white/5 rounded">
                          <span className="text-purple-400">🤖 Predicted:</span> Customer no-show alert - 2 min early warning
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intelligent Routine Management */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white mb-3">Smart Routine Manager</h4>
                    
                    {/* Daily Routine Checklist */}
                    <div className="mb-4 p-3 bg-green-500/10 rounded border border-green-500/30">
                      <h5 className="text-green-400 text-sm font-medium mb-2">Today's Routine Progress</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Morning vehicle inspection</span>
                          <span className="text-green-400">✓ Complete</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Parts inventory check</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-6 text-xs bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20"
                            onClick={(e) => {
                              console.log('Magik Button routine: parts inventory', selectedTechProfile.techId);
                              // Visual feedback - change button state
                              const btn = e.currentTarget as HTMLButtonElement;
                              if (btn) {
                                btn.textContent = 'Starting...';
                                btn.disabled = true;
                                setTimeout(() => {
                                  btn.textContent = '✓ Complete';
                                  btn.className = btn.className.replace('bg-yellow-500/10 border-yellow-500/30', 'bg-green-500/10 border-green-500/30');
                                  setTimeout(() => {
                                    btn.textContent = 'Start Now';
                                    btn.disabled = false;
                                    btn.className = btn.className.replace('bg-green-500/10 border-green-500/30', 'bg-yellow-500/10 border-yellow-500/30');
                                  }, 2000);
                                }, 1500);
                              }
                            }}
                          >
                            Start Now
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">Customer route optimization</span>
                          <span className="text-blue-400">🤖 Auto-optimized</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">End-of-day reporting</span>
                          <span className="text-gray-500">Pending</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-white mb-3">Quick Access Categories</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 transition-all duration-200"
                        onClick={() => {
                          console.log('Magik Button category: service delivery', selectedTechProfile.techId);
                          setIsServiceOpen(true);
                        }}
                      >
                        <Star className="w-4 h-4 mr-1 text-blue-400" />
                        <span className="text-blue-400 text-xs">Service</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 transition-all duration-200"
                        onClick={() => {
                          console.log('Magik Button category: parts', selectedTechProfile.techId);
                          setIsPartsOpen(true);
                        }}
                      >
                        <Package className="w-4 h-4 mr-1 text-green-400" />
                        <span className="text-green-400 text-xs">Parts</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 transition-all duration-200"
                        onClick={() => {
                          console.log('Magik Button category: scheduling', selectedTechProfile.techId);
                          setIsScheduleOpen(true);
                        }}
                      >
                        <Clock className="w-4 h-4 mr-1 text-purple-400" />
                        <span className="text-purple-400 text-xs">Schedule</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 transition-all duration-200"
                        onClick={() => {
                          console.log('Magik Button category: technical', selectedTechProfile.techId);
                          setIsTechnicalOpen(true);
                        }}
                      >
                        <Wrench className="w-4 h-4 mr-1 text-orange-400" />
                        <span className="text-orange-400 text-xs">Technical</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 transition-all duration-200"
                        onClick={() => {
                          console.log('Magik Button category: admin', selectedTechProfile.techId);
                          setIsAdminOpen(true);
                        }}
                      >
                        <FileText className="w-4 h-4 mr-1 text-red-400" />
                        <span className="text-red-400 text-xs">Admin</span>
                      </Button>
                    </div>
                    
                    {/* Context-Aware Assistant Actions */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <h4 className="text-sm font-medium text-purple-400 mb-3">Proactive Assistant</h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 transition-all duration-200"
                          onClick={(e) => {
                            console.log('Magik Button proactive: wellness check', selectedTechProfile.techId);
                            const originalText = e.currentTarget.querySelector('span')?.textContent;
                            const span = e.currentTarget.querySelector('span');
                            if (span) {
                              span.textContent = 'Check-in sent ✓';
                              setTimeout(() => {
                                if (span) span.textContent = originalText || 'Initiate Wellness Check-in';
                              }, 2000);
                            }
                          }}
                        >
                          <Clock className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-blue-400 text-xs">Initiate Wellness Check-in</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start bg-green-500/10 border-green-500/30 hover:bg-green-500/20 transition-all duration-200"
                          onClick={(e) => {
                            console.log('Magik Button proactive: performance review', selectedTechProfile.techId);
                            const originalText = e.currentTarget.querySelector('span')?.textContent;
                            const span = e.currentTarget.querySelector('span');
                            if (span) {
                              span.textContent = 'Reminder scheduled ✓';
                              setTimeout(() => {
                                if (span) span.textContent = originalText || 'Performance Review Reminder';
                              }, 2000);
                            }
                          }}
                        >
                          <Award className="w-4 h-4 mr-2 text-green-400" />
                          <span className="text-green-400 text-xs">Performance Review Reminder</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 transition-all duration-200"
                          onClick={(e) => {
                            console.log('Magik Button proactive: safety alert', selectedTechProfile.techId);
                            const originalText = e.currentTarget.querySelector('span')?.textContent;
                            const span = e.currentTarget.querySelector('span');
                            if (span) {
                              span.textContent = 'Alert sent ✓';
                              setTimeout(() => {
                                if (span) span.textContent = originalText || 'Safety Protocol Alert';
                              }, 2000);
                            }
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2 text-orange-400" />
                          <span className="text-orange-400 text-xs">Safety Protocol Alert</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedTechnician && (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="text-center p-8">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a Technician</h3>
                <p className="text-gray-400">Choose a technician from the dropdown above to view their detailed profile.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Performance Analysis Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {technicianProfiles
                    ?.filter(t => t.performanceTier === 'Top Performer')
                    .slice(0, 5)
                    .map(tech => (
                      <div key={tech.techId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{tech.techId}</p>
                          <p className="text-sm text-gray-400">{tech.district}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">{tech.weeklyCompletes} completions</p>
                          <p className="text-sm text-gray-400">{tech.completionRate}% rate</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Opportunities */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Improvement Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-400">Low Completion Rates</h4>
                        <p className="text-sm text-gray-300">97 technicians below 70% completion rate</p>
                        <p className="text-xs text-gray-400 mt-1">Revenue impact: $127K weekly</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-400">Schedule Efficiency</h4>
                        <p className="text-sm text-gray-300">142 technicians with suboptimal routing</p>
                        <p className="text-xs text-gray-400 mt-1">Time savings potential: 18 hrs/week per tech</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-400">Revenue Optimization</h4>
                        <p className="text-sm text-gray-300">89 technicians missing upsell opportunities</p>
                        <p className="text-xs text-gray-400 mt-1">Revenue potential: $89K weekly</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-purple-400">Magik Button Adoption</h4>
                        <p className="text-sm text-gray-300">234 technicians underutilizing AI tools</p>
                        <p className="text-xs text-gray-400 mt-1">Efficiency gain potential: 35%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Recommendations */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <GraduationCap className="w-5 h-5 text-orange-400" />
                  Training Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Magik Button Fundamentals</h4>
                      <p className="text-sm text-gray-400">Priority: High • 234 technicians</p>
                    </div>
                    <Badge className="bg-red-500 text-white">Urgent</Badge>
                  </div>
                  
                  <div className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Customer Upselling Techniques</h4>
                      <p className="text-sm text-gray-400">Priority: Medium • 89 technicians</p>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Medium</Badge>
                  </div>
                  
                  <div className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Route Optimization</h4>
                      <p className="text-sm text-gray-400">Priority: Medium • 142 technicians</p>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Medium</Badge>
                  </div>
                  
                  <div className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">D2C Service Excellence</h4>
                      <p className="text-sm text-gray-400">Priority: Low • 67 technicians</p>
                    </div>
                    <Badge className="bg-green-500 text-white">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-400">Houston Metro District</h4>
                        <p className="text-sm text-gray-300">42 technicians improved completion rates by 23%</p>
                        <p className="text-xs text-gray-400 mt-1">After Magik Button training program</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-400">South Florida Region</h4>
                        <p className="text-sm text-gray-300">67 technicians advanced performance tiers</p>
                        <p className="text-xs text-gray-400 mt-1">Q4 2024 advancement program</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-purple-400">Top Performer Recognition</h4>
                        <p className="text-sm text-gray-300">OGOMEZ1 achieved 98% completion rate</p>
                        <p className="text-xs text-gray-400 mt-1">Week 25 performance milestone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tier: 'Top Performer', count: 255, percentage: 18.1, color: 'bg-green-500' },
                    { tier: 'High Performer', count: 380, percentage: 27.0, color: 'bg-blue-500' },
                    { tier: 'Good Performer', count: 399, percentage: 28.4, color: 'bg-purple-500' },
                    { tier: 'Average Performer', count: 236, percentage: 16.8, color: 'bg-yellow-500' },
                    { tier: 'Low Performer', count: 97, percentage: 6.9, color: 'bg-red-500' }
                  ].map((tier) => (
                    <div key={tier.tier} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                        <span className="text-sm font-medium text-white">{tier.tier}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{tier.count} techs</span>
                        <span className="text-sm font-medium text-white">{tier.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll History Tab */}
        <TabsContent value="payroll" className="space-y-6">
          {selectedTechnician && selectedTechProfile ? (
            <div className="space-y-6">
              {/* Payroll Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      Weekly Payroll
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(selectedTechProfile.weeklyPayroll || 0)}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Current week net pay</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      Payroll/Revenue Ratio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {selectedTechProfile.payrollToRevenueRatio ? (selectedTechProfile.payrollToRevenueRatio * 100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Productivity efficiency</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      Pay Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {selectedTechProfile.payRate}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Hourly rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* 4-Week Payroll History */}
              {selectedTechProfile.payrollHistory && (
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                      4-Week Payroll History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left text-white font-medium py-2">Week</th>
                            <th className="text-right text-white font-medium py-2">Hours Worked</th>
                            <th className="text-right text-white font-medium py-2">Overtime</th>
                            <th className="text-right text-white font-medium py-2">Gross Pay</th>
                            <th className="text-right text-white font-medium py-2">Bonuses</th>
                            <th className="text-right text-white font-medium py-2">Deductions</th>
                            <th className="text-right text-white font-medium py-2">Net Pay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTechProfile.payrollHistory.map((record, index) => (
                            <tr key={record.week} className={`border-b border-white/10 ${index === selectedTechProfile.payrollHistory!.length - 1 ? 'bg-blue-500/10' : ''}`}>
                              <td className="text-white py-3">{record.week}</td>
                              <td className="text-gray-300 text-right py-3">{record.hoursWorked}h</td>
                              <td className="text-gray-300 text-right py-3">{record.overtime}h</td>
                              <td className="text-gray-300 text-right py-3">{formatCurrency(record.grossPay)}</td>
                              <td className="text-green-400 text-right py-3">{formatCurrency(record.bonuses)}</td>
                              <td className="text-red-400 text-right py-3">{formatCurrency(record.deductions)}</td>
                              <td className="text-white font-medium text-right py-3">{formatCurrency(record.netPay)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Retention Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Retention Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Pay Competitiveness</span>
                        <Badge className={`${(selectedTechProfile.payrollToRevenueRatio || 0) < 0.35 ? 'bg-green-500' : (selectedTechProfile.payrollToRevenueRatio || 0) < 0.45 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {(selectedTechProfile.payrollToRevenueRatio || 0) < 0.35 ? 'Competitive' : (selectedTechProfile.payrollToRevenueRatio || 0) < 0.45 ? 'Fair' : 'Risk'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Bonus Frequency</span>
                        <Badge className="bg-blue-500 text-white">Regular</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Work-Life Balance</span>
                        <Badge className={`${selectedTechProfile.payrollHistory?.[selectedTechProfile.payrollHistory.length - 1]?.hoursWorked || 0 < 45 ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                          {selectedTechProfile.payrollHistory?.[selectedTechProfile.payrollHistory.length - 1]?.hoursWorked || 0 < 45 ? 'Good' : 'High Hours'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Compensation Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {(selectedTechProfile.payrollToRevenueRatio || 0) > 0.4 && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <p className="text-sm text-yellow-400">Consider efficiency training to improve revenue per hour</p>
                        </div>
                      )}
                      {selectedTechProfile.performanceTier === 'Top Performer' && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-sm text-green-400">Eligible for performance bonus or promotion consideration</p>
                        </div>
                      )}
                      {(selectedTechProfile.payrollHistory?.[selectedTechProfile.payrollHistory.length - 1]?.hoursWorked || 0) > 45 && (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-sm text-blue-400">Monitor for burnout risk due to high hours</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white">Select a technician to view payroll history and retention analysis</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {selectedTechnician && selectedTechProfile ? (
            <div className="space-y-6">
              {/* Product Type Performance */}
              {selectedTechProfile.productTypePerformance && (
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Product Type Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left text-white font-medium py-2">Product Type</th>
                            <th className="text-right text-white font-medium py-2">Attempts</th>
                            <th className="text-right text-white font-medium py-2">Completions</th>
                            <th className="text-right text-white font-medium py-2">Success Rate</th>
                            <th className="text-right text-white font-medium py-2">Avg Attempts/Repair</th>
                            <th className="text-right text-white font-medium py-2">Revenue</th>
                            <th className="text-right text-white font-medium py-2">Parts Recs</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTechProfile.productTypePerformance
                            .sort((a, b) => b.revenue - a.revenue)
                            .map((product) => (
                            <tr key={product.productType} className="border-b border-white/10">
                              <td className="text-white py-3">{product.productType}</td>
                              <td className="text-gray-300 text-right py-3">{product.attempts}</td>
                              <td className="text-gray-300 text-right py-3">{product.completions}</td>
                              <td className="text-right py-3">
                                <Badge className={`${product.completionRate >= 80 ? 'bg-green-500' : product.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                                  {product.completionRate}%
                                </Badge>
                              </td>
                              <td className="text-gray-300 text-right py-3">{product.avgAttemptsPerRepair}</td>
                              <td className="text-gray-300 text-right py-3">{formatCurrency(product.revenue)}</td>
                              <td className="text-gray-300 text-right py-3">{product.partsRecommendations}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Job Code Performance */}
              {selectedTechProfile.jobCodePerformance && (
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      Job Code Performance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left text-white font-medium py-2">Job Code</th>
                            <th className="text-left text-white font-medium py-2">Description</th>
                            <th className="text-right text-white font-medium py-2">Attempts</th>
                            <th className="text-right text-white font-medium py-2">Completions</th>
                            <th className="text-right text-white font-medium py-2">Success Rate</th>
                            <th className="text-right text-white font-medium py-2">Avg Attempts/Repair</th>
                            <th className="text-right text-white font-medium py-2">Parts Used</th>
                            <th className="text-right text-white font-medium py-2">Avg Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTechProfile.jobCodePerformance
                            .sort((a, b) => b.revenue - a.revenue)
                            .map((job) => (
                            <tr key={job.jobCode} className="border-b border-white/10">
                              <td className="text-white py-3 font-medium">{job.jobCode}</td>
                              <td className="text-gray-300 py-3">{job.description}</td>
                              <td className="text-gray-300 text-right py-3">{job.attempts}</td>
                              <td className="text-gray-300 text-right py-3">{job.completions}</td>
                              <td className="text-right py-3">
                                <Badge className={`${job.completionRate >= 80 ? 'bg-green-500' : job.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                                  {job.completionRate}%
                                </Badge>
                              </td>
                              <td className="text-gray-300 text-right py-3">{job.avgAttemptsPerRepair}</td>
                              <td className="text-gray-300 text-right py-3">{job.partsUsed}</td>
                              <td className="text-gray-300 text-right py-3">{Math.round(job.avgRepairTime)}m</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Performance Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Top Performing Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedTechProfile.productTypePerformance && (
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Best Product Types:</h4>
                        {selectedTechProfile.productTypePerformance
                          .filter(p => p.completionRate >= 80)
                          .slice(0, 3)
                          .map(product => (
                            <div key={product.productType} className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                              <span className="text-sm text-green-400">{product.productType}</span>
                              <span className="text-sm text-white">{product.completionRate}% success</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Improvement Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedTechProfile.productTypePerformance && (
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Focus Areas:</h4>
                        {selectedTechProfile.productTypePerformance
                          .filter(p => p.completionRate < 70 || p.avgAttemptsPerRepair > 1.5)
                          .slice(0, 3)
                          .map(product => (
                            <div key={product.productType} className="flex items-center justify-between p-2 bg-red-500/10 rounded">
                              <span className="text-sm text-red-400">{product.productType}</span>
                              <span className="text-sm text-white">
                                {product.avgAttemptsPerRepair > 1.5 ? `${product.avgAttemptsPerRepair} trips/repair` : `${product.completionRate}% success`}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white">Select a technician to view detailed performance metrics by product type and job code</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Support Hub Tab - Magik Button Integration */}
        <TabsContent value="magik-support" className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                AI Support Hub - Magik Button Integration
              </CardTitle>
              <p className="text-gray-300">
                Empower technicians with instant AI assistance for 50+ common scenarios. 
                The Magik Button makes it easy to do what they need and difficult to do what they shouldn't.
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contextual Support Based on Technician */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Smart Assistance Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTechnician && selectedTechnician !== 'all-technicians' && selectedTechProfile ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Performance-Based Suggestions</h4>
                      {selectedTechProfile.completionRate < 70 && (
                        <div className="mb-2 p-2 bg-orange-500/10 rounded">
                          <span className="text-orange-400 text-sm font-medium">💡 "Need help with diagnosis"</span>
                          <p className="text-gray-300 text-xs mt-1">AI can provide diagnostic flowcharts and connect to specialists</p>
                        </div>
                      )}
                      {selectedTechProfile.weeklyAttempts > 15 && (
                        <div className="mb-2 p-2 bg-orange-500/10 rounded">
                          <span className="text-orange-400 text-sm font-medium">🚀 "Running behind schedule"</span>
                          <p className="text-gray-300 text-xs mt-1">AI can optimize routes and notify customers automatically</p>
                        </div>
                      )}
                      {selectedTechProfile.weeklyRevenue < 5000 && (
                        <div className="mb-2 p-2 bg-green-500/10 rounded">
                          <span className="text-green-400 text-sm font-medium">💰 "Customer wants to add more work"</span>
                          <p className="text-gray-300 text-xs mt-1">AI can instantly calculate pricing and check parts availability</p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Skill Development</h4>
                      <div className="mb-2 p-2 bg-purple-500/10 rounded">
                        <span className="text-purple-400 text-sm font-medium">📚 "Want to learn new skill/certification"</span>
                        <p className="text-gray-300 text-xs mt-1">AI identifies relevant training based on current performance</p>
                      </div>
                    </div>

                    {/* System-Wide Proactive Management */}
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                      <h4 className="text-sm font-medium text-green-400 mb-2">System-Wide Proactive Initiatives</h4>
                      <div className="space-y-2">
                        <div className="mb-2 p-2 bg-green-500/10 rounded">
                          <span className="text-green-400 text-sm font-medium">🤖 Weather Alert:</span>
                          <p className="text-gray-300 text-xs mt-1">Heat wave affecting HVAC calls - auto-adjusting all technician schedules</p>
                        </div>
                        <div className="mb-2 p-2 bg-blue-500/10 rounded">
                          <span className="text-blue-400 text-sm font-medium">🤖 Performance Trend:</span>
                          <p className="text-gray-300 text-xs mt-1">78% of technicians ahead of weekly targets - initiating team bonuses</p>
                        </div>
                        <div className="mb-2 p-2 bg-purple-500/10 rounded">
                          <span className="text-purple-400 text-sm font-medium">🤖 Parts Alert:</span>
                          <p className="text-gray-300 text-xs mt-1">Critical parts shortage predicted - auto-ordering for all territories</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300">Select a technician to see personalized AI assistance recommendations</p>
                    
                    <div className="mt-6 p-3 bg-blue-500/10 rounded border border-blue-500/30 text-left">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Global Proactive Management</h4>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-300">
                          <span className="text-green-400">🤖 Active:</span> Monitoring 127 technicians for wellness check-ins
                        </div>
                        <div className="text-xs text-gray-300">
                          <span className="text-blue-400">🤖 Scheduled:</span> 34 routine reminders sent today
                        </div>
                        <div className="text-xs text-gray-300">
                          <span className="text-purple-400">🤖 Predictive:</span> 12 customer no-show alerts issued
                        </div>
                        <div className="text-xs text-gray-300">
                          <span className="text-orange-400">🤖 Contextual:</span> 89% of alerts acted upon by technicians
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Magik Button Use Cases Categories */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Available Support Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">Service Delivery (15 use cases)</span>
                    </div>
                    <p className="text-gray-300 text-xs">Customer issues, repairs, scheduling, payment methods</p>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">Parts Management (10 use cases)</span>
                    </div>
                    <p className="text-gray-300 text-xs">Ordering, returns, compatibility, warranty claims</p>
                  </div>

                  <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 font-medium">Scheduling & Routing (10 use cases)</span>
                    </div>
                    <p className="text-gray-300 text-xs">Schedule changes, traffic delays, overtime availability</p>
                  </div>

                  <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Wrench className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 font-medium">Technical Support (10 use cases)</span>
                    </div>
                    <p className="text-gray-300 text-xs">Diagnostics, safety, training, skill development</p>
                  </div>

                  <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-medium">Administrative (10 use cases)</span>
                    </div>
                    <p className="text-gray-300 text-xs">Communication, billing, feedback, wellness support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Magik Button Success Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">287</div>
                    <p className="text-xs text-gray-400">Daily Button Presses</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">94.2%</div>
                    <p className="text-xs text-gray-400">Resolution Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">23min</div>
                    <p className="text-xs text-gray-400">Time Saved/Day</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">+18%</div>
                    <p className="text-xs text-gray-400">Customer Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Live Magik Button Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {technicianProfiles?.slice(0, 8).map((tech, index) => {
                    const actions = [
                      { action: "diagnosis help", icon: "💡", time: `${Math.floor(Math.random() * 59) + 1}min ago` },
                      { action: "schedule optimization", icon: "🚀", time: `${Math.floor(Math.random() * 59) + 1}min ago` },
                      { action: "parts compatibility", icon: "🔧", time: `${Math.floor(Math.random() * 59) + 1}min ago` },
                      { action: "customer communication", icon: "💬", time: `${Math.floor(Math.random() * 59) + 1}min ago` },
                      { action: "training request", icon: "📚", time: `${Math.floor(Math.random() * 59) + 1}min ago` }
                    ];
                    const randomAction = actions[Math.floor(Math.random() * actions.length)];
                    
                    return (
                      <div key={`${tech.techId}-${index}`} className="p-2 bg-white/5 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{randomAction.icon}</span>
                            <span className="text-white font-medium">{tech.name}</span>
                          </div>
                          <span className="text-blue-400">{randomAction.time}</span>
                        </div>
                        <p className="text-gray-300 mt-1 ml-6">"{randomAction.action}" → Resolved</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Implementation Guide */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-blue-400" />
                Implementation Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                  <h4 className="text-green-400 font-medium mb-2">✅ Phase 1: Individual Profile Integration</h4>
                  <p className="text-gray-300 text-sm">Add contextual Magik Button panel to each technician's profile showing relevant use cases based on performance metrics and recent activities.</p>
                </div>

                <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                  <h4 className="text-blue-400 font-medium mb-2">🔄 Phase 2: Real-Time Performance Monitoring</h4>
                  <p className="text-gray-300 text-sm">Proactively surface Magik Button suggestions based on live performance data, completion rates, and customer feedback.</p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded border border-purple-500/30">
                  <h4 className="text-purple-400 font-medium mb-2">🎯 Phase 3: Retention Intelligence Enhancement</h4>
                  <p className="text-gray-300 text-sm">Use Magik Button interaction data to identify at-risk technicians and automatically surface wellness and support resources.</p>
                </div>

                <div className="p-4 bg-orange-500/10 rounded border border-orange-500/30">
                  <h4 className="text-orange-400 font-medium mb-2">🤖 Phase 4: AI Agent Ecosystem Integration</h4>
                  <p className="text-gray-300 text-sm">Connect Magik Button requests to the full AI agent network for seamless cross-agent collaboration and autonomous task execution.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <MagikButtonModals
        isServiceOpen={isServiceOpen}
        setIsServiceOpen={setIsServiceOpen}
        isPartsOpen={isPartsOpen}
        setIsPartsOpen={setIsPartsOpen}
        isScheduleOpen={isScheduleOpen}
        setIsScheduleOpen={setIsScheduleOpen}
        isTechnicalOpen={isTechnicalOpen}
        setIsTechnicalOpen={setIsTechnicalOpen}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
        technicianId={selectedTechnician !== 'all-technicians' ? selectedTechnician : 'SKASPE0'}
      />
    </div>
  );
}