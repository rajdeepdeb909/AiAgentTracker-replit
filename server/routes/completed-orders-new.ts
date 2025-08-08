import { Router } from 'express';
import { unifiedDataProcessor } from '../unified-data-processor';

const router = Router();

// Get all completed orders with filtering through unified processor
router.get('/completed-orders', (req, res) => {
  try {
    const params = {
      search: req.query.search as string,
      planningArea: req.query.planningArea as string,
      technician: req.query.technician as string,
      customerRating: req.query.customerRating as string,
      techRating: req.query.techRating as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    };
    
    const result = unifiedDataProcessor.searchServiceOrders(params);
    
    // Convert to legacy format for frontend compatibility  
    const convertedOrders = result.orders.map(order => ({
      ...order,
      date: order.completeDate,
      completionTime: `${order.completeDate} 00:00:00`
    }));
    
    res.json({
      orders: convertedOrders,
      totalCount: result.totalCount,
      filteredCount: result.filteredCount
    });
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ error: 'Failed to fetch completed orders' });
  }
});

export default router;