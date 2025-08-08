import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export interface OpenOrder {
  id: string;
  orderNum: string;
  apptSeq: number;
  orderStatus: string;
  createDate: string;
  workItemId: string;
  workItemStatus: string;
  workItemUpdatedAt: string;
  scheduledDate: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  techComment: string;
  appliance: string;
  manufacturer: string;
  modelNum: string;
  coverage: string;
  processId: string;
  assignedTech: string;
  callCode: string;
  scheduleReasonCode: string;
  partsTotal: number;
  partsTotalTax: number;
  clientName: string;
  paymentMethod: string;
  recallFlag: string;
  statusCode: string;
  statusDate: string;
  partsOrderedQty: number;
  partsInstalledQty: number;
  partsOrderCost: number;
  partsOrderSellPrice: number;
  jobSequence: number;
  jobCoverage: string;
  price: number;
  jobDescription: string;
  difficultyLevel: string;
  productCategory: string;
  district: string;
  planningArea: string;
  routedTechs: string;
  activeTechs: string;
  profitability: string;
  currentStatus: string;
  applianceType: string;
  attempts: number;
  trips: string;
  createdAt: string;
  // Additional calculated fields
  daysSinceCreate: number;
  daysSinceScheduled: number;
  isOverdue: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  priorityScore: number;
}

export interface OpenOrdersStats {
  totalOrders: number;
  ordersByStatus: Record<string, number>;
  ordersByAge: Record<string, number>;
  ordersByProfitability: Record<string, number>;
  ordersByRisk: Record<string, number>;
  avgDaysSinceCreate: number;
  partsOrdersCount: number;
  overdueCount: number;
  technicianWorkload: Record<string, number>;
}

