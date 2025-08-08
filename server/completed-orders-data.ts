// Data processing for completed service orders from unified data processor
import { unifiedDataProcessor, type UnifiedServiceOrder } from './unified-data-processor';

export interface CompletedServiceOrder {
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
  // New date fields
  createDate: string; // YYYY-MM-DD format
  scheduleDate: string; // YYYY-MM-DD format
  completeDate: string; // YYYY-MM-DD format
  // Timing calculations in days
  responseTime: number; // Days from create to first schedule
  cycleTime: number; // Days from create to completion
  customerRating: number | null;
  techRating: number | null;
  techSelfRating: number; // Technician self-assessment rating
  customerComments: string | null;
  techComments: string | null;
  date: string;
  completionTime: string;
  partsOrdered: boolean;
  partsDeliveryTime: number | null;
  technicianId: string;
  technicianName: string;
  ratingDiscrepancy: number | null; // Difference between tech self-rating and customer rating
}

// Use unified data processor for consistent data access
function generateCompletedOrdersData(): CompletedServiceOrder[] {
  const unifiedOrders = unifiedDataProcessor.getCompletedServiceOrders();
  
  // Convert unified format to our legacy interface
  return unifiedOrders.map(order => ({
    id: order.id,
    serviceUnitNo: order.serviceUnitNo,
    orderNo: order.orderNo,
    customerId: order.customerId,
    customerName: order.customerName,
    planningArea: order.planningArea,
    repairType: order.repairType,
    appliance: order.appliance,
    revenue: order.revenue,
    profit: order.profit,
    createDate: order.createDate,
    scheduleDate: order.scheduleDate,
    completeDate: order.completeDate,
    responseTime: order.responseTime,
    cycleTime: order.cycleTime,
    customerRating: order.customerRating,
    techRating: order.techRating,
    techSelfRating: order.techSelfRating,
    customerComments: order.customerComments,
    techComments: order.techComments,
    date: order.completeDate,
    completionTime: `${order.completeDate} 00:00:00`,
    partsOrdered: order.partsOrdered,
    partsDeliveryTime: order.partsDeliveryTime,
    technicianId: order.technicianId,
    technicianName: order.technicianName,
    ratingDiscrepancy: order.ratingDiscrepancy
  }));
}



export function getCompletedOrdersData(): CompletedServiceOrder[] {
  return generateCompletedOrdersData();
}

// Clear cache to regenerate data with updated calculations
export function clearDataCache(): void {
  unifiedDataProcessor.clearCache();
}

// Additional utility functions for filtering and analysis
export function getOrdersByPlanningArea(planningArea?: string): CompletedServiceOrder[] {
  const orders = getCompletedOrdersData();
  if (!planningArea || planningArea === 'all') {
    return orders;
  }
  return orders.filter(order => order.planningArea === planningArea);
}

export function getOrdersByTechnician(technicianId?: string): CompletedServiceOrder[] {
  const orders = getCompletedOrdersData();
  if (!technicianId || technicianId === 'all') {
    return orders;
  }
  return orders.filter(order => order.technicianId === technicianId);
}

export function getOrdersByAppliance(appliance?: string): CompletedServiceOrder[] {
  const orders = getCompletedOrdersData();
  if (!appliance || appliance === 'all') {
    return orders;
  }
  return orders.filter(order => order.appliance === appliance);
}

// Analytics functions
export function calculateAggregateMetrics(orders: CompletedServiceOrder[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.revenue, 0);
  const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);
  const avgCycleTime = orders.reduce((sum, order) => sum + order.cycleTime, 0) / totalOrders;
  const avgResponseTime = orders.reduce((sum, order) => sum + order.responseTime, 0) / totalOrders;
  
  const ratedOrders = orders.filter(order => order.customerRating !== null);
  const avgCustomerRating = ratedOrders.length > 0 
    ? ratedOrders.reduce((sum, order) => sum + (order.customerRating || 0), 0) / ratedOrders.length 
    : 0;
  
  const avgTechSelfRating = orders.reduce((sum, order) => sum + order.techSelfRating, 0) / totalOrders;
  
  const ordersWithParts = orders.filter(order => order.partsOrdered);
  const partsOrderRate = (ordersWithParts.length / totalOrders) * 100;
  
  // Rating discrepancy analysis
  const ordersWithBothRatings = orders.filter(order => 
    order.customerRating !== null && order.ratingDiscrepancy !== null
  );
  const avgRatingDiscrepancy = ordersWithBothRatings.length > 0
    ? ordersWithBothRatings.reduce((sum, order) => sum + (order.ratingDiscrepancy || 0), 0) / ordersWithBothRatings.length
    : 0;

  return {
    totalOrders,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    avgRevenue: Math.round((totalRevenue / totalOrders) * 100) / 100,
    avgProfit: Math.round((totalProfit / totalOrders) * 100) / 100,
    avgCycleTime: Math.round(avgCycleTime * 10) / 10,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10,
    avgCustomerRating: Math.round(avgCustomerRating * 10) / 10,
    avgTechSelfRating: Math.round(avgTechSelfRating * 10) / 10,
    customerRatingCoverage: Math.round((ratedOrders.length / totalOrders) * 100 * 10) / 10,
    partsOrderRate: Math.round(partsOrderRate * 10) / 10,
    avgRatingDiscrepancy: Math.round(avgRatingDiscrepancy * 10) / 10,
    ordersWithBothRatings: ordersWithBothRatings.length
  };
}