import { Router } from 'express';
import { openOrdersProcessor } from '../open-orders-processor';

const router = Router();

// Get all open orders with filtering
router.get('/open-orders', (req, res) => {
  try {
    const params = {
      search: req.query.search as string,
      status: req.query.status as string,
      planningArea: req.query.planningArea as string,
      assignedTech: req.query.assignedTech as string,
      riskLevel: req.query.riskLevel as string,
      profitability: req.query.profitability as string,
      hasPartsOrdered: req.query.hasPartsOrdered === 'true' ? true : req.query.hasPartsOrdered === 'false' ? false : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    };
    
    const result = openOrdersProcessor.searchOpenOrders(params);
    
    res.json({
      orders: result.orders,
      totalCount: result.totalCount,
      filteredCount: result.filteredCount
    });
  } catch (error) {
    console.error('Error fetching open orders:', error);
    res.status(500).json({ error: 'Failed to fetch open orders' });
  }
});

// Get open orders statistics
router.get('/open-orders/stats', (req, res) => {
  try {
    const stats = openOrdersProcessor.getOpenOrdersStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching open orders stats:', error);
    res.status(500).json({ error: 'Failed to fetch open orders statistics' });
  }
});

// Get filter options for dropdowns
router.get('/open-orders/filter-options', (req, res) => {
  try {
    const orders = openOrdersProcessor.getOpenOrders();
    
    const planningAreas = ['all', ...new Set(orders.map(o => o.planningArea).filter(Boolean))];
    const technicians = ['all', ...new Set(orders.map(o => o.assignedTech).filter(Boolean))];
    const statuses = ['all', ...new Set(orders.map(o => o.orderStatus))];
    const riskLevels = ['all', 'low', 'medium', 'high', 'critical'];
    const profitabilityLevels = ['all', ...new Set(orders.map(o => o.profitability).filter(Boolean))];
    
    res.json({
      planningAreas: planningAreas.sort(),
      technicians: technicians.sort(),
      statuses: statuses.sort(),
      riskLevels,
      profitabilityLevels: profitabilityLevels.sort()
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

export default router;