import { Router } from 'express';
import { jobCodeProcessor, jobCodeCostAnalyzer } from '../job-code-processor';

export const jobCodesRouter = Router();

// Get job code summary statistics
jobCodesRouter.get('/summary', (req, res) => {
  try {
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    const period = req.query.period as string || '202506';
    
    const summary = jobCodeProcessor.getJobCodeSummary(segment, period);
    res.json(summary);
  } catch (error) {
    console.error('Error getting job code summary:', error);
    res.status(500).json({ error: 'Failed to get job code summary' });
  }
});

// Get all job codes with optional filtering
jobCodesRouter.get('/', (req, res) => {
  try {
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    const jobCode = req.query.jobCode as string;
    const search = req.query.search as string;
    const period = req.query.period as string || '202506';
    
    // CRITICAL FIX: Handle dataset relationships - D2C and B2B are subsets of Total
    let jobCodes: any[];
    
    if (segment) {
      jobCodes = jobCodeProcessor.getJobCodesBySegment(segment).filter(r => r.period === period);
    } else {
      // Default to Total dataset only (not all combined)
      jobCodes = jobCodeProcessor.getJobCodesBySegment('Total').filter(r => r.period === period);
    }
    
    if (jobCode) {
      jobCodes = jobCodes.filter(r => r.jobCode === jobCode);
    }
    
    if (search) {
      const searchResults = jobCodeProcessor.searchJobCodes(search).filter(r => r.period === period);
      if (segment) {
        jobCodes = searchResults.filter(r => r.segment === segment);
      } else {
        jobCodes = searchResults.filter(r => r.segment === 'Total');
      }
    }
    
    // Filter out job codes with insufficient financial data
    const completeJobCodes = jobCodes.filter(r => 
      r.callVolume > 0 && 
      r.totalRevenuePerCall > 0 && 
      (r.pptProfitPerCall !== 0 || r.profitablePercentage > 0)
    );
    
    // Sort by call volume descending
    completeJobCodes.sort((a, b) => b.callVolume - a.callVolume);
    
    res.json(completeJobCodes);
  } catch (error) {
    console.error('Error getting job codes:', error);
    res.status(500).json({ error: 'Failed to get job codes' });
  }
});

// Get job code comparisons across segments
jobCodesRouter.get('/comparisons', (req, res) => {
  try {
    const comparisons = jobCodeProcessor.getJobCodeComparisons();
    res.json(comparisons);
  } catch (error) {
    console.error('Error getting job code comparisons:', error);
    res.status(500).json({ error: 'Failed to get job code comparisons' });
  }
});

// Get top performing job codes by metric
jobCodesRouter.get('/top/:metric', (req, res) => {
  try {
    const metric = req.params.metric as 'profit' | 'revenue' | 'volume';
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    const limit = parseInt(req.query.limit as string) || 10;
    
    if (!['profit', 'revenue', 'volume'].includes(metric)) {
      return res.status(400).json({ error: 'Invalid metric. Use profit, revenue, or volume.' });
    }
    
    const topJobCodes = jobCodeProcessor.getTopJobCodesByMetric(metric, segment, limit);
    res.json(topJobCodes);
  } catch (error) {
    console.error('Error getting top job codes:', error);
    res.status(500).json({ error: 'Failed to get top job codes' });
  }
});

