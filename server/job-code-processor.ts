import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export interface JobCodeRecord {
  jobCode: string;
  jobDescription: string;
  segment: 'Total' | 'D2C' | 'B2B';
  period: string;
  callVolume: number;
  pptProfitPerCall: number;
  totalRevenuePerCall: number;
  pptCostPerCall: number;
  laborRevenuePerCall: number;
  payrollCostPerCall: number;
  benefitCostPerCall: number;
  partsRevenuePerCall: number;
  partsCostPerCall: number;
  partsUnmarkedCostPerCall: number;
  truckCostPerCall: number;
  upsShipmentCostPerCall: number;
  profitablePercentage: number;
  unprofitablePercentage: number;
  profitableSos: number;
  unprofitableSos: number;
  totalRevenue: number;
  pptCost: number;
  pptProfit: number;
  laborRevenue: number;
  payrollCost: number;
  benefitCost: number;
  partsRevenue: number;
  partsCost: number;
  partsUnmarkedCost: number;
  truckCost: number;
  upsShipmentCost: number;
  edCount: number;
  edRate: number;
  recallCount: number;
  recallRate: number;
  nAtpPerCall: number;
  repairTimePerCall: number;
  travelTimePerCall: number;
}

export interface JobCodeSummary {
  totalJobCodes: number;
  totalCallVolume: number;
  averageProfitPerCall: number;
  averageRevenuePerCall: number;
  totalRevenue: number;
  totalProfit: number;
  topPerformingJobCodes: JobCodeRecord[];
  profitabilityBreakdown: {
    profitable: number;
    unprofitable: number;
    averageProfitability: number;
  };
}

export interface JobCodeComparison {
  jobCode: string;
  jobDescription: string;
  segments: {
    total: JobCodeRecord | null;
    d2c: JobCodeRecord | null;
    b2b: JobCodeRecord | null;
  };
  bestPerformingSegment: 'Total' | 'D2C' | 'B2B' | null;
  profitabilityGap: number;
  revenueGap: number;
}

class JobCodeProcessor {
  private totalData: JobCodeRecord[] = [];
  private d2cData: JobCodeRecord[] = [];
  private b2bData: JobCodeRecord[] = [];
  private lastProcessed: Date | null = null;

  constructor() {
    this.loadJobCodeData();
  }

  private parseFinancialValue(value: string): number {
    if (!value || value === '' || value === '0.00%' || value === '0%') return 0;
    
    // Handle percentages
    if (value.includes('%')) {
      return parseFloat(value.replace('%', '')) / 100;
    }
    
    // Handle currency values
    if (value.includes('$')) {
      return parseFloat(value.replace(/[$,]/g, ''));
    }
    
    // Handle comma-separated numbers
    return parseFloat(value.replace(/,/g, '')) || 0;
  }

  private parseJobCodeData(csvData: string[][], segment: 'Total' | 'D2C' | 'B2B'): JobCodeRecord[] {
    const records: JobCodeRecord[] = [];
    const periods = csvData[0].slice(1); // Skip first column header
    
    let currentJobCode = '';
    let currentDescription = '';
    let currentRowData: any = {};
    
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      const rowLabel = row[0];
      
      // Check if this is a job code row (contains job code pattern like "90001 - Description")
      if (rowLabel.includes(' - ') && rowLabel.match(/^\d+\s*-/)) {
        // Process previous job code if we have one
        if (currentJobCode && Object.keys(currentRowData).length > 0) {
          this.processJobCodeRow(records, currentJobCode, currentDescription, currentRowData, periods, segment);
        }
        
        // Start new job code
        const parts = rowLabel.split(' - ');
        currentJobCode = parts[0].trim();
        currentDescription = parts[1]?.trim() || '';
        currentRowData = { callVolume: row.slice(1) };
      } else if (currentJobCode) {
        // Add data row to current job code
        const dataKey = this.mapRowLabelToKey(rowLabel);
        if (dataKey) {
          currentRowData[dataKey] = row.slice(1);
        }
      }
    }
    
    // Process the last job code
    if (currentJobCode && Object.keys(currentRowData).length > 0) {
      this.processJobCodeRow(records, currentJobCode, currentDescription, currentRowData, periods, segment);
    }
    
