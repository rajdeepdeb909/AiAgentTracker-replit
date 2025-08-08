import { parse } from 'csv-parse';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface AhsSurveyRecord {
  brand: string;
  contractId: string;
  customerFirstName: string;
  customerLastName: string;
  dateTimeCompleted: string;
  dateTimeCreated: string;
  dispatchId: string;
  feedbackSource: string;
  email: string;
  mobileNumber: string;
  fiveStarRating: number;
  fiveStarComment: string;
  vendorId: string;
  vendorName: string;
  address: string;
  city: string;
  state: string;
  trade: string;
  zip: string;
}

export interface AhsSurveyAnalytics {
  totalSurveys: number;
  avgRating: number;
  ratingDistribution: { [key: number]: number };
  responseRateByRating: { [key: number]: number };
  stateDistribution: { [key: string]: number };
  tradeDistribution: { [key: string]: number };
  vendorPerformance: { [key: string]: { 
    vendorName: string; 
    avgRating: number; 
    totalSurveys: number;
    state: string;
  }};
  biasMetrics: {
    negativeResponseRate: number;
    positiveResponseRate: number;
    biasAdjustmentFactor: number;
  };
  areaManagerInsights: { [key: string]: {
    region: string;
    avgRating: number;
    totalCompletes: number;
    adjustedRating: number;
    topConcerns: string[];
    positiveHighlights: string[];
  }};
}

export class AhsSurveyProcessor {
  private surveys: AhsSurveyRecord[] = [];
  private analytics: AhsSurveyAnalytics | null = null;

  constructor() {
    this.loadSurveyData();
  }

  private loadSurveyData() {
    try {
      console.log('Loading AHS survey data from CSV...');
      const csvPath = join(process.cwd(), 'attached_assets', 'surveyexport (5)_1754058866959.csv');
      const csvContent = readFileSync(csvPath, 'utf-8');
      
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',');
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = this.parseCSVLine(line);
        if (values.length >= 19) {
          const survey: AhsSurveyRecord = {
            brand: values[0] || '',
            contractId: values[1] || '',
            customerFirstName: values[2] || '',
            customerLastName: values[3] || '',
            dateTimeCompleted: values[4] || '',
            dateTimeCreated: values[5] || '',
            dispatchId: values[6] || '',
            feedbackSource: values[7] || '',
            email: values[8] || '',
            mobileNumber: values[9] || '',
            fiveStarRating: parseInt(values[10]) || 0,
            fiveStarComment: values[11] || '',
            vendorId: values[12] || '',
            vendorName: values[13] || '',
            address: values[14] || '',
            city: values[15] || '',
            state: values[16] || '',
            trade: values[17] || '',
            zip: values[18] || ''
          };
          
          if (survey.fiveStarRating >= 1 && survey.fiveStarRating <= 5) {
            this.surveys.push(survey);
          }
        }
      }
      
