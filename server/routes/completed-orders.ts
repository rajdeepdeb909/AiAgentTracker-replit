import { Router } from 'express';
import { getCompletedOrdersData, calculateAggregateMetrics, getOrdersByPlanningArea, getOrdersByTechnician, getOrdersByAppliance } from '../completed-orders-data';
import { unifiedDataProcessor } from '../unified-data-processor';

const router = Router();

// Get all completed orders with optional filtering
router.get('/completed-orders', (req, res) => {
  try {
    // Use unified data processor for consistent data
    const searchParams = {
      search: req.query.search as string,
      planningArea: req.query.planningArea as string,
      technician: req.query.technician as string,
      customerRating: req.query.customerRating as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    };
    
    // Apply all filters through unified processor
    const allParams = {
      search: req.query.search as string,
      planningArea: req.query.planningArea as string,
      technician: req.query.technician as string,
      customerRating: req.query.customerRating as string,
      techRating: req.query.techRating as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    };
    
    const result = unifiedDataProcessor.searchServiceOrders(allParams);

    // Filter by planning area
    if (planningArea && planningArea !== 'all') {
      orders = orders.filter(order => order.planningArea === planningArea);
    }

    // Filter by repair type
    if (repairType && repairType !== 'all') {
      orders = orders.filter(order => order.repairType === repairType);
    }

    // Filter by appliance
    if (appliance && appliance !== 'all') {
      orders = orders.filter(order => order.appliance === appliance);
    }

    // Filter by customer rating
    if (customerRating && customerRating !== 'all') {
      if (customerRating === 'unrated') {
        orders = orders.filter(order => order.customerRating === null);
      } else {
        orders = orders.filter(order => order.customerRating === parseInt(customerRating as string));
      }
    }

    // Filter by tech self-rating
    if (techSelfRating && techSelfRating !== 'all') {
      orders = orders.filter(order => order.techSelfRating === parseInt(techSelfRating as string));
    }

    // Filter by rating discrepancy
    if (ratingDiscrepancy && ratingDiscrepancy !== 'all') {
      orders = orders.filter(order => {
        const discrepancy = order.ratingDiscrepancy || 0;
        if (ratingDiscrepancy === 'high') return discrepancy >= 2;
        if (ratingDiscrepancy === 'medium') return discrepancy >= 1 && discrepancy < 2;
        if (ratingDiscrepancy === 'low') return discrepancy < 1;
        return true;
      });
    }

    // Filter by parts ordered
    if (partsOrdered && partsOrdered !== 'all') {
      const hasPartsOrdered = partsOrdered === 'yes';
      orders = orders.filter(order => order.partsOrdered === hasPartsOrdered);
    }

    // Filter by technician
    if (technician && technician !== 'all') {
      orders = orders.filter(order => order.technicianId === technician || order.technicianName.toLowerCase().includes((technician as string).toLowerCase()));
    }

    // Filter by date
    const date = req.query.date as string;
    if (date && date !== 'all') {
      orders = orders.filter(order => order.date === date);
    }

    // Range filters
    if (cycleTimeMin) {
      orders = orders.filter(order => order.cycleTime >= parseFloat(cycleTimeMin as string));
    }
    if (cycleTimeMax) {
      orders = orders.filter(order => order.cycleTime <= parseFloat(cycleTimeMax as string));
    }
    if (responseTimeMin) {
      orders = orders.filter(order => order.responseTime >= parseFloat(responseTimeMin as string));
    }
    if (responseTimeMax) {
      orders = orders.filter(order => order.responseTime <= parseFloat(responseTimeMax as string));
    }
    if (revenueMin) {
      orders = orders.filter(order => order.revenue >= parseFloat(revenueMin as string));
    }
    if (revenueMax) {
      orders = orders.filter(order => order.revenue <= parseFloat(revenueMax as string));
    }
    if (profitMin) {
      orders = orders.filter(order => order.profit >= parseFloat(profitMin as string));
    }
    if (profitMax) {
      orders = orders.filter(order => order.profit <= parseFloat(profitMax as string));
    }

    // Use unified search processor for consistent results
    if (search) {
      const searchResults = unifiedDataProcessor.searchServiceOrders({
        search: search as string,
        planningArea: planningArea !== 'all' ? planningArea as string : undefined,
        technician: technician !== 'all' ? technician as string : undefined,
        limit: parseInt(limit as string) || 50,
        offset: parseInt(offset as string) || 0
      });
      
      // Convert to legacy format and return early
      const convertedOrders = searchResults.orders.map(order => ({
        ...order,
        date: order.completeDate,
        completionTime: `${order.completeDate} 00:00:00`
      }));
      
      return res.json({
        orders: convertedOrders,
        totalCount: searchResults.totalCount,
        filteredCount: searchResults.filteredCount
      });
    }

    // Sorting
    if (sortBy) {
      const sortField = sortBy as keyof typeof orders[0];
      const order = (sortOrder as string) === 'desc' ? -1 : 1;
      
      orders.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (aVal === null) aVal = -1;
        if (bVal === null) bVal = -1;
        
        if (aVal < bVal) return -1 * order;
        if (aVal > bVal) return 1 * order;
        return 0;
      });
    }

    // Pagination
    const totalCount = orders.length;
    if (offset) {
      orders = orders.slice(parseInt(offset as string));
    }
    if (limit) {
      orders = orders.slice(0, parseInt(limit as string));
    }

    res.json({
      orders,
      totalCount,
      filteredCount: orders.length
    });
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ error: 'Failed to fetch completed orders' });
  }
});

