import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Eye,
  MapPin,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles
} from 'lucide-react';

interface FinancialIntelligenceDashboardProps {
  onNavigateBack?: () => void;
}

// CORRECTED P&L data from uploaded Excel files - DISTRICT-LEVEL ACTUAL DATA
// Excel structure: Individual months + quarterly totals in separate columns
// Scaling factors: Revenue ~17.5x, EBITDA ~10.5x (based on actual target figures)
// Total Revenue INCLUDES Labour and Parts as components (not additive)
const actualDistrictPnLData = {
  'June 2025': { totalEBITDA: -272160, adjustedEBITDA: -227735, totalRevenue: 1394892, adjustedRevenue: 1439317, totalLabourRevenue: 935259, d2cPaidLabour: 423523, b2bPaidLabour: 426337, totalPartsRevenue: 505250, d2cPaidParts: 80473, b2bPaidParts: 381610, paRevenue: 392, homeWarrantyCommission: 13083, warrantyTransferCredits: 5838, paServiceReimbursement: 0, otherRevenue: 11279 },
  'May 2025': { totalEBITDA: -312066, adjustedEBITDA: -286004, totalRevenue: 1291661, adjustedRevenue: 1336075, totalLabourRevenue: 848443, d2cPaidLabour: 379977, b2bPaidLabour: 398494, totalPartsRevenue: 474908, d2cPaidParts: 68865, b2bPaidParts: 370263, paRevenue: 252, homeWarrantyCommission: 15881, warrantyTransferCredits: 6700, paServiceReimbursement: 3910, otherRevenue: 5414 },
  'April 2025': { totalEBITDA: -284031, adjustedEBITDA: -257968, totalRevenue: 1232761, totalLabourRevenue: 814676, d2cPaidLabour: 346210, b2bPaidLabour: 398494, totalPartsRevenue: 450227, d2cPaidParts: 44184, b2bPaidParts: 370263, paRevenue: 252, homeWarrantyCommission: 15881, warrantyTransferCredits: 6700, paServiceReimbursement: 3910, otherRevenue: 4961 },
  'March 2025': { totalEBITDA: -240169, adjustedEBITDA: -207599, totalRevenue: 1727024, totalLabourRevenue: 1088395, d2cPaidLabour: 433252, b2bPaidLabour: 534161, totalPartsRevenue: 654498, d2cPaidParts: 119364, b2bPaidParts: 467099, paRevenue: 244, homeWarrantyCommission: 23663, warrantyTransferCredits: 9791, paServiceReimbursement: 0, otherRevenue: 14180 },
  'February 2025': { totalEBITDA: -163932, adjustedEBITDA: -138942, totalRevenue: 1526301, totalLabourRevenue: 956775, d2cPaidLabour: 384820, b2bPaidLabour: 460589, totalPartsRevenue: 561163, d2cPaidParts: 85251, b2bPaidParts: 426216, paRevenue: 193, homeWarrantyCommission: 24397, warrantyTransferCredits: 7837, paServiceReimbursement: 0, otherRevenue: 21175 },
  'January 2025': { totalEBITDA: -582303, adjustedEBITDA: -177217, totalRevenue: 1186269, totalLabourRevenue: 998532, d2cPaidLabour: 410981, b2bPaidLabour: 480597, totalPartsRevenue: 525500, d2cPaidParts: 85254, b2bPaidParts: 403531, paRevenue: 0, homeWarrantyCommission: 24763, warrantyTransferCredits: 10165, paServiceReimbursement: 0, otherRevenue: 32395 },
  'December 2024': { totalEBITDA: -523711, adjustedEBITDA: -226793, totalRevenue: 1538377, totalLabourRevenue: 1210068, d2cPaidLabour: 603475, b2bPaidLabour: 470019, totalPartsRevenue: 552591, d2cPaidParts: 78623, b2bPaidParts: 414445, paRevenue: 151, homeWarrantyCommission: 30692, warrantyTransferCredits: 15642, paServiceReimbursement: 0, otherRevenue: 26302 },
  'November 2024': { totalEBITDA: -548544, adjustedEBITDA: -447267, totalRevenue: 1420833, totalLabourRevenue: 1010291, d2cPaidLabour: 456299, b2bPaidLabour: 429869, totalPartsRevenue: 469424, d2cPaidParts: 88851, b2bPaidParts: 318490, paRevenue: 0, homeWarrantyCommission: 27357, warrantyTransferCredits: 11312, paServiceReimbursement: 3735, otherRevenue: -8 }
};

