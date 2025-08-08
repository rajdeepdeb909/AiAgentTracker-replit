import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Wrench, 
  Clock, 
  DollarSign, 
  Users, 
  Route,
  Package,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/Sidebar";
import type { Agent } from "@shared/schema";

// Mock data for demonstration
const mockServiceRequests = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerPhone: "(555) 123-4567",
    serviceType: "plumbing",
    description: "Kitchen sink leak repair",
    priority: "high",
    status: "scheduled",
    assignedAgentId: 1,
    scheduledDate: "2024-01-24T09:00:00Z",
    estimatedDuration: 120,
    address: "123 Main St, Springfield",
    estimatedCost: 150,
    customerRating: null,
    createdAt: "2024-01-23T10:00:00Z"
  },
  {
    id: 2,
    customerName: "Mike Chen",
    customerPhone: "(555) 987-6543",
    serviceType: "electrical",
    description: "Outlet installation in home office",
    priority: "medium",
    status: "completed",
    assignedAgentId: 2,
    scheduledDate: "2024-01-23T14:00:00Z",
    estimatedDuration: 90,
    address: "456 Oak Ave, Springfield",
    estimatedCost: 200,
    actualCost: 185,
    customerRating: 5,
    customerFeedback: "Excellent work, very professional",
    completedAt: "2024-01-23T15:30:00Z",
    createdAt: "2024-01-22T16:30:00Z"
  },
  {
    id: 3,
    customerName: "Emma Rodriguez",
    customerPhone: "(555) 456-7890",
    serviceType: "hvac",
    description: "Annual furnace maintenance",
    priority: "low",
    status: "pending",
    assignedAgentId: null,
    scheduledDate: null,
    estimatedDuration: 180,
    address: "789 Pine St, Springfield",
    estimatedCost: 120,
    createdAt: "2024-01-24T08:00:00Z"
  }
];

const mockInventory = [
  {
    id: 1,
    itemName: "PVC Pipe Fittings",
    category: "parts",
    currentStock: 45,
    minStockLevel: 20,
    maxStockLevel: 100,
    unitCost: 2.50,
    supplier: "Plumbing Supply Co",
    location: "Warehouse A"
  },
  {
    id: 2,
    itemName: "Wire Nuts",
    category: "parts",
    currentStock: 12,
    minStockLevel: 25,
    maxStockLevel: 150,
    unitCost: 0.15,
    supplier: "Electrical Depot",
    location: "Truck #3"
  },
  {
    id: 3,
    itemName: "HVAC Filters",
    category: "parts",
    currentStock: 85,
    minStockLevel: 30,
    maxStockLevel: 120,
    unitCost: 12.00,
    supplier: "Climate Control Inc",
    location: "Warehouse B"
  }
];

const mockTechnicianSchedules = [
  {
    id: 1,
    agentId: 1,
    date: "2024-01-24",
    startTime: "08:00",
    endTime: "17:00",
    status: "busy",
    location: "Springfield Area",
    serviceRequestId: 1
  },
  {
    id: 2,
    agentId: 2,
    date: "2024-01-24",
    startTime: "09:00",
    endTime: "18:00",
    status: "available",
    location: "Downtown Springfield"
  }
];