// Get summary statistics for completed orders
router.get('/completed-orders/summary', (req, res) => {
  try {
    const orders = getCompletedOrdersData();
    const metrics = calculateAggregateMetrics(orders);
    
    res.json(metrics);
  } catch (error) {
    console.error('Error calculating summary metrics:', error);
    res.status(500).json({ error: 'Failed to calculate summary metrics' });
  }
});

// Get filter options for dropdowns
router.get('/completed-orders/filter-options', (req, res) => {
  try {
    const orders = getCompletedOrdersData();
    
    const planningAreas = [...new Set(orders.map(order => order.planningArea))].sort();
    const repairTypes = [...new Set(orders.map(order => order.repairType))].sort();
    const appliances = [...new Set(orders.map(order => order.appliance))].sort();
    const technicians = [...new Set(orders.map(order => ({ 
      id: order.technicianId, 
      name: order.technicianName 
    })))].sort((a, b) => a.name.localeCompare(b.name));
    const dates = [...new Set(orders.map(order => order.date))].sort();

    res.json({
      planningAreas,
      repairTypes,
      appliances,
      technicians,
      dates
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

// Get technician performance comparison (tech self-rating vs customer rating)
router.get('/completed-orders/technician-performance', (req, res) => {
  try {
    const orders = getCompletedOrdersData();
    
    // Group by technician
    const technicianPerformance = orders.reduce((acc, order) => {
      if (!acc[order.technicianId]) {
        acc[order.technicianId] = {
          technicianId: order.technicianId,
          technicianName: order.technicianName,
          totalOrders: 0,
          avgTechSelfRating: 0,
          avgCustomerRating: 0,
          customerRatingCount: 0,
          totalRevenue: 0,
          avgCycleTime: 0,
          avgResponseTime: 0,
          ratingDiscrepancy: 0,
          ratingDiscrepancyCount: 0
        };
      }
      
      const tech = acc[order.technicianId];
      tech.totalOrders++;
      tech.avgTechSelfRating += order.techSelfRating;
      tech.totalRevenue += order.revenue;
      tech.avgCycleTime += order.cycleTime;
      tech.avgResponseTime += order.responseTime;
      
      if (order.customerRating !== null) {
        tech.avgCustomerRating += order.customerRating;
        tech.customerRatingCount++;
      }
      
      if (order.ratingDiscrepancy !== null) {
        tech.ratingDiscrepancy += order.ratingDiscrepancy;
        tech.ratingDiscrepancyCount++;
      }
      
      return acc;
    }, {} as Record<string, any>);

    // Calculate averages
    const result = Object.values(technicianPerformance).map((tech: any) => ({
      ...tech,
      avgTechSelfRating: Math.round((tech.avgTechSelfRating / tech.totalOrders) * 10) / 10,
      avgCustomerRating: tech.customerRatingCount > 0 
        ? Math.round((tech.avgCustomerRating / tech.customerRatingCount) * 10) / 10 
        : 0,
      customerRatingCoverage: Math.round((tech.customerRatingCount / tech.totalOrders) * 100),
      avgRevenue: Math.round((tech.totalRevenue / tech.totalOrders) * 100) / 100,
      avgCycleTime: Math.round((tech.avgCycleTime / tech.totalOrders) * 10) / 10,
      avgResponseTime: Math.round((tech.avgResponseTime / tech.totalOrders) * 10) / 10,
      avgRatingDiscrepancy: tech.ratingDiscrepancyCount > 0
        ? Math.round((tech.ratingDiscrepancy / tech.ratingDiscrepancyCount) * 10) / 10
        : 0
    }));

    res.json(result);
  } catch (error) {
    console.error('Error calculating technician performance:', error);
    res.status(500).json({ error: 'Failed to calculate technician performance' });
  }
});

export default router;