class OpenOrdersProcessor {
  private openOrdersCache: OpenOrder[] | null = null;
  private lastCacheUpdate = 0;
  private readonly cacheValidityMs = 5 * 60 * 1000; // 5 minutes

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheUpdate > this.cacheValidityMs;
  }

  private processOpenOrdersCSV(): OpenOrder[] {
    const csvPath = path.join(process.cwd(), 'attached_assets', 'Open Order Raw Formatted (4)_1753878239345.csv');
    
    console.log('Looking for open orders CSV at:', csvPath);
    console.log('File exists:', fs.existsSync(csvPath));
    
    if (!fs.existsSync(csvPath)) {
      console.warn('Open orders CSV file not found, returning empty array');
      return [];
    }

    try {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      console.log('Total open orders CSV records loaded:', records.length);

      const openOrders: OpenOrder[] = records.map((record: any, index: number) => {
        const createDate = record.SO_CRT_DT || record.CreateDate || '2025-01-01';
        const scheduledDate = record.ScheduledDate === 'NaT' ? null : record.ScheduledDate;
        const currentDate = new Date('2025-07-30');
        const createDateObj = new Date(createDate);
        const scheduledDateObj = scheduledDate ? new Date(scheduledDate) : null;

        const daysSinceCreate = Math.floor((currentDate.getTime() - createDateObj.getTime()) / (1000 * 60 * 60 * 24));
        const daysSinceScheduled = scheduledDateObj 
          ? Math.floor((currentDate.getTime() - scheduledDateObj.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        // Calculate risk level based on age and status
        let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
        if (daysSinceCreate > 30) riskLevel = 'critical';
        else if (daysSinceCreate > 14) riskLevel = 'high';
        else if (daysSinceCreate > 7) riskLevel = 'medium';

        // Calculate priority score (higher = more urgent)
        let priorityScore = 0;
        priorityScore += daysSinceCreate * 2; // Age factor
        if (record.OrderStatus === 'RN') priorityScore += 20; // Reschedule needed
        if (record.PartsOrderedQty > 0) priorityScore += 10; // Parts pending
        if (record.RECALLFL === 'Y') priorityScore += 15; // Recall flag
        if (record.Profitability?.includes('Loss')) priorityScore -= 5; // Lower priority for loss orders

        return {
          id: `${record.OrderNum}-${record.ApptSeq}`,
          orderNum: record.OrderNum || '',
          apptSeq: parseFloat(record.ApptSeq) || 1,
          orderStatus: record.OrderStatus || 'Unknown',
          createDate: createDate,
          workItemId: record.WorkItemID || '',
          workItemStatus: record.WorkItemStatus || '',
          workItemUpdatedAt: record.WorkItemUpdatedAt || '',
          scheduledDate: scheduledDate || '',
          customerName: record.CustName || 'Unknown',
          phone: record.Phone || '',
          address: record.AddrLine1 || '',
          city: record.City || '',
          postalCode: record.PostalCode || '',
          techComment: record.TECH_CMT || '',
          appliance: record.MDS_CD || 'Unknown',
          manufacturer: record.MFG_BND_NM || '',
          modelNum: record.ModelNum || '',
          coverage: record.CVG_CD || '',
          processId: record.ProcID || '',
          assignedTech: record.Tech || '',
          callCode: record.CallCode || '',
          scheduleReasonCode: record.SCH_RSN_CD || '',
          partsTotal: parseFloat(record.PARTS_TOTAL_AFTER_DISC) || 0,
          partsTotalTax: parseFloat(record.PARTS_TOTAL_AFTER_DISC_TAX) || 0,
          clientName: record.CLIENT_NM || '',
          paymentMethod: record.PAY_MET || '',
          recallFlag: record.RECALLFL || '',
          statusCode: record.SO_STS_CD || '',
          statusDate: record.SO_STS_DT || '',
          partsOrderedQty: parseFloat(record.PartsOrderedQty) || 0,
          partsInstalledQty: parseFloat(record.PartsInstalledQty) || 0,
          partsOrderCost: parseFloat(record.PartsOrdCost) || 0,
          partsOrderSellPrice: parseFloat(record.PartsOrdSellPrice) || 0,
          jobSequence: parseFloat(record.JobSeq) || 0,
          jobCoverage: record.JobCvg || '',
          price: parseFloat(record.Price) || 0,
          jobDescription: record.JOBCODE_DESCRIPTION || '',
          difficultyLevel: record.DIFFICULTY_LEVEL || '',
          productCategory: record.PRODUCT_CATEGORY || '',
          district: record.DISTRICT || '',
          planningArea: record.PLANNING_AREA_NAME || '',
          routedTechs: record.ROUTED_TECHS || '',
          activeTechs: record.ACTIVE_TECHS || '',
          profitability: record.Profitability || '',
          currentStatus: record.CURRENT_STATUS || '',
          applianceType: record.APPLIANCETYPE || '',
          attempts: parseFloat(record['Attempts Till Date']) || 0,
          trips: record.TRIPS || '0',
          createdAt: record.createdAt || '2025-07-30',
          // Calculated fields
          daysSinceCreate,
          daysSinceScheduled,
          isOverdue: daysSinceCreate > 14,
          riskLevel,
          priorityScore
        };
      });

      console.log('Open orders processed:', openOrders.length);
      console.log('Sample open order:', openOrders[0]);

      return openOrders;
    } catch (error) {
      console.error('Error processing open orders CSV:', error);
      return [];
    }
  }

  public getOpenOrders(): OpenOrder[] {
    if (this.openOrdersCache && !this.shouldRefreshCache()) {
      return this.openOrdersCache;
    }

    this.openOrdersCache = this.processOpenOrdersCSV();
    this.lastCacheUpdate = Date.now();
    return this.openOrdersCache;
  }

  public getOpenOrdersStats(): OpenOrdersStats {
    const orders = this.getOpenOrders();

    const stats: OpenOrdersStats = {
      totalOrders: orders.length,
      ordersByStatus: {},
      ordersByAge: {},
      ordersByProfitability: {},
      ordersByRisk: {},
      avgDaysSinceCreate: 0,
      partsOrdersCount: 0,
      overdueCount: 0,
      technicianWorkload: {}
    };

    // Calculate status distribution
    orders.forEach(order => {
      stats.ordersByStatus[order.orderStatus] = (stats.ordersByStatus[order.orderStatus] || 0) + 1;
      stats.ordersByProfitability[order.profitability] = (stats.ordersByProfitability[order.profitability] || 0) + 1;
      stats.ordersByRisk[order.riskLevel] = (stats.ordersByRisk[order.riskLevel] || 0) + 1;

      // Age distribution
      if (order.daysSinceCreate <= 7) {
        stats.ordersByAge['0-7 days'] = (stats.ordersByAge['0-7 days'] || 0) + 1;
      } else if (order.daysSinceCreate <= 14) {
        stats.ordersByAge['8-14 days'] = (stats.ordersByAge['8-14 days'] || 0) + 1;
      } else if (order.daysSinceCreate <= 30) {
        stats.ordersByAge['15-30 days'] = (stats.ordersByAge['15-30 days'] || 0) + 1;
      } else {
        stats.ordersByAge['30+ days'] = (stats.ordersByAge['30+ days'] || 0) + 1;
      }

      // Parts orders count
      if (order.partsOrderedQty > 0) {
        stats.partsOrdersCount++;
      }

      // Overdue count
      if (order.isOverdue) {
        stats.overdueCount++;
      }

      // Technician workload
      if (order.assignedTech) {
        stats.technicianWorkload[order.assignedTech] = (stats.technicianWorkload[order.assignedTech] || 0) + 1;
      }
    });

    // Calculate average days since create
    const totalDays = orders.reduce((sum, order) => sum + order.daysSinceCreate, 0);
    stats.avgDaysSinceCreate = orders.length > 0 ? totalDays / orders.length : 0;

    return stats;
  }

  public searchOpenOrders(params: {
    search?: string;
    status?: string;
    planningArea?: string;
    assignedTech?: string;
    riskLevel?: string;
    profitability?: string;
    hasPartsOrdered?: boolean;
    limit?: number;
    offset?: number;
  }): { orders: OpenOrder[]; totalCount: number; filteredCount: number } {
    
    const allOrders = this.getOpenOrders();
    let filteredOrders = [...allOrders];

    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredOrders = filteredOrders.filter(order => 
        order.orderNum.toLowerCase().includes(searchTerm) ||
        order.customerName.toLowerCase().includes(searchTerm) ||
        order.assignedTech.toLowerCase().includes(searchTerm) ||
        order.workItemId.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (params.status && params.status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === params.status);
    }

    // Apply planning area filter
    if (params.planningArea && params.planningArea !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.planningArea === params.planningArea);
    }

    // Apply technician filter
    if (params.assignedTech && params.assignedTech !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.assignedTech === params.assignedTech);
    }

    // Apply risk level filter
    if (params.riskLevel && params.riskLevel !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.riskLevel === params.riskLevel);
    }

    // Apply profitability filter
    if (params.profitability && params.profitability !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.profitability === params.profitability);
    }

    // Apply parts filter
    if (params.hasPartsOrdered !== undefined) {
      filteredOrders = filteredOrders.filter(order => 
        params.hasPartsOrdered ? order.partsOrderedQty > 0 : order.partsOrderedQty === 0
      );
    }

    // Sort by priority score (descending)
    filteredOrders.sort((a, b) => b.priorityScore - a.priorityScore);

    const totalFiltered = filteredOrders.length;
    
    // Apply pagination
    const offset = params.offset || 0;
    const limit = params.limit || 50;
    const paginatedOrders = filteredOrders.slice(offset, offset + limit);

    return {
      orders: paginatedOrders,
      totalCount: allOrders.length,
      filteredCount: totalFiltered
    };
  }
}

export const openOrdersProcessor = new OpenOrdersProcessor();