export default function HomeServices() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const { data: agents = [], isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  if (agentsLoading) {
    return (
      <div className="flex min-h-screen bg-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "scheduled": return "bg-blue-500";
      case "in_progress": return "bg-yellow-500";
      case "pending": return "bg-gray-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return { color: "text-red-400", status: "Low Stock" };
    if (current <= min * 1.5) return { color: "text-yellow-400", status: "Medium Stock" };
    return { color: "text-green-400", status: "Well Stocked" };
  };

  const completedRequests = mockServiceRequests.filter(req => req.status === "completed").length;
  const totalRevenue = mockServiceRequests
    .filter(req => req.actualCost)
    .reduce((sum, req) => sum + (req.actualCost || 0), 0);
  const avgRating = mockServiceRequests
    .filter(req => req.customerRating)
    .reduce((sum, req, _, arr) => sum + (req.customerRating || 0) / arr.length, 0);
  const lowStockItems = mockInventory.filter(item => item.currentStock <= item.minStockLevel).length;

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-dark-border bg-dark-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Home Services Management</h1>
              <p className="text-gray-400 mt-2">
                Manage field operations, service requests, and technician coordination
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/80">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Service
            </Button>
          </div>
        </header>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="requests">Service Requests</TabsTrigger>
              <TabsTrigger value="schedules">Technician Schedules</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Completed Today</p>
                        <p className="text-3xl font-bold text-white">{completedRequests}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Service requests</p>
                  </CardContent>
                </Card>

                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Daily Revenue</p>
                        <p className="text-3xl font-bold text-green-400">${totalRevenue}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">From completed jobs</p>
                  </CardContent>
                </Card>

                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Customer Rating</p>
                        <div className="flex items-center">
                          <p className="text-3xl font-bold text-yellow-400 mr-2">{avgRating.toFixed(1)}</p>
                          <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>
                      </div>
                      <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Average rating</p>
                  </CardContent>
                </Card>

                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Low Stock Alerts</p>
                        <p className="text-3xl font-bold text-red-400">{lowStockItems}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Items need restocking</p>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Schedule */}
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Calendar className="w-5 h-5 mr-2" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServiceRequests
                      .filter(req => req.status === "scheduled")
                      .map((request) => (
                        <div key={request.id} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-white font-medium">{request.customerName}</p>
                              <p className="text-gray-400 text-sm">{request.serviceType} • {request.address}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={getPriorityColor(request.priority)}>
                                {request.priority}
                              </Badge>
                              <p className="text-gray-400 text-sm mt-1">
                                {new Date(request.scheduledDate!).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{request.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center text-gray-400 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {request.estimatedDuration} min
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ${request.estimatedCost}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white">Service Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServiceRequests.map((request) => (
                      <div key={request.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white font-medium">{request.customerName}</p>
                            <p className="text-gray-400 text-sm">
                              <Phone className="w-4 h-4 inline mr-1" />
                              {request.customerPhone}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-gray-400 text-sm">Service Type</p>
                            <p className="text-white">{request.serviceType}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Address</p>
                            <p className="text-white flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {request.address}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{request.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {request.estimatedDuration} min
                            </span>
                            <span className="text-gray-400">
                              <DollarSign className="w-4 h-4 inline mr-1" />
                              ${request.actualCost || request.estimatedCost}
                            </span>
                          </div>
                          {request.customerRating && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < request.customerRating! 
                                      ? "text-yellow-400 fill-current" 
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                              <span className="text-gray-400 ml-2">{request.customerRating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedules" className="space-y-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Users className="w-5 h-5 mr-2" />
                    Technician Schedules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTechnicianSchedules.map((schedule) => {
                      const agent = agents.find(a => a.id === schedule.agentId);
                      return (
                        <div key={schedule.id} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-white font-medium">{agent?.name || "Unknown Agent"}</p>
                              <p className="text-gray-400 text-sm">{schedule.location}</p>
                            </div>
                            <Badge className={
                              schedule.status === "available" ? "bg-green-500" :
                              schedule.status === "busy" ? "bg-red-500" :
                              "bg-yellow-500"
                            }>
                              {schedule.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Date</p>
                              <p className="text-white">{schedule.date}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Hours</p>
                              <p className="text-white">{schedule.startTime} - {schedule.endTime}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Current Assignment</p>
                              <p className="text-white">
                                {schedule.serviceRequestId 
                                  ? `Service Request #${schedule.serviceRequestId}` 
                                  : "No assignment"
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Package className="w-5 h-5 mr-2" />
                    Inventory Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInventory.map((item) => {
                      const stockStatus = getStockStatus(item.currentStock, item.minStockLevel);
                      const stockPercentage = (item.currentStock / item.maxStockLevel) * 100;
                      
                      return (
                        <div key={item.id} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-white font-medium">{item.itemName}</p>
                              <p className="text-gray-400 text-sm">{item.category} • {item.location}</p>
                            </div>
                            <Badge className={stockStatus.color}>
                              {stockStatus.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-gray-400 text-sm">Current Stock</p>
                              <p className="text-white font-medium">{item.currentStock}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Min Level</p>
                              <p className="text-white">{item.minStockLevel}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Unit Cost</p>
                              <p className="text-white">${item.unitCost}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Supplier</p>
                              <p className="text-white">{item.supplier}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-400">Stock Level</span>
                              <span className="text-gray-400">{stockPercentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={stockPercentage} className="h-2" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communications" className="space-y-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Customer Communications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-medium">Sarah Johnson</p>
                          <p className="text-gray-400 text-sm">Service Request #1 • Plumbing</p>
                        </div>
                        <Badge className="bg-blue-500">SMS</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">
                        "Hi, I'm running about 10 minutes late. Is that still okay for the appointment?"
                      </p>
                      <p className="text-gray-500 text-xs">2 hours ago • Inbound</p>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-medium">Mike Chen</p>
                          <p className="text-gray-400 text-sm">Service Request #2 • Electrical</p>
                        </div>
                        <Badge className="bg-green-500">Email</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">
                        "Thank you for the excellent service! The outlet installation was completed perfectly."
                      </p>
                      <p className="text-gray-500 text-xs">1 day ago • Inbound</p>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-medium">Emma Rodriguez</p>
                          <p className="text-gray-400 text-sm">Service Request #3 • HVAC</p>
                        </div>
                        <Badge className="bg-purple-500">Call</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">
                        "Follow-up call regarding scheduling the annual furnace maintenance."
                      </p>
                      <p className="text-gray-500 text-xs">3 hours ago • Outbound</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}