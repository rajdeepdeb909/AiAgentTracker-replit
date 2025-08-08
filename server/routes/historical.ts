import { Router } from "express";
import { storage } from "../storage";

const router = Router();

// Get historical metrics with optional date range and period filtering
router.get("/metrics", async (req, res) => {
  try {
    const { from, to, period, planningArea, productType, callType, jobCode } = req.query;
    
    const dateRange = from && to ? { 
      from: from as string, 
      to: to as string 
    } : undefined;

    const filters = {
      planningArea: planningArea as string | undefined,
      productType: productType as string | undefined,
      callType: callType as string | undefined,
      jobCode: jobCode as string | undefined
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );
    
    const metrics = await storage.getHistoricalMetrics(
      dateRange, 
      period as string | undefined,
      Object.keys(filters).length > 0 ? filters : undefined
    );
    
    res.json(metrics);
  } catch (error) {
    console.error("Error fetching historical metrics:", error);
    res.status(500).json({ error: "Failed to fetch historical metrics" });
  }
});

// Get agent performance history with optional agent and date filtering
router.get("/agent-performance", async (req, res) => {
  try {
    const { agentId, from, to, planningArea, productType, callType, jobCode } = req.query;
    
    const dateRange = from && to ? { 
      from: from as string, 
      to: to as string 
    } : undefined;

    const filters = {
      planningArea: planningArea as string | undefined,
      productType: productType as string | undefined,
      callType: callType as string | undefined,
      jobCode: jobCode as string | undefined
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );
    
    const history = await storage.getAgentPerformanceHistory(
      agentId ? parseInt(agentId as string) : undefined,
      dateRange,
      Object.keys(filters).length > 0 ? filters : undefined
    );
    
    res.json(history);
  } catch (error) {
    console.error("Error fetching agent performance history:", error);
    res.status(500).json({ error: "Failed to fetch agent performance history" });
  }
});

// Create new historical metric (for data ingestion)
router.post("/metrics", async (req, res) => {
  try {
    const metricData = req.body;
    const metric = await storage.createHistoricalMetric(metricData);
    res.status(201).json(metric);
  } catch (error) {
    console.error("Error creating historical metric:", error);
    res.status(500).json({ error: "Failed to create historical metric" });
  }
});

// Create new agent performance history record
router.post("/agent-performance", async (req, res) => {
  try {
    const historyData = req.body;
    const history = await storage.createAgentPerformanceHistory(historyData);
    res.status(201).json(history);
  } catch (error) {
    console.error("Error creating agent performance history:", error);
    res.status(500).json({ error: "Failed to create agent performance history" });
  }
});

// Get aggregated statistics for dashboard
router.get("/dashboard-stats", async (req, res) => {
  try {
    const { period = "day" } = req.query;
    
    // Get recent metrics for the specified period
    const metrics = await storage.getHistoricalMetrics(undefined, period as string);
    
    if (metrics.length === 0) {
      return res.json({
        totalAgents: 26,
        activeAgents: 22,
        avgPerformance: 87.5,
        totalRevenue: 0,
        totalCost: 0,
        profitMargin: 0,
        customerSatisfaction: 0,
        callVolume: 0,
        conversionRate: 0,
        techniciansDeployed: 0
      });
    }
    
    // Calculate aggregated statistics
    const latest = metrics[metrics.length - 1];
    const previousPeriod = metrics.length > 1 ? metrics[metrics.length - 2] : latest;
    
    // Calculate trends
    const revenueChange = latest.totalRevenue - previousPeriod.totalRevenue;
    const performanceChange = latest.avgPerformance - previousPeriod.avgPerformance;
    const callVolumeChange = latest.callVolume - previousPeriod.callVolume;
    
    res.json({
      current: latest,
      previous: previousPeriod,
      trends: {
        revenue: {
          value: revenueChange,
          percentage: previousPeriod.totalRevenue > 0 ? 
            Math.round((revenueChange / previousPeriod.totalRevenue) * 100 * 100) / 100 : 0,
          isPositive: revenueChange >= 0
        },
        performance: {
          value: performanceChange,
          percentage: previousPeriod.avgPerformance > 0 ? 
            Math.round((performanceChange / previousPeriod.avgPerformance) * 100 * 100) / 100 : 0,
          isPositive: performanceChange >= 0
        },
        callVolume: {
          value: callVolumeChange,
          percentage: previousPeriod.callVolume > 0 ? 
            Math.round((callVolumeChange / previousPeriod.callVolume) * 100 * 100) / 100 : 0,
          isPositive: callVolumeChange >= 0
        }
      },
      summary: {
        totalAgents: latest.totalAgents,
        activeAgents: latest.activeAgents,
        avgPerformance: latest.avgPerformance,
        totalRevenue: latest.totalRevenue,
        totalCost: latest.totalCost,
        profitMargin: latest.profitMargin,
        customerSatisfaction: latest.customerSatisfaction,
        callVolume: latest.callVolume,
        conversionRate: latest.conversionRate,
        techniciansDeployed: latest.techniciansDeployed
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
});

// Get available filter options
router.get("/filter-options", async (req, res) => {
  try {
    const filterOptions = await storage.getHistoricalFilterOptions();
    res.json(filterOptions);
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ error: "Failed to fetch filter options" });
  }
});

export default router;