    return records;
  }

  private mapRowLabelToKey(label: string): string | null {
    const mappings: { [key: string]: string } = {
      'PPT PROFIT PER CALL': 'pptProfitPerCall',
      'TOTAL REVENUE PER CALL': 'totalRevenuePerCall',
      'PPT COST PER CALL': 'pptCostPerCall',
      'LABOR REVENUE PER CALL': 'laborRevenuePerCall',
      'PAYROLL COST PER CALL': 'payrollCostPerCall',
      'BENEFIT COST PER CALL': 'benefitCostPerCall',
      'PARTS REVENUE PER CALL': 'partsRevenuePerCall',
      'PARTS COST PER CALL': 'partsCostPerCall',
      'PARTS UNMARKED COST PER CALL': 'partsUnmarkedCostPerCall',
      'TRUCK COST PER CALL': 'truckCostPerCall',
      'UPS SHIPMENT COST PER CALL': 'upsShipmentCostPerCall',
      '%PROFITABLE': 'profitablePercentage',
      '%UNPROFITABLE': 'unprofitablePercentage',
      'PROFITABLE SOS': 'profitableSos',
      'UNPROFITABLE SOS': 'unprofitableSos',
      'TOTAL REVENUE': 'totalRevenue',
      'PPT COST': 'pptCost',
      'PPT PROFIT': 'pptProfit',
      'LABOR REVENUE': 'laborRevenue',
      'PAYROLL COST': 'payrollCost',
      'BENEFIT COST': 'benefitCost',
      'PARTS REVENUE': 'partsRevenue',
      'PARTS COST': 'partsCost',
      'PARTS UNMARKED COST': 'partsUnmarkedCost',
      'TRUCK COST': 'truckCost',
      'UPS SHIPMENT COST': 'upsShipmentCost',
      'ED': 'edCount',
      'ED RATE': 'edRate',
      'RECALLS': 'recallCount',
      'RECALL RATE': 'recallRate',
      'N ATP PER CALL': 'nAtpPerCall',
      'REPAIR TIME PER CALL': 'repairTimePerCall',
      'TRAVEL TIME PER CALL': 'travelTimePerCall'
    };
    
    return mappings[label] || null;
  }

  private processJobCodeRow(
    records: JobCodeRecord[],
    jobCode: string,
    description: string,
    rowData: any,
    periods: string[],
    segment: 'Total' | 'D2C' | 'B2B'
  ): void {
    // Focus on recent periods (202505, 202506 - May/June 2025)
    const recentPeriods = ['202505', '202506'];
    
    recentPeriods.forEach(period => {
      const periodIndex = periods.indexOf(period);
      if (periodIndex >= 0 && rowData.callVolume && rowData.callVolume[periodIndex]) {
        const callVolume = this.parseFinancialValue(rowData.callVolume[periodIndex]);
        
        if (callVolume > 0) {
          const record: JobCodeRecord = {
            jobCode,
            jobDescription: description,
            segment,
            period,
            callVolume,
            pptProfitPerCall: this.getValueForPeriod(rowData.pptProfitPerCall, periodIndex),
            totalRevenuePerCall: this.getValueForPeriod(rowData.totalRevenuePerCall, periodIndex),
            pptCostPerCall: this.getValueForPeriod(rowData.pptCostPerCall, periodIndex),
            laborRevenuePerCall: this.getValueForPeriod(rowData.laborRevenuePerCall, periodIndex),
            payrollCostPerCall: this.getValueForPeriod(rowData.payrollCostPerCall, periodIndex),
            benefitCostPerCall: this.getValueForPeriod(rowData.benefitCostPerCall, periodIndex),
            partsRevenuePerCall: this.getValueForPeriod(rowData.partsRevenuePerCall, periodIndex),
            partsCostPerCall: this.getValueForPeriod(rowData.partsCostPerCall, periodIndex),
            partsUnmarkedCostPerCall: this.getValueForPeriod(rowData.partsUnmarkedCostPerCall, periodIndex),
            truckCostPerCall: this.getValueForPeriod(rowData.truckCostPerCall, periodIndex),
            upsShipmentCostPerCall: this.getValueForPeriod(rowData.upsShipmentCostPerCall, periodIndex),
            profitablePercentage: this.getValueForPeriod(rowData.profitablePercentage, periodIndex),
            unprofitablePercentage: this.getValueForPeriod(rowData.unprofitablePercentage, periodIndex),
            profitableSos: this.getValueForPeriod(rowData.profitableSos, periodIndex),
            unprofitableSos: this.getValueForPeriod(rowData.unprofitableSos, periodIndex),
            totalRevenue: this.getValueForPeriod(rowData.totalRevenue, periodIndex),
            pptCost: this.getValueForPeriod(rowData.pptCost, periodIndex),
            pptProfit: this.getValueForPeriod(rowData.pptProfit, periodIndex),
            laborRevenue: this.getValueForPeriod(rowData.laborRevenue, periodIndex),
            payrollCost: this.getValueForPeriod(rowData.payrollCost, periodIndex),
            benefitCost: this.getValueForPeriod(rowData.benefitCost, periodIndex),
            partsRevenue: this.getValueForPeriod(rowData.partsRevenue, periodIndex),
            partsCost: this.getValueForPeriod(rowData.partsCost, periodIndex),
            partsUnmarkedCost: this.getValueForPeriod(rowData.partsUnmarkedCost, periodIndex),
            truckCost: this.getValueForPeriod(rowData.truckCost, periodIndex),
            upsShipmentCost: this.getValueForPeriod(rowData.upsShipmentCost, periodIndex),
            edCount: this.getValueForPeriod(rowData.edCount, periodIndex),
            edRate: this.getValueForPeriod(rowData.edRate, periodIndex),
            recallCount: this.getValueForPeriod(rowData.recallCount, periodIndex),
            recallRate: this.getValueForPeriod(rowData.recallRate, periodIndex),
            nAtpPerCall: this.getValueForPeriod(rowData.nAtpPerCall, periodIndex),
            repairTimePerCall: this.getValueForPeriod(rowData.repairTimePerCall, periodIndex),
            travelTimePerCall: this.getValueForPeriod(rowData.travelTimePerCall, periodIndex)
          };
          
          records.push(record);
        }
      }
    });
  }

  private getValueForPeriod(dataArray: string[] | undefined, periodIndex: number): number {
    if (!dataArray || periodIndex >= dataArray.length) return 0;
    return this.parseFinancialValue(dataArray[periodIndex]);
  }

  private loadJobCodeData(): void {
    try {
      console.log('Loading job code data from CSV files...');
      
      // Load Total data (Export 10)
      const totalPath = path.join(process.cwd(), 'attached_assets', 'Export (10)_1753879634466.csv');
      if (fs.existsSync(totalPath)) {
        const totalCsv = fs.readFileSync(totalPath, 'utf-8');
        const totalParsed = parse(totalCsv, { skip_empty_lines: true });
        this.totalData = this.parseJobCodeData(totalParsed, 'Total');
        console.log(`Loaded ${this.totalData.length} Total job code records`);
      }
      
      // Load D2C data (Export 11)
      const d2cPath = path.join(process.cwd(), 'attached_assets', 'Export (11)_1753879640301.csv');
      if (fs.existsSync(d2cPath)) {
        const d2cCsv = fs.readFileSync(d2cPath, 'utf-8');
        const d2cParsed = parse(d2cCsv, { skip_empty_lines: true });
        this.d2cData = this.parseJobCodeData(d2cParsed, 'D2C');
        console.log(`Loaded ${this.d2cData.length} D2C job code records`);
      }
      
      // Load B2B data (Export 12)
      const b2bPath = path.join(process.cwd(), 'attached_assets', 'Export (12)_1753879728395.csv');
      if (fs.existsSync(b2bPath)) {
        const b2bCsv = fs.readFileSync(b2bPath, 'utf-8');
        const b2bParsed = parse(b2bCsv, { skip_empty_lines: true });
        this.b2bData = this.parseJobCodeData(b2bParsed, 'B2B');
        console.log(`Loaded ${this.b2bData.length} B2B job code records`);
      }
      
      this.lastProcessed = new Date();
      console.log('Job code data loading completed');
      
    } catch (error) {
      console.error('Error loading job code data:', error);
    }
  }

  public getAllJobCodes(): JobCodeRecord[] {
    return [...this.totalData, ...this.d2cData, ...this.b2bData];
  }

  public getJobCodesBySegment(segment: 'Total' | 'D2C' | 'B2B'): JobCodeRecord[] {
    switch (segment) {
      case 'Total': return this.totalData;
      case 'D2C': return this.d2cData;
      case 'B2B': return this.b2bData;
      default: return [];
    }
  }

  public getJobCodeComparisons(): JobCodeComparison[] {
    const allJobCodes = new Set([
      ...this.totalData.map(r => r.jobCode),
      ...this.d2cData.map(r => r.jobCode),
      ...this.b2bData.map(r => r.jobCode)
    ]);

    return Array.from(allJobCodes).map(jobCode => {
      const total = this.totalData.find(r => r.jobCode === jobCode && r.period === '202506') || null;
      const d2c = this.d2cData.find(r => r.jobCode === jobCode && r.period === '202506') || null;
      const b2b = this.b2bData.find(r => r.jobCode === jobCode && r.period === '202506') || null;

      let bestPerformingSegment: 'Total' | 'D2C' | 'B2B' | null = null;
      let maxProfit = -Infinity;

      if (total && total.pptProfitPerCall > maxProfit) {
        maxProfit = total.pptProfitPerCall;
        bestPerformingSegment = 'Total';
      }
      if (d2c && d2c.pptProfitPerCall > maxProfit) {
        maxProfit = d2c.pptProfitPerCall;
        bestPerformingSegment = 'D2C';
      }
      if (b2b && b2b.pptProfitPerCall > maxProfit) {
        maxProfit = b2b.pptProfitPerCall;
        bestPerformingSegment = 'B2B';
      }

      const profits = [total?.pptProfitPerCall || 0, d2c?.pptProfitPerCall || 0, b2b?.pptProfitPerCall || 0].filter(p => p > 0);
      const revenues = [total?.totalRevenuePerCall || 0, d2c?.totalRevenuePerCall || 0, b2b?.totalRevenuePerCall || 0].filter(r => r > 0);
      
      const profitabilityGap = profits.length > 1 ? Math.max(...profits) - Math.min(...profits) : 0;
      const revenueGap = revenues.length > 1 ? Math.max(...revenues) - Math.min(...revenues) : 0;

      return {
        jobCode,
        jobDescription: total?.jobDescription || d2c?.jobDescription || b2b?.jobDescription || '',
        segments: { total, d2c, b2b },
        bestPerformingSegment,
        profitabilityGap,
        revenueGap
      };
    }).sort((a, b) => b.profitabilityGap - a.profitabilityGap);
  }

  public getJobCodeSummary(segment?: 'Total' | 'D2C' | 'B2B', period: string = '202506'): JobCodeSummary {
    // CRITICAL FIX: D2C and B2B are SUBSETS of Total, not separate datasets
    // Only use the specified segment, don't combine them
    let data: JobCodeRecord[];
    
    if (segment) {
      data = this.getJobCodesBySegment(segment).filter(r => r.period === period);
    } else {
      // If no segment specified, default to Total only (not all combined)
      data = this.totalData.filter(r => r.period === period);
    }

    // Filter out job codes with insufficient financial data (many were added for population only)
    const completeData = data.filter(r => 
      r.callVolume > 0 && 
      r.totalRevenuePerCall > 0 && 
      (r.pptProfitPerCall !== 0 || r.profitablePercentage > 0)
    );

    const totalCallVolume = completeData.reduce((sum, r) => sum + r.callVolume, 0);
    const totalRevenue = completeData.reduce((sum, r) => sum + r.totalRevenue, 0);
    const totalProfit = completeData.reduce((sum, r) => sum + r.pptProfit, 0);
    const averageProfitPerCall = completeData.length > 0 ? completeData.reduce((sum, r) => sum + r.pptProfitPerCall, 0) / completeData.length : 0;
    const averageRevenuePerCall = completeData.length > 0 ? completeData.reduce((sum, r) => sum + r.totalRevenuePerCall, 0) / completeData.length : 0;
    
    const topPerformingJobCodes = completeData
      .sort((a, b) => b.pptProfitPerCall - a.pptProfitPerCall)
      .slice(0, 10);

    // Enhanced profitability calculation accounting for incomplete data
    // Use both profitablePercentage field AND profit per call analysis
    const dataWithValidProfitability = completeData.filter(r => 
      r.profitablePercentage > 0 || r.pptProfitPerCall !== 0
    );
    
    const weightedProfitableSum = dataWithValidProfitability.reduce((sum, r) => {
      // Use profitablePercentage if available, otherwise calculate from profit per call
      const profitableRate = r.profitablePercentage > 0 
        ? r.profitablePercentage 
        : (r.pptProfitPerCall > 0 ? 1 : 0);
      return sum + (profitableRate * r.callVolume);
    }, 0);
    
    const totalCallVolumeWithProfitability = dataWithValidProfitability.reduce((sum, r) => sum + r.callVolume, 0);
    const averageProfitability = totalCallVolumeWithProfitability > 0 ? weightedProfitableSum / totalCallVolumeWithProfitability : 0;
    
    // Count profitable/unprofitable based on actual data availability
    const profitableCount = dataWithValidProfitability.filter(r => {
      if (r.profitablePercentage > 0) {
        return r.profitablePercentage > 0.5; // CSV decimal format
      } else {
        return r.pptProfitPerCall > 0; // Fallback to profit per call
      }
    }).length;
    
    const unprofitableCount = dataWithValidProfitability.length - profitableCount;

    return {
      totalJobCodes: completeData.length, // Report only job codes with complete data
      totalCallVolume,
      averageProfitPerCall,
      averageRevenuePerCall,
      totalRevenue,
      totalProfit,
      topPerformingJobCodes,
      profitabilityBreakdown: {
        profitable: profitableCount,
        unprofitable: unprofitableCount,
        averageProfitability
      }
    };
  }

  public getTopJobCodesByMetric(metric: 'profit' | 'revenue' | 'volume', segment?: 'Total' | 'D2C' | 'B2B', limit: number = 10): JobCodeRecord[] {
    let data = this.getAllJobCodes().filter(r => r.period === '202506');
    
    if (segment) {
      data = data.filter(r => r.segment === segment);
    }

    switch (metric) {
      case 'profit':
        return data.sort((a, b) => b.pptProfitPerCall - a.pptProfitPerCall).slice(0, limit);
      case 'revenue':
        return data.sort((a, b) => b.totalRevenuePerCall - a.totalRevenuePerCall).slice(0, limit);
      case 'volume':
        return data.sort((a, b) => b.callVolume - a.callVolume).slice(0, limit);
      default:
        return data.slice(0, limit);
    }
  }

  public searchJobCodes(query: string): JobCodeRecord[] {
    const allData = this.getAllJobCodes();
    const lowercaseQuery = query.toLowerCase();
    
    return allData.filter(record => 
      record.jobCode.toLowerCase().includes(lowercaseQuery) ||
      record.jobDescription.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const jobCodeProcessor = new JobCodeProcessor();

// Enhanced Cost Breakdown Analysis
export interface JobCodeCostBreakdown {
  jobCode: string;
  jobDescription: string;
  segment: 'Total' | 'D2C' | 'B2B';
  period: string;
  callVolume: number;
  
  // Revenue Components
  totalRevenuePerCall: number;
  laborRevenuePerCall: number;
  partsRevenuePerCall: number;
  
  // Cost Components  
  totalCostPerCall: number;
  laborCostPerCall: number; // payroll + benefits
  partsCostPerCall: number; // parts + unmarked
  operationalCostPerCall: number; // truck + ups
  
  // Profit Analysis
  totalProfitPerCall: number;
  laborProfitPerCall: number;
  partsProfitPerCall: number;
  
  // Margin Analysis
  totalMarginPercent: number;
  laborMarginPercent: number;
  partsMarginPercent: number;
  
  // Profitability Indicators
  profitablePercentage: number;
  isProfitable: boolean;
  isLaborProfitable: boolean;
  isPartsProfitable: boolean;
}

export class JobCodeCostAnalyzer {
  
  public getJobCodeCostBreakdowns(segment?: 'Total' | 'D2C' | 'B2B'): JobCodeCostBreakdown[] {
    // CRITICAL FIX: Handle dataset relationships correctly - D2C and B2B are subsets of Total
    let data: JobCodeRecord[];
    
    if (segment) {
      data = jobCodeProcessor.getJobCodesBySegment(segment);
    } else {
      // Default to Total dataset only (not all combined)
      data = jobCodeProcessor.getJobCodesBySegment('Total');
    }
    
    // Filter out job codes with insufficient financial data (many added for population only)
    const completeData = data.filter(job => 
      job.callVolume > 0 && 
      job.totalRevenuePerCall > 0 && 
      (job.pptProfitPerCall !== 0 || job.profitablePercentage > 0) &&
      // Ensure we have meaningful cost data
      (job.payrollCostPerCall > 0 || job.partsCostPerCall > 0)
    );
    
    return completeData.map(job => {
      // Calculate cost components
      const laborCostPerCall = job.payrollCostPerCall + job.benefitCostPerCall;
      const partsCostPerCall = job.partsCostPerCall + job.partsUnmarkedCostPerCall;
      const operationalCostPerCall = job.truckCostPerCall + job.upsShipmentCostPerCall;
      const totalCostPerCall = laborCostPerCall + partsCostPerCall + operationalCostPerCall;
      
      // Calculate profit components
      const laborProfitPerCall = job.laborRevenuePerCall - laborCostPerCall;
      const partsProfitPerCall = job.partsRevenuePerCall - partsCostPerCall;
      const totalProfitPerCall = job.totalRevenuePerCall - totalCostPerCall;
      
      // Calculate margin percentages
      const laborMarginPercent = job.laborRevenuePerCall > 0 ? (laborProfitPerCall / job.laborRevenuePerCall) * 100 : 0;
      const partsMarginPercent = job.partsRevenuePerCall > 0 ? (partsProfitPerCall / job.partsRevenuePerCall) * 100 : 0;
      const totalMarginPercent = job.totalRevenuePerCall > 0 ? (totalProfitPerCall / job.totalRevenuePerCall) * 100 : 0;
      
      return {
        jobCode: job.jobCode,
        jobDescription: job.jobDescription,
        segment: job.segment,
        period: job.period,
        callVolume: job.callVolume,
        
        // Revenue Components
        totalRevenuePerCall: job.totalRevenuePerCall,
        laborRevenuePerCall: job.laborRevenuePerCall,
        partsRevenuePerCall: job.partsRevenuePerCall,
        
        // Cost Components
        totalCostPerCall,
        laborCostPerCall,
        partsCostPerCall,
        operationalCostPerCall,
        
        // Profit Analysis
        totalProfitPerCall,
        laborProfitPerCall,
        partsProfitPerCall,
        
        // Margin Analysis
        totalMarginPercent,
        laborMarginPercent,
        partsMarginPercent,
        
        // Profitability Indicators
        profitablePercentage: job.profitablePercentage,
        isProfitable: job.profitablePercentage > 0.5, // CSV data is in decimal format 0-1
        isLaborProfitable: laborProfitPerCall > 0,
        isPartsProfitable: partsProfitPerCall > 0
      };
    });
  }
  
  public getCostBreakdownSummary(segment?: 'Total' | 'D2C' | 'B2B') {
    const breakdowns = this.getJobCodeCostBreakdowns(segment);
    
    if (breakdowns.length === 0) {
      return {
        totalJobCodes: 0,
        averageLaborMargin: 0,
        averagePartsMargin: 0,
        laborProfitableJobs: 0,
        partsProfitableJobs: 0,
        totalProfitableJobs: 0,
        costStructureAnalysis: {
          laborCostPercent: 0,
          partsCostPercent: 0,
          operationalCostPercent: 0
        }
      };
    }
    
    const totalCallVolume = breakdowns.reduce((sum, b) => sum + b.callVolume, 0);
    
    // Calculate weighted averages
    const weightedLaborMargin = breakdowns.reduce((sum, b) => sum + (b.laborMarginPercent * b.callVolume), 0) / totalCallVolume;
    const weightedPartsMargin = breakdowns.reduce((sum, b) => sum + (b.partsMarginPercent * b.callVolume), 0) / totalCallVolume;
    
    // Calculate profitability counts
    const laborProfitableJobs = breakdowns.filter(b => b.isLaborProfitable).length;
    const partsProfitableJobs = breakdowns.filter(b => b.isPartsProfitable).length;
    const totalProfitableJobs = breakdowns.filter(b => b.isProfitable).length;
    
    // Calculate cost structure
    const totalLaborCost = breakdowns.reduce((sum, b) => sum + (b.laborCostPerCall * b.callVolume), 0);
    const totalPartsCost = breakdowns.reduce((sum, b) => sum + (b.partsCostPerCall * b.callVolume), 0);
    const totalOperationalCost = breakdowns.reduce((sum, b) => sum + (b.operationalCostPerCall * b.callVolume), 0);
    const totalCosts = totalLaborCost + totalPartsCost + totalOperationalCost;
    
    return {
      totalJobCodes: breakdowns.length,
      averageLaborMargin: weightedLaborMargin,
      averagePartsMargin: weightedPartsMargin,
      laborProfitableJobs,
      partsProfitableJobs,
      totalProfitableJobs,
      costStructureAnalysis: {
        laborCostPercent: totalCosts > 0 ? (totalLaborCost / totalCosts) * 100 : 0,
        partsCostPercent: totalCosts > 0 ? (totalPartsCost / totalCosts) * 100 : 0,
        operationalCostPercent: totalCosts > 0 ? (totalOperationalCost / totalCosts) * 100 : 0
      }
    };
  }
}

export const jobCodeCostAnalyzer = new JobCodeCostAnalyzer();