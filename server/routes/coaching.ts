import { Router } from "express";
import { coachingEngine } from "../coaching-engine";
import { getCompletedOrdersData } from "../completed-orders-data";

const router = Router();

// Get coaching recommendations for all technicians
router.get("/recommendations", async (req, res) => {
  try {
    const { date = "2025-07-25" } = req.query;
    const completedOrders = getCompletedOrdersData();
    
    const allRecommendations = coachingEngine.getAllCoachingRecommendations(completedOrders);
    
    // Convert Map to array format
    const recommendationsArray = Array.from(allRecommendations.entries()).map(([techId, recommendations]) => ({
      technicianId: techId,
      recommendations
    }));
    
    res.json(recommendationsArray);
  } catch (error) {
    console.error("Error generating coaching recommendations:", error);
    res.status(500).json({ error: "Failed to generate coaching recommendations" });
  }
});

// Get coaching recommendations for specific technician
router.get("/recommendations/:technicianId", async (req, res) => {
  try {
    const { technicianId } = req.params;
    const completedOrders = getCompletedOrdersData();
    
    const technicianOrders = completedOrders.filter(order => order.technicianId === technicianId);
    
    if (technicianOrders.length === 0) {
      return res.status(404).json({ error: "Technician not found or no completed orders" });
    }
    
    const insights = coachingEngine.analyzeTechnicianPerformance(completedOrders);
    let techInsights = insights.get(technicianId);
    
    // If no insights found, generate them from technician's orders
    if (!techInsights) {
      const technicianInsights = coachingEngine.analyzeTechnicianPerformance(technicianOrders);
      techInsights = technicianInsights.get(technicianId);
    }
    
    if (!techInsights) {
      return res.status(404).json({ error: "No insights available for technician" });
    }
    
    const recommendations = coachingEngine.generateCoachingRecommendations(techInsights);
    
    res.json({
      technician: techInsights,
      recommendations
    });
  } catch (error) {
    console.error("Error getting technician coaching recommendations:", error);
    res.status(500).json({ error: "Failed to get coaching recommendations" });
  }
});

// Get performance insights for all technicians
router.get("/insights", async (req, res) => {
  try {
    const completedOrders = getCompletedOrdersData();
    const insights = coachingEngine.analyzeTechnicianPerformance(completedOrders);
    
    // Convert Map to array
    const insightsArray = Array.from(insights.values());
    
    res.json(insightsArray);
  } catch (error) {
    console.error("Error generating performance insights:", error);
    res.status(500).json({ error: "Failed to generate performance insights" });
  }
});

// Get performance insights for specific technician
router.get("/insights/:technicianId", async (req, res) => {
  try {
    const { technicianId } = req.params;
    const completedOrders = getCompletedOrdersData();
    
    const technicianOrders = completedOrders.filter(order => order.technicianId === technicianId);
    
    if (technicianOrders.length === 0) {
      return res.status(404).json({ error: "Technician not found or no completed orders" });
    }
    
    const insights = coachingEngine.analyzeTechnicianPerformance(technicianOrders);
    const techInsights = insights.get(technicianId);
    
    if (!techInsights) {
      return res.status(404).json({ error: "No insights available for technician" });
    }
    
    res.json(techInsights);
  } catch (error) {
    console.error("Error getting technician insights:", error);
    res.status(500).json({ error: "Failed to get technician insights" });
  }
});

// Get coaching summary and statistics
router.get("/summary", async (req, res) => {
  try {
    const completedOrders = getCompletedOrdersData();
    const summary = coachingEngine.getCoachingSummary(completedOrders);
    
    res.json(summary);
  } catch (error) {
    console.error("Error generating coaching summary:", error);
    res.status(500).json({ error: "Failed to generate coaching summary" });
  }
});

