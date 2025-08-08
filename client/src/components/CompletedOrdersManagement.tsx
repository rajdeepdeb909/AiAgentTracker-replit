import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Search,
  Clock,
  DollarSign,
  Star,
  User,
  MapPin,
  Wrench,
  Package,
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  X
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import NavigationLink from './NavigationLink';

interface CompletedOrder {
  id: number;
  serviceUnitNo: string;
  orderNo: string;
  customerId: string;
  customerName: string;
  planningArea: string;
  repairType: string;
  appliance: string;
  revenue: number;
  profit: number;
  cycleTime: number;
  customerRating: number | null;
  techRating: number | null;
  techSelfRating: number; // Technician self-assessment
  customerComments: string | null;
  techComments: string | null;
  date: string;
  completionTime: string;
  responseTime: number; // Time from call to arrival
  partsOrdered: boolean;
  partsDeliveryTime: number | null;
  technicianId: string;
  technicianName: string;
  ratingDiscrepancy: number | null; // Difference between tech self-rating and customer rating
  // Additional date fields for timeline tracking
  createDate: string;
  scheduleDate: string;
  completeDate: string;
}

// Filter dimensions for business intelligence
interface FilterOptions {
  planningArea: string;
  repairType: string;
  appliance: string;
  customerRating: string;
  techRating: string;
  techSelfRating: string;
  ratingDiscrepancy: string;
  cycleTimeRange: string;
  responseTimeRange: string;
  revenueRange: string;
  profitRange: string;
  partsOrdered: string;
  technician: string;
  dateRange: string;
}

interface SortOption {
  field: keyof CompletedOrder;
  direction: 'asc' | 'desc';
}

