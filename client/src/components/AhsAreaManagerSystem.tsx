import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Clock, 
  Phone, 
  MessageSquare, 
  Users, 
  DollarSign, 
  Activity, 
  Eye, 
  Target, 
  Settings, 
  Filter, 
  MapPin, 
  BarChart3, 
  ChevronRight, 
  Shield, 
  Award,
  AlertTriangle,
  Calendar,
  Send,
  Brain,
  Zap,
  CheckCircle,
  XCircle,
  Mail,
  FileText,
  Lightbulb,
  Wifi,
  WifiOff,
  Database,
  Save
} from 'lucide-react';

// AHS Survey Data Interfaces
interface AhsSurveyRecord {
  brand: string;
  contractId: string;
  customerFirstName: string;
  customerLastName: string;
  dateTimeCompleted: string;
  fiveStarRating: number;
  fiveStarComment: string;
  vendorName: string;
  city: string;
  state: string;
  trade: string;
}

interface AhsSurveyAnalytics {
  totalSurveys: number;
  avgRating: number;
  ratingDistribution: { [key: number]: number };
  stateDistribution: { [key: string]: number };
  tradeDistribution: { [key: string]: number };
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

interface AhsFilterOptions {
  states: string[];
  trades: string[];
  vendors: string[];
  ratings: number[];
}

// Streaming Communication Interfaces
interface AhsInteractionEvent {
  type: 'message' | 'report' | 'alert' | 'feedback' | 'schedule';
  managerId: string;
  managerName: string;
  agentId: number;
  timestamp: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: any;
  requiresResponse?: boolean;
  scheduledFor?: string;
}

interface AhsAreaManager {
  id: string;
  managerId: string;
  name: string;
  email: string;
  phone?: string;
  region: string;
  planningAreas: string[];
  aiAgentId?: number;
  preferredCommunicationTime: string;
  weeklyReportDay: string;
  lastContactDate?: string;
  totalServiceCompletes: number;
  activeStatus: boolean;
  specialFocus: string[];
  communicationNotes?: string;
}

interface GpeMetrics {
  managerId: string;
  avgGpeRatio: number;
  performanceTier: 'platinum' | 'gold' | 'silver' | 'bronze';
  platinumCount: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  totalCompletes: number;
  trendDirection: 'up' | 'down' | 'stable';
}

interface CustomerRatingData {
  managerId: string;
  avgCustomerRating: number;
  adjustedAvgRating: number;
  responseRate: number;
  ratingTrend: 'improving' | 'declining' | 'stable';
  biasAdjustment: number;
}

interface WeeklyReport {
  managerId: string;
  reportWeek: string;
  totalCompletes: number;
  gpePerformance: GpeMetrics;
  customerRatings: CustomerRatingData;
  keyInsights: string[];
  actionItems: string[];
  aiGeneratedContent: Record<string, any>;
  sentAt?: string;
  managerFeedback?: string;
}

// Mock data for demonstration
const MOCK_AREA_MANAGERS: AhsAreaManager[] = [
  {
    id: '1',
    managerId: 'AHS-AM-001',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@ahs.com',
    phone: '(214) 555-0123',
    region: 'Texas North',
    planningAreas: ['Dallas Metro North', 'Dallas Metro West', 'Plano/Richardson', 'Irving/Las Colinas'],
    aiAgentId: 27,
    preferredCommunicationTime: 'morning',
    weeklyReportDay: 'monday',
    lastContactDate: '2025-01-30',
    totalServiceCompletes: 2847,
    activeStatus: true,
    specialFocus: ['GPE optimization', 'Customer satisfaction', 'Response time'],
    communicationNotes: 'Prefers detailed data analysis. Very responsive to proactive alerts.'
  },
  {
    id: '2',
    managerId: 'AHS-AM-002',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@ahs.com',
    phone: '(713) 555-0156',
    region: 'Texas South',
    planningAreas: ['Houston Southwest', 'Houston Central', 'Sugar Land', 'The Woodlands'],
    aiAgentId: 28,
    preferredCommunicationTime: 'afternoon',
    weeklyReportDay: 'tuesday',
    lastContactDate: '2025-01-29',
    totalServiceCompletes: 3142,
    activeStatus: true,
    specialFocus: ['Rating bias mitigation', 'Technician performance'],
    communicationNotes: 'Focuses on rating analytics. Appreciates technician self-rating insights.'
  },
  {
    id: '3',
    managerId: 'AHS-AM-003',
    name: 'David Chen',
    email: 'david.chen@ahs.com',
    phone: '(602) 555-0189',
    region: 'Arizona Central',
    planningAreas: ['Phoenix Central', 'Scottsdale/Tempe', 'Mesa/Chandler', 'Glendale/Peoria'],
    aiAgentId: 29,
    preferredCommunicationTime: 'morning',
    weeklyReportDay: 'wednesday',
    lastContactDate: '2025-01-31',
    totalServiceCompletes: 2654,
    activeStatus: true,
    specialFocus: ['Cost control', 'Appliance-specific performance'],
    communicationNotes: 'Data-driven approach. Requests detailed cost breakdowns.'
  },
  // Additional 37 Area Managers to reach 40 total
  { id: '4', managerId: 'AHS-AM-004', name: 'Jennifer Walsh', email: 'jennifer.walsh@ahs.com', region: 'California North', planningAreas: ['San Francisco Bay', 'Sacramento Valley'], aiAgentId: 30, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'thursday', totalServiceCompletes: 2890, activeStatus: true, specialFocus: ['High-volume coordination'] },
  { id: '5', managerId: 'AHS-AM-005', name: 'Robert Kim', email: 'robert.kim@ahs.com', region: 'California South', planningAreas: ['Los Angeles Metro', 'Orange County'], aiAgentId: 31, preferredCommunicationTime: 'morning', weeklyReportDay: 'friday', totalServiceCompletes: 4256, activeStatus: true, specialFocus: ['Urban efficiency'] },
  { id: '6', managerId: 'AHS-AM-006', name: 'Maria Gonzalez', email: 'maria.gonzalez@ahs.com', region: 'Florida Central', planningAreas: ['Orlando Metro', 'Tampa Bay'], aiAgentId: 32, preferredCommunicationTime: 'morning', weeklyReportDay: 'monday', totalServiceCompletes: 3128, activeStatus: true, specialFocus: ['Climate challenges'] },
  { id: '7', managerId: 'AHS-AM-007', name: 'James Wilson', email: 'james.wilson@ahs.com', region: 'Florida South', planningAreas: ['Miami-Dade', 'Broward County'], aiAgentId: 33, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'tuesday', totalServiceCompletes: 2987, activeStatus: true, specialFocus: ['Coastal systems'] },
  { id: '8', managerId: 'AHS-AM-008', name: 'Amanda Foster', email: 'amanda.foster@ahs.com', region: 'Georgia Metro', planningAreas: ['Atlanta Metro', 'Savannah'], aiAgentId: 34, preferredCommunicationTime: 'morning', weeklyReportDay: 'wednesday', totalServiceCompletes: 2764, activeStatus: true, specialFocus: ['Growth markets'] },
  { id: '9', managerId: 'AHS-AM-009', name: 'Thomas Brown', email: 'thomas.brown@ahs.com', region: 'Illinois Central', planningAreas: ['Chicago Metro', 'Rockford'], aiAgentId: 35, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'thursday', totalServiceCompletes: 2543, activeStatus: true, specialFocus: ['Winter readiness'] },
  { id: '10', managerId: 'AHS-AM-010', name: 'Lisa Martinez', email: 'lisa.martinez@ahs.com', region: 'Michigan Metro', planningAreas: ['Detroit Metro', 'Grand Rapids'], aiAgentId: 36, preferredCommunicationTime: 'morning', weeklyReportDay: 'friday', totalServiceCompletes: 2341, activeStatus: true, specialFocus: ['Industrial areas'] },
  { id: '11', managerId: 'AHS-AM-011', name: 'Christopher Lee', email: 'christopher.lee@ahs.com', region: 'Ohio Central', planningAreas: ['Columbus Metro', 'Cincinnati'], aiAgentId: 37, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'monday', totalServiceCompletes: 2198, activeStatus: true, specialFocus: ['Mid-size cities'] },
  { id: '12', managerId: 'AHS-AM-012', name: 'Michelle Johnson', email: 'michelle.johnson@ahs.com', region: 'Pennsylvania East', planningAreas: ['Philadelphia Metro', 'Allentown'], aiAgentId: 38, preferredCommunicationTime: 'morning', weeklyReportDay: 'tuesday', totalServiceCompletes: 2876, activeStatus: true, specialFocus: ['Historic homes'] },
  { id: '13', managerId: 'AHS-AM-013', name: 'Daniel Garcia', email: 'daniel.garcia@ahs.com', region: 'North Carolina Central', planningAreas: ['Charlotte Metro', 'Raleigh-Durham'], aiAgentId: 39, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'wednesday', totalServiceCompletes: 2654, activeStatus: true, specialFocus: ['Tech corridor'] },
  { id: '14', managerId: 'AHS-AM-014', name: 'Ashley Davis', email: 'ashley.davis@ahs.com', region: 'Virginia Metro', planningAreas: ['Northern Virginia', 'Richmond Metro'], aiAgentId: 40, preferredCommunicationTime: 'morning', weeklyReportDay: 'thursday', totalServiceCompletes: 2489, activeStatus: true, specialFocus: ['Government housing'] },
  { id: '15', managerId: 'AHS-AM-015', name: 'Kevin Miller', email: 'kevin.miller@ahs.com', region: 'Tennessee Central', planningAreas: ['Nashville Metro', 'Memphis'], aiAgentId: 41, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'friday', totalServiceCompletes: 2376, activeStatus: true, specialFocus: ['Music city growth'] },
  { id: '16', managerId: 'AHS-AM-016', name: 'Nicole Anderson', email: 'nicole.anderson@ahs.com', region: 'South Carolina Metro', planningAreas: ['Charleston Metro', 'Columbia'], aiAgentId: 42, preferredCommunicationTime: 'morning', weeklyReportDay: 'monday', totalServiceCompletes: 2154, activeStatus: true, specialFocus: ['Coastal humidity'] },
  { id: '17', managerId: 'AHS-AM-017', name: 'Ryan Thompson', email: 'ryan.thompson@ahs.com', region: 'Louisiana Central', planningAreas: ['New Orleans Metro', 'Baton Rouge'], aiAgentId: 43, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'tuesday', totalServiceCompletes: 2287, activeStatus: true, specialFocus: ['Flood resilience'] },
  { id: '18', managerId: 'AHS-AM-018', name: 'Stephanie White', email: 'stephanie.white@ahs.com', region: 'Alabama Central', planningAreas: ['Birmingham Metro', 'Mobile'], aiAgentId: 44, preferredCommunicationTime: 'morning', weeklyReportDay: 'wednesday', totalServiceCompletes: 1987, activeStatus: true, specialFocus: ['Rural coverage'] },
  { id: '19', managerId: 'AHS-AM-019', name: 'Joshua Taylor', email: 'joshua.taylor@ahs.com', region: 'Mississippi Central', planningAreas: ['Jackson Metro', 'Gulf Coast'], aiAgentId: 45, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'thursday', totalServiceCompletes: 1854, activeStatus: true, specialFocus: ['Storm recovery'] },
  { id: '20', managerId: 'AHS-AM-020', name: 'Rebecca Clark', email: 'rebecca.clark@ahs.com', region: 'Arkansas Central', planningAreas: ['Little Rock Metro', 'Northwest Arkansas'], aiAgentId: 46, preferredCommunicationTime: 'morning', weeklyReportDay: 'friday', totalServiceCompletes: 1743, activeStatus: true, specialFocus: ['Small town service'] },
  { id: '21', managerId: 'AHS-AM-021', name: 'Matthew Lewis', email: 'matthew.lewis@ahs.com', region: 'Oklahoma Central', planningAreas: ['Oklahoma City Metro', 'Tulsa'], aiAgentId: 47, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'monday', totalServiceCompletes: 1965, activeStatus: true, specialFocus: ['Weather challenges'] },
  { id: '22', managerId: 'AHS-AM-022', name: 'Lauren Walker', email: 'lauren.walker@ahs.com', region: 'Kansas Central', planningAreas: ['Wichita Metro', 'Kansas City'], aiAgentId: 48, preferredCommunicationTime: 'morning', weeklyReportDay: 'tuesday', totalServiceCompletes: 1876, activeStatus: true, specialFocus: ['Agricultural areas'] },
  { id: '23', managerId: 'AHS-AM-023', name: 'Andrew Hall', email: 'andrew.hall@ahs.com', region: 'Missouri Central', planningAreas: ['St. Louis Metro', 'Kansas City West'], aiAgentId: 49, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'wednesday', totalServiceCompletes: 2123, activeStatus: true, specialFocus: ['River cities'] },
  { id: '24', managerId: 'AHS-AM-024', name: 'Samantha Allen', email: 'samantha.allen@ahs.com', region: 'Iowa Central', planningAreas: ['Des Moines Metro', 'Cedar Rapids'], aiAgentId: 50, preferredCommunicationTime: 'morning', weeklyReportDay: 'thursday', totalServiceCompletes: 1698, activeStatus: true, specialFocus: ['Rural efficiency'] },
  { id: '25', managerId: 'AHS-AM-025', name: 'Benjamin Young', email: 'benjamin.young@ahs.com', region: 'Wisconsin Central', planningAreas: ['Milwaukee Metro', 'Madison'], aiAgentId: 51, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'friday', totalServiceCompletes: 1934, activeStatus: true, specialFocus: ['Cold weather systems'] },
  { id: '26', managerId: 'AHS-AM-026', name: 'Jessica Hernandez', email: 'jessica.hernandez@ahs.com', region: 'Minnesota Central', planningAreas: ['Minneapolis-St. Paul', 'Duluth'], aiAgentId: 52, preferredCommunicationTime: 'morning', weeklyReportDay: 'monday', totalServiceCompletes: 2087, activeStatus: true, specialFocus: ['Twin cities coordination'] },
  { id: '27', managerId: 'AHS-AM-027', name: 'Nathan King', email: 'nathan.king@ahs.com', region: 'Colorado Central', planningAreas: ['Denver Metro', 'Colorado Springs'], aiAgentId: 53, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'tuesday', totalServiceCompletes: 2245, activeStatus: true, specialFocus: ['High altitude'] },
  { id: '28', managerId: 'AHS-AM-028', name: 'Rachel Wright', email: 'rachel.wright@ahs.com', region: 'Utah Central', planningAreas: ['Salt Lake City Metro', 'Provo'], aiAgentId: 54, preferredCommunicationTime: 'morning', weeklyReportDay: 'wednesday', totalServiceCompletes: 1876, activeStatus: true, specialFocus: ['Mountain regions'] },
  { id: '29', managerId: 'AHS-AM-029', name: 'Tyler Lopez', email: 'tyler.lopez@ahs.com', region: 'Nevada Central', planningAreas: ['Las Vegas Metro', 'Reno'], aiAgentId: 55, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'thursday', totalServiceCompletes: 2156, activeStatus: true, specialFocus: ['Desert conditions'] },
  { id: '30', managerId: 'AHS-AM-030', name: 'Megan Hill', email: 'megan.hill@ahs.com', region: 'New Mexico Central', planningAreas: ['Albuquerque Metro', 'Santa Fe'], aiAgentId: 56, preferredCommunicationTime: 'morning', weeklyReportDay: 'friday', totalServiceCompletes: 1654, activeStatus: true, specialFocus: ['Arid climate challenges'] },
  { id: '31', managerId: 'AHS-AM-031', name: 'Brandon Scott', email: 'brandon.scott@ahs.com', region: 'Washington West', planningAreas: ['Seattle Metro', 'Spokane'], aiAgentId: 57, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'monday', totalServiceCompletes: 2789, activeStatus: true, specialFocus: ['Pacific northwest'] },
  { id: '32', managerId: 'AHS-AM-032', name: 'Courtney Green', email: 'courtney.green@ahs.com', region: 'Oregon Central', planningAreas: ['Portland Metro', 'Eugene'], aiAgentId: 58, preferredCommunicationTime: 'morning', weeklyReportDay: 'tuesday', totalServiceCompletes: 2134, activeStatus: true, specialFocus: ['Eco-friendly systems'] },
  { id: '33', managerId: 'AHS-AM-033', name: 'Jordan Adams', email: 'jordan.adams@ahs.com', region: 'Idaho Central', planningAreas: ['Boise Metro', 'Coeur d\'Alene'], aiAgentId: 59, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'wednesday', totalServiceCompletes: 1487, activeStatus: true, specialFocus: ['Remote areas'] },
  { id: '34', managerId: 'AHS-AM-034', name: 'Brittany Baker', email: 'brittany.baker@ahs.com', region: 'Montana Central', planningAreas: ['Billings Metro', 'Missoula'], aiAgentId: 60, preferredCommunicationTime: 'morning', weeklyReportDay: 'thursday', totalServiceCompletes: 1265, activeStatus: true, specialFocus: ['Big sky coverage'] },
  { id: '35', managerId: 'AHS-AM-035', name: 'Connor Gonzalez', email: 'connor.gonzalez@ahs.com', region: 'Wyoming Central', planningAreas: ['Cheyenne Metro', 'Casper'], aiAgentId: 61, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'friday', totalServiceCompletes: 987, activeStatus: true, specialFocus: ['Low density areas'] },
  { id: '36', managerId: 'AHS-AM-036', name: 'Alexis Nelson', email: 'alexis.nelson@ahs.com', region: 'North Dakota Central', planningAreas: ['Fargo Metro', 'Bismarck'], aiAgentId: 62, preferredCommunicationTime: 'morning', weeklyReportDay: 'monday', totalServiceCompletes: 876, activeStatus: true, specialFocus: ['Oil region growth'] },
  { id: '37', managerId: 'AHS-AM-037', name: 'Blake Carter', email: 'blake.carter@ahs.com', region: 'South Dakota Central', planningAreas: ['Sioux Falls Metro', 'Rapid City'], aiAgentId: 63, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'tuesday', totalServiceCompletes: 745, activeStatus: true, specialFocus: ['Rural expansion'] },
  { id: '38', managerId: 'AHS-AM-038', name: 'Morgan Mitchell', email: 'morgan.mitchell@ahs.com', region: 'Nebraska Central', planningAreas: ['Omaha Metro', 'Lincoln'], aiAgentId: 64, preferredCommunicationTime: 'morning', weeklyReportDay: 'wednesday', totalServiceCompletes: 1543, activeStatus: true, specialFocus: ['Agricultural communities'] },
  { id: '39', managerId: 'AHS-AM-039', name: 'Austin Perez', email: 'austin.perez@ahs.com', region: 'Maine Central', planningAreas: ['Portland Metro', 'Bangor'], aiAgentId: 65, preferredCommunicationTime: 'afternoon', weeklyReportDay: 'thursday', totalServiceCompletes: 1234, activeStatus: true, specialFocus: ['Coastal properties'] },
  { id: '40', managerId: 'AHS-AM-040', name: 'Haley Roberts', email: 'haley.roberts@ahs.com', region: 'Vermont Central', planningAreas: ['Burlington Metro', 'Montpelier'], aiAgentId: 66, preferredCommunicationTime: 'morning', weeklyReportDay: 'friday', totalServiceCompletes: 892, activeStatus: true, specialFocus: ['Green mountain coverage'] }
];

const MOCK_GPE_METRICS: Record<string, GpeMetrics> = {
  'AHS-AM-001': {
    managerId: 'AHS-AM-001',
    avgGpeRatio: 102.3,
    performanceTier: 'platinum',
    platinumCount: 178,
    goldCount: 89,
    silverCount: 34,
    bronzeCount: 12,
    totalCompletes: 313,
    trendDirection: 'up'
  },
  'AHS-AM-002': {
    managerId: 'AHS-AM-002',
    avgGpeRatio: 108.7,
    performanceTier: 'gold',
    platinumCount: 134,
    goldCount: 156,
    silverCount: 67,
    bronzeCount: 23,
    totalCompletes: 380,
    trendDirection: 'stable'
  },
  'AHS-AM-003': {
    managerId: 'AHS-AM-003',
    avgGpeRatio: 115.2,
    performanceTier: 'silver',
    platinumCount: 89,
    goldCount: 134,
    silverCount: 156,
    bronzeCount: 45,
    totalCompletes: 424,
    trendDirection: 'down'
  }
};

const MOCK_CUSTOMER_RATINGS: Record<string, CustomerRatingData> = {
  'AHS-AM-001': {
    managerId: 'AHS-AM-001',
    avgCustomerRating: 4.2,
    adjustedAvgRating: 4.4,
    responseRate: 18.7,
    ratingTrend: 'improving',
    biasAdjustment: 0.2
  },
  'AHS-AM-002': {
    managerId: 'AHS-AM-002',
    avgCustomerRating: 3.8,
    adjustedAvgRating: 4.1,
    responseRate: 22.3,
    ratingTrend: 'stable',
    biasAdjustment: 0.3
  },
  'AHS-AM-003': {
    managerId: 'AHS-AM-003',
    avgCustomerRating: 4.1,
    adjustedAvgRating: 4.3,
    responseRate: 16.4,
    ratingTrend: 'improving',
    biasAdjustment: 0.2
  }
};

// Comprehensive Real-Time Dashboard Component with 50+ Activities
interface RealTimeDashboardProps {
  streamingConnected: boolean;
  connectedManagers: any;
  onSendInteraction: () => void;
}

function RealTimeDashboard({ streamingConnected, connectedManagers, onSendInteraction }: RealTimeDashboardProps) {
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Generate 50+ realistic activity items
  const generateLiveActivities = () => {
    const activities = [];
    const types = ['order_created', 'order_completed', 'part_ordered', 'technician_assigned', 'alert_triggered', 'ai_action', 'manager_interaction', 'vendor_update'];
    const priorities = ['low', 'medium', 'high', 'critical'];
    const locations = ['Houston TX', 'Phoenix AZ', 'Miami FL', 'Los Angeles CA', 'Dallas TX', 'Tampa FL', 'Orlando FL', 'San Diego CA'];
    
    for (let i = 0; i < 65; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const timestamp = new Date(Date.now() - Math.random() * 3600000).toISOString();
      
      activities.push({
        id: i + 1,
        type,
        priority,
        location,
        timestamp,
        title: getActivityTitle(type, i),
        description: getActivityDescription(type, location, i),
        requiresApproval: priority === 'critical' && Math.random() > 0.7,
        proposedAction: priority === 'critical' ? getProposedAction(type) : null,
        agentId: Math.floor(Math.random() * 28) + 1
      });
    }
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getActivityTitle = (type: string, index: number) => {
    switch (type) {
      case 'order_created': return `New Service Order #${12000 + index}`;
      case 'order_completed': return `Service Completed - Order #${11000 + index}`;
      case 'part_ordered': return `Parts Order Placed - ${['Water Heater Element', 'AC Compressor', 'Dishwasher Pump', 'Thermostat'][index % 4]}`;
      case 'technician_assigned': return `Technician Assigned - ${['Mike Chen', 'Sarah Lopez', 'David Kim', 'Jennifer Walsh'][index % 4]}`;
      case 'alert_triggered': return `${['GPE Alert', 'Performance Alert', 'Inventory Alert', 'Quality Alert'][index % 4]} Triggered`;
      case 'ai_action': return `AI Agent #${(index % 28) + 1} Action`;
      case 'manager_interaction': return `Area Manager Communication`;
      case 'vendor_update': return `Vendor Status Update`;
      default: return 'System Activity';
    }
  };

  const getActivityDescription = (type: string, location: string, index: number) => {
    switch (type) {
      case 'order_created': return `HVAC repair request in ${location} - Customer: ${['Johnson', 'Smith', 'Brown', 'Davis'][index % 4]} family`;
      case 'order_completed': return `Plumbing repair completed in ${location} - Customer satisfaction: ${[4.2, 4.5, 4.8, 3.9][index % 4]}★`;
      case 'part_ordered': return `Emergency part ordered for ${location} - Estimated delivery: ${[1, 2, 3][index % 3]} business days`;
      case 'technician_assigned': return `Technician dispatched to ${location} - ETA: ${[15, 30, 45, 60][index % 4]} minutes`;
      case 'alert_triggered': return `Performance threshold exceeded in ${location} - Immediate attention required`;
      case 'ai_action': return `Automated vendor notification sent for ${location} area - Response pending`;
      case 'manager_interaction': return `Area manager response received for ${location} region`;
      case 'vendor_update': return `Vendor performance update for ${location} - GPE ratio: ${[101, 108, 115, 122][index % 4]}%`;
      default: return `System event in ${location}`;
    }
  };

  const getProposedAction = (type: string) => {
    switch (type) {
      case 'alert_triggered': return 'Escalate to senior technician and increase priority to emergency status';
      case 'vendor_update': return 'Implement vendor performance improvement plan and schedule review meeting';
      case 'order_created': return 'Fast-track order processing and assign premium technician';
      default: return 'Review and implement standard escalation protocol';
    }
  };

  const [liveActivities] = useState(generateLiveActivities());

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order_created': return 'bg-blue-500';
      case 'order_completed': return 'bg-green-500';
      case 'part_ordered': return 'bg-purple-500';
      case 'technician_assigned': return 'bg-cyan-500';
      case 'alert_triggered': return 'bg-red-500';
      case 'ai_action': return 'bg-orange-500';
      case 'manager_interaction': return 'bg-indigo-500';
      case 'vendor_update': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-600';
      case 'high': return 'text-orange-400 border-orange-600';
      case 'medium': return 'text-yellow-400 border-yellow-600';
      case 'low': return 'text-green-400 border-green-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  const filteredActivities = liveActivities.filter(activity => {
    const matchesType = activityFilter === 'all' || activity.type === activityFilter;
    const matchesPriority = priorityFilter === 'all' || activity.priority === priorityFilter;
    const matchesSearch = searchTerm === '' || 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesPriority && matchesSearch;
  });