// Get performance analytics for a specific job code
jobCodesRouter.get('/:jobCode/analytics', (req, res) => {
  try {
    const { jobCode } = req.params;
    const period = req.query.period as string || '202506';
    
    const allData = jobCodeProcessor.getAllJobCodes()
      .filter(r => r.jobCode === jobCode && r.period === period);
    
    if (allData.length === 0) {
      return res.status(404).json({ error: 'Job code not found' });
    }
    
    const total = allData.find(r => r.segment === 'Total');
    const d2c = allData.find(r => r.segment === 'D2C');
    const b2b = allData.find(r => r.segment === 'B2B');
    
    const analytics = {
      jobCode,
      jobDescription: total?.jobDescription || d2c?.jobDescription || b2b?.jobDescription || '',
      segments: {
        total: total || null,
        d2c: d2c || null,
        b2b: b2b || null
      },
      performance: {
        bestSegment: allData.reduce((best, current) => 
          current.pptProfitPerCall > best.pptProfitPerCall ? current : best
        ),
        worstSegment: allData.reduce((worst, current) => 
          current.pptProfitPerCall < worst.pptProfitPerCall ? current : worst
        ),
        profitabilitySpread: Math.max(...allData.map(r => r.pptProfitPerCall)) - 
                           Math.min(...allData.map(r => r.pptProfitPerCall)),
        revenueSpread: Math.max(...allData.map(r => r.totalRevenuePerCall)) - 
                      Math.min(...allData.map(r => r.totalRevenuePerCall)),
        totalVolume: allData.reduce((sum, r) => sum + r.callVolume, 0),
        totalRevenue: allData.reduce((sum, r) => sum + r.totalRevenue, 0),
        totalProfit: allData.reduce((sum, r) => sum + r.pptProfit, 0)
      },
      insights: {
        isHighVolume: allData.some(r => r.callVolume > 5000),
        isHighProfit: allData.some(r => r.pptProfitPerCall > 100),
        hasPartsComponent: allData.some(r => r.partsRevenuePerCall > 50),
        hasRecallIssues: allData.some(r => r.recallRate > 0.1),
        isLaborIntensive: allData.some(r => r.repairTimePerCall > 60)
      }
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error getting job code analytics:', error);
    res.status(500).json({ error: 'Failed to get job code analytics' });
  }
});

// Get job code trends across periods
jobCodesRouter.get('/:jobCode/trends', (req, res) => {
  try {
    const { jobCode } = req.params;
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    
    let allData = jobCodeProcessor.getAllJobCodes()
      .filter(r => r.jobCode === jobCode);
    
    if (segment) {
      allData = allData.filter(r => r.segment === segment);
    }
    
    // Group by period
    const periods = ['202505', '202506'];
    const trends = periods.map(period => {
      const periodData = allData.filter(r => r.period === period);
      return {
        period,
        segments: periodData.reduce((acc, record) => {
          acc[record.segment.toLowerCase()] = record;
          return acc;
        }, {} as any)
      };
    });
    
    res.json({
      jobCode,
      trends,
      summary: {
        periods: periods.length,
        hasData: allData.length > 0,
        segments: Array.from(new Set(allData.map(r => r.segment)))
      }
    });
  } catch (error) {
    console.error('Error getting job code trends:', error);
    res.status(500).json({ error: 'Failed to get job code trends' });
  }
});

// Get job codes by category/appliance type (inferred from description)
jobCodesRouter.get('/categories/analysis', (req, res) => {
  try {
    const allJobCodes = jobCodeProcessor.getAllJobCodes().filter(r => r.period === '202506');
    
    // Categorize job codes based on description patterns
    const categories = {
      'Diagnostics': allJobCodes.filter(r => 
        r.jobDescription.toLowerCase().includes('diagnostic') || 
        r.jobDescription.toLowerCase().includes('no technical information')
      ),
      'Parts Replacement': allJobCodes.filter(r => 
        r.jobDescription.toLowerCase().includes('replace') || 
        r.jobDescription.toLowerCase().includes('pcb') ||
        r.jobDescription.toLowerCase().includes('main')
      ),
      'Maintenance': allJobCodes.filter(r => 
        r.jobDescription.toLowerCase().includes('clean') || 
        r.jobDescription.toLowerCase().includes('maintain')
      ),
      'Service Charges': allJobCodes.filter(r => 
        r.jobDescription.toLowerCase().includes('deductible') || 
        r.jobDescription.toLowerCase().includes('trip')
      ),
      'Other': allJobCodes.filter(r => 
        !r.jobDescription.toLowerCase().includes('diagnostic') &&
        !r.jobDescription.toLowerCase().includes('no technical information') &&
        !r.jobDescription.toLowerCase().includes('replace') &&
        !r.jobDescription.toLowerCase().includes('pcb') &&
        !r.jobDescription.toLowerCase().includes('main') &&
        !r.jobDescription.toLowerCase().includes('clean') &&
        !r.jobDescription.toLowerCase().includes('maintain') &&
        !r.jobDescription.toLowerCase().includes('deductible') &&
        !r.jobDescription.toLowerCase().includes('trip')
      )
    };
    
    const categoryAnalysis = Object.entries(categories).map(([category, records]) => ({
      category,
      jobCodeCount: records.length,
      totalVolume: records.reduce((sum, r) => sum + r.callVolume, 0),
      totalRevenue: records.reduce((sum, r) => sum + r.totalRevenue, 0),
      totalProfit: records.reduce((sum, r) => sum + r.pptProfit, 0),
      averageProfitPerCall: records.length > 0 ? 
        records.reduce((sum, r) => sum + r.pptProfitPerCall, 0) / records.length : 0,
      averageProfitability: records.length > 0 ? 
        records.reduce((sum, r) => sum + r.profitablePercentage, 0) / records.length : 0,
      topJobCodes: records
        .sort((a, b) => b.pptProfitPerCall - a.pptProfitPerCall)
        .slice(0, 3)
        .map(r => ({
          jobCode: r.jobCode,
          description: r.jobDescription,
          profitPerCall: r.pptProfitPerCall,
          segment: r.segment
        }))
    }));
    
    res.json(categoryAnalysis);
  } catch (error) {
    console.error('Error getting category analysis:', error);
    res.status(500).json({ error: 'Failed to get category analysis' });
  }
});

// Enhanced Cost Breakdown Analytics
jobCodesRouter.get('/cost-breakdown', (req, res) => {
  try {
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    const breakdowns = jobCodeCostAnalyzer.getJobCodeCostBreakdowns(segment);
    res.json(breakdowns);
  } catch (error) {
    console.error('Error getting cost breakdowns:', error);
    res.status(500).json({ error: 'Failed to get cost breakdowns' });
  }
});

jobCodesRouter.get('/cost-summary', (req, res) => {  
  try {
    const segment = req.query.segment as 'Total' | 'D2C' | 'B2B' | undefined;
    const summary = jobCodeCostAnalyzer.getCostBreakdownSummary(segment);
    res.json(summary);
  } catch (error) {
    console.error('Error getting cost summary:', error);
    res.status(500).json({ error: 'Failed to get cost summary' });
  }
});