export default function CompletedOrdersManagement() {
  const [location, setLocation] = useLocation();
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Handle URL parameters for order and technician filtering
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderFromUrl = params.get('order');
    const technicianFromUrl = params.get('technician');
    
    if (orderFromUrl) {
      setSearchTerm(orderFromUrl);
    }
    if (technicianFromUrl) {
      setFilters(prev => ({ ...prev, technician: technicianFromUrl }));
    }
  }, [location]);

  // Handle order details modal events
  useEffect(() => {
    const handleOpenOrderDetails = (event: CustomEvent) => {
      const { orderId } = event.detail;
      setSelectedOrderId(orderId);
      setShowOrderModal(true);
    };

    window.addEventListener('openOrderDetails', handleOpenOrderDetails as EventListener);
    return () => {
      window.removeEventListener('openOrderDetails', handleOpenOrderDetails as EventListener);
    };
  }, []);

  // Use API data for completed orders
  const { data: completedOrdersResponse, isLoading } = useQuery<{orders: CompletedOrder[], totalCount: number}>({
    queryKey: ['/api/completed-orders'],
  });

  const completedOrdersData = completedOrdersResponse?.orders || [];

  // Filter and sort the data
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = completedOrdersData.filter(order => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!order.customerName.toLowerCase().includes(searchLower) &&
            !order.planningArea.toLowerCase().includes(searchLower) &&
            !order.technicianName.toLowerCase().includes(searchLower) &&
            !order.appliance.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Apply all filters
      if (filters.planningArea && filters.planningArea !== 'all' && order.planningArea !== filters.planningArea) return false;
      if (filters.repairType && filters.repairType !== 'all' && order.repairType !== filters.repairType) return false;
      if (filters.appliance && filters.appliance !== 'all' && order.appliance !== filters.appliance) return false;
      if (filters.technician && filters.technician !== 'all' && order.technicianName !== filters.technician) return false;
      if (filters.partsOrdered && filters.partsOrdered !== 'all') {
        if (filters.partsOrdered === 'yes' && !order.partsOrdered) return false;
        if (filters.partsOrdered === 'no' && order.partsOrdered) return false;
      }
      
      // Date filter
      if (filters.dateRange && filters.dateRange !== 'all' && order.date !== filters.dateRange) return false;

      // Rating filters
      if (filters.customerRating && filters.customerRating !== 'all') {
        if (filters.customerRating === 'unrated' && order.customerRating !== null) return false;
        if (filters.customerRating !== 'unrated' && order.customerRating !== parseInt(filters.customerRating)) return false;
      }

      if (filters.ratingDiscrepancy && filters.ratingDiscrepancy !== 'all') {
        const discrepancy = order.ratingDiscrepancy || 0;
        if (filters.ratingDiscrepancy === 'high' && discrepancy < 2) return false;
        if (filters.ratingDiscrepancy === 'medium' && (discrepancy < 1 || discrepancy >= 2)) return false;
        if (filters.ratingDiscrepancy === 'low' && discrepancy >= 1) return false;
      }

      return true;
    });

    // Sort the data
    filtered.sort((a, b) => {
      let aVal = a[sortOption.field];
      let bVal = b[sortOption.field];
      
      if (aVal === null) aVal = -1;
      if (bVal === null) bVal = -1;
      
      if (sortOption.direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [completedOrdersData, filters, sortOption, searchTerm]);

  // Summary statistics
  const summaryStats = useMemo(() => {
    const data = filteredAndSortedOrders;
    const totalOrders = data.length;
    const totalRevenue = data.reduce((sum, order) => sum + order.revenue, 0);
    const avgRevenue = totalRevenue / totalOrders || 0;
    const avgCycleTime = data.reduce((sum, order) => sum + order.cycleTime, 0) / totalOrders || 0;
    const ratedOrders = data.filter(order => order.customerRating !== null).length;
    const avgCustomerRating = data.filter(order => order.customerRating !== null)
      .reduce((sum, order) => sum + (order.customerRating || 0), 0) / ratedOrders || 0;
    const avgTechSelfRating = data.reduce((sum, order) => sum + (order.techSelfRating || 0), 0) / totalOrders || 0;
    
    return {
      totalOrders,
      totalRevenue,
      avgRevenue,
      avgCycleTime,
      ratedOrders,
      avgCustomerRating,
      avgTechSelfRating,
      ratingCoverage: (ratedOrders / totalOrders) * 100
    };
  }, [filteredAndSortedOrders]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-800 rounded w-1/3"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
          <div className="h-64 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setLocation('/dashboard')}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Completed Orders Management</h1>
            <p className="text-gray-400">Comprehensive analysis of {completedOrdersData.length.toLocaleString()} completed service orders</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-400">{summaryStats.totalOrders.toLocaleString()}</p>
          <p className="text-gray-400">Filtered Results</p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-900 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Advanced Filtering & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>

            {/* Date Filter */}
            <Select value={filters.dateRange || 'all'} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="2025-07-29">July 29, 2025</SelectItem>
                <SelectItem value="2025-07-28">July 28, 2025</SelectItem>
                <SelectItem value="2025-07-27">July 27, 2025</SelectItem>
                <SelectItem value="2025-07-26">July 26, 2025</SelectItem>
                <SelectItem value="2025-07-25">July 25, 2025</SelectItem>
                <SelectItem value="2025-07-24">July 24, 2025</SelectItem>
                <SelectItem value="2025-07-23">July 23, 2025</SelectItem>
              </SelectContent>
            </Select>

            {/* Planning Area Filter */}
            <Select value={filters.planningArea || 'all'} onValueChange={(value) => setFilters({...filters, planningArea: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Planning Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Houston Metro">Houston Metro</SelectItem>
                <SelectItem value="DFW Metro">DFW Metro</SelectItem>
                <SelectItem value="San Antonio">San Antonio</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
                <SelectItem value="Phoenix">Phoenix</SelectItem>
              </SelectContent>
            </Select>

            {/* Repair Type Filter */}
            <Select value={filters.repairType || 'all'} onValueChange={(value) => setFilters({...filters, repairType: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Repair Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Repair">Repair</SelectItem>
                <SelectItem value="Installation">Installation</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>

            {/* Technician Filter */}
            <Select value={filters.technician || 'all'} onValueChange={(value) => setFilters({...filters, technician: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Technician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technicians</SelectItem>
                <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
                <SelectItem value="Carlos Rodriguez">Carlos Rodriguez</SelectItem>
                <SelectItem value="Jennifer Wilson">Jennifer Wilson</SelectItem>
                <SelectItem value="David Brown">David Brown</SelectItem>
                <SelectItem value="Lisa Garcia">Lisa Garcia</SelectItem>
                <SelectItem value="Robert Taylor">Robert Taylor</SelectItem>
                <SelectItem value="Amanda Lee">Amanda Lee</SelectItem>
              </SelectContent>
            </Select>

            {/* Customer Rating Filter */}
            <Select value={filters.customerRating || 'all'} onValueChange={(value) => setFilters({...filters, customerRating: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Customer Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="unrated">Unrated</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Discrepancy Filter */}
            <Select value={filters.ratingDiscrepancy || 'all'} onValueChange={(value) => setFilters({...filters, ratingDiscrepancy: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Rating Gap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gaps</SelectItem>
                <SelectItem value="high">High Gap (2+ stars)</SelectItem>
                <SelectItem value="medium">Medium Gap (1 star)</SelectItem>
                <SelectItem value="low">Low Gap (&lt; 1 star)</SelectItem>
              </SelectContent>
            </Select>

            {/* Parts Ordered Filter */}
            <Select value={filters.partsOrdered || 'all'} onValueChange={(value) => setFilters({...filters, partsOrdered: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Parts Ordered" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="yes">Parts Ordered</SelectItem>
                <SelectItem value="no">No Parts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <Select 
              value={sortOption.field} 
              onValueChange={(field) => setSortOption({...sortOption, field: field as keyof CompletedOrder})}
            >
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="cycleTime">Cycle Time</SelectItem>
                <SelectItem value="responseTime">Response Time</SelectItem>
                <SelectItem value="customerRating">Customer Rating</SelectItem>
                <SelectItem value="techSelfRating">Tech Self Rating</SelectItem>
                <SelectItem value="ratingDiscrepancy">Rating Discrepancy</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOption({...sortOption, direction: sortOption.direction === 'asc' ? 'desc' : 'asc'})}
              className="bg-gray-800 border-gray-600"
            >
              {sortOption.direction === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({});
                setSearchTerm('');
                setSortOption({ field: 'date', direction: 'desc' });
              }}
              className="bg-gray-800 border-gray-600"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{summaryStats.totalOrders.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-green-400">${summaryStats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Cycle Time</p>
                <p className="text-2xl font-bold text-blue-400">{summaryStats.avgCycleTime.toFixed(1)}h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Customer Rating</p>
                <p className="text-2xl font-bold text-yellow-400">{summaryStats.avgCustomerRating.toFixed(1)}⭐</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tech Self Rating</p>
                <p className="text-2xl font-bold text-purple-400">{summaryStats.avgTechSelfRating.toFixed(1)}⭐</p>
              </div>
              <User className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rating Coverage</p>
                <p className="text-2xl font-bold text-orange-400">{summaryStats.ratingCoverage.toFixed(1)}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Orders Table */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Completed Orders Details</span>
            <Badge variant="secondary" className="bg-blue-600">
              {filteredAndSortedOrders.length.toLocaleString()} of {completedOrdersData.length.toLocaleString()} orders
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3 pr-4">Order</th>
                  <th className="text-left text-gray-400 pb-3 px-2">Customer</th>
                  <th className="text-left text-gray-400 pb-3 px-2">Planning Area</th>
                  <th className="text-left text-gray-400 pb-3 px-2">Service</th>
                  <th className="text-right text-gray-400 pb-3 px-2">Revenue</th>
                  <th className="text-right text-gray-400 pb-3 px-2">Cycle Time</th>
                  <th className="text-center text-gray-400 pb-3 px-2">Customer</th>
                  <th className="text-center text-gray-400 pb-3 px-2">Tech Self</th>
                  <th className="text-center text-gray-400 pb-3 px-2">Gap</th>
                  <th className="text-left text-gray-400 pb-3 pl-2">Technician</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedOrders.slice(0, 50).map((order) => (
                  <tr key={order.orderNo} className="border-b border-gray-800/50 hover:bg-gray-800/50">
                    <td className="py-3 pr-4">
                      <div>
                        <NavigationLink 
                          type="order" 
                          id={order.orderNo.toString()} 
                          name={`#${order.orderNo}`}
                          compact={true}
                          className="font-medium"
                        />
                        <p className="text-gray-500 text-xs">{order.appliance}</p>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <div>
                        <p className="text-white font-medium">{order.customerName}</p>
                        <p className="text-gray-500 text-xs">ID: {order.customerId}</p>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <Badge variant="outline" className="text-xs">{order.planningArea}</Badge>
                    </td>
                    <td className="px-2 py-3">
                      <div>
                        <p className="text-white">{order.repairType}</p>
                        {order.partsOrdered && <Package className="w-3 h-3 text-blue-400 inline ml-1" />}
                      </div>
                    </td>
                    <td className="text-right px-2 py-3">
                      <span className="text-green-400 font-medium">${order.revenue.toFixed(2)}</span>
                    </td>
                    <td className="text-right px-2 py-3">
                      <span className={`font-medium ${order.cycleTime > 4 ? 'text-red-400' : order.cycleTime > 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {order.cycleTime} days
                      </span>
                    </td>
                    <td className="text-center px-2 py-3">
                      {order.customerRating ? (
                        <div className="flex items-center justify-center">
                          <span className="text-yellow-400">{order.customerRating}</span>
                          <Star className="w-3 h-3 text-yellow-400 ml-1" />
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="text-center px-2 py-3">
                      <div className="flex items-center justify-center">
                        <span className="text-purple-400">{order.techSelfRating}</span>
                        <Star className="w-3 h-3 text-purple-400 ml-1" />
                      </div>
                    </td>
                    <td className="text-center px-2 py-3">
                      {order.ratingDiscrepancy !== null ? (
                        <Badge 
                          variant={order.ratingDiscrepancy >= 2 ? "destructive" : order.ratingDiscrepancy >= 1 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {order.ratingDiscrepancy.toFixed(1)}
                        </Badge>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="pl-2 py-3">
                      <div>
                        <NavigationLink 
                          type="technician" 
                          id={order.technicianId} 
                          name={order.technicianName}
                          compact={true}
                          className="font-medium"
                        />
                        <p className="text-gray-500 text-xs">{order.technicianId}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedOrders.length > 50 && (
            <div className="mt-4 text-center">
              <Badge variant="outline" className="text-gray-400">
                Showing first 50 of {filteredAndSortedOrders.length.toLocaleString()} results
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5" />
              Order Details - #{selectedOrderId}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Comprehensive order information and service details
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrderId && (() => {
            const order = completedOrdersData.find(o => o.orderNo === selectedOrderId);
            if (!order) return <div className="text-gray-400">Order not found</div>;
            
            return (
              <div className="space-y-6">
                {/* Basic Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-white">Service Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-400">Service Unit:</span>
                          <p className="text-white font-medium">{order.serviceUnitNo}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Planning Area:</span>
                          <p className="text-white font-medium">{order.planningArea}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Appliance:</span>
                          <p className="text-white font-medium">{order.appliance}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Repair Type:</span>
                          <p className="text-white font-medium">{order.repairType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-white">Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-gray-400">Customer:</span>
                        <p className="text-white font-medium">{order.customerName}</p>
                        <p className="text-gray-500 text-sm">ID: {order.customerId}</p>
                      </div>
                      {order.customerComments && (
                        <div>
                          <span className="text-gray-400">Comments:</span>
                          <p className="text-white text-sm">{order.customerComments}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Performance & Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">${order.revenue.toFixed(2)}</div>
                      <div className="text-gray-400 text-sm">Revenue</div>
                      <div className="text-sm text-gray-500">Profit: ${order.profit.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className={`text-2xl font-bold ${order.cycleTime > 4 ? 'text-red-400' : order.cycleTime > 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {order.cycleTime} days
                      </div>
                      <div className="text-gray-400 text-sm">Cycle Time</div>
                      <div className="text-sm text-gray-500">Response: {order.responseTime} days</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                        {order.customerRating ? (
                          <>
                            <span className="text-yellow-400">{order.customerRating}</span>
                            <Star className="w-5 h-5 text-yellow-400" />
                          </>
                        ) : (
                          <span className="text-gray-500">No Rating</span>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">Customer Rating</div>
                      <div className="text-sm text-purple-400">Tech Self: {order.techSelfRating}/5</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Technician Information */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Technician Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <NavigationLink 
                          type="technician"
                          id={order.technicianId}
                          name={order.technicianName}
                          className="text-lg font-medium mb-2"
                        />
                        <p className="text-gray-500 text-sm">ID: {order.technicianId}</p>
                      </div>
                      <div>
                        {order.ratingDiscrepancy !== null && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Rating Gap:</span>
                            <Badge 
                              variant={order.ratingDiscrepancy >= 2 ? "destructive" : order.ratingDiscrepancy >= 1 ? "default" : "secondary"}
                            >
                              {order.ratingDiscrepancy.toFixed(1)} points
                            </Badge>
                          </div>
                        )}
                        {order.techComments && (
                          <div className="mt-2">
                            <span className="text-gray-400">Tech Notes:</span>
                            <p className="text-white text-sm">{order.techComments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parts Information */}
                {order.partsOrdered && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Parts Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-blue-600">Parts Ordered</Badge>
                        {order.partsDeliveryTime && (
                          <span className="text-gray-400">
                            Delivery Time: {order.partsDeliveryTime} hours
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Service Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Create Date:</span>
                        <span className="text-white">{order.createDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Schedule Date:</span>
                        <span className="text-white">{order.scheduleDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Date:</span>
                        <span className="text-white">{order.completeDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Time:</span>
                        <span className="text-white">{order.completionTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{order.responseTime} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cycle Time:</span>
                        <span className="text-white">{order.cycleTime} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}