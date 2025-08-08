// Real data processor for CSV files
import { readFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

// Type definitions for real CSV data
export interface TechnicianWeeklyData {
  techId: string;
  district: string;
  basePlanningArea: string;
  techStatus: string;
  jobTitle: string;
  joiningDate: string;
  terminationDate: string;
  techPayRate: string;
  attempts: number;
  attemptsActual: number;
  attemptsOthers: number;
  actualAttemptsPercent: string;
  completes: number;
  revenue: string;
  payroll: string;
  payrollByRevenue: string;
  revenuePerAttempt: string;
  revenuePerComplete: string;
  payHours: number;
  repairTime: number;
  travelTime: number;
  techRating: string;
  customerRating: string;
  numCustomersRated: number;
}

export interface CompletedServiceOrder {
  serviceUnitNo: string;
  orderNo: string;
  servicer: string;
  customerId: string;
  customerName: string;
  paymentType: string;
  repairType: string;
  appliance: string;
  district: string;
  planningArea: string;
  technicianId: string;
  revenue: number;
  profit: number;
  cycleTime: number;
  responseTime: number;
  completionDate: string;
  createDate: string;
  scheduleDate: string;
  customerRating?: number;
  techRating?: number;
  techComments?: string;
  customerComments?: string;
}

export interface CreatedServiceOrder {
  serviceUnitNo: string;
  orderNo: string;
  servicer: string;
  customerId: string;
  customerName: string;
  paymentType: string;
  repairType: string;
  appliance: string;
  district: string;
  planningArea: string;
  createDate: string;
  scheduleDate: string;
  status: string;
  responseTime: number;
  reschedules: number;
}

// Parse technician weekly data (Export (6))
export function parseTechnicianData(): TechnicianWeeklyData[] {
  const filePath = path.join(process.cwd(), 'attached_assets', 'Export (6)_1753867058176.csv');
  
  if (!existsSync(filePath)) {
    console.log('Technician data file not found, using fallback');
    return [];
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
    });

    // Skip header rows and total row
    const dataRows = records.slice(3);
    
    return dataRows
      .filter((row: any[]) => row[0] && row[0] !== 'Total' && row[0].length > 0)
      .map((row: any[]) => ({
        techId: row[0]?.replace(/"/g, '') || '',
        district: row[1]?.replace(/"/g, '') || '',
        basePlanningArea: row[2]?.replace(/"/g, '') || '',
        techStatus: row[3]?.replace(/"/g, '') || '',
        jobTitle: row[4]?.replace(/"/g, '') || '',
        joiningDate: row[5]?.replace(/"/g, '') || '',
        terminationDate: row[6]?.replace(/"/g, '') || '',
        techPayRate: row[7]?.replace(/"/g, '') || '',
        attempts: parseInt(row[8]?.replace(/[",]/g, '') || '0'),
        attemptsActual: parseInt(row[9]?.replace(/[",]/g, '') || '0'),
        attemptsOthers: parseInt(row[10]?.replace(/[",]/g, '') || '0'),
        actualAttemptsPercent: row[11]?.replace(/"/g, '') || '',
        completes: parseInt(row[12]?.replace(/[",]/g, '') || '0'),
        revenue: row[13]?.replace(/"/g, '') || '',
        payroll: row[14]?.replace(/"/g, '') || '',
        payrollByRevenue: row[15]?.replace(/"/g, '') || '',
        revenuePerAttempt: row[16]?.replace(/"/g, '') || '',
        revenuePerComplete: row[17]?.replace(/"/g, '') || '',
        payHours: parseInt(row[18]?.replace(/[",]/g, '') || '0'),
        repairTime: parseInt(row[19]?.replace(/[",]/g, '') || '0'),
        travelTime: parseInt(row[20]?.replace(/[",]/g, '') || '0'),
        techRating: row[32]?.replace(/"/g, '') || '',
        customerRating: row[33]?.replace(/"/g, '') || '',
        numCustomersRated: parseInt(row[34]?.replace(/[",]/g, '') || '0'),
      }))
      .filter(tech => tech.techId.length > 0);
  } catch (error) {
    console.error('Error parsing technician data:', error);
    return [];
  }
}

// Parse completed service orders (National Daily Raw)
export function parseCompletedOrders(): CompletedServiceOrder[] {
  const filePath = path.join(process.cwd(), 'attached_assets', 'National Daily Raw_1753867144574.csv');
  
  if (!existsSync(filePath)) {
    console.log('Completed orders file not found, using fallback');
    return [];
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return records
      .filter((record: any) => {
        if (record.SO_STS_CD !== 'CO') return false; // Only completed orders
        
        // Filter to realistic completion dates (July 23-29, 2025)
        const completionDate = record.SO_STS_DT;
        if (!completionDate) return false;
        
        const date = new Date(completionDate);
        const july23 = new Date('2025-07-23');
        const july29 = new Date('2025-07-29');
        
        return date >= july23 && date <= july29;
      })
      .map((record: any) => ({
        serviceUnitNo: record.SVC_UN_NO || '',
        orderNo: record.SO_NO || '',
        servicer: record.SERVICER || '',
        customerId: record.SVC_CUS_ID_NO || '',
        customerName: record.CUSTOMERNAME || '',
        paymentType: record.PAYMENT_TYPE || '',
        repairType: record.REPAIR_TYPE_FINAL || '',
        appliance: record.APPLIANCE || '',
        district: record.DISTRICT_NAME || '',
        planningArea: record.PLANNING_AREA_NAME || '',
        technicianId: record.TECH_ID || '',
        revenue: parseFloat(record.REVENUE || '0'),
        profit: parseFloat(record.PROFIT || '0'),
        cycleTime: parseFloat(record.CYCLE_TIME || '0'),
        responseTime: parseFloat(record.RESPONSE_TIME || '0'),
        completionDate: record.SO_STS_DT || '',
        createDate: record.SO_CRT_DT || '',
        scheduleDate: record.SVC_SCH_DT || '',
        customerRating: record['Customer Rating'] ? parseFloat(record['Customer Rating']) : undefined,
        techRating: record['Tech Rating'] ? parseFloat(record['Tech Rating']) : undefined,
        techComments: record['Tech Rating Comments'] || '',
        customerComments: record['Customer Rating Comments'] || '',
      }));
  } catch (error) {
    console.error('Error parsing completed orders:', error);
    return [];
  }
}

// Parse created service orders (National Daily Raw (1))
export function parseCreatedOrders(): CreatedServiceOrder[] {
  const filePath = path.join(process.cwd(), 'attached_assets', 'National Daily Raw (1)_1753867222633.csv');
  
  if (!existsSync(filePath)) {
    console.log('Created orders file not found, using fallback');
    return [];
  }

  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return records.map((record: any) => ({
      serviceUnitNo: record.SVC_UN_NO || '',
      orderNo: record.SO_NO || '',
      servicer: record.SERVICER || '',
      customerId: record.SVC_CUS_ID_NO || '',
      customerName: record.CUSTOMERNAME || '',
      paymentType: record.PAYMENT_TYPE || '',
      repairType: record.REPAIR_TYPE_FINAL || '',
      appliance: record.APPLIANCE || '',
      district: record.DISTRICT_NAME || '',
      planningArea: record.PLANNING_AREA_NAME || '',
      createDate: record.SO_CRT_DT || '',
      scheduleDate: record.SVC_SCH_DT || '',
      status: record.SO_STS_CD || '',
      responseTime: parseFloat(record.RESPONSE_TIME || '0'),
      reschedules: parseInt(record.RESCHEDULES || '0'),
    }));
  } catch (error) {
    console.error('Error parsing created orders:', error);
    return [];
  }
}

// Enhanced data aggregation functions
export function getTechnicianPerformanceData() {
  const techData = parseTechnicianData();
  const completedOrders = parseCompletedOrders();
  
  // Combine technician data with their order performance
  return techData.map(tech => {
    const techOrders = completedOrders.filter(order => order.technicianId === tech.techId);
    
    return {
      ...tech,
      totalOrders: techOrders.length,
      totalRevenue: techOrders.reduce((sum, order) => sum + order.revenue, 0),
      avgCycleTime: techOrders.length > 0 
        ? techOrders.reduce((sum, order) => sum + order.cycleTime, 0) / techOrders.length 
        : 0,
      avgResponseTime: techOrders.length > 0 
        ? techOrders.reduce((sum, order) => sum + order.responseTime, 0) / techOrders.length 
        : 0,
    };
  });
}

export function getPlanningAreaMetrics() {
  const completedOrders = parseCompletedOrders();
  const createdOrders = parseCreatedOrders();
  
  // Group by planning area
  const areaMetrics = new Map();
  
  completedOrders.forEach(order => {
    const area = order.planningArea;
    if (!areaMetrics.has(area)) {
      areaMetrics.set(area, {
        planningArea: area,
        district: order.district,
        completedOrders: 0,
        totalRevenue: 0,
        totalProfit: 0,
        avgCycleTime: 0,
        avgResponseTime: 0,
        createdOrders: 0,
        completionRate: 0,
      });
    }
    
    const metrics = areaMetrics.get(area);
    metrics.completedOrders++;
    metrics.totalRevenue += order.revenue;
    metrics.totalProfit += order.profit;
    metrics.avgCycleTime += order.cycleTime;
    metrics.avgResponseTime += order.responseTime;
  });
  
  createdOrders.forEach(order => {
    const area = order.planningArea;
    if (areaMetrics.has(area)) {
      const metrics = areaMetrics.get(area);
      metrics.createdOrders++;
    }
  });
  
  // Calculate averages and completion rates
  Array.from(areaMetrics.values()).forEach(metrics => {
    if (metrics.completedOrders > 0) {
      metrics.avgCycleTime = metrics.avgCycleTime / metrics.completedOrders;
      metrics.avgResponseTime = metrics.avgResponseTime / metrics.completedOrders;
    }
    if (metrics.createdOrders > 0) {
      metrics.completionRate = (metrics.completedOrders / metrics.createdOrders) * 100;
    }
  });
  
  return Array.from(areaMetrics.values());
}

// Cache real data
let cachedTechData: TechnicianWeeklyData[] | null = null;
let cachedCompletedOrders: CompletedServiceOrder[] | null = null;
let cachedCreatedOrders: CreatedServiceOrder[] | null = null;

export function getRealTechnicianData(): TechnicianWeeklyData[] {
  if (!cachedTechData) {
    cachedTechData = parseTechnicianData();
  }
  return cachedTechData;
}

export function getRealCompletedOrders(): CompletedServiceOrder[] {
  if (!cachedCompletedOrders) {
    cachedCompletedOrders = parseCompletedOrders();
  }
  return cachedCompletedOrders;
}

export function getRealCreatedOrders(): CreatedServiceOrder[] {
  if (!cachedCreatedOrders) {
    cachedCreatedOrders = parseCreatedOrders();
  }
  return cachedCreatedOrders;
}

// Clear cache function
export function clearRealDataCache(): void {
  cachedTechData = null;
  cachedCompletedOrders = null;
  cachedCreatedOrders = null;
}