// Update coaching recommendation status
router.patch("/recommendations/:recommendationId/status", async (req, res) => {
  try {
    const { recommendationId } = req.params;
    const { status, notes, completionPercentage } = req.body;
    
    // In a real implementation, this would update the database
    // For now, return success response
    res.json({
      success: true,
      message: "Coaching recommendation status updated",
      recommendationId,
      status,
      notes,
      completionPercentage,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating coaching recommendation:", error);
    res.status(500).json({ error: "Failed to update coaching recommendation" });
  }
});

// Get coaching progress for technician
router.get("/progress/:technicianId", async (req, res) => {
  try {
    const { technicianId } = req.params;
    
    // Mock progress data - in real implementation, this would come from database
    const mockProgress = [
      {
        id: 1,
        recommendationId: `${technicianId}-cs-1`,
        progressUpdate: "Completed customer service workshop",
        completionPercentage: 25,
        notes: "Showed good engagement during training session",
        updatedBy: "Coach Sarah",
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        performanceImpact: { customerSatisfaction: 5 }
      },
      {
        id: 2,
        recommendationId: `${technicianId}-cs-1`,
        progressUpdate: "Shadowed top performer for 2 calls",
        completionPercentage: 50,
        notes: "Observed excellent communication techniques, taking notes actively",
        updatedBy: "Coach Sarah",
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        performanceImpact: { customerSatisfaction: 8 }
      }
    ];
    
    res.json(mockProgress);
  } catch (error) {
    console.error("Error getting coaching progress:", error);
    res.status(500).json({ error: "Failed to get coaching progress" });
  }
});

// Get detailed product type performance for a specific technician
router.get("/technician/:technicianId/product-types", async (req, res) => {
  try {
    const { technicianId } = req.params;
    const orders = getCompletedOrdersData();
    const technicianOrders = orders.filter(order => order.technicianId === technicianId);
    
    if (technicianOrders.length === 0) {
      return res.status(404).json({ error: 'Technician not found' });
    }
    
    const insights = coachingEngine.analyzeTechnicianPerformance(orders);
    const technicianInsights = insights.get(technicianId);
    
    if (!technicianInsights) {
      return res.status(404).json({ error: 'Technician insights not found' });
    }
    
    res.json({
      technicianId,
      technicianName: technicianInsights.technicianName,
      productTypeBreakdown: technicianInsights.productTypeBreakdown,
      overallMetrics: technicianInsights.overallMetrics
    });
  } catch (error) {
    console.error('Error getting product type performance:', error);
    res.status(500).json({ error: 'Failed to get product type performance' });
  }
});

// Get detailed job code performance for a specific technician and product type
router.get("/technician/:technicianId/job-codes", async (req, res) => {
  try {
    const { technicianId } = req.params;
    const { productType } = req.query;
    const orders = getCompletedOrdersData();
    
    let technicianOrders = orders.filter(order => order.technicianId === technicianId);
    
    if (productType && productType !== 'ALL') {
      technicianOrders = technicianOrders.filter(order => 
        order.appliance.toUpperCase() === (productType as string).toUpperCase()
      );
    }
    
    if (technicianOrders.length === 0) {
      return res.status(404).json({ error: 'No orders found for specified criteria' });
    }
    
    const insights = coachingEngine.analyzeTechnicianPerformance(orders);
    const technicianInsights = insights.get(technicianId);
    
    if (!technicianInsights) {
      return res.status(404).json({ error: 'Technician insights not found' });
    }
    
    // Filter job codes by product type if specified
    let jobCodeBreakdown = technicianInsights.jobCodeBreakdown;
    if (productType && productType !== 'ALL') {
      jobCodeBreakdown = jobCodeBreakdown.filter(jc => 
        jc.productType.toUpperCase() === (productType as string).toUpperCase()
      );
    }
    
    res.json({
      technicianId,
      technicianName: technicianInsights.technicianName,
      productType: productType || 'ALL',
      jobCodeBreakdown,
      overallMetrics: technicianInsights.overallMetrics
    });
  } catch (error) {
    console.error('Error getting job code performance:', error);
    res.status(500).json({ error: 'Failed to get job code performance' });
  }
});

// Get Magik Button recommendations for specific job code
router.get("/magik-button/:jobCode", async (req, res) => {
  try {
    const { jobCode } = req.params;
    const { productType } = req.query;
    
    // Find technicians who have worked on this job code
    const orders = getCompletedOrdersData();
    const insights = coachingEngine.analyzeTechnicianPerformance(orders);
    
    let magikRecommendations: any[] = [];
    
    // Search through all technicians' job code breakdowns
    for (const [techId, techInsights] of Array.from(insights.entries())) {
      for (const jobCodeData of techInsights.jobCodeBreakdown) {
        if (jobCodeData.jobCode === jobCode) {
          magikRecommendations = jobCodeData.magikButtonRecommendations;
          break;
        }
      }
      if (magikRecommendations.length > 0) break;
    }
    
    res.json({
      jobCode,
      productType: productType || 'UNKNOWN',
      magikButtonRecommendations: magikRecommendations
    });
  } catch (error) {
    console.error('Error getting Magik Button recommendations:', error);
    res.status(500).json({ error: 'Failed to get Magik Button recommendations' });
  }
});

// Compare technician performance across product types
router.get("/performance-comparison", async (req, res) => {
  try {
    const { productType, metric } = req.query;
    const orders = getCompletedOrdersData();
    const insights = coachingEngine.analyzeTechnicianPerformance(orders);
    
    const comparison: any[] = [];
    
    for (const [techId, techInsights] of Array.from(insights.entries())) {
      if (productType && productType !== 'ALL') {
        const productPerformance = techInsights.productTypeBreakdown.find((p: any) => 
          p.productType.toUpperCase() === (productType as string).toUpperCase()
        );
        
        if (productPerformance) {
          comparison.push({
            technicianId: techId,
            technicianName: techInsights.technicianName,
            productType: productPerformance.productType,
            firstTimeFixRate: productPerformance.firstTimeFixRate,
            recallRate: productPerformance.recallRate,
            diagnosticAccuracy: productPerformance.diagnosticAccuracy,
            avgRevenue: productPerformance.avgRevenue,
            customerRating: productPerformance.customerRating,
            totalJobs: productPerformance.totalJobs
          });
        }
      } else {
        // Overall comparison
        comparison.push({
          technicianId: techId,
          technicianName: techInsights.technicianName,
          productType: 'ALL',
          firstTimeFixRate: techInsights.overallMetrics.firstTimeFixRate,
          recallRate: techInsights.overallMetrics.recallRate,
          diagnosticAccuracy: techInsights.overallMetrics.diagnosticAccuracy,
          avgRevenue: techInsights.overallMetrics.revenuePerJob,
          customerRating: techInsights.customerSatisfactionScore / 20, // Convert to 1-5 scale
          totalJobs: techInsights.totalOrders
        });
      }
    }
    
    // Sort by specified metric or default to firstTimeFixRate
    const sortMetric = (metric as string) || 'firstTimeFixRate';
    comparison.sort((a, b) => (b[sortMetric] || 0) - (a[sortMetric] || 0));
    
    res.json({
      productType: productType || 'ALL',
      sortedBy: sortMetric,
      technicians: comparison
    });
  } catch (error) {
    console.error('Error getting performance comparison:', error);
    res.status(500).json({ error: 'Failed to get performance comparison' });
  }
});

export default router;