      console.log(`Loaded ${this.surveys.length} AHS survey records`);
      this.generateAnalytics();
    } catch (error) {
      console.error('Error loading AHS survey data:', error);
    }
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  private generateAnalytics() {
    console.log('Generating AHS survey analytics...');
    
    const totalSurveys = this.surveys.length;
    const avgRating = this.surveys.reduce((sum, s) => sum + s.fiveStarRating, 0) / totalSurveys;
    
    // Rating distribution
    const ratingDistribution: { [key: number]: number } = {};
    const stateDistribution: { [key: string]: number } = {};
    const tradeDistribution: { [key: string]: number } = {};
    const vendorPerformance: { [key: string]: any } = {};
    
    for (const survey of this.surveys) {
      // Rating distribution
      ratingDistribution[survey.fiveStarRating] = (ratingDistribution[survey.fiveStarRating] || 0) + 1;
      
      // State distribution
      stateDistribution[survey.state] = (stateDistribution[survey.state] || 0) + 1;
      
      // Trade distribution
      tradeDistribution[survey.trade] = (tradeDistribution[survey.trade] || 0) + 1;
      
      // Vendor performance
      if (!vendorPerformance[survey.vendorId]) {
        vendorPerformance[survey.vendorId] = {
          vendorName: survey.vendorName,
          ratings: [],
          state: survey.state
        };
      }
      vendorPerformance[survey.vendorId].ratings.push(survey.fiveStarRating);
    }
    
    // Calculate vendor averages
    for (const vendorId in vendorPerformance) {
      const vendor = vendorPerformance[vendorId];
      vendor.avgRating = vendor.ratings.reduce((sum: number, r: number) => sum + r, 0) / vendor.ratings.length;
      vendor.totalSurveys = vendor.ratings.length;
      delete vendor.ratings;
    }
    
    // Calculate response rates by rating (bias analysis)
    const responseRateByRating: { [key: number]: number } = {};
    const totalResponses = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);
    
    for (const rating in ratingDistribution) {
      responseRateByRating[parseInt(rating)] = (ratingDistribution[parseInt(rating)] / totalResponses) * 100;
    }
    
    // Bias metrics calculation
    const negativeResponses = (ratingDistribution[1] || 0) + (ratingDistribution[2] || 0);
    const positiveResponses = (ratingDistribution[4] || 0) + (ratingDistribution[5] || 0);
    const negativeResponseRate = (negativeResponses / totalResponses) * 100;
    const positiveResponseRate = (positiveResponses / totalResponses) * 100;
    
    // Bias adjustment factor based on negative response bias (dissatisfied customers respond more)
    const biasAdjustmentFactor = negativeResponseRate > positiveResponseRate ? 
      (negativeResponseRate / positiveResponseRate) * 0.15 : 0.1;
    
    // Generate area manager insights by mapping states to regions
    const areaManagerInsights = this.generateAreaManagerInsights();
    
    this.analytics = {
      totalSurveys,
      avgRating,
      ratingDistribution,
      responseRateByRating,
      stateDistribution,
      tradeDistribution,
      vendorPerformance,
      biasMetrics: {
        negativeResponseRate,
        positiveResponseRate,
        biasAdjustmentFactor
      },
      areaManagerInsights
    };
    
    console.log('AHS survey analytics generated:', {
      totalSurveys: this.analytics.totalSurveys,
      avgRating: this.analytics.avgRating.toFixed(2),
      biasAdjustmentFactor: this.analytics.biasMetrics.biasAdjustmentFactor.toFixed(3)
    });
  }

  private generateAreaManagerInsights(): { [key: string]: any } {
    const insights: { [key: string]: any } = {};
    
    // Map states to Area Manager regions (based on typical AHS coverage)
    const stateToRegion: { [key: string]: string } = {
      'TX': 'Texas North/South',
      'CA': 'California Central',
      'FL': 'Florida Southeast',
      'NY': 'Northeast Corridor',
      'IL': 'Midwest Central',
      'PA': 'Northeast Corridor',
      'OH': 'Midwest Central',
      'GA': 'Southeast Region',
      'NC': 'Southeast Region',
      'MI': 'Midwest North',
      'AZ': 'Arizona Central',
      'WA': 'Pacific Northwest',
      'CO': 'Mountain West',
      'MD': 'Mid-Atlantic',
      'VA': 'Mid-Atlantic',
      'NJ': 'Northeast Corridor',
      'MA': 'Northeast Corridor',
      'IN': 'Midwest Central',
      'MO': 'Midwest Central',
      'TN': 'Southeast Region',
      'WI': 'Midwest North',
      'MN': 'Midwest North',
      'AL': 'Southeast Region',
      'SC': 'Southeast Region',
      'LA': 'Louisiana Gulf',
      'KY': 'Southeast Region',
      'OR': 'Pacific Northwest',
      'OK': 'Texas North/South',
      'CT': 'Northeast Corridor',
      'IA': 'Midwest Central',
      'MS': 'Southeast Region',
      'AR': 'Texas North/South',
      'KS': 'Midwest Central',
      'UT': 'Mountain West',
      'NV': 'California Central',
      'NM': 'Mountain West',
      'WV': 'Mid-Atlantic',
      'NE': 'Midwest Central',
      'ID': 'Mountain West',
      'NH': 'Northeast Corridor',
      'ME': 'Northeast Corridor',
      'RI': 'Northeast Corridor',
      'MT': 'Mountain West',
      'DE': 'Mid-Atlantic',
      'SD': 'Midwest North',
      'ND': 'Midwest North',
      'DC': 'Mid-Atlantic',
      'VT': 'Northeast Corridor',
      'WY': 'Mountain West'
    };
    
    // Group surveys by region
    const regionData: { [key: string]: AhsSurveyRecord[] } = {};
    
    for (const survey of this.surveys) {
      const region = stateToRegion[survey.state] || 'Other Regions';
      if (!regionData[region]) {
        regionData[region] = [];
      }
      regionData[region].push(survey);
    }
    
    // Generate insights for each region
    for (const region in regionData) {
      const regionSurveys = regionData[region];
      const avgRating = regionSurveys.reduce((sum, s) => sum + s.fiveStarRating, 0) / regionSurveys.length;
      
      // Apply bias adjustment
      const adjustedRating = avgRating + (this.analytics?.biasMetrics?.biasAdjustmentFactor || 0.2);
      
      // Extract top concerns from low-rated comments
      const lowRatedSurveys = regionSurveys.filter(s => s.fiveStarRating <= 2 && s.fiveStarComment);
      const topConcerns = this.extractKeyThemes(lowRatedSurveys.map(s => s.fiveStarComment));
      
      // Extract positive highlights from high-rated comments
      const highRatedSurveys = regionSurveys.filter(s => s.fiveStarRating >= 4 && s.fiveStarComment);
      const positiveHighlights = this.extractKeyThemes(highRatedSurveys.map(s => s.fiveStarComment));
      
      insights[region] = {
        region,
        avgRating: parseFloat(avgRating.toFixed(2)),
        totalCompletes: regionSurveys.length,
        adjustedRating: parseFloat(adjustedRating.toFixed(2)),
        topConcerns: topConcerns.slice(0, 5),
        positiveHighlights: positiveHighlights.slice(0, 5)
      };
    }
    
    return insights;
  }

  private extractKeyThemes(comments: string[]): string[] {
    const themes: { [key: string]: number } = {};
    
    // Keywords for common themes
    const themeKeywords = {
      'scheduling': ['schedule', 'appointment', 'reschedule', 'cancel', 'time', 'late', 'early'],
      'communication': ['communication', 'call', 'text', 'contact', 'phone', 'notify'],
      'parts': ['part', 'parts', 'order', 'delivery', 'shipping', 'wait'],
      'professionalism': ['professional', 'polite', 'courteous', 'friendly', 'rude'],
      'expertise': ['knowledge', 'experienced', 'expert', 'skill', 'competent'],
      'timeliness': ['on time', 'prompt', 'quick', 'fast', 'slow', 'delayed'],
      'repair quality': ['repair', 'fix', 'work', 'quality', 'broken', 'working']
    };
    
    for (const comment of comments) {
      if (!comment) continue;
      const lowerComment = comment.toLowerCase();
      
      for (const [theme, keywords] of Object.entries(themeKeywords)) {
        for (const keyword of keywords) {
          if (lowerComment.includes(keyword)) {
            themes[theme] = (themes[theme] || 0) + 1;
            break;
          }
        }
      }
    }
    
    return Object.entries(themes)
      .sort(([,a], [,b]) => b - a)
      .map(([theme,]) => theme);
  }

  public getSurveys(filters?: {
    state?: string;
    rating?: number;
    trade?: string;
    dateRange?: { from: string; to: string };
    vendorId?: string;
  }): AhsSurveyRecord[] {
    let filteredSurveys = [...this.surveys];
    
    if (filters) {
      if (filters.state) {
        filteredSurveys = filteredSurveys.filter(s => s.state === filters.state);
      }
      if (filters.rating) {
        filteredSurveys = filteredSurveys.filter(s => s.fiveStarRating === filters.rating);
      }
      if (filters.trade) {
        filteredSurveys = filteredSurveys.filter(s => s.trade === filters.trade);
      }
      if (filters.vendorId) {
        filteredSurveys = filteredSurveys.filter(s => s.vendorId === filters.vendorId);
      }
      if (filters.dateRange) {
        filteredSurveys = filteredSurveys.filter(s => {
          const date = s.dateTimeCompleted;
          return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
        });
      }
    }
    
    return filteredSurveys;
  }

  public getAnalytics(): AhsSurveyAnalytics | null {
    return this.analytics;
  }

  public getFilterOptions() {
    return {
      states: Object.keys(this.analytics?.stateDistribution || {}),
      trades: Object.keys(this.analytics?.tradeDistribution || {}),
      vendors: Object.keys(this.analytics?.vendorPerformance || {}),
      ratings: [1, 2, 3, 4, 5]
    };
  }

  public getRegionalInsight(region: string) {
    return this.analytics?.areaManagerInsights[region] || null;
  }
}

// Singleton instance
let surveyProcessor: AhsSurveyProcessor | null = null;

export function getAhsSurveyProcessor(): AhsSurveyProcessor {
  if (!surveyProcessor) {
    surveyProcessor = new AhsSurveyProcessor();
  }
  return surveyProcessor;
}