// Quarterly Totals from Excel (district-level from columns 4 and 9)
const districtQuarterlyTotals = {
  'Q2 2025 QTD': 2686553,  // May + June (from Excel column 4)
  'Q1 2025 Total': 4486086,  // Feb + Mar + Apr (from Excel column 9)
};

// NATIONAL data (district data × scaling factors: Revenue 17.52x, EBITDA 10.55x)  
// Based on user-provided target figures for accurate financial representation
const scaledNationalPnLData = {
  'June 2025': { totalEBITDA: -2870000, adjustedEBITDA: -2650000, totalRevenue: 24440000, adjustedRevenue: 24660000, totalLabourRevenue: 16376000, d2cPaidLabour: 7419000, b2bPaidLabour: 7470000, totalPartsRevenue: 8852000, d2cPaidParts: 1411000, b2bPaidParts: 6686000, paRevenue: 6866, homeWarrantyCommission: 229253, warrantyTransferCredits: 102282, paServiceReimbursement: 0, otherRevenue: 197576 },
  'May 2025': { totalEBITDA: -3292000, adjustedEBITDA: -3017000, totalRevenue: 22626000, adjustedRevenue: 23404000, totalLabourRevenue: 14872000, d2cPaidLabour: 6660000, b2bPaidLabour: 6951000, totalPartsRevenue: 8318000, d2cPaidParts: 1206000, b2bPaidParts: 6487000, paRevenue: 4416, homeWarrantyCommission: 278295, warrantyTransferCredits: 117384, paServiceReimbursement: 68515, otherRevenue: 94854 },
  'April 2025': { totalEBITDA: -4658108, adjustedEBITDA: -4230675, totalRevenue: 20217280, totalLabourRevenue: 13360686, d2cPaidLabour: 5677844, b2bPaidLabour: 6535302, totalPartsRevenue: 7383723, d2cPaidParts: 724618, b2bPaidParts: 6072313, paRevenue: 4133, homeWarrantyCommission: 260449, warrantyTransferCredits: 109880, paServiceReimbursement: 64084, otherRevenue: 81360 },
  'March 2025': { totalEBITDA: -3938770, adjustedEBITDA: -3404624, totalRevenue: 28323194, totalLabourRevenue: 17849678, d2cPaidLabour: 7105333, b2bPaidLabour: 8760240, totalPartsRevenue: 10733767, d2cPaidParts: 1957570, b2bPaidParts: 7660424, paRevenue: 4002, homeWarrantyCommission: 388073, warrantyTransferCredits: 160572, paServiceReimbursement: 0, otherRevenue: 232552 },
  'February 2025': { totalEBITDA: -2688485, adjustedEBITDA: -2278649, totalRevenue: 25031336, totalLabourRevenue: 15711110, d2cPaidLabour: 6311048, b2bPaidLabour: 7556656, totalPartsRevenue: 9203072, d2cPaidParts: 1398116, b2bPaidParts: 6989944, paRevenue: 3164, homeWarrantyCommission: 400111, warrantyTransferCredits: 128527, paServiceReimbursement: 0, otherRevenue: 347270 },
  'January 2025': { totalEBITDA: -9549768, adjustedEBITDA: -2906356, totalRevenue: 19454811, totalLabourRevenue: 16379925, d2cPaidLabour: 6740089, b2bPaidLabour: 7881792, totalPartsRevenue: 8618000, d2cPaidParts: 1398164, b2bPaidParts: 6617908, paRevenue: 0, homeWarrantyCommission: 406113, warrantyTransferCredits: 166706, paServiceReimbursement: 0, otherRevenue: 531278 },
  'December 2024': { totalEBITDA: -8588860, adjustedEBITDA: -3719405, totalRevenue: 25229384, totalLabourRevenue: 19845115, d2cPaidLabour: 9896990, b2bPaidLabour: 7708312, totalPartsRevenue: 9062492, d2cPaidParts: 1289417, b2bPaidParts: 6796898, paRevenue: 2476, homeWarrantyCommission: 503349, warrantyTransferCredits: 256529, paServiceReimbursement: 0, otherRevenue: 431353 },
  'November 2024': { totalEBITDA: -8996122, adjustedEBITDA: -7335179, totalRevenue: 23301661, totalLabourRevenue: 16568772, d2cPaidLabour: 7483302, b2bPaidLabour: 7050251, totalPartsRevenue: 7698554, d2cPaidParts: 1457156, b2bPaidParts: 5223236, paRevenue: 0, homeWarrantyCommission: 448655, warrantyTransferCredits: 185517, paServiceReimbursement: 61244, otherRevenue: -131 }
};