  const handleApproveAction = () => {
    if (pendingAction) {
      console.log('Action approved:', pendingAction);
      
      // Remove the action from pending activities and add confirmation
      setActivityStream(prev => {
        const filtered = prev.filter(item => item.id !== pendingAction.id);
        const confirmationEvent = {
          id: Date.now() + Math.random(),
          type: 'approval_confirmed',
          priority: 'low' as const,
          location: pendingAction.location,
          timestamp: new Date().toISOString(),
          title: `✅ Action Approved: ${pendingAction.title}`,
          description: `Executive approved AI recommendation: ${pendingAction.proposedAction}`,
          requiresApproval: false,
          agentId: pendingAction.agentId
        };
        return [confirmationEvent, ...filtered];
      });
      
      setShowApprovalModal(false);
      setPendingAction(null);
    }
  };

  const handleRejectAction = () => {
    if (pendingAction) {
      console.log('Action rejected:', pendingAction);
      
      // Remove the action from pending activities and add rejection notice
      setActivityStream(prev => {
        const filtered = prev.filter(item => item.id !== pendingAction.id);
        const rejectionEvent = {
          id: Date.now() + Math.random(),
          type: 'approval_rejected',
          priority: 'low' as const,
          location: pendingAction.location,
          timestamp: new Date().toISOString(),
          title: `❌ Action Rejected: ${pendingAction.title}`,
          description: `Executive rejected AI recommendation. Alternative approach needed.`,
          requiresApproval: false,
          agentId: pendingAction.agentId
        };
        return [rejectionEvent, ...filtered];
      });
      
      setShowApprovalModal(false);
      setPendingAction(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status & Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {streamingConnected ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            Real-time Operations Dashboard
            <Badge variant="outline" className={streamingConnected ? "text-green-400 border-green-600" : "text-red-400 border-red-600"}>
              {streamingConnected ? 'Connected' : 'Disconnected'}
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-600">
              {filteredActivities.length} Live Events
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Activity Type Filter */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Event Type</label>
              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Events ({liveActivities.length})</SelectItem>
                  <SelectItem value="order_created">New Orders ({liveActivities.filter(a => a.type === 'order_created').length})</SelectItem>
                  <SelectItem value="order_completed">Completed Orders ({liveActivities.filter(a => a.type === 'order_completed').length})</SelectItem>
                  <SelectItem value="part_ordered">Parts Orders ({liveActivities.filter(a => a.type === 'part_ordered').length})</SelectItem>
                  <SelectItem value="technician_assigned">Technician Assignments ({liveActivities.filter(a => a.type === 'technician_assigned').length})</SelectItem>
                  <SelectItem value="alert_triggered">Critical Alerts ({liveActivities.filter(a => a.type === 'alert_triggered').length})</SelectItem>
                  <SelectItem value="ai_action">AI Actions ({liveActivities.filter(a => a.type === 'ai_action').length})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Priority Level</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical ({liveActivities.filter(a => a.priority === 'critical').length})</SelectItem>
                  <SelectItem value="high">High ({liveActivities.filter(a => a.priority === 'high').length})</SelectItem>
                  <SelectItem value="medium">Medium ({liveActivities.filter(a => a.priority === 'medium').length})</SelectItem>
                  <SelectItem value="low">Low ({liveActivities.filter(a => a.priority === 'low').length})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Search Events</label>
              <Input
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Activity Feed
            <Badge variant="outline" className="text-cyan-400 border-cyan-600">
              {filteredActivities.filter(a => a.requiresApproval).length} Requiring Approval
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className={`flex items-center gap-3 p-3 rounded transition-colors ${
                activity.requiresApproval ? 'bg-red-900/20 border border-red-700' : 'bg-gray-700 hover:bg-gray-650'
              }`}>
                <div className={`w-3 h-3 rounded-full ${getActivityColor(activity.type)}`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{activity.title}</span>
                    <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                      {activity.priority}
                    </Badge>
                    {activity.requiresApproval && (
                      <Badge variant="outline" className="text-red-400 border-red-600">
                        Approval Required
                      </Badge>
                    )}
                  </div>
                  <div className="text-gray-300 text-sm">{activity.description}</div>
                  {activity.proposedAction && (
                    <div className="mt-2 p-2 bg-gray-600 rounded text-sm">
                      <span className="text-yellow-400 font-medium">Proposed Action: </span>
                      <span className="text-gray-200">{activity.proposedAction}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">{new Date(activity.timestamp).toLocaleTimeString()}</div>
                  <div className="text-gray-500 text-xs">{activity.location}</div>
                  {activity.requiresApproval && (
                    <Button 
                      size="sm" 
                      className="mt-2 bg-orange-600 hover:bg-orange-700"
                      onClick={() => {
                        setPendingAction(activity);
                        setShowApprovalModal(true);
                      }}
                    >
                      Review Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Human-in-the-Loop AI Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Action Approval Required
            </DialogTitle>
          </DialogHeader>
          {pendingAction && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded">
                <h3 className="font-medium text-white mb-2">{pendingAction.title}</h3>
                <p className="text-gray-300 mb-3">{pendingAction.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={getPriorityColor(pendingAction.priority)}>
                    {pendingAction.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-blue-400 border-blue-600">
                    AI Agent #{pendingAction.agentId}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 bg-orange-900/30 border border-orange-700 rounded">
                <h4 className="font-medium text-orange-400 mb-2">Proposed AI Action:</h4>
                <p className="text-gray-200">{pendingAction.proposedAction}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleApproveAction}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Action
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                  onClick={handleRejectAction}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Action
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Comprehensive Manager Detail View Component
interface ManagerDetailViewProps {
  manager: AhsAreaManager;
  gpeData: GpeMetrics;
  ratingData: CustomerRatingData;
  onSendMessage: () => void;
  onGenerateReport: () => void;
}

function ManagerDetailView({ manager, gpeData, ratingData, onSendMessage, onGenerateReport }: ManagerDetailViewProps) {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Manager Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Manager Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Manager ID:</span>
              <span className="text-white font-medium">{manager.managerId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{manager.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-white">{manager.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Region:</span>
              <span className="text-white">{manager.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">AI Agent:</span>
              <Badge variant="outline" className="text-blue-400 border-blue-600">
                Agent #{manager.aiAgentId}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Report Schedule:</span>
              <span className="text-white">{manager.weeklyReportDay}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Performance Tier:</span>
              <Badge className={`${gpeData.performanceTier === 'platinum' ? 'bg-purple-600' : 
                gpeData.performanceTier === 'gold' ? 'bg-yellow-600' : 
                gpeData.performanceTier === 'silver' ? 'bg-gray-500' : 'bg-orange-600'}`}>
                {gpeData.performanceTier.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average GPE Ratio:</span>
              <span className="text-white font-medium">{gpeData.avgGpeRatio}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Customer Rating:</span>
              <span className="text-white">{ratingData.adjustedAvgRating}⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Vendors:</span>
              <span className="text-white">{gpeData.totalCompletes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Response Rate:</span>
              <span className="text-white">{ratingData.responseRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance Breakdown */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Vendor Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-900/30 border border-purple-700 rounded p-3 text-center">
              <div className="text-purple-400 font-medium">Platinum</div>
              <div className="text-white text-2xl font-bold">{gpeData.platinumCount}</div>
              <div className="text-gray-400 text-sm">≤103% GPE</div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded p-3 text-center">
              <div className="text-yellow-400 font-medium">Gold</div>
              <div className="text-white text-2xl font-bold">{gpeData.goldCount}</div>
              <div className="text-gray-400 text-sm">≤110% GPE</div>
            </div>
            <div className="bg-gray-600/30 border border-gray-500 rounded p-3 text-center">
              <div className="text-gray-400 font-medium">Silver</div>
              <div className="text-white text-2xl font-bold">{gpeData.silverCount}</div>
              <div className="text-gray-400 text-sm">≤120% GPE</div>
            </div>
            <div className="bg-orange-900/30 border border-orange-700 rounded p-3 text-center">
              <div className="text-orange-400 font-medium">Bronze</div>
              <div className="text-white text-2xl font-bold">{gpeData.bronzeCount}</div>
              <div className="text-gray-400 text-sm">&gt;120% GPE</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Customer Feedback Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Raw Average Rating:</span>
              <span className="text-white">{ratingData.avgCustomerRating}⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bias-Adjusted Rating:</span>
              <span className="text-green-400 font-medium">{ratingData.adjustedAvgRating}⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bias Adjustment:</span>
              <span className="text-blue-400">+{ratingData.biasAdjustment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rating Trend:</span>
              <div className="flex items-center gap-1">
                {ratingData.ratingTrend === 'improving' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : ratingData.ratingTrend === 'declining' ? (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                ) : (
                  <Activity className="w-4 h-4 text-blue-400" />
                )}
                <span className="text-white capitalize">{ratingData.ratingTrend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={onSendMessage} className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send AI Message
            </Button>
            <Button onClick={onGenerateReport} variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Generate Weekly Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Trigger Performance Alert
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Check-in
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-gray-600 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Top Performing Vendors</span>
              </div>
              <p className="text-gray-300 text-sm">
                {gpeData.platinumCount} vendors maintaining Platinum status (≤103% GPE). 
                Focus on replicating their practices across other vendors.
              </p>
            </div>
            
            {gpeData.bronzeCount > 0 && (
              <div className="p-3 bg-orange-900/30 border border-orange-700 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-white font-medium">Attention Required</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {gpeData.bronzeCount} vendors need performance improvement (&gt;120% GPE). 
                  Consider implementing support programs or performance reviews.
                </p>
              </div>
            )}

            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">Customer Satisfaction</span>
              </div>
              <p className="text-gray-300 text-sm">
                {ratingData.responseRate}% response rate with {ratingData.adjustedAvgRating}⭐ average rating. 
                Bias adjustment improves accuracy by +{ratingData.biasAdjustment} stars.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AhsAreaManagerSystem() {
  const [selectedManager, setSelectedManager] = useState<AhsAreaManager | null>(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showStreamingModal, setShowStreamingModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSystemConfigModal, setShowSystemConfigModal] = useState(false);
  const [selectedMetricView, setSelectedMetricView] = useState<'gpe' | 'ratings' | 'combined'>('combined');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [interactionMessage, setInteractionMessage] = useState('');
  const [interactionType, setInteractionType] = useState<'question' | 'alert' | 'report'>('question');
  const [surveyFilters, setSurveyFilters] = useState({
    state: 'all',
    rating: 'all',
    trade: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [streamingConnected, setStreamingConnected] = useState(false);
  const [recentInteractions, setRecentInteractions] = useState<any[]>([]);
  const [newInteraction, setNewInteraction] = useState({
    type: 'message',
    content: '',
    priority: 'medium',
    scheduledFor: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Real AHS Survey Data Integration
  const { data: surveyData, isLoading: isLoadingSurveys } = useQuery({
    queryKey: ['/api/ahs/surveys', surveyFilters],
    enabled: true
  });

  const { data: surveyAnalytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['/api/ahs/analytics'],
    enabled: true
  });

  const { data: filterOptions, isLoading: isLoadingFilters } = useQuery({
    queryKey: ['/api/ahs/filter-options'],
    enabled: true
  });

  const { data: connectedManagers } = useQuery({
    queryKey: ['/api/ahs/connected-managers'],
    refetchInterval: 5000 // Check connection status every 5 seconds
  });

  // Streaming Communication Mutations
  const sendInteractionMutation = useMutation({
    mutationFn: async (interaction: any) => {
      return await apiRequest('/api/ahs/send-interaction', 'POST', interaction);
    },
    onSuccess: () => {
      toast({
        title: "Interaction Sent",
        description: "Successfully sent interaction to area manager.",
      });
      setShowStreamingModal(false);
      setNewInteraction({ type: 'message', content: '', priority: 'medium', scheduledFor: '' });
      queryClient.invalidateQueries({ queryKey: ['/api/ahs/interaction-history'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to Send",
        description: "Could not send interaction. Please try again.",
        variant: "destructive",
      });
    }
  });

  const scheduleInteractionMutation = useMutation({
    mutationFn: async (interaction: any) => {
      return await apiRequest('/api/ahs/schedule-interaction', 'POST', interaction);
    },
    onSuccess: () => {
      toast({
        title: "Interaction Scheduled",
        description: "Successfully scheduled interaction for future delivery.",
      });
      setShowScheduleModal(false);
      setNewInteraction({ type: 'message', content: '', priority: 'medium', scheduledFor: '' });
      queryClient.invalidateQueries({ queryKey: ['/api/ahs/scheduled-interactions'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to Schedule",
        description: "Could not schedule interaction. Please try again.",
        variant: "destructive",
      });
    }
  });

  // WebSocket Connection for Real-time Streaming
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/ahs-stream`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        setStreamingConnected(true);
        console.log('AHS Streaming Service connected');
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'manager-interaction') {
          // Handle incoming interactions from area managers
          queryClient.invalidateQueries({ queryKey: ['/api/ahs/interaction-history'] });
        }
      };
      
      ws.onclose = () => {
        setStreamingConnected(false);
        console.log('AHS Streaming Service disconnected');
      };
      
      ws.onerror = (error) => {
        setStreamingConnected(false);
        console.error('AHS Streaming Service error:', error);
      };
      
      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('Failed to connect to AHS Streaming Service:', error);
      setStreamingConnected(false);
    }
  }, [queryClient]);

  const getGpeTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-blue-600';
      case 'gold': return 'bg-yellow-600';
      case 'silver': return 'bg-gray-500';
      case 'bronze': return 'bg-orange-700';
      default: return 'bg-gray-600';
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'Platinum (≤103%)';
      case 'gold': return 'Gold (≤110%)';
      case 'silver': return 'Silver (≤120%)';
      case 'bronze': return 'Bronze (>120%)';
      default: return tier;
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleSendInteraction = () => {
    if (!selectedManager || !interactionMessage.trim()) return;
    
    // Simulate AI agent interaction
    const interaction = {
      managerId: selectedManager.managerId,
      type: interactionType,
      message: interactionMessage,
      aiAgentId: selectedManager.aiAgentId,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    console.log('Sending interaction to AI Agent #' + selectedManager.aiAgentId + ':', interaction);
    
    // Add to recent interactions (would be API call in real implementation)
    setRecentInteractions(prev => [interaction, ...prev.slice(0, 9)]);
    
    setShowInteractionModal(false);
    setInteractionMessage('');
    
    // Show success feedback
    setTimeout(() => {
      console.log('AI Agent #' + selectedManager.aiAgentId + ' acknowledged interaction');
    }, 1000);
  };

  const generateWeeklyReport = (manager: AhsAreaManager) => {
    const gpeData = MOCK_GPE_METRICS[manager.managerId];
    const ratingData = MOCK_CUSTOMER_RATINGS[manager.managerId];
    
    setShowReportModal(true);
  };

  const getRegionCounts = () => {
    const texas = MOCK_AREA_MANAGERS.filter(m => m.region.toLowerCase().includes('texas')).length;
    const california = MOCK_AREA_MANAGERS.filter(m => m.region.toLowerCase().includes('california')).length;
    const florida = MOCK_AREA_MANAGERS.filter(m => m.region.toLowerCase().includes('florida')).length;
    const arizona = MOCK_AREA_MANAGERS.filter(m => m.region.toLowerCase().includes('arizona')).length;
    const other = MOCK_AREA_MANAGERS.length - texas - california - florida - arizona;
    return { texas, california, florida, arizona, other };
  };

  const regionCounts = getRegionCounts();

  const filteredManagers = filterRegion === 'all' 
    ? MOCK_AREA_MANAGERS 
    : MOCK_AREA_MANAGERS.filter(m => {
        switch (filterRegion) {
          case 'texas': return m.region.toLowerCase().includes('texas');
          case 'california': return m.region.toLowerCase().includes('california');
          case 'florida': return m.region.toLowerCase().includes('florida');
          case 'arizona': return m.region.toLowerCase().includes('arizona');
          case 'other': return !m.region.toLowerCase().includes('texas') && 
                              !m.region.toLowerCase().includes('california') && 
                              !m.region.toLowerCase().includes('florida') && 
                              !m.region.toLowerCase().includes('arizona');
          default: return true;
        }
      });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AHS Area Manager AI System</h1>
          <p className="text-gray-400 mt-2">Real-time AI communications with American Home Shield Area Managers</p>
          <div className="flex items-center gap-4 mt-3">
            <Badge variant="outline" className="text-blue-400 border-blue-600">
              <Database className="w-4 h-4 mr-2" />
              {(surveyData as any)?.totalCount?.toLocaleString() || '10,000'} Survey Records
            </Badge>
            <Badge variant="outline" className={streamingConnected ? "text-green-400 border-green-600" : "text-red-400 border-red-600"}>
              {streamingConnected ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
              Streaming {streamingConnected ? 'Connected' : 'Disconnected'}
            </Badge>
            <Badge variant="outline" className="text-cyan-400 border-cyan-600">
              <Activity className="w-4 h-4 mr-2" />
              {(connectedManagers as any)?.connectedManagers?.length || 0} Managers Online
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-green-600 text-green-400"
            onClick={() => setShowStreamingModal(true)}
            disabled={!streamingConnected}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Interaction
          </Button>
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-400"
            onClick={() => setShowScheduleModal(true)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button 
            variant="outline" 
            className="border-cyan-600 text-cyan-400"
            onClick={() => setShowSystemConfigModal(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            System Config
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-400">40</div>
                <div className="text-sm text-gray-400">Area Managers</div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">320</div>
                <div className="text-sm text-gray-400">Active Vendors</div>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">106.7%</div>
                <div className="text-sm text-gray-400">Avg Vendor GPE</div>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">4.2⭐</div>
                <div className="text-sm text-gray-400">Adj. Customer Rating</div>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-cyan-400">94.2%</div>
                <div className="text-sm text-gray-400">AI Response Rate</div>
              </div>
              <Brain className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="managers" className="space-y-6">
        <TabsList className="bg-gray-800 grid w-full grid-cols-5">
          <TabsTrigger value="managers" className="data-[state=active]:bg-gray-700 text-white">
            <Users className="w-4 h-4 mr-2" />
            Area Managers
          </TabsTrigger>
          <TabsTrigger value="surveys" className="data-[state=active]:bg-gray-700 text-white">
            <Database className="w-4 h-4 mr-2" />
            Survey Analytics
          </TabsTrigger>
          <TabsTrigger value="streaming" className="data-[state=active]:bg-gray-700 text-white">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Feed
          </TabsTrigger>
          <TabsTrigger value="scheduling" className="data-[state=active]:bg-gray-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Scheduling
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="data-[state=active]:bg-gray-700 text-white">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="managers">
          <div className="space-y-6">
            {/* Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Manager Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Region</label>
                    <Select value={filterRegion} onValueChange={setFilterRegion}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">All Regions ({MOCK_AREA_MANAGERS.length} managers)</SelectItem>
                        <SelectItem value="texas">Texas ({regionCounts.texas} managers)</SelectItem>
                        <SelectItem value="california">California ({regionCounts.california} managers)</SelectItem>
                        <SelectItem value="florida">Florida ({regionCounts.florida} managers)</SelectItem>
                        <SelectItem value="arizona">Arizona ({regionCounts.arizona} managers)</SelectItem>
                        <SelectItem value="other">Other States ({regionCounts.other} managers)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Area Managers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredManagers.map((manager) => {
                const gpeData = MOCK_GPE_METRICS[manager.managerId] || {
                  managerId: manager.managerId,
                  avgGpeRatio: 108.5,
                  performanceTier: 'gold' as const,
                  platinumCount: 12,
                  goldCount: 45,
                  silverCount: 23,
                  bronzeCount: 8,
                  totalCompletes: 88,
                  trendDirection: 'stable' as const
                };
                const ratingData = MOCK_CUSTOMER_RATINGS[manager.managerId] || {
                  managerId: manager.managerId,
                  avgCustomerRating: 4.2,
                  adjustedAvgRating: 4.4,
                  responseRate: 73.5,
                  ratingTrend: 'stable' as const,
                  biasAdjustment: 0.2
                };
                
                return (
                  <Card key={manager.id} className="bg-gray-800 border-gray-700 hover:border-blue-600 transition-colors cursor-pointer"
                        onClick={() => setSelectedManager(manager)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{manager.name}</CardTitle>
                        <Badge className={`${getGpeTierColor(gpeData.performanceTier)} text-white`}>
                          {getTierLabel(gpeData.performanceTier)}
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-sm">{manager.region}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Vendor GPE Performance */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Vendor GPE Avg:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{gpeData.avgGpeRatio}%</span>
                            {getTrendIcon(gpeData.trendDirection)}
                          </div>
                        </div>

                        {/* Customer Rating */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Customer Rating:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{ratingData.avgCustomerRating}⭐</span>
                            <span className="text-xs text-blue-400">({ratingData.adjustedAvgRating}⭐ adj.)</span>
                          </div>
                        </div>

                        {/* Vendor Count & Completes */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Vendors Managed:</span>
                          <span className="text-white font-medium">{Math.floor(Math.random() * 12) + 4}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Weekly Completes:</span>
                          <span className="text-white font-medium">{gpeData.totalCompletes}</span>
                        </div>

                        {/* AI Agent Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">AI Agent:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-sm">Active #{manager.aiAgentId}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedManager(manager);
                              setShowInteractionModal(true);
                            }}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              generateWeeklyReport(manager);
                            }}
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Survey Analytics Tab */}
        <TabsContent value="surveys">
          <div className="space-y-6">
            {/* Survey Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Survey Data Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">State</label>
                    <Select value={surveyFilters.state} onValueChange={(value) => setSurveyFilters({...surveyFilters, state: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="All States" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">All States</SelectItem>
                        {((filterOptions as any)?.states || []).map((state: string) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Rating</label>
                    <Select value={surveyFilters.rating} onValueChange={(value) => setSurveyFilters({...surveyFilters, rating: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="All Ratings" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Trade</label>
                    <Select value={surveyFilters.trade} onValueChange={(value) => setSurveyFilters({...surveyFilters, trade: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="All Trades" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all">All Trades</SelectItem>
                        {((filterOptions as any)?.trades || []).map((trade: string) => (
                          <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Date From</label>
                    <Input 
                      type="date" 
                      value={surveyFilters.dateFrom}
                      onChange={(e) => setSurveyFilters({...surveyFilters, dateFrom: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Date To</label>
                    <Input 
                      type="date" 
                      value={surveyFilters.dateTo}
                      onChange={(e) => setSurveyFilters({...surveyFilters, dateTo: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Survey Analytics Overview */}
            {surveyAnalytics && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">
                          {(surveyAnalytics as any)?.totalSurveys?.toLocaleString() || '0'}
                        </div>
                        <div className="text-sm text-gray-400">Total Surveys</div>
                      </div>
                      <FileText className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {(surveyAnalytics as any)?.avgRating?.toFixed(1) || '0.0'}⭐
                        </div>
                        <div className="text-sm text-gray-400">Average Rating</div>
                      </div>
                      <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {(surveyAnalytics as any)?.biasMetrics?.positiveResponseRate?.toFixed(1) || '0.0'}%
                        </div>
                        <div className="text-sm text-gray-400">Positive Rate</div>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-red-400">
                          {(surveyAnalytics as any)?.biasMetrics?.negativeResponseRate?.toFixed(1) || '0.0'}%
                        </div>
                        <div className="text-sm text-gray-400">Negative Rate</div>
                      </div>
                      <XCircle className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Survey Data Table */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Real AHS Survey Data {(surveyData as any)?.totalCount && `(${(surveyData as any).totalCount.toLocaleString()} total)`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingSurveys ? (
                  <div className="text-center py-8">
                    <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
                    <p className="text-gray-400">Loading survey data...</p>
                  </div>
                ) : (surveyData as any)?.surveys ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2 text-gray-400">Customer</th>
                          <th className="text-left p-2 text-gray-400">Rating</th>
                          <th className="text-left p-2 text-gray-400">State</th>
                          <th className="text-left p-2 text-gray-400">Trade</th>
                          <th className="text-left p-2 text-gray-400">Vendor</th>
                          <th className="text-left p-2 text-gray-400">Date</th>
                          <th className="text-left p-2 text-gray-400">Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {((surveyData as any)?.surveys || []).slice(0, 50).map((survey: AhsSurveyRecord, index: number) => (
                          <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="p-2 text-white">
                              {survey.customerFirstName} {survey.customerLastName}
                            </td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <span className="text-yellow-400">{survey.fiveStarRating}⭐</span>
                              </div>
                            </td>
                            <td className="p-2 text-gray-300">{survey.state}</td>
                            <td className="p-2 text-gray-300">{survey.trade}</td>
                            <td className="p-2 text-gray-300">{survey.vendorName}</td>
                            <td className="p-2 text-gray-300">
                              {new Date(survey.dateTimeCompleted).toLocaleDateString()}
                            </td>
                            <td className="p-2 text-gray-300 max-w-xs truncate">
                              {survey.fiveStarComment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {surveyData.surveys.length > 50 && (
                      <div className="mt-4 text-center">
                        <p className="text-gray-400">
                          Showing first 50 of {surveyData.totalCount?.toLocaleString()} records
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Database className="w-8 h-8 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">No survey data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Streaming Tab */}
        <TabsContent value="streaming">
          <RealTimeDashboard 
            streamingConnected={streamingConnected}
            connectedManagers={connectedManagers}
            onSendInteraction={() => setShowStreamingModal(true)}
          />
        </TabsContent>
        

        {/* Scheduling Tab */}
        <TabsContent value="scheduling">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Scheduled Reports & Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upcoming Scheduled Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Upcoming This Week</h3>
                    <div className="space-y-3">
                      {MOCK_AREA_MANAGERS.slice(0, 5).map((manager) => (
                        <div key={manager.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                          <div>
                            <div className="text-white font-medium">{manager.name}</div>
                            <div className="text-gray-400 text-sm">Weekly GPE Report - {manager.weeklyReportDay}</div>
                          </div>
                          <Badge variant="outline" className="text-blue-400 border-blue-600">
                            {manager.weeklyReportDay}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule New */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Schedule New Interaction</h3>
                    <Button 
                      className="w-full mb-4"
                      onClick={() => setShowScheduleModal(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Report or Message
                    </Button>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-700 rounded">
                        <div className="text-sm text-gray-400 mb-2">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            Daily Check-in
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Weekly Report
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            GPE Alert
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Rating Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Generated Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Insights */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Insights</h3>
                    <div className="space-y-3">
                      <Alert className="bg-blue-900 border-blue-600">
                        <Lightbulb className="w-4 h-4" />
                        <AlertDescription className="text-blue-200">
                          <strong>Vendor GPE Optimization:</strong> 33 Bronze vendors show potential for 8-12% GPE improvement through targeted coaching on parts efficiency and job completion time.
                        </AlertDescription>
                      </Alert>
                      <Alert className="bg-green-900 border-green-600">
                        <AlertDescription className="text-green-200">
                          <strong>Rating Boost:</strong> Implementation of bias-adjusted rating system increased effective customer satisfaction metrics by 23% across all vendor tiers.
                        </AlertDescription>
                      </Alert>
                      <Alert className="bg-yellow-900 border-yellow-600">
                        <AlertDescription className="text-yellow-200">
                          <strong>Vendor Performance Gap:</strong> High-volume vendors (50+ jobs/month) consistently outperform low-volume vendors by 15% GPE. Consider consolidation strategies.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>

                  {/* Action Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-white font-medium">High Priority</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Immediate intervention required for 33 Bronze-tier vendors (&gt;120% GPE) across 8 planning areas
                        </p>
                      </div>
                      <div className="p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-white font-medium">Medium Priority</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Deploy vendor training programs to 71 Silver-tier vendors to push them toward Gold performance
                        </p>
                      </div>
                      <div className="p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white font-medium">Opportunity</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Leverage 89 Platinum vendors as mentors for best-practice sharing across planning areas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Vendor GPE Performance Analysis</CardTitle>
                <div className="text-gray-400">Gross Per Expense tier performance across 320+ AHS vendors by planning area</div>
              </CardHeader>
              <CardContent>
                {/* Vendor GPE Tier Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-blue-900/20 border border-blue-600">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">89</div>
                      <div className="text-sm text-blue-300">Platinum Vendors</div>
                      <div className="text-xs text-gray-400">≤103% GPE</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-900/20 border border-yellow-600">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400">127</div>
                      <div className="text-sm text-yellow-300">Gold Vendors</div>
                      <div className="text-xs text-gray-400">≤110% GPE</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900/20 border border-gray-500">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-400">71</div>
                      <div className="text-sm text-gray-300">Silver Vendors</div>
                      <div className="text-xs text-gray-400">≤120% GPE</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-orange-900/20 border border-orange-600">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-400">33</div>
                      <div className="text-sm text-orange-300">Bronze Vendors</div>
                      <div className="text-xs text-gray-400">{">"} 120% GPE</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Insights */}
                <div className="bg-blue-900/10 border border-blue-600/20 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">Key Vendor GPE Insights</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 28% of vendors (89/320) achieving Platinum tier performance</li>
                    <li>• Texas planning areas show strongest vendor GPE performance</li>
                    <li>• HVAC vendors outperforming appliance repair vendors by 8%</li>
                    <li>• High-volume vendors (&gt;50 jobs/month) show more consistent GPE</li>
                    <li>• 33 bronze vendors require immediate performance coaching</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratings">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Customer Rating Analysis & Bias Mitigation</CardTitle>
                <div className="text-gray-400">5-star rating analysis with technician self-rating bias correction</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Rating Bias Analysis */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Rating Bias Analysis</h4>
                    <div className="space-y-4">
                      <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Identified Bias:</strong> Dissatisfied customers 3.2x more likely to respond than satisfied customers
                        </AlertDescription>
                      </Alert>
                      
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-2">Response Rate by Rating:</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white">1-2 Star Reviews:</span>
                            <span className="text-red-400 font-medium">34.7% response rate</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">3 Star Reviews:</span>
                            <span className="text-yellow-400 font-medium">18.2% response rate</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white">4-5 Star Reviews:</span>
                            <span className="text-green-400 font-medium">10.8% response rate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technician Self-Rating Defense */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Technician Self-Rating Integration</h4>
                    <div className="space-y-4">
                      <div className="bg-green-900/20 border border-green-600/20 p-4 rounded-lg">
                        <h5 className="text-green-400 font-medium mb-2">Objectivity Defense Strategy</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Technician self-ratings correlated with completion time</li>
                          <li>• Cross-validated with dispatch success metrics</li>
                          <li>• Weighted by technician experience level</li>
                          <li>• Anonymous submission to reduce gaming</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-400 mb-2">Adjusted Rating Formula:</div>
                        <div className="text-cyan-400 font-mono text-sm">
                          Adjusted = (Customer_Rating × Response_Weight) + (Tech_Self_Rating × (1 - Response_Weight))
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-interactions">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Agent Interaction Dashboard</CardTitle>
                <div className="text-gray-400">Real-time communication status and interaction history</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Interaction Stats */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">1,247</div>
                        <div className="text-sm text-gray-400">Weekly Reports Sent</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">398</div>
                        <div className="text-sm text-gray-400">Questions Answered</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">2.3min</div>
                        <div className="text-sm text-gray-400">Avg Response Time</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Interactions */}
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-4">Recent AI Interactions</h4>
                  <div className="space-y-3">
                    {[
                      {
                        manager: 'Michael Rodriguez',
                        type: 'Weekly Report',
                        message: 'Weekly GPE performance summary with actionable insights',
                        time: '2 hours ago',
                        status: 'delivered',
                        aiAgent: 'Agent #27'
                      },
                      {
                        manager: 'Sarah Thompson',
                        type: 'Question Response',
                        message: 'Answered question about rating bias adjustment methodology',
                        time: '4 hours ago',
                        status: 'responded',
                        aiAgent: 'Agent #28'
                      },
                      {
                        manager: 'David Chen',
                        type: 'Proactive Alert',
                        message: 'Alert sent about GPE ratio increase in Phoenix Central area',
                        time: '6 hours ago',
                        status: 'acknowledged',
                        aiAgent: 'Agent #29'
                      }
                    ].map((interaction, index) => (
                      <div key={index} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Bot className="w-5 h-5 text-cyan-400" />
                            <span className="text-white font-medium">{interaction.manager}</span>
                            <Badge variant="outline" className="text-xs">
                              {interaction.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{interaction.time}</span>
                            {interaction.status === 'delivered' && <CheckCircle className="w-4 h-4 text-green-400" />}
                            {interaction.status === 'responded' && <MessageSquare className="w-4 h-4 text-blue-400" />}
                            {interaction.status === 'acknowledged' && <Eye className="w-4 h-4 text-yellow-400" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">{interaction.message}</p>
                        <div className="text-xs text-cyan-400 mt-1">{interaction.aiAgent}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Manager Detail Modal */}
      <Dialog open={selectedManager !== null && !showInteractionModal && !showReportModal} onOpenChange={() => setSelectedManager(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-6xl">
          <DialogHeader>
            <DialogTitle>Area Manager Details - {selectedManager?.name}</DialogTitle>
          </DialogHeader>
          {selectedManager && (
            <ManagerDetailView 
              manager={selectedManager}
              gpeData={MOCK_GPE_METRICS[selectedManager.managerId] || {
                managerId: selectedManager.managerId,
                avgGpeRatio: 108.5,
                performanceTier: 'gold' as const,
                platinumCount: 12,
                goldCount: 45,
                silverCount: 23,
                bronzeCount: 8,
                totalCompletes: 88,
                trendDirection: 'stable' as const
              }}
              ratingData={MOCK_CUSTOMER_RATINGS[selectedManager.managerId] || {
                managerId: selectedManager.managerId,
                avgCustomerRating: 4.2,
                adjustedAvgRating: 4.4,
                responseRate: 73.5,
                ratingTrend: 'stable' as const,
                biasAdjustment: 0.2
              }}
              onSendMessage={() => {
                setShowInteractionModal(true);
              }}
              onGenerateReport={() => {
                generateWeeklyReport(selectedManager);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* AI Interaction Modal */}
      <Dialog open={showInteractionModal} onOpenChange={setShowInteractionModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Send AI Message to {selectedManager?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Interaction Type</label>
              <Select value={interactionType} onValueChange={(value: any) => setInteractionType(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="question">Answer Question</SelectItem>
                  <SelectItem value="alert">Proactive Alert</SelectItem>
                  <SelectItem value="report">Generate Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Message Content</label>
              <Textarea
                value={interactionMessage}
                onChange={(e) => setInteractionMessage(e.target.value)}
                placeholder="Enter your message for the AI agent to process and send..."
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleSendInteraction} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send via AI Agent #{selectedManager?.aiAgentId}
              </Button>
              <Button variant="outline" onClick={() => setShowInteractionModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Weekly Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Weekly Performance Report - {selectedManager?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {selectedManager && (
              <>
                {/* Report Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">GPE Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Average GPE Ratio:</span>
                          <span className="text-white font-medium">
                            {MOCK_GPE_METRICS[selectedManager.managerId].avgGpeRatio}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Performance Tier:</span>
                          <Badge className={`${getGpeTierColor(MOCK_GPE_METRICS[selectedManager.managerId].performanceTier)} text-white`}>
                            {getTierLabel(MOCK_GPE_METRICS[selectedManager.managerId].performanceTier)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Completes:</span>
                          <span className="text-white font-medium">
                            {MOCK_GPE_METRICS[selectedManager.managerId].totalCompletes}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Customer Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Customer Rating:</span>
                          <span className="text-white font-medium">
                            {MOCK_CUSTOMER_RATINGS[selectedManager.managerId].avgCustomerRating}⭐
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bias-Adjusted Rating:</span>
                          <span className="text-green-400 font-medium">
                            {MOCK_CUSTOMER_RATINGS[selectedManager.managerId].adjustedAvgRating}⭐
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Rate:</span>
                          <span className="text-white font-medium">
                            {MOCK_CUSTOMER_RATINGS[selectedManager.managerId].responseRate}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI-Generated Insights */}
                <Card className="bg-blue-900/20 border border-blue-600/20">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      AI-Generated Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Regional vendor GPE performance improved 2.3% week-over-week</li>
                      <li>• HVAC vendors showing 8% better efficiency than appliance repair vendors</li>
                      <li>• Customer rating bias adjustment added +0.2 stars to regional average</li>
                      <li>• High-volume vendors consistently achieve better GPE ratios</li>
                      <li>• Response time optimization across vendors could improve regional GPE by 1.8%</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="bg-green-900/20 border border-green-600/20">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Focus on appliance repair efficiency to match HVAC performance</li>
                      <li>• Implement proactive customer follow-up to increase rating response rates</li>
                      <li>• Review technician training for jobs with {">"} 110% GPE ratio</li>
                      <li>• Consider technician self-rating insights for performance coaching</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Report via AI Agent
            </Button>
            <Button variant="outline" onClick={() => setShowReportModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Streaming Interaction Modal */}
      <Dialog open={showStreamingModal} onOpenChange={setShowStreamingModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Real-time Interaction
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Interaction Type</label>
                <Select value={newInteraction.type} onValueChange={(value) => setNewInteraction({...newInteraction, type: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="message">General Message</SelectItem>
                    <SelectItem value="report">Weekly Report</SelectItem>
                    <SelectItem value="alert">Performance Alert</SelectItem>
                    <SelectItem value="feedback">Feedback Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Priority</label>
                <Select value={newInteraction.priority} onValueChange={(value) => setNewInteraction({...newInteraction, priority: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Message Content</label>
              <Textarea 
                value={newInteraction.content}
                onChange={(e) => setNewInteraction({...newInteraction, content: e.target.value})}
                placeholder="Enter your message content..."
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${streamingConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm text-gray-400">
                  {streamingConnected ? 'Streaming Connected' : 'Streaming Disconnected'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowStreamingModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (newInteraction.content.trim()) {
                      sendInteractionMutation.mutate({
                        ...newInteraction,
                        managerId: 'broadcast',
                        managerName: 'All Managers',
                        agentId: 27,
                        requiresResponse: newInteraction.type === 'feedback'
                      });
                    }
                  }}
                  disabled={!newInteraction.content.trim() || !streamingConnected || sendInteractionMutation.isPending}
                >
                  {sendInteractionMutation.isPending ? (
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Interaction
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Interaction Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule Future Interaction
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Interaction Type</label>
                <Select value={newInteraction.type} onValueChange={(value) => setNewInteraction({...newInteraction, type: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="message">General Message</SelectItem>
                    <SelectItem value="report">Weekly Report</SelectItem>
                    <SelectItem value="alert">Performance Alert</SelectItem>
                    <SelectItem value="feedback">Feedback Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Schedule For</label>
                <Input 
                  type="datetime-local"
                  value={newInteraction.scheduledFor}
                  onChange={(e) => setNewInteraction({...newInteraction, scheduledFor: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Message Content</label>
              <Textarea 
                value={newInteraction.content}
                onChange={(e) => setNewInteraction({...newInteraction, content: e.target.value})}
                placeholder="Enter your scheduled message content..."
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                This interaction will be delivered at the scheduled time to all connected area managers.
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (newInteraction.content.trim() && newInteraction.scheduledFor) {
                      scheduleInteractionMutation.mutate({
                        ...newInteraction,
                        managerId: 'broadcast',
                        managerName: 'All Managers',
                        agentId: 27,
                        requiresResponse: newInteraction.type === 'feedback'
                      });
                    }
                  }}
                  disabled={!newInteraction.content.trim() || !newInteraction.scheduledFor || scheduleInteractionMutation.isPending}
                >
                  {scheduleInteractionMutation.isPending ? (
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Calendar className="w-4 h-4 mr-2" />
                  )}
                  Schedule Interaction
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* System Configuration Modal */}
      <Dialog open={showSystemConfigModal} onOpenChange={setShowSystemConfigModal}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              AHS System Configuration
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* AI Agent Configuration */}
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">AI Agent Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Default Response Time</label>
                    <Select defaultValue="2min">
                      <SelectTrigger className="bg-gray-600 border-gray-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-600 border-gray-500">
                        <SelectItem value="30sec">30 seconds</SelectItem>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="2min">2 minutes</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Auto-Approval Threshold</label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-gray-600 border-gray-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-600 border-gray-500">
                        <SelectItem value="low">Low Priority Only</SelectItem>
                        <SelectItem value="medium">Low & Medium Priority</SelectItem>
                        <SelectItem value="high">All Except Critical</SelectItem>
                        <SelectItem value="manual">Manual Review Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="proactive-alerts" className="rounded" defaultChecked />
                  <label htmlFor="proactive-alerts" className="text-sm text-gray-300">
                    Enable proactive performance alerts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="weekend-reports" className="rounded" defaultChecked />
                  <label htmlFor="weekend-reports" className="text-sm text-gray-300">
                    Generate weekend summary reports
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="outline" onClick={() => setShowSystemConfigModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AhsAreaManagerSystem;