export const FinancialIntelligenceDashboard: React.FC<FinancialIntelligenceDashboardProps> = ({
  onNavigateBack
}) => {
  const [, setLocation] = useLocation();
  const [selectedView, setSelectedView] = useState('national');
  const [selectedPeriod, setSelectedPeriod] = useState('June 2025');
  const [analysisMode, setAnalysisMode] = useState('overview');

  // Get available time periods
  const getAvailablePeriods = () => {
    const dataSource = selectedView === 'national' ? scaledNationalPnLData : actualDistrictPnLData;
    return Object.keys(dataSource).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  // Handle quarterly calculations using actual Excel quarterly totals
  const getQuarterlyData = (period: string, isNational: boolean) => {
    const scalingFactor = isNational ? 16.4 : 1;
    
    if (period === 'Q2 2025 QTD') {
      return {
        totalRevenue: districtQuarterlyTotals['Q2 2025 QTD'] * scalingFactor, // $44.0M national, $2.7M district
        totalEBITDA: (actualDistrictPnLData['May 2025'].totalEBITDA + actualDistrictPnLData['June 2025'].totalEBITDA) * scalingFactor,
        adjustedEBITDA: (actualDistrictPnLData['May 2025'].adjustedEBITDA + actualDistrictPnLData['June 2025'].adjustedEBITDA) * scalingFactor,
        totalLabourRevenue: (actualDistrictPnLData['May 2025'].totalLabourRevenue + actualDistrictPnLData['June 2025'].totalLabourRevenue) * scalingFactor,
        totalPartsRevenue: (actualDistrictPnLData['May 2025'].totalPartsRevenue + actualDistrictPnLData['June 2025'].totalPartsRevenue) * scalingFactor,
        d2cPaidLabour: (actualDistrictPnLData['May 2025'].d2cPaidLabour + actualDistrictPnLData['June 2025'].d2cPaidLabour) * scalingFactor,
        b2bPaidLabour: (actualDistrictPnLData['May 2025'].b2bPaidLabour + actualDistrictPnLData['June 2025'].b2bPaidLabour) * scalingFactor,
        homeWarrantyCommission: (actualDistrictPnLData['May 2025'].homeWarrantyCommission + actualDistrictPnLData['June 2025'].homeWarrantyCommission) * scalingFactor,
        otherRevenue: (actualDistrictPnLData['May 2025'].otherRevenue + actualDistrictPnLData['June 2025'].otherRevenue) * scalingFactor
      };
    }
    
    if (period === 'Q1 2025') {
      return {
        totalRevenue: districtQuarterlyTotals['Q1 2025 Total'] * scalingFactor, // $67.8M national, $4.5M district
        totalEBITDA: (actualDistrictPnLData['February 2025'].totalEBITDA + actualDistrictPnLData['March 2025'].totalEBITDA + actualDistrictPnLData['April 2025'].totalEBITDA) * scalingFactor,
        adjustedEBITDA: (actualDistrictPnLData['February 2025'].adjustedEBITDA + actualDistrictPnLData['March 2025'].adjustedEBITDA + actualDistrictPnLData['April 2025'].adjustedEBITDA) * scalingFactor,
        totalLabourRevenue: (actualDistrictPnLData['February 2025'].totalLabourRevenue + actualDistrictPnLData['March 2025'].totalLabourRevenue + actualDistrictPnLData['April 2025'].totalLabourRevenue) * scalingFactor,
        totalPartsRevenue: (actualDistrictPnLData['February 2025'].totalPartsRevenue + actualDistrictPnLData['March 2025'].totalPartsRevenue + actualDistrictPnLData['April 2025'].totalPartsRevenue) * scalingFactor,
        d2cPaidLabour: (actualDistrictPnLData['February 2025'].d2cPaidLabour + actualDistrictPnLData['March 2025'].d2cPaidLabour + actualDistrictPnLData['April 2025'].d2cPaidLabour) * scalingFactor,
        b2bPaidLabour: (actualDistrictPnLData['February 2025'].b2bPaidLabour + actualDistrictPnLData['March 2025'].b2bPaidLabour + actualDistrictPnLData['April 2025'].b2bPaidLabour) * scalingFactor,
        homeWarrantyCommission: (actualDistrictPnLData['February 2025'].homeWarrantyCommission + actualDistrictPnLData['March 2025'].homeWarrantyCommission + actualDistrictPnLData['April 2025'].homeWarrantyCommission) * scalingFactor,
        otherRevenue: (actualDistrictPnLData['February 2025'].otherRevenue + actualDistrictPnLData['March 2025'].otherRevenue + actualDistrictPnLData['April 2025'].otherRevenue) * scalingFactor
      };
    }
    
    if (period === '2025 YTD') {
      // 2025 YTD = Q1 Total + Q2 QTD = $67.8M + $44.0M = $111.8M (national)
      const q1Total = districtQuarterlyTotals['Q1 2025 Total'] * scalingFactor;
      const q2QtdTotal = districtQuarterlyTotals['Q2 2025 QTD'] * scalingFactor;
      
      return {
        totalRevenue: q1Total + q2QtdTotal,
        totalEBITDA: (actualDistrictPnLData['February 2025'].totalEBITDA + actualDistrictPnLData['March 2025'].totalEBITDA + actualDistrictPnLData['April 2025'].totalEBITDA + actualDistrictPnLData['May 2025'].totalEBITDA + actualDistrictPnLData['June 2025'].totalEBITDA) * scalingFactor,
        adjustedEBITDA: (actualDistrictPnLData['February 2025'].adjustedEBITDA + actualDistrictPnLData['March 2025'].adjustedEBITDA + actualDistrictPnLData['April 2025'].adjustedEBITDA + actualDistrictPnLData['May 2025'].adjustedEBITDA + actualDistrictPnLData['June 2025'].adjustedEBITDA) * scalingFactor,
        totalLabourRevenue: (actualDistrictPnLData['February 2025'].totalLabourRevenue + actualDistrictPnLData['March 2025'].totalLabourRevenue + actualDistrictPnLData['April 2025'].totalLabourRevenue + actualDistrictPnLData['May 2025'].totalLabourRevenue + actualDistrictPnLData['June 2025'].totalLabourRevenue) * scalingFactor,
        totalPartsRevenue: (actualDistrictPnLData['February 2025'].totalPartsRevenue + actualDistrictPnLData['March 2025'].totalPartsRevenue + actualDistrictPnLData['April 2025'].totalPartsRevenue + actualDistrictPnLData['May 2025'].totalPartsRevenue + actualDistrictPnLData['June 2025'].totalPartsRevenue) * scalingFactor,
        d2cPaidLabour: (actualDistrictPnLData['February 2025'].d2cPaidLabour + actualDistrictPnLData['March 2025'].d2cPaidLabour + actualDistrictPnLData['April 2025'].d2cPaidLabour + actualDistrictPnLData['May 2025'].d2cPaidLabour + actualDistrictPnLData['June 2025'].d2cPaidLabour) * scalingFactor,
        b2bPaidLabour: (actualDistrictPnLData['February 2025'].b2bPaidLabour + actualDistrictPnLData['March 2025'].b2bPaidLabour + actualDistrictPnLData['April 2025'].b2bPaidLabour + actualDistrictPnLData['May 2025'].b2bPaidLabour + actualDistrictPnLData['June 2025'].b2bPaidLabour) * scalingFactor,
        homeWarrantyCommission: (actualDistrictPnLData['February 2025'].homeWarrantyCommission + actualDistrictPnLData['March 2025'].homeWarrantyCommission + actualDistrictPnLData['April 2025'].homeWarrantyCommission + actualDistrictPnLData['May 2025'].homeWarrantyCommission + actualDistrictPnLData['June 2025'].homeWarrantyCommission) * scalingFactor,
        otherRevenue: (actualDistrictPnLData['February 2025'].otherRevenue + actualDistrictPnLData['March 2025'].otherRevenue + actualDistrictPnLData['April 2025'].otherRevenue + actualDistrictPnLData['May 2025'].otherRevenue + actualDistrictPnLData['June 2025'].otherRevenue) * scalingFactor
      };
    }
    
    return null;
  };

  const currentData = ['Q2 2025 QTD', 'Q1 2025', '2025 YTD'].includes(selectedPeriod) 
    ? getQuarterlyData(selectedPeriod, selectedView === 'national')
    : (selectedView === 'national' ? (scaledNationalPnLData as any)[selectedPeriod] : (actualDistrictPnLData as any)[selectedPeriod]);

  // Get previous period for comparison
  const getPreviousPeriod = () => {
    const periods = getAvailablePeriods();
    const currentIndex = periods.indexOf(selectedPeriod);
    return currentIndex < periods.length - 1 ? periods[currentIndex + 1] : periods[currentIndex];
  };

  const previousPeriod = getPreviousPeriod();
  const previousData = selectedView === 'national' ? 
    (scaledNationalPnLData as any)[previousPeriod] : 
    (actualDistrictPnLData as any)[previousPeriod];

  // Safety check for data availability
  if (!currentData || !previousData) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading financial data...</p>
      </div>
    );
  }

  // Calculate month-over-month changes
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / Math.abs(previous)) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      value: current - previous
    };
  };

  // AI Agent Financial Insights
  const getAIFinancialInsights = () => {
    const insights = [];
    
    // EBITDA Analysis
    const ebitdaChange = calculateChange(currentData.totalEBITDA, previousData.totalEBITDA);
    insights.push({
      agent: 'Financial Intelligence Agent',
      metric: 'EBITDA Performance',
      analysis: currentData.totalEBITDA < 0 ? 
        'Negative EBITDA requires immediate operational efficiency improvements' :
        'Positive EBITDA trend indicates healthy operational performance',
      recommendation: currentData.totalEBITDA < 0 ?
        'Deploy Performance Analytics AI across all planning areas to identify cost reduction opportunities' :
        'Maintain current operational strategies while scaling high-margin services',
      impact: `${ebitdaChange.direction === 'up' ? 'Improvement' : 'Decline'} of $${Math.abs(ebitdaChange.value).toLocaleString()}`,
      priority: currentData.totalEBITDA < -2000000 ? 'Critical' : currentData.totalEBITDA < 0 ? 'High' : 'Medium'
    });

    // Revenue Mix Analysis
    const d2cMix = (currentData.d2cPaidLabour / currentData.totalLabourRevenue) * 100;
    const b2bMix = (currentData.b2bPaidLabour / currentData.totalLabourRevenue) * 100;
    
    insights.push({
      agent: 'Business Intelligence Agent',
      metric: 'Revenue Mix Optimization',
      analysis: `Current mix: ${d2cMix.toFixed(1)}% D2C, ${b2bMix.toFixed(1)}% B2B`,
      recommendation: d2cMix > 55 ?
        'B2B expansion opportunity - deploy B2B Relationship Manager Agent to increase commercial contracts' :
        'D2C growth potential - activate D2C Marketing Intelligence Agent for customer acquisition',
      impact: `Revenue balance optimization targeting 15% mix improvement`,
      priority: Math.abs(d2cMix - 50) > 20 ? 'High' : 'Medium'
    });

    // Parts Revenue Analysis
    const partsMargin = ((currentData.totalPartsRevenue - (currentData.totalPartsRevenue * 0.65)) / currentData.totalPartsRevenue) * 100;
    insights.push({
      agent: 'Parts Prediction Engine',
      metric: 'Parts Revenue Optimization',
      analysis: `Parts margin estimated at ${partsMargin.toFixed(1)}% with $${currentData.totalPartsRevenue.toLocaleString()} monthly revenue`,
      recommendation: 'Implement AI-driven parts forecasting to reduce inventory costs by 12-18%',
      impact: `Potential margin improvement: $${Math.round(currentData.totalPartsRevenue * 0.15).toLocaleString()}/month`,
      priority: 'Medium'
    });

    return insights;
  };

  // Real Planning Area Data from Excel file (top 15 by revenue) - ACCURATE VALUES
  const getRealPlanningAreaBreakdown = () => {
    const realPlanningAreas = [
      {
        id: '8107_H Houston Metro',
        name: 'Houston Metro',
        district: '8107 Texas',
        revenue: 380237,
        profit: 131969,
        profitMargin: 34.7,
        completes: 1871,
        routedTechs: 47,
        ftcRate: 67.2,
        d2cRevenue: 179144,
        b2bRevenue: 85597,
        laborRevenue: 278385,
        partsRevenue: 101853
      },
      {
        id: '8309_B Sterling Heights',
        name: 'Sterling Heights',
        district: '8309 Michigan',
        revenue: 355632,
        profit: 124394,
        profitMargin: 35.0,
        completes: 1452,
        routedTechs: 32,
        ftcRate: 67.4,
        d2cRevenue: 221346,
        b2bRevenue: 42428,
        laborRevenue: 261949,
        partsRevenue: 93683
      },
      {
        id: '7084_F Baltimore',
        name: 'Baltimore',
        district: '7084 Maryland',
        revenue: 334473,
        profit: 125052,
        profitMargin: 37.4,
        completes: 1518,
        routedTechs: 40,
        ftcRate: 64.4,
        d2cRevenue: 84335,
        b2bRevenue: 166263,
        laborRevenue: 215841,
        partsRevenue: 118632
      },
      {
        id: '7435_C Miami',
        name: 'Miami',
        district: '7435 Florida',
        revenue: 307802,
        profit: 64120,
        profitMargin: 20.8,
        completes: 1521,
        routedTechs: 40,
        ftcRate: 69.5,
        d2cRevenue: 92269,
        b2bRevenue: 70542,
        laborRevenue: 206121,
        partsRevenue: 101681
      },
      {
        id: '7108_M East LA',
        name: 'East LA',
        district: '7108 California',
        revenue: 307025,
        profit: 56659,
        profitMargin: 18.5,
        completes: 1505,
        routedTechs: 44,
        ftcRate: 62.1,
        d2cRevenue: 109640,
        b2bRevenue: 12862,
        laborRevenue: 202078,
        partsRevenue: 104947
      },
      {
        id: '7995_A DFW Metro',
        name: 'DFW Metro',
        district: '7995 Texas',
        revenue: 303336,
        profit: 90547,
        profitMargin: 29.9,
        completes: 1596,
        routedTechs: 42,
        ftcRate: 76.8,
        d2cRevenue: 137842,
        b2bRevenue: 99841,
        laborRevenue: 228622,
        partsRevenue: 74715
      },
      {
        id: '7108_S West LA',
        name: 'West LA',
        district: '7108 California',
        revenue: 294347,
        profit: 29921,
        profitMargin: 10.2,
        completes: 1410,
        routedTechs: 48,
        ftcRate: 58.9,
        d2cRevenue: 95197,
        b2bRevenue: 23439,
        laborRevenue: 187712,
        partsRevenue: 106635
      },
      {
        id: '8035_F Atlanta',
        name: 'Atlanta',
        district: '8035 Georgia',
        revenue: 283997,
        profit: 79719,
        profitMargin: 28.1,
        completes: 1478,
        routedTechs: 34,
        ftcRate: 73.2,
        d2cRevenue: 111542,
        b2bRevenue: 94562,
        laborRevenue: 207678,
        partsRevenue: 76319
      }
    ];

    // NO SCALING - Show actual Excel data values for accurate planning area P&L
    // Planning Area P&L should always show real individual area performance, not scaled national data
    
    return realPlanningAreas.map(area => ({
      id: area.id,
      name: area.name,
      revenue: area.revenue, // Show actual Excel revenue: $380K for Houston Metro
      ebitda: area.profit,   // Show actual Excel profit: $132K for Houston Metro  
      technicians: area.routedTechs, // Show actual technician count: 47 for Houston Metro
      performance: area.profitMargin > 30 ? 'Excellent' : area.profitMargin > 25 ? 'Good' : 'Needs Attention',
      profitMargin: area.profitMargin,
      completes: area.completes, // Show actual completes: 1,871 for Houston Metro
      d2cRevenue: area.d2cRevenue, // Show actual D2C: $179K for Houston Metro
      b2bRevenue: area.b2bRevenue, // Show actual B2B: $86K for Houston Metro
      laborRevenue: area.laborRevenue, // Show actual Labor: $278K for Houston Metro
      partsRevenue: area.partsRevenue, // Show actual Parts: $102K for Houston Metro
      ftcRate: area.ftcRate,
      aiActions: [
        `Advanced Scheduling Agent: Managing ${area.completes.toLocaleString()} monthly completes with ${area.routedTechs} technicians`,
        `Parts Prediction Engine: Optimizing $${Math.round(area.partsRevenue/1000)}K parts revenue stream (${((area.partsRevenue/area.revenue) * 100).toFixed(1)}% of total)`,
        `Customer Communication Hub: Maintaining ${area.ftcRate > 75 ? 'excellent' : 'good'} first-time completion rate of ${area.ftcRate.toFixed(1)}%`,
        `Route Optimization Engine: ${area.profitMargin > 30 ? 'Optimized routing' : 'Analyzing efficiency opportunities'} with ${area.profitMargin.toFixed(1)}% profit margin`
      ]
    }));
  };

  const financialInsights = getAIFinancialInsights();
  const planningAreaBreakdown = getRealPlanningAreaBreakdown();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Intelligence Dashboard</h1>
          <p className="text-gray-600 mt-1">AI-Powered P&L Analysis & Planning Area Financial Management</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setLocation('/financial-journey-progress')} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Sparkles className="h-4 w-4 mr-2" />
            Journey Progress
          </Button>
          <Button onClick={() => setLocation('/financial-goal-setting')}>
            Set Financial Goals
          </Button>
          <Button variant="outline" onClick={() => setLocation('/')}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Select value={selectedView} onValueChange={(value) => setSelectedView(value as 'national' | 'district')}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="national">National P&L (Scaled)</SelectItem>
            <SelectItem value="district">District P&L (Actual Data)</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getAvailablePeriods().map(period => (
              <SelectItem key={period} value={period}>{period}</SelectItem>
            ))}
            <SelectItem value="Q2 2025 QTD">Q2 2025 QTD</SelectItem>
            <SelectItem value="Q1 2025">Q1 2025 Total</SelectItem>
            <SelectItem value="2025 YTD">2025 YTD</SelectItem>
          </SelectContent>
        </Select>

        <Select value={analysisMode} onValueChange={(value) => setAnalysisMode(value as 'overview' | 'ai-insights' | 'planning-areas')}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Financial Overview</SelectItem>
            <SelectItem value="ai-insights">AI Agent Insights</SelectItem>
            <SelectItem value="planning-areas">Planning Area P&L</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total EBITDA</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${currentData.totalEBITDA < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${currentData.totalEBITDA.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).direction === 'up' ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).percentage}% vs {previousPeriod}
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  -{calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).percentage}% vs {previousPeriod}
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${currentData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {calculateChange(currentData.totalRevenue, previousData.totalRevenue).direction === 'up' ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{calculateChange(currentData.totalRevenue, previousData.totalRevenue).percentage}% vs {previousPeriod}
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  -{calculateChange(currentData.totalRevenue, previousData.totalRevenue).percentage}% vs {previousPeriod}
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labour Revenue</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${currentData.totalLabourRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {((currentData.totalLabourRevenue / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parts Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${currentData.totalPartsRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {((currentData.totalPartsRevenue / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={analysisMode} onValueChange={(value) => setAnalysisMode(value as 'overview' | 'ai-insights' | 'planning-areas')} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Financial Overview</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Agent Insights</TabsTrigger>
          <TabsTrigger value="planning-areas">Planning Area P&L</TabsTrigger>
        </TabsList>

        {/* Financial Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">D2C Paid Labour</span>
                    <span className="text-sm">${currentData.d2cPaidLabour.toLocaleString()}</span>
                  </div>
                  <Progress value={(currentData.d2cPaidLabour / currentData.totalRevenue) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {((currentData.d2cPaidLabour / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">B2B Paid Labour</span>
                    <span className="text-sm">${currentData.b2bPaidLabour.toLocaleString()}</span>
                  </div>
                  <Progress value={(currentData.b2bPaidLabour / currentData.totalRevenue) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {((currentData.b2bPaidLabour / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Parts Revenue</span>
                    <span className="text-sm">${currentData.totalPartsRevenue.toLocaleString()}</span>
                  </div>
                  <Progress value={(currentData.totalPartsRevenue / currentData.totalRevenue) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {((currentData.totalPartsRevenue / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </div>

                {currentData.homeWarrantyCommission && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Home Warranty Commission</span>
                      <span className="text-sm">${currentData.homeWarrantyCommission.toLocaleString()}</span>
                    </div>
                    <Progress value={(currentData.homeWarrantyCommission / currentData.totalRevenue) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {((currentData.homeWarrantyCommission / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
                    </p>
                  </div>
                )}

                {currentData.paServiceReimbursement && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">PA Service Reimbursement</span>
                      <span className="text-sm">${currentData.paServiceReimbursement.toLocaleString()}</span>
                    </div>
                    <Progress value={(currentData.paServiceReimbursement / currentData.totalRevenue) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {((currentData.paServiceReimbursement / currentData.totalRevenue) * 100).toFixed(1)}% of total revenue
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">EBITDA Margin</span>
                    <span className={`font-bold ${(currentData.totalEBITDA / currentData.totalRevenue) * 100 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {((currentData.totalEBITDA / currentData.totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {currentData.totalEBITDA < 0 ? 'Negative margin requires operational improvements' : 'Healthy margin indicates good operational efficiency'}
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Adjusted EBITDA Margin</span>
                    <span className={`font-bold ${(currentData.adjustedEBITDA / currentData.totalRevenue) * 100 < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {((currentData.adjustedEBITDA / currentData.totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Adjusted EBITDA: ${currentData.adjustedEBITDA.toLocaleString()}
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Revenue per Transaction</span>
                    <span className="font-bold text-blue-600">
                      ${Math.round(currentData.totalRevenue / (selectedView === 'national' ? 8500 : 285)).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on {selectedView === 'national' ? '8,500' : '285'} estimated monthly transactions
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Labour Mix Ratio</span>
                    <span className="font-bold text-purple-600">
                      {((currentData.d2cPaidLabour / (currentData.d2cPaidLabour + currentData.b2bPaidLabour)) * 100).toFixed(0)}% D2C
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    D2C: ${currentData.d2cPaidLabour.toLocaleString()} | B2B: ${currentData.b2bPaidLabour.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Parts Margin</span>
                    <span className="font-bold text-green-600">
                      {(((currentData.totalPartsRevenue - currentData.totalPartsRevenue * 0.65) / currentData.totalPartsRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Estimated gross margin on ${currentData.totalPartsRevenue.toLocaleString()} parts revenue
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Revenue Streams Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Warranty & Commission Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Home Warranty Commission</span>
                    <span className="font-medium text-blue-600">${currentData.homeWarrantyCommission?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Warranty Transfer Credits</span>
                    <span className="font-medium text-green-600">${currentData.warrantyTransferCredits?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">PA Service Reimbursement</span>
                    <span className="font-medium text-purple-600">${currentData.paServiceReimbursement?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue Mix Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Labour Revenue</span>
                      <span className="text-sm font-medium">{((currentData.totalLabourRevenue / currentData.totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(currentData.totalLabourRevenue / currentData.totalRevenue) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Parts Revenue</span>
                      <span className="text-sm font-medium">{((currentData.totalPartsRevenue / currentData.totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(currentData.totalPartsRevenue / currentData.totalRevenue) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Other Revenue</span>
                      <span className="text-sm font-medium">
                        {(((currentData.homeWarrantyCommission || 0) + (currentData.warrantyTransferCredits || 0) + (currentData.paServiceReimbursement || 0)) / currentData.totalRevenue * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={((currentData.homeWarrantyCommission || 0) + (currentData.warrantyTransferCredits || 0) + (currentData.paServiceReimbursement || 0)) / currentData.totalRevenue * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance vs Previous Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Change</span>
                    <span className={`font-medium ${calculateChange(currentData.totalRevenue, previousData.totalRevenue).direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateChange(currentData.totalRevenue, previousData.totalRevenue).direction === 'up' ? '+' : '-'}
                      {calculateChange(currentData.totalRevenue, previousData.totalRevenue).percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EBITDA Change</span>
                    <span className={`font-medium ${calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).direction === 'up' ? '+' : '-'}
                      {calculateChange(currentData.totalEBITDA, previousData.totalEBITDA).percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Labour Revenue Change</span>
                    <span className={`font-medium ${calculateChange(currentData.totalLabourRevenue, previousData.totalLabourRevenue).direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateChange(currentData.totalLabourRevenue, previousData.totalLabourRevenue).direction === 'up' ? '+' : '-'}
                      {calculateChange(currentData.totalLabourRevenue, previousData.totalLabourRevenue).percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Parts Revenue Change</span>
                    <span className={`font-medium ${calculateChange(currentData.totalPartsRevenue, previousData.totalPartsRevenue).direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateChange(currentData.totalPartsRevenue, previousData.totalPartsRevenue).direction === 'up' ? '+' : '-'}
                      {calculateChange(currentData.totalPartsRevenue, previousData.totalPartsRevenue).percentage}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Agent Insights */}
        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4">
            {financialInsights.map((insight, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                      <span>{insight.agent}</span>
                    </div>
                    <Badge variant={insight.priority === 'Critical' ? 'destructive' : insight.priority === 'High' ? 'default' : 'secondary'}>
                      {insight.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{insight.metric}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.analysis}</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">AI Recommendation</p>
                          <p className="text-sm text-blue-700">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Expected Impact:</span>
                      <span className="font-medium text-green-600">{insight.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Planning Area P&L */}
        <TabsContent value="planning-areas" className="space-y-4">
          <div className="grid gap-4">
            {planningAreaBreakdown.map((area, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <span>{area.name}</span>
                      <Badge variant="outline">{area.id}</Badge>
                    </div>
                    <Badge variant={area.performance === 'Excellent' ? 'default' : area.performance === 'Good' ? 'secondary' : 'destructive'}>
                      {area.performance}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-xl font-bold text-blue-600">${area.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Monthly</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Profit</p>
                      <p className={`text-xl font-bold ${area.ebitda < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${area.ebitda.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{area.profitMargin?.toFixed(1)}% margin</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Completes</p>
                      <p className="text-xl font-bold text-purple-600">{area.completes?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">{area.ftcRate?.toFixed(1)}% FTC</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Technicians</p>
                      <p className="text-xl font-bold text-gray-700">{area.technicians}</p>
                      <p className="text-xs text-gray-500 mt-1">Routed</p>
                    </div>
                  </div>

                  {/* Revenue Mix */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Revenue Mix</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">D2C Revenue</span>
                          <span className="font-medium text-blue-600">${area.d2cRevenue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">B2B Revenue</span>
                          <span className="font-medium text-purple-600">${area.b2bRevenue?.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Labor Revenue</span>
                          <span className="font-medium text-green-600">${area.laborRevenue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Parts Revenue</span>
                          <span className="font-medium text-orange-600">${area.partsRevenue?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Performance Insights</h4>
                    <div className="space-y-2">
                      {area.aiActions.slice(0, 2).map((action, actionIdx) => (
                        <div key={actionIdx} className="text-sm bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                          <span className="text-blue-800">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialIntelligenceDashboard;