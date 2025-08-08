import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { 
  ArrowLeft, 
  Zap, 
  MessageSquare, 
  Wrench, 
  Clock, 
  Settings, 
  Phone, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Package, 
  TrendingUp,
  User,
  Target,
  Search,
  Filter,
  Shield,
  DollarSign,
  Truck,
  FileText,
  Database,
  BarChart3,
  Activity,
  Bell,
  Eye,
  Heart,
  Brain,
  Gauge,
  Settings2,
  Building2,
  Award,
  Users,
  Calculator,
  Home,
  History,
  Leaf,
  Beaker,
  Video,
  RefreshCw,
  GraduationCap,
  BookOpen,
  Camera,
  Bot,
  CreditCard
} from 'lucide-react';

interface MagikButtonUseCase {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  aiAgents: string[];
  technicianInput: string;
  aiResponse: string;
  businessImpact: string;
  frequency: 'High' | 'Medium' | 'Low';
  dailyTriggers: number;
  hourlyPeak: number;
  successRate: number;
  avgResponseTime: string;
  trendDirection: 'up' | 'down' | 'stable';
}

// Generate performance metrics for use cases
const generatePerformanceMetrics = (baseDaily: number, frequency: 'High' | 'Medium' | 'Low') => {
  const multiplier = frequency === 'High' ? 1.2 : frequency === 'Medium' ? 0.8 : 0.4;
  const dailyTriggers = Math.round(baseDaily * multiplier * (0.8 + Math.random() * 0.4));
  return {
    dailyTriggers,
    hourlyPeak: Math.round(dailyTriggers * (0.15 + Math.random() * 0.1)),
    successRate: Math.round(85 + Math.random() * 12),
    avgResponseTime: `${(0.5 + Math.random() * 2).toFixed(1)}s`,
    trendDirection: (['up', 'down', 'stable'] as const)[Math.floor(Math.random() * 3)]
  };
};

const useCases: MagikButtonUseCase[] = [
  // Service Delivery & Customer Experience (1-15)
  {
    id: '1',
    category: 'Service Delivery',
    title: 'Customer wants to add more work',
    description: 'AI instantly calculates pricing, checks parts availability, updates schedule',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Parts Prediction Engine', 'Pricing Intelligence', 'Customer Communication Hub'],
    technicianInput: '"Customer wants to add HVAC duct cleaning to current water heater repair"',
    aiResponse: 'Added $285 duct cleaning service. Parts available. Extended appointment by 2 hours. Customer approved via SMS.',
    businessImpact: '+$285 upsell revenue, 98% customer satisfaction',
    frequency: 'High',
    ...generatePerformanceMetrics(45, 'High')
  },
  {
    id: '2',
    category: 'Service Delivery',
    title: "Customer isn't happy with diagnosis",
    description: 'AI connects to Quality Assurance Inspector for second opinion and escalation',
    icon: <AlertTriangle className="w-4 h-4" />,
    aiAgents: ['Quality Assurance Inspector', 'Customer Communication Hub', 'HVAC Diagnostics AI'],
    technicianInput: '"Customer disagrees with AC compressor replacement recommendation"',
    aiResponse: 'Senior tech John M. dispatched for second opinion. Customer service called to explain warranty. Diagnostic photos reviewed.',
    businessImpact: 'Retained $1,850 job, improved customer trust',
    frequency: 'Medium',
    ...generatePerformanceMetrics(18, 'Medium')
  },
  {
    id: '3',
    category: 'Service Delivery',
    title: 'Need to reschedule appointment',
    description: 'AI automatically finds optimal replacement slots and contacts customer',
    icon: <Calendar className="w-4 h-4" />,
    aiAgents: ['Advanced Scheduling Agent', 'Customer Communication Hub', 'Route Optimization Engine'],
    technicianInput: '"Emergency call came up, need to reschedule 2 PM appointment"',
    aiResponse: 'Found 3 alternative slots. Customer chose tomorrow 10 AM. Route optimized. All parties notified.',
    businessImpact: 'Zero revenue loss, maintained customer satisfaction',
    frequency: 'High',
    ...generatePerformanceMetrics(38, 'High')
  },
  {
    id: '4',
    category: 'Service Delivery',
    title: 'Customer has questions about warranty',
    description: 'AI retrieves complete warranty history and generates plain-English explanations',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Warranty Management System', 'Quality Assurance Inspector'],
    technicianInput: '"Customer asking about water heater warranty coverage for replacement parts"',
    aiResponse: 'Warranty covers parts until March 2026. Labor included for 6 months. Claim submitted automatically. Customer explanation sent.',
    businessImpact: 'Avoided $340 warranty dispute, improved satisfaction',
    frequency: 'Medium',
    ...generatePerformanceMetrics(22, 'Medium')
  },
  {
    id: '5',
    category: 'Service Delivery',
    title: 'Repair will take longer than expected',
    description: 'AI notifies customer and adjusts technician schedule automatically',
    icon: <Clock className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Advanced Scheduling Agent', 'Route Optimization Engine'],
    technicianInput: '"HVAC repair more complex, need 3 additional hours"',
    aiResponse: 'Customer notified of delay. Next appointment moved to tomorrow. Route reoptimized. Overtime approved.',
    businessImpact: 'Maintained customer trust, prevented schedule cascade',
    frequency: 'Medium',
    ...generatePerformanceMetrics(25, 'Medium')
  },
  {
    id: '6',
    category: 'Service Delivery',
    title: 'Customer wants different payment method',
    description: 'AI processes payment changes securely and updates billing records',
    icon: <DollarSign className="w-4 h-4" />,
    aiAgents: ['Payment Processing System', 'Customer Communication Hub', 'Financial Intelligence Agent'],
    technicianInput: '"Customer wants to split payment between card and check"',
    aiResponse: 'Split payment processed: $450 card, $280 check. Receipts sent. Accounting updated automatically.',
    businessImpact: 'Flexible payment options, reduced collection issues',
    frequency: 'Low',
    ...generatePerformanceMetrics(12, 'Low')
  },
  {
    id: '7',
    category: 'Service Delivery',
    title: 'Need approval for additional diagnostic time',
    description: 'AI escalates to supervisor with cost justification and customer communication',
    icon: <CheckCircle className="w-4 h-4" />,
    aiAgents: ['Quality Assurance Inspector', 'Customer Communication Hub', 'Advanced Scheduling Agent'],
    technicianInput: '"Need 2 more hours for complex electrical diagnosis"',
    aiResponse: 'Supervisor approved additional time. Customer informed of $180 diagnostic fee. Extended appointment confirmed.',
    businessImpact: 'Proper diagnosis completed, avoided return visit',
    frequency: 'Medium',
    ...generatePerformanceMetrics(16, 'Medium')
  },
  {
    id: '8',
    category: 'Service Delivery',
    title: 'Customer asking about other services',
    description: 'AI generates personalized recommendations and schedules follow-up',
    icon: <Star className="w-4 h-4" />,
    aiAgents: ['D2C Marketing Intelligence', 'Customer Communication Hub', 'Advanced Scheduling Agent'],
    technicianInput: '"Customer interested in whole-home maintenance plan"',
    aiResponse: 'Maintenance plan quoted at $89/month. Benefits explained. Follow-up scheduled for next week. Marketing enrolled.',
    businessImpact: '+$1,068 annual recurring revenue potential',
    frequency: 'High',
    ...generatePerformanceMetrics(52, 'High')
  },
  {
    id: '9',
    category: 'Service Delivery',
    title: 'Job needs follow-up visit',
    description: 'AI schedules return visit with proper documentation and reminders',
    icon: <Calendar className="w-4 h-4" />,
    aiAgents: ['Advanced Scheduling Agent', 'Customer Communication Hub', 'Quality Assurance Inspector'],
    technicianInput: '"Need to return in 48 hours to check HVAC system performance"',
    aiResponse: 'Follow-up scheduled for Thursday 2 PM. Customer confirmed. Reminder set. System monitoring activated.',
    businessImpact: 'Ensured repair quality, prevented callbacks',
    frequency: 'Medium',
    ...generatePerformanceMetrics(19, 'Medium')
  },
  {
    id: '10',
    category: 'Service Delivery',
    title: 'Customer wants to speak to manager',
    description: 'AI immediately notifies supervisor with full context and escalation',
    icon: <Phone className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Quality Assurance Inspector', 'Emergency Response Coordinator'],
    technicianInput: '"Customer unhappy with service time, requesting manager"',
    aiResponse: 'Manager Sarah called customer directly. Service credit applied. Satisfaction survey scheduled. Issue documented.',
    businessImpact: 'Retained customer relationship, prevented negative review',
    frequency: 'Low',
    ...generatePerformanceMetrics(8, 'Low')
  },
  
  // Parts Management (11-25)
  {
    id: '11',
    category: 'Parts Management',
    title: 'This part is defective/wrong',
    description: 'AI initiates return process and orders replacement with expedited shipping',
    icon: <Package className="w-4 h-4" />,
    aiAgents: ['Parts Prediction Engine', 'Parts Ordering Specialist', 'Customer Communication Hub'],
    technicianInput: '"Water heater thermostat DOA, need replacement ASAP"',
    aiResponse: 'Return initiated. Expedited replacement ordered from local supplier. Customer updated on 2-hour delivery timeline.',
    businessImpact: 'Same-day completion, avoided rescheduling cost',
    frequency: 'Medium',
    ...generatePerformanceMetrics(28, 'Medium')
  },
  {
    id: '12',
    category: 'Parts Management',
    title: 'Need to check part availability',
    description: 'AI searches all inventory locations and coordinates transfers',
    icon: <Search className="w-4 h-4" />,
    aiAgents: ['Parts Prediction Engine', 'Inventory Management Assistant', 'Route Optimization Engine'],
    technicianInput: '"Need 3-ton AC capacitor for emergency repair"',
    aiResponse: 'Found at warehouse 12 min away. Reserved for pickup. Also available on truck 2 blocks away - contacted tech.',
    businessImpact: 'Reduced travel time by 15 minutes, faster repair',
    frequency: 'High',
    ...generatePerformanceMetrics(67, 'High')
  },
  {
    id: '13',
    category: 'Parts Management',
    title: 'Customer wants upgraded part',
    description: 'AI calculates pricing difference and processes upgrade instantly',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Parts Prediction Engine', 'Pricing Intelligence', 'Customer Communication Hub'],
    technicianInput: '"Customer wants premium efficiency water heater instead of standard"',
    aiResponse: 'Upgrade price: $340 additional. Energy savings calculated. Customer approved. Premium unit ordered for delivery.',
    businessImpact: '+$340 upgrade revenue, improved customer satisfaction',
    frequency: 'Medium',
    ...generatePerformanceMetrics(19, 'Medium')
  },
  {
    id: '14',
    category: 'Parts Management',
    title: 'Need emergency parts delivery',
    description: 'AI coordinates fastest delivery method and tracks shipment',
    icon: <Truck className="w-4 h-4" />,
    aiAgents: ['Parts Ordering Specialist', 'Route Optimization Engine', 'Emergency Response Coordinator'],
    technicianInput: '"Critical HVAC compressor failed, need emergency replacement"',
    aiResponse: 'Emergency courier dispatched. Part arrives in 90 minutes. Customer notified. Priority repair status activated.',
    businessImpact: 'Prevented $2,400 emergency callback, customer retention',
    frequency: 'Low',
    ...generatePerformanceMetrics(6, 'Low')
  },
  {
    id: '15',
    category: 'Parts Management',
    title: 'Parts warranty claim needed',
    description: 'AI processes warranty claim and coordinates replacement',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Parts Prediction Engine', 'Warranty Management System', 'Customer Communication Hub'],
    technicianInput: '"AC condenser fan motor failed under warranty"',
    aiResponse: 'Warranty claim submitted. Replacement authorized. New motor delivered tomorrow. Customer credit processed.',
    businessImpact: 'Saved $285 part cost, maintained customer trust',
    frequency: 'Low',
    ...generatePerformanceMetrics(11, 'Low')
  },
  
  // Scheduling & Routing (16-30)
  {
    id: '16',
    category: 'Scheduling',
    title: 'Running behind schedule',
    description: 'AI recalculates route and notifies affected customers automatically',
    icon: <Clock className="w-4 h-4" />,
    aiAgents: ['Route Optimization Engine', 'Customer Communication Hub', 'Advanced Scheduling Agent'],
    technicianInput: '"Traffic jam, 30 minutes behind schedule"',
    aiResponse: 'Notified 3 affected customers with new arrival times. Optimized remaining route. Provided alternate tech options.',
    businessImpact: 'Maintained 95% on-time performance, customer retention',
    frequency: 'High',
    ...generatePerformanceMetrics(89, 'High')
  },
  {
    id: '17',
    category: 'Scheduling',
    title: 'Available for overtime/emergency calls',
    description: 'AI matches technician with urgent requests in their area',
    icon: <Target className="w-4 h-4" />,
    aiAgents: ['Emergency Response Coordinator', 'Route Optimization Engine', 'Advanced Scheduling Agent'],
    technicianInput: '"Finished early, available for emergency calls until 8 PM"',
    aiResponse: 'Matched with 2 emergency HVAC calls within 5 miles. Overtime approved. Route optimized for $420 additional revenue.',
    businessImpact: '+$420 emergency revenue, improved response times',
    frequency: 'Medium',
    ...generatePerformanceMetrics(34, 'Medium')
  },
  {
    id: '18',
    category: 'Scheduling',
    title: 'Need to take lunch break',
    description: 'AI optimizes schedule around break and notifies relevant parties',
    icon: <User className="w-4 h-4" />,
    aiAgents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Customer Communication Hub'],
    technicianInput: '"Need 45-minute lunch break before next appointment"',
    aiResponse: 'Break scheduled 12:30-1:15 PM. Next appointment notified of arrival time. Route optimized for efficiency.',
    businessImpact: 'Maintained technician wellness, schedule compliance',
    frequency: 'High',
    ...generatePerformanceMetrics(156, 'High')
  },
  {
    id: '19',
    category: 'Scheduling',
    title: 'Weather affecting travel',
    description: 'AI adjusts routes for weather conditions and notifies customers',
    icon: <AlertTriangle className="w-4 h-4" />,
    aiAgents: ['Route Optimization Engine', 'Customer Communication Hub', 'Emergency Response Coordinator'],
    technicianInput: '"Heavy rain, roads flooded, will be delayed"',
    aiResponse: 'Weather delay alert sent to 4 customers. Alternative routes calculated. Safety protocols activated.',
    businessImpact: 'Prevented safety incidents, maintained customer communication',
    frequency: 'Low',
    ...generatePerformanceMetrics(7, 'Low')
  },
  {
    id: '20',
    category: 'Scheduling',
    title: 'Request specific appointment time',
    description: 'AI finds optimal scheduling match and coordinates changes',
    icon: <Calendar className="w-4 h-4" />,
    aiAgents: ['Advanced Scheduling Agent', 'Customer Communication Hub', 'Route Optimization Engine'],
    technicianInput: '"Customer needs appointment moved to morning slot"',
    aiResponse: 'Morning slot found for tomorrow 9 AM. Customer confirmed. Route rebalanced. All parties updated.',
    businessImpact: 'Improved customer satisfaction, flexible service',
    frequency: 'Medium',
    ...generatePerformanceMetrics(41, 'Medium')
  },
  
  // Technical Support (21-35)
  {
    id: '21',
    category: 'Technical Support',
    title: 'Never seen this equipment before',
    description: 'AI provides instant manuals and connects to senior technicians',
    icon: <Wrench className="w-4 h-4" />,
    aiAgents: ['HVAC System Diagnostics AI', 'Technician Training Agent', 'Technical Knowledge Base'],
    technicianInput: '"Lennox XC25 heat pump, unfamiliar with diagnostics"',
    aiResponse: 'Downloaded service manual. Video tutorial sent. Senior tech Mike available for virtual assist. Diagnostic checklist provided.',
    businessImpact: 'Completed complex repair, technician skill development',
    frequency: 'Medium',
    ...generatePerformanceMetrics(23, 'Medium')
  },
  {
    id: '22',
    category: 'Technical Support',
    title: 'Not sure about safety procedures',
    description: 'AI provides step-by-step safety protocols and escalates if needed',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Electrical Safety Compliance Agent', 'Safety Protocol Manager', 'Emergency Response Coordinator'],
    technicianInput: '"220V electrical panel work, need safety confirmation"',
    aiResponse: 'Lockout/tagout checklist sent. Safety supervisor notified. Required PPE confirmed. Voltage testing protocol provided.',
    businessImpact: 'Zero safety incidents, regulatory compliance',
    frequency: 'Low',
    ...generatePerformanceMetrics(9, 'Low')
  },
  {
    id: '23',
    category: 'Technical Support',
    title: 'Need diagnostic software help',
    description: 'AI provides step-by-step diagnostic guidance and troubleshooting',
    icon: <Database className="w-4 h-4" />,
    aiAgents: ['HVAC System Diagnostics AI', 'Technical Knowledge Base', 'Quality Assurance Inspector'],
    technicianInput: '"Error code E4 on Carrier system, need diagnosis help"',
    aiResponse: 'E4 = pressure switch fault. Diagnostic steps provided. Common causes listed. Repair procedure downloaded.',
    businessImpact: 'Faster diagnosis, reduced callback risk',
    frequency: 'High',
    ...generatePerformanceMetrics(78, 'High')
  },
  {
    id: '24',
    category: 'Technical Support',
    title: 'Need senior tech consultation',
    description: 'AI connects to available senior technician for virtual assistance',
    icon: <Phone className="w-4 h-4" />,
    aiAgents: ['Technician Training Agent', 'Quality Assurance Inspector', 'Technical Knowledge Base'],
    technicianInput: '"Complex refrigeration issue, need senior tech guidance"',
    aiResponse: 'Senior tech Lisa connected via video call. Diagnostic photos shared. Repair guidance provided in real-time.',
    businessImpact: 'Prevented return visit, knowledge transfer achieved',
    frequency: 'Medium',
    ...generatePerformanceMetrics(15, 'Medium')
  },
  {
    id: '25',
    category: 'Technical Support',
    title: 'Tool calibration needed',
    description: 'AI schedules tool calibration and provides temporary alternatives',
    icon: <Settings2 className="w-4 h-4" />,
    aiAgents: ['Quality Assurance Inspector', 'Parts Prediction Engine', 'Advanced Scheduling Agent'],
    technicianInput: '"Multimeter readings seem off, may need calibration"',
    aiResponse: 'Calibration scheduled for tomorrow. Backup meter assigned. Calibration reminder set. Equipment tracking updated.',
    businessImpact: 'Maintained measurement accuracy, prevented errors',
    frequency: 'Low',
    ...generatePerformanceMetrics(4, 'Low')
  },
  
  // Administrative & Communication (26-40)
  {
    id: '26',
    category: 'Administrative',
    title: 'Need to update availability',
    description: 'AI updates schedule preferences and coordinates optimal assignments',
    icon: <User className="w-4 h-4" />,
    aiAgents: ['Advanced Scheduling Agent', 'Technician Interaction Hub', 'Route Optimization Engine'],
    technicianInput: '"Need Wednesdays off for next 3 weeks for training"',
    aiResponse: 'Schedule updated. Coverage arranged. Training enrolled. Route efficiency maintained for other technicians.',
    businessImpact: 'Workforce flexibility, skill development investment',
    frequency: 'Low',
    ...generatePerformanceMetrics(5, 'Low')
  },
  {
    id: '27',
    category: 'Administrative',
    title: 'Time sheet correction needed',
    description: 'AI processes time corrections and updates payroll systems',
    icon: <Clock className="w-4 h-4" />,
    aiAgents: ['HR Management System', 'Payroll Processing Agent', 'Technician Interaction Hub'],
    technicianInput: '"Forgot to clock in this morning, started at 7:30 AM"',
    aiResponse: 'Time correction submitted. Payroll updated. Supervisor notified. Reminder set for future clock-ins.',
    businessImpact: 'Accurate payroll, reduced administrative burden',
    frequency: 'Medium',
    ...generatePerformanceMetrics(31, 'Medium')
  },
  {
    id: '28',
    category: 'Administrative',
    title: 'Expense report submission',
    description: 'AI processes expense photos and submits reports automatically',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Financial Intelligence Agent', 'Document Processing System', 'Technician Interaction Hub'],
    technicianInput: '"Need to submit gas receipts and tool purchase"',
    aiResponse: 'Photos processed. Expenses categorized: $47 fuel, $89 tools. Report submitted. Reimbursement approved.',
    businessImpact: 'Streamlined expense processing, faster reimbursement',
    frequency: 'Medium',
    ...generatePerformanceMetrics(28, 'Medium')
  },
  {
    id: '29',
    category: 'Administrative',
    title: 'Request training enrollment',
    description: 'AI finds relevant training and handles enrollment process',
    icon: <Award className="w-4 h-4" />,
    aiAgents: ['Technician Training Agent', 'HR Management System', 'Advanced Scheduling Agent'],
    technicianInput: '"Want to take EPA refrigeration certification course"',
    aiResponse: 'Course found starting next month. Enrolled successfully. Study materials sent. Schedule adjusted for class time.',
    businessImpact: 'Skill advancement, certification compliance',
    frequency: 'Low',
    ...generatePerformanceMetrics(3, 'Low')
  },
  {
    id: '30',
    category: 'Administrative',
    title: 'Update emergency contact info',
    description: 'AI securely updates personal information across all systems',
    icon: <User className="w-4 h-4" />,
    aiAgents: ['HR Management System', 'Security Management Agent', 'Database Management System'],
    technicianInput: '"Need to update emergency contact to new spouse number"',
    aiResponse: 'Contact information updated securely. All systems synchronized. Verification confirmation sent to new contact.',
    businessImpact: 'Current emergency information, compliance maintained',
    frequency: 'Low',
    ...generatePerformanceMetrics(2, 'Low')
  },
  
  // Customer Communication (31-45)
  {
    id: '31',
    category: 'Customer Communication',
    title: 'Customer wants text updates',
    description: 'AI sets up automated SMS notifications for job progress',
    icon: <MessageSquare className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'SMS Automation System', 'Advanced Scheduling Agent'],
    technicianInput: '"Customer prefers text updates about arrival and completion"',
    aiResponse: 'SMS notifications enabled. Arrival text sent. Progress updates scheduled. Completion confirmation automated.',
    businessImpact: 'Improved communication, higher satisfaction scores',
    frequency: 'High',
    ...generatePerformanceMetrics(92, 'High')
  },
  {
    id: '32',
    category: 'Customer Communication',
    title: 'Language barrier issue',
    description: 'AI provides translation services and cultural communication guidance',
    icon: <MessageSquare className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Translation Service Agent', 'Cultural Competency System'],
    technicianInput: '"Customer speaks Spanish only, need translation help"',
    aiResponse: 'Spanish translator connected. Key phrases provided. Cultural preferences noted. Bilingual follow-up scheduled.',
    businessImpact: 'Inclusive service, expanded customer base',
    frequency: 'Low',
    ...generatePerformanceMetrics(8, 'Low')
  },
  {
    id: '33',
    category: 'Customer Communication',
    title: 'Customer complaint escalation',
    description: 'AI documents complaint and initiates resolution process',
    icon: <AlertTriangle className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Quality Assurance Inspector', 'Customer Experience Manager'],
    technicianInput: '"Customer upset about previous service, wants to file complaint"',
    aiResponse: 'Complaint documented. Manager Sarah notified. Service credit authorized. Follow-up appointment scheduled.',
    businessImpact: 'Issue resolution, customer retention',
    frequency: 'Low',
    ...generatePerformanceMetrics(12, 'Low')
  },
  {
    id: '34',
    category: 'Customer Communication',
    title: 'Review request follow-up',
    description: 'AI manages review requests and feedback collection',
    icon: <Star className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Review Management System', 'D2C Marketing Intelligence'],
    technicianInput: '"Great service call, customer mentioned leaving review"',
    aiResponse: 'Review request sent via preferred method. Links provided for Google/Yelp. Thank you message automated.',
    businessImpact: 'Increased positive reviews, marketing boost',
    frequency: 'High',
    ...generatePerformanceMetrics(67, 'High')
  },
  {
    id: '35',
    category: 'Customer Communication',
    title: 'Pet safety considerations',
    description: 'AI provides pet safety protocols and customer communication',
    icon: <Heart className="w-4 h-4" />,
    aiAgents: ['Safety Protocol Manager', 'Customer Communication Hub', 'Service Quality Assurance'],
    technicianInput: '"Customer has large dog, need safety protocols"',
    aiResponse: 'Pet safety checklist provided. Customer contacted about restraint. Safety equipment confirmed. Protocols documented.',
    businessImpact: 'Safety compliance, customer appreciation',
    frequency: 'Medium',
    ...generatePerformanceMetrics(24, 'Medium')
  },
  
  // Performance Optimization (36-50)
  {
    id: '36',
    category: 'Performance Optimization',
    title: 'Daily performance summary',
    description: 'AI generates personalized performance insights and improvement suggestions',
    icon: <BarChart3 className="w-4 h-4" />,
    aiAgents: ['Performance Analytics AI', 'Technician Development Agent', 'Goal Tracking System'],
    technicianInput: '"How did I perform today compared to goals?"',
    aiResponse: '6 jobs completed (goal: 5). $1,847 revenue (goal: $1,600). Customer rating: 4.9/5. Top performer today!',
    businessImpact: 'Performance awareness, goal achievement motivation',
    frequency: 'High',
    ...generatePerformanceMetrics(180, 'High')
  },
  {
    id: '37',
    category: 'Performance Optimization',
    title: 'Skill development recommendation',
    description: 'AI identifies skill gaps and suggests training opportunities',
    icon: <Brain className="w-4 h-4" />,
    aiAgents: ['Technician Training Agent', 'Performance Analytics AI', 'Career Development System'],
    technicianInput: '"Want to improve my electrical diagnostic skills"',
    aiResponse: 'Electrical diagnostics course recommended. 3 online modules available. Practice scenarios provided. Mentor assigned.',
    businessImpact: 'Skill advancement, career progression',
    frequency: 'Medium',
    ...generatePerformanceMetrics(16, 'Medium')
  },
  {
    id: '38',
    category: 'Performance Optimization',
    title: 'Route efficiency feedback',
    description: 'AI provides route optimization suggestions and time-saving tips',
    icon: <MapPin className="w-4 h-4" />,
    aiAgents: ['Route Optimization Engine', 'Performance Analytics AI', 'Efficiency Coaching System'],
    technicianInput: '"Spent too much time driving today, any suggestions?"',
    aiResponse: 'Route analysis: 23 min saved with alternative path. Traffic patterns shared. Optimal timing recommendations provided.',
    businessImpact: 'Improved efficiency, reduced fuel costs',
    frequency: 'High',
    ...generatePerformanceMetrics(145, 'High')
  },
  {
    id: '39',
    category: 'Performance Optimization',
    title: 'Customer satisfaction insights',
    description: 'AI analyzes feedback patterns and provides improvement recommendations',
    icon: <Eye className="w-4 h-4" />,
    aiAgents: ['Customer Satisfaction Analyzer', 'Performance Analytics AI', 'Service Quality Coach'],
    technicianInput: '"Any feedback from recent customer surveys?"',
    aiResponse: 'Last 10 customers: 96% satisfaction. Praised communication skills. Suggested: faster arrival notifications.',
    businessImpact: 'Service quality improvement, customer loyalty',
    frequency: 'Medium',
    ...generatePerformanceMetrics(47, 'Medium')
  },
  {
    id: '40',
    category: 'Performance Optimization',
    title: 'Revenue optimization tips',
    description: 'AI identifies upselling opportunities and revenue enhancement strategies',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Revenue Optimization AI', 'Sales Coaching System', 'Customer Analytics Engine'],
    technicianInput: '"How can I increase my daily revenue?"',
    aiResponse: 'Opportunities identified: maintenance plans (+$89/customer), premium parts (+15% margin), efficiency upgrades.',
    businessImpact: 'Increased earnings, business growth',
    frequency: 'High',
    ...generatePerformanceMetrics(121, 'High')
  },
  {
    id: '41',
    category: 'Emergency Response',
    title: 'Emergency dispatch received',
    description: 'AI coordinates emergency response and optimizes route priority',
    icon: <Bell className="w-4 h-4" />,
    aiAgents: ['Emergency Response Coordinator', 'Route Optimization Engine', 'Customer Communication Hub'],
    technicianInput: '"Emergency call: no heat, elderly customer"',
    aiResponse: 'Priority status activated. Route redirected. Customer notified of 18-minute ETA. Emergency supplies confirmed.',
    businessImpact: 'Rapid emergency response, customer safety',
    frequency: 'Medium',
    ...generatePerformanceMetrics(29, 'Medium')
  },
  {
    id: '42',
    category: 'Quality Assurance',
    title: 'Photo documentation required',
    description: 'AI guides photo documentation and ensures quality standards',
    icon: <Eye className="w-4 h-4" />,
    aiAgents: ['Quality Assurance Inspector', 'Documentation System', 'Compliance Monitor'],
    technicianInput: '"Need to document electrical panel work for compliance"',
    aiResponse: 'Photo checklist provided: before/after, wire connections, labeling. Compliance requirements met. Documentation complete.',
    businessImpact: 'Regulatory compliance, quality standards',
    frequency: 'High',
    ...generatePerformanceMetrics(156, 'High')
  },
  {
    id: '43',
    category: 'Inventory Management',
    title: 'Stock level alert',
    description: 'AI monitors truck inventory and suggests restocking priorities',
    icon: <Package className="w-4 h-4" />,
    aiAgents: ['Inventory Management Assistant', 'Parts Prediction Engine', 'Supply Chain Optimizer'],
    technicianInput: '"Running low on common HVAC parts"',
    aiResponse: 'Restock alert sent. Priority items: capacitors, contactors, filters. Warehouse pickup scheduled for tomorrow.',
    businessImpact: 'Prevented stockouts, maintained efficiency',
    frequency: 'Medium',
    ...generatePerformanceMetrics(38, 'Medium')
  },
  {
    id: '44',
    category: 'Safety Compliance',
    title: 'Safety incident reporting',
    description: 'AI guides incident documentation and initiates safety protocols',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Safety Compliance Agent', 'Incident Management System', 'HR Management System'],
    technicianInput: '"Minor cut from sheet metal, need to report"',
    aiResponse: 'Incident form completed. First aid confirmed. Safety supervisor notified. Medical tracking initiated if needed.',
    businessImpact: 'Safety compliance, injury prevention tracking',
    frequency: 'Low',
    ...generatePerformanceMetrics(4, 'Low')
  },
  {
    id: '45',
    category: 'Vehicle Maintenance',
    title: 'Vehicle maintenance reminder',
    description: 'AI schedules vehicle maintenance and coordinates service appointments',
    icon: <Truck className="w-4 h-4" />,
    aiAgents: ['Fleet Management System', 'Advanced Scheduling Agent', 'Maintenance Coordinator'],
    technicianInput: '"Truck is due for oil change next week"',
    aiResponse: 'Maintenance scheduled for Monday 7 AM. Loaner vehicle arranged. Route assignments transferred. Service reminder set.',
    businessImpact: 'Vehicle reliability, operational continuity',
    frequency: 'Low',
    ...generatePerformanceMetrics(6, 'Low')
  },
  {
    id: '46',
    category: 'Customer Education',
    title: 'System maintenance education',
    description: 'AI provides customer education materials and follow-up resources',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Customer Education System', 'Technical Knowledge Base', 'Customer Communication Hub'],
    technicianInput: '"Customer wants to learn about HVAC filter maintenance"',
    aiResponse: 'Maintenance guide sent via email. Video tutorial provided. Reminder service set up. Filter subscription offered.',
    businessImpact: 'Customer empowerment, service value enhancement',
    frequency: 'High',
    ...generatePerformanceMetrics(73, 'High')
  },
  {
    id: '47',
    category: 'Energy Efficiency',
    title: 'Energy audit recommendation',
    description: 'AI identifies energy efficiency opportunities and calculates savings',
    icon: <Gauge className="w-4 h-4" />,
    aiAgents: ['Energy Efficiency Analyzer', 'Cost Savings Calculator', 'Customer Communication Hub'],
    technicianInput: '"Customer asking about energy-saving options"',
    aiResponse: 'Energy audit scheduled. Potential savings: $340/year. Rebate programs identified. Upgrade options provided.',
    businessImpact: 'Additional service revenue, customer value',
    frequency: 'Medium',
    ...generatePerformanceMetrics(33, 'Medium')
  },
  {
    id: '48',
    category: 'Team Coordination',
    title: 'Backup technician needed',
    description: 'AI coordinates with nearby technicians for assistance or backup',
    icon: <Users className="w-4 h-4" />,
    aiAgents: ['Team Coordination System', 'Route Optimization Engine', 'Advanced Scheduling Agent'],
    technicianInput: '"Need backup for complex 2-person job"',
    aiResponse: 'Backup tech Mike available in 25 minutes. Skills match confirmed. Customer notified. Team coordination activated.',
    businessImpact: 'Efficient teamwork, complex problem resolution',
    frequency: 'Low',
    ...generatePerformanceMetrics(11, 'Low')
  },
  {
    id: '49',
    category: 'Knowledge Sharing',
    title: 'Share solution with team',
    description: 'AI documents and shares successful solutions across the technician network',
    icon: <Brain className="w-4 h-4" />,
    aiAgents: ['Knowledge Management System', 'Technical Documentation Agent', 'Team Learning Platform'],
    technicianInput: '"Found great solution for recurring Goodman unit issue"',
    aiResponse: 'Solution documented and shared. Added to technical knowledge base. Team notification sent. Recognition points awarded.',
    businessImpact: 'Knowledge sharing, team skill enhancement',
    frequency: 'Medium',
    ...generatePerformanceMetrics(21, 'Medium')
  },
  {
    id: '50',
    category: 'Business Development',
    title: 'Referral opportunity identified',
    description: 'AI captures referral opportunities and manages lead processing',
    icon: <Building2 className="w-4 h-4" />,
    aiAgents: ['Referral Management System', 'Lead Processing Agent', 'Customer Relationship Manager'],
    technicianInput: '"Customer mentioned neighbor needs HVAC work"',
    aiResponse: 'Referral captured. Neighbor contact info recorded. Marketing follow-up scheduled. Referral bonus tracking initiated.',
    businessImpact: 'Business growth, referral revenue potential',
    frequency: 'Medium',
    ...generatePerformanceMetrics(26, 'Medium')
  },

  // NEW: D2C Service Orders - Repair Estimates
  {
    id: '51',
    category: 'Customer Communication',
    title: 'Create repair estimate for customer approval',
    description: 'AI generates detailed repair estimate with parts, labor, and timeline for customer decision',
    icon: <Calculator className="w-4 h-4" />,
    aiAgents: ['Pricing & Estimation Specialist', 'Parts Prediction Engine', 'Customer Communication Hub'],
    technicianInput: '"Customer needs estimate for washing machine drum replacement - 2015 Whirlpool"',
    aiResponse: 'Generated detailed estimate: Parts $285, Labor $120, 2-hour job. Includes warranty info and payment options.',
    businessImpact: 'Improved customer decision-making, higher approval rates, replacement opportunity identification',
    frequency: 'High',
    ...generatePerformanceMetrics(78, 'High')
  },

  // NEW: Sears Protect - Appliance Identification
  {
    id: '52',
    category: 'Administrative',
    title: 'Identify all Sears Protect covered appliances',
    description: 'AI prompts technician to catalog all covered appliances during any repair visit',
    icon: <Home className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Advanced Scheduling Agent', 'Quality Assurance Inspector'],
    technicianInput: '"At Sears Protect customer for refrigerator repair"',
    aiResponse: 'Reminder: Catalog all covered appliances. Benefits customer with faster future service. Added to visit checklist.',
    businessImpact: 'Complete appliance database, improved service preparation, customer benefit explanation',
    frequency: 'Medium',
    ...generatePerformanceMetrics(45, 'Medium')
  },

  // EXPANDED USE CASES (53-92) - 40 New Cases

  // Advanced Diagnostics & Troubleshooting (53-62)
  {
    id: '53',
    category: 'Technical Support',
    title: 'Run advanced diagnostic sequence',
    description: 'AI guides technician through step-by-step diagnostic protocols with real-time analysis',
    icon: <Search className="w-4 h-4" />,
    aiAgents: ['HVAC Diagnostics AI', 'Technical Documentation Agent', 'Equipment Database'],
    technicianInput: '"Complex electrical issue on 2018 Carrier unit - multiple symptoms"',
    aiResponse: 'Initiated diagnostic sequence. Step 1: Check voltage at terminals A1-A3. Record readings. Next step will adapt based on results.',
    businessImpact: 'Accurate diagnosis, reduced callback rate, improved first-time fix',
    frequency: 'High',
    ...generatePerformanceMetrics(67, 'High')
  },
  {
    id: '54',
    category: 'Technical Support',
    title: 'Access manufacturer technical bulletins',
    description: 'AI retrieves latest technical service bulletins and recalls for specific equipment',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Technical Documentation Agent', 'Manufacturer Database', 'Quality Assurance Inspector'],
    technicianInput: '"2020 Whirlpool dishwasher - unusual noise pattern"',
    aiResponse: 'Found TSB #WP-2023-47: Known wash pump bearing issue. Recall notice active. Replacement covered under warranty.',
    businessImpact: 'Warranty coverage identification, recall compliance, accurate repairs',
    frequency: 'Medium',
    ...generatePerformanceMetrics(41, 'Medium')
  },
  {
    id: '55',
    category: 'Technical Support',
    title: 'Generate diagnostic report with photos',
    description: 'AI creates comprehensive diagnostic documentation with annotated photos',
    icon: <Camera className="w-4 h-4" />,
    aiAgents: ['Technical Documentation Agent', 'Photo Analysis AI', 'Quality Assurance Inspector'],
    technicianInput: '"Document compressor failure with thermal imaging"',
    aiResponse: 'Report generated. Thermal image annotated showing hot spots. Comparison with normal readings included. Sent to customer and file.',
    businessImpact: 'Professional documentation, warranty support, customer trust',
    frequency: 'High',
    ...generatePerformanceMetrics(52, 'High')
  },
  {
    id: '56',
    category: 'Technical Support',
    title: 'Calculate system capacity requirements',
    description: 'AI performs load calculations and efficiency analysis for system sizing',
    icon: <Calculator className="w-4 h-4" />,
    aiAgents: ['Load Calculation Engine', 'Energy Efficiency Analyzer', 'Technical Documentation Agent'],
    technicianInput: '"Customer adding 400 sq ft addition - need HVAC capacity analysis"',
    aiResponse: 'Additional 6,000 BTU required. Current system at 98% capacity. Recommend zone addition or system upgrade. Calculations attached.',
    businessImpact: 'Accurate system sizing, energy efficiency, customer satisfaction',
    frequency: 'Medium',
    ...generatePerformanceMetrics(34, 'Medium')
  },
  {
    id: '57',
    category: 'Technical Support',
    title: 'Access wiring diagrams and schematics',
    description: 'AI provides equipment-specific wiring diagrams and electrical schematics',
    icon: <Zap className="w-4 h-4" />,
    aiAgents: ['Technical Documentation Agent', 'Equipment Database', 'Safety Protocol Manager'],
    technicianInput: '"Need wiring diagram for 2019 Trane XR13 outdoor unit"',
    aiResponse: 'Wiring diagram displayed. Color-coded by voltage level. Safety warnings highlighted. Common failure points marked.',
    businessImpact: 'Safe electrical work, accurate connections, reduced errors',
    frequency: 'High',
    ...generatePerformanceMetrics(71, 'High')
  },
  {
    id: '58',
    category: 'Technical Support',
    title: 'Troubleshoot intermittent problems',
    description: 'AI guides systematic approach for hard-to-diagnose intermittent issues',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Diagnostic Pattern Analyzer', 'Historical Data Engine', 'Technical Documentation Agent'],
    technicianInput: '"AC works fine for 2 hours then shuts down - happens randomly"',
    aiResponse: 'Intermittent pattern detected. Likely thermal protection issue. Monitor temperatures at 15-min intervals. Data logger recommended.',
    businessImpact: 'Difficult problem resolution, customer satisfaction, technician expertise',
    frequency: 'Medium',
    ...generatePerformanceMetrics(29, 'Medium')
  },
  {
    id: '59',
    category: 'Technical Support',
    title: 'Verify safety compliance',
    description: 'AI checks current work against safety codes and regulations',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Safety Protocol Manager', 'Code Compliance Checker', 'Quality Assurance Inspector'],
    technicianInput: '"Installing gas line connection for water heater"',
    aiResponse: 'Code compliance verified. Required clearances met. Leak test protocol initiated. Permit documentation ready.',
    businessImpact: 'Safety compliance, liability protection, code adherence',
    frequency: 'High',
    ...generatePerformanceMetrics(58, 'High')
  },
  {
    id: '60',
    category: 'Technical Support',
    title: 'Access previous repair history',
    description: 'AI retrieves complete service history with technician notes and outcomes',
    icon: <History className="w-4 h-4" />,
    aiAgents: ['Historical Data Engine', 'Technical Documentation Agent', 'Pattern Recognition System'],
    technicianInput: '"Same unit serviced 3 times this year - what were previous issues?"',
    aiResponse: 'History shows: Jan - thermostat, Mar - capacitor, May - refrigerant leak. Pattern suggests system aging. Recommend full evaluation.',
    businessImpact: 'Informed diagnosis, pattern recognition, preventive recommendations',
    frequency: 'High',
    ...generatePerformanceMetrics(63, 'High')
  },
  {
    id: '61',
    category: 'Technical Support',
    title: 'Calculate energy efficiency ratings',
    description: 'AI performs energy analysis and provides efficiency improvement recommendations',
    icon: <Gauge className="w-4 h-4" />,
    aiAgents: ['Energy Efficiency Analyzer', 'Cost Savings Calculator', 'Environmental Impact Assessor'],
    technicianInput: '"Customer asking about energy savings from new heat pump"',
    aiResponse: 'Current SEER 8 system. New 16 SEER saves $480/year. Payback period: 6.2 years. Rebates available: $500.',
    businessImpact: 'Upgrade sales, energy savings, environmental benefits',
    frequency: 'Medium',
    ...generatePerformanceMetrics(37, 'Medium')
  },
  {
    id: '62',
    category: 'Technical Support',
    title: 'Generate maintenance recommendations',
    description: 'AI creates personalized maintenance schedule based on equipment and usage patterns',
    icon: <Clock className="w-4 h-4" />,
    aiAgents: ['Maintenance Scheduler', 'Equipment Lifecycle Analyzer', 'Customer Communication Hub'],
    technicianInput: '"Customer wants maintenance plan for 5-year-old system"',
    aiResponse: 'Maintenance plan created: Filter quarterly, coil cleaning bi-annual, refrigerant check annual. Scheduled notifications set.',
    businessImpact: 'Recurring revenue, equipment longevity, customer retention',
    frequency: 'Medium',
    ...generatePerformanceMetrics(42, 'Medium')
  },

  // Customer Experience Enhancement (63-72)
  {
    id: '63',
    category: 'Customer Communication',
    title: 'Send real-time job progress updates',
    description: 'AI provides customers with automatic progress updates and completion notifications',
    icon: <MessageSquare className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Job Progress Tracker', 'Advanced Scheduling Agent'],
    technicianInput: '"Starting repairs on water heater - 2 hour job"',
    aiResponse: 'Customer notified: Repairs begun. Estimated completion 3:30 PM. Next update in 1 hour. Customer can track progress online.',
    businessImpact: 'Customer satisfaction, transparency, reduced service calls',
    frequency: 'High',
    ...generatePerformanceMetrics(76, 'High')
  },
  {
    id: '64',
    category: 'Customer Communication',
    title: 'Explain technical issues in simple terms',
    description: 'AI translates complex technical problems into customer-friendly explanations',
    icon: <Users className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Technical Translation AI', 'Educational Content Generator'],
    technicianInput: '"Customer confused about why compressor failed"',
    aiResponse: 'Simple explanation generated: Like a car engine, AC compressor works hard. Lack of maintenance causes wear. Visual diagram sent to customer.',
    businessImpact: 'Customer understanding, trust building, educational value',
    frequency: 'High',
    ...generatePerformanceMetrics(68, 'High')
  },
  {
    id: '65',
    category: 'Customer Communication',
    title: 'Provide maintenance tips and education',
    description: 'AI generates personalized maintenance tips based on customer equipment and lifestyle',
    icon: <BookOpen className="w-4 h-4" />,
    aiAgents: ['Educational Content Generator', 'Customer Communication Hub', 'Maintenance Scheduler'],
    technicianInput: '"Customer wants to learn basic maintenance"',
    aiResponse: 'Personalized guide created: Monthly filter checks, seasonal outdoor unit cleaning. Video links sent. Reminder schedule set.',
    businessImpact: 'Customer empowerment, equipment longevity, reduced service calls',
    frequency: 'Medium',
    ...generatePerformanceMetrics(44, 'Medium')
  },
  {
    id: '66',
    category: 'Customer Communication',
    title: 'Handle customer complaints professionally',
    description: 'AI provides response templates and escalation procedures for customer concerns',
    icon: <Heart className="w-4 h-4" />,
    aiAgents: ['Customer Communication Hub', 'Complaint Resolution System', 'Service Recovery Coordinator'],
    technicianInput: '"Customer unhappy with previous repair - unit failed again"',
    aiResponse: 'Empathy response provided. Previous work review initiated. Service recovery credit approved. Manager notification sent.',
    businessImpact: 'Customer retention, service recovery, reputation management',
    frequency: 'Medium',
    ...generatePerformanceMetrics(31, 'Medium')
  },
  {
    id: '67',
    category: 'Customer Communication',
    title: 'Schedule follow-up satisfaction survey',
    description: 'AI automatically schedules and manages customer satisfaction surveys post-service',
    icon: <Star className="w-4 h-4" />,
    aiAgents: ['Customer Satisfaction Tracker', 'Survey Management System', 'Feedback Analyzer'],
    technicianInput: '"Job completed - customer seemed very happy"',
    aiResponse: 'Satisfaction survey scheduled for tomorrow. Positive feedback prediction: 94%. Results will be shared with management.',
    businessImpact: 'Customer feedback, service improvement, technician recognition',
    frequency: 'High',
    ...generatePerformanceMetrics(82, 'High')
  },
  {
    id: '68',
    category: 'Customer Communication',
    title: 'Manage customer expectations for complex jobs',
    description: 'AI helps set realistic timelines and communicate potential complications',
    icon: <Clock className="w-4 h-4" />,
    aiAgents: ['Project Management AI', 'Customer Communication Hub', 'Risk Assessment Engine'],
    technicianInput: '"Complex system replacement - many potential complications"',
    aiResponse: 'Expectation management plan created. Timeline: 6-8 hours with contingencies. Customer informed of potential delays and reasons.',
    businessImpact: 'Realistic expectations, customer satisfaction, reduced complaints',
    frequency: 'Medium',
    ...generatePerformanceMetrics(38, 'Medium')
  },
  {
    id: '69',
    category: 'Customer Communication',
    title: 'Provide energy saving recommendations',
    description: 'AI analyzes usage patterns and provides personalized energy saving tips',
    icon: <Leaf className="w-4 h-4" />,
    aiAgents: ['Energy Efficiency Analyzer', 'Cost Savings Calculator', 'Customer Communication Hub'],
    technicianInput: '"Customer has high energy bills - wants saving tips"',
    aiResponse: 'Energy analysis complete. Potential savings: 18% ($340/year). Top recommendations: programmable thermostat, duct sealing, insulation.',
    businessImpact: 'Additional service opportunities, customer value, environmental benefit',
    frequency: 'Medium',
    ...generatePerformanceMetrics(46, 'Medium')
  },
  {
    id: '70',
    category: 'Customer Communication',
    title: 'Document customer preferences and notes',
    description: 'AI captures and stores customer preferences for future service visits',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Customer Profile Manager', 'Preference Tracking System', 'Service History Database'],
    technicianInput: '"Customer prefers morning appointments and wants texts not calls"',
    aiResponse: 'Preferences saved: Morning appointments only, SMS communication preferred. Future scheduling will honor these preferences.',
    businessImpact: 'Personalized service, customer satisfaction, efficient scheduling',
    frequency: 'Medium',
    ...generatePerformanceMetrics(35, 'Medium')
  },
  {
    id: '71',
    category: 'Customer Communication',
    title: 'Generate service completion certificates',
    description: 'AI creates professional completion certificates for warranty and insurance purposes',
    icon: <Award className="w-4 h-4" />,
    aiAgents: ['Documentation Generator', 'Warranty Management System', 'Quality Assurance Inspector'],
    technicianInput: '"Customer needs official completion certificate for insurance"',
    aiResponse: 'Professional certificate generated. Includes work details, warranty info, compliance statements. Digital and print versions ready.',
    businessImpact: 'Professional documentation, customer value, warranty support',
    frequency: 'Low',
    ...generatePerformanceMetrics(18, 'Low')
  },
  {
    id: '72',
    category: 'Customer Communication',
    title: 'Coordinate with property managers',
    description: 'AI manages communication with property managers for rental and commercial properties',
    icon: <Building2 className="w-4 h-4" />,
    aiAgents: ['Property Management Coordinator', 'Tenant Communication System', 'Service Authorization Manager'],
    technicianInput: '"Apartment complex repair - need property manager approval"',
    aiResponse: 'Property manager contacted. Approval received. Tenant notified of service. Access arrangements confirmed.',
    businessImpact: 'Streamlined approvals, tenant satisfaction, property manager relationships',
    frequency: 'Medium',
    ...generatePerformanceMetrics(28, 'Medium')
  },

  // Business Intelligence & Analytics (73-82)
  {
    id: '73',
    category: 'Performance Optimization',
    title: 'Track job profitability metrics',
    description: 'AI calculates real-time job profitability including time, materials, and overhead',
    icon: <DollarSign className="w-4 h-4" />,
    aiAgents: ['Profitability Analyzer', 'Cost Tracking System', 'Performance Analytics AI'],
    technicianInput: '"Job took 3 hours longer than estimated"',
    aiResponse: 'Profitability analysis: Job margin reduced to 12%. Factors: diagnostic complexity, parts delay. Recommendations for pricing adjustment.',
    businessImpact: 'Pricing optimization, profitability insight, business intelligence',
    frequency: 'High',
    ...generatePerformanceMetrics(59, 'High')
  },
  {
    id: '74',
    category: 'Performance Optimization',
    title: 'Analyze technician efficiency patterns',
    description: 'AI identifies efficiency patterns and provides personalized improvement suggestions',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Performance Analytics AI', 'Efficiency Optimizer', 'Coaching Recommendation Engine'],
    technicianInput: '"Want to improve my average job completion time"',
    aiResponse: 'Analysis shows diagnostic phase takes 15% longer than peers. Recommend advanced HVAC diagnostics training. Course scheduled.',
    businessImpact: 'Technician development, efficiency improvement, skill enhancement',
    frequency: 'Medium',
    ...generatePerformanceMetrics(33, 'Medium')
  },
  {
    id: '75',
    category: 'Performance Optimization',
    title: 'Generate daily performance summary',
    description: 'AI creates end-of-day performance summary with key metrics and achievements',
    icon: <BarChart3 className="w-4 h-4" />,
    aiAgents: ['Performance Analytics AI', 'Achievement Tracker', 'Goal Progress Monitor'],
    technicianInput: '"End of day - how did I perform today?"',
    aiResponse: 'Daily summary: 6 jobs completed, 98% on-time, $2,840 revenue generated, 4.9 customer rating. Above daily targets in all categories.',
    businessImpact: 'Performance awareness, goal tracking, motivation enhancement',
    frequency: 'High',
    ...generatePerformanceMetrics(87, 'High')
  },
  {
    id: '76',
    category: 'Performance Optimization',
    title: 'Compare performance to team averages',
    description: 'AI provides benchmarking against team and regional performance metrics',
    icon: <Target className="w-4 h-4" />,
    aiAgents: ['Benchmarking Engine', 'Performance Analytics AI', 'Competitive Analysis System'],
    technicianInput: '"How am I doing compared to other techs?"',
    aiResponse: 'Performance ranking: Top 15% in customer satisfaction, average in efficiency, top 25% in upsell revenue. Focus area: diagnostic speed.',
    businessImpact: 'Performance motivation, competitive insights, improvement targeting',
    frequency: 'Medium',
    ...generatePerformanceMetrics(41, 'Medium')
  },
  {
    id: '77',
    category: 'Performance Optimization',
    title: 'Track customer retention rates',
    description: 'AI monitors customer loyalty and identifies opportunities for relationship building',
    icon: <Users className="w-4 h-4" />,
    aiAgents: ['Customer Retention Tracker', 'Loyalty Analytics Engine', 'Relationship Builder'],
    technicianInput: '"This customer uses us exclusively - why?"',
    aiResponse: 'Customer loyalty factors: Consistent quality, fair pricing, reliable scheduling. 8 services over 3 years. High retention probability: 94%.',
    businessImpact: 'Customer relationship insights, retention strategies, loyalty building',
    frequency: 'Medium',
    ...generatePerformanceMetrics(36, 'Medium')
  },
  {
    id: '78',
    category: 'Performance Optimization',
    title: 'Identify upsell opportunities',
    description: 'AI analyzes customer data to suggest relevant additional services and products',
    icon: <TrendingUp className="w-4 h-4" />,
    aiAgents: ['Upsell Opportunity Engine', 'Customer Profile Analyzer', 'Revenue Optimization AI'],
    technicianInput: '"Finishing AC repair - any other opportunities here?"',
    aiResponse: 'Opportunities identified: Duct cleaning (high dust levels), thermostat upgrade (old model), maintenance plan enrollment. Potential: $650.',
    businessImpact: 'Revenue growth, customer value enhancement, service expansion',
    frequency: 'High',
    ...generatePerformanceMetrics(72, 'High')
  },
  {
    id: '79',
    category: 'Performance Optimization',
    title: 'Monitor warranty claim patterns',
    description: 'AI tracks warranty claims to identify product quality issues and training needs',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Warranty Analytics Engine', 'Quality Pattern Detector', 'Training Needs Analyzer'],
    technicianInput: '"Third warranty claim this month on same part type"',
    aiResponse: 'Pattern detected: Brand X capacitors failing at 14 months average. Supplier notification sent. Alternative part recommended.',
    businessImpact: 'Quality assurance, cost reduction, supplier relationships',
    frequency: 'Low',
    ...generatePerformanceMetrics(22, 'Low')
  },
  {
    id: '80',
    category: 'Performance Optimization',
    title: 'Calculate route efficiency scores',
    description: 'AI analyzes daily routes and suggests optimizations for time and fuel savings',
    icon: <MapPin className="w-4 h-4" />,
    aiAgents: ['Route Optimization Engine', 'Efficiency Calculator', 'Geographic Intelligence System'],
    technicianInput: '"Spent too much time driving today"',
    aiResponse: 'Route efficiency: 73%. Suggested reordering saves 45 minutes, 12 miles. Traffic patterns and customer preferences considered.',
    businessImpact: 'Time optimization, fuel savings, more service capacity',
    frequency: 'High',
    ...generatePerformanceMetrics(64, 'High')
  },
  {
    id: '81',
    category: 'Performance Optimization',
    title: 'Analyze callback and redo rates',
    description: 'AI tracks callback patterns and identifies root causes for quality improvement',
    icon: <RefreshCw className="w-4 h-4" />,
    aiAgents: ['Quality Analytics Engine', 'Callback Pattern Analyzer', 'Root Cause Identifier'],
    technicianInput: '"Customer calling back about same issue after repair"',
    aiResponse: 'Callback analysis: Similar issue resolved by parts upgrade. Root cause: initial part selection. Training module recommended.',
    businessImpact: 'Quality improvement, callback reduction, customer satisfaction',
    frequency: 'Low',
    ...generatePerformanceMetrics(15, 'Low')
  },
  {
    id: '82',
    category: 'Performance Optimization',
    title: 'Generate monthly performance reports',
    description: 'AI creates comprehensive monthly performance analysis with improvement recommendations',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Performance Report Generator', 'Trend Analysis Engine', 'Goal Setting Assistant'],
    technicianInput: '"Need my monthly performance review"',
    aiResponse: 'Monthly report ready: 15% efficiency improvement, 4.8 avg rating, $18K revenue. Next month goals: reduce diagnostic time by 10%.',
    businessImpact: 'Performance tracking, goal setting, career development',
    frequency: 'Low',
    ...generatePerformanceMetrics(8, 'Low')
  },

  // Advanced Operational Support (83-92)
  {
    id: '83',
    category: 'Emergency Response',
    title: 'Coordinate emergency service response',
    description: 'AI manages emergency calls with priority routing and resource coordination',
    icon: <AlertTriangle className="w-4 h-4" />,
    aiAgents: ['Emergency Response Coordinator', 'Priority Routing System', 'Resource Allocation Manager'],
    technicianInput: '"Got emergency call - no heat in 10-degree weather"',
    aiResponse: 'Emergency protocol activated. Nearest parts supplier contacted. Customer ETA: 45 minutes. Backup tech on standby.',
    businessImpact: 'Emergency response efficiency, customer safety, service reliability',
    frequency: 'Low',
    ...generatePerformanceMetrics(12, 'Low')
  },
  {
    id: '84',
    category: 'Quality Assurance',
    title: 'Conduct post-repair quality checks',
    description: 'AI guides comprehensive quality verification process with photo documentation',
    icon: <CheckCircle className="w-4 h-4" />,
    aiAgents: ['Quality Assurance Inspector', 'Photo Documentation System', 'Compliance Checker'],
    technicianInput: '"Completed furnace repair - need quality verification"',
    aiResponse: 'Quality checklist initiated. Temperature differential verified. Safety systems tested. Documentation photos required for file.',
    businessImpact: 'Quality assurance, warranty protection, professional standards',
    frequency: 'High',
    ...generatePerformanceMetrics(78, 'High')
  },
  {
    id: '85',
    category: 'Administrative',
    title: 'Process expense reports automatically',
    description: 'AI captures and categorizes expenses with receipt photo processing',
    icon: <FileText className="w-4 h-4" />,
    aiAgents: ['Expense Processing System', 'Receipt Analysis AI', 'Financial Tracking Manager'],
    technicianInput: '"Bought emergency parts at supply house"',
    aiResponse: 'Receipt processed. Parts categorized. Expense approved. Reimbursement processed. Job cost updated automatically.',
    businessImpact: 'Administrative efficiency, accurate job costing, expense management',
    frequency: 'Medium',
    ...generatePerformanceMetrics(43, 'Medium')
  },
  {
    id: '86',
    category: 'Administrative',
    title: 'Generate regulatory compliance reports',
    description: 'AI creates required regulatory documentation for inspections and audits',
    icon: <Shield className="w-4 h-4" />,
    aiAgents: ['Compliance Documentation System', 'Regulatory Requirements Tracker', 'Audit Trail Manager'],
    technicianInput: '"Need EPA refrigerant handling documentation"',
    aiResponse: 'EPA compliance report generated. Refrigerant recovery documented. Certification verified. Audit trail complete.',
    businessImpact: 'Regulatory compliance, audit readiness, professional certification',
    frequency: 'Medium',
    ...generatePerformanceMetrics(29, 'Medium')
  },
  {
    id: '87',
    category: 'Team Coordination',
    title: 'Share real-time location for backup support',
    description: 'AI coordinates location sharing for team support and emergency assistance',
    icon: <MapPin className="w-4 h-4" />,
    aiAgents: ['Location Coordination System', 'Team Support Network', 'Emergency Response Coordinator'],
    technicianInput: '"Need immediate backup for complex repair"',
    aiResponse: 'Location shared with team. Nearest qualified tech: Mike, 12 minutes away. Backup en route. Customer notified.',
    businessImpact: 'Team collaboration, problem resolution, customer service continuity',
    frequency: 'Low',
    ...generatePerformanceMetrics(16, 'Low')
  },
  {
    id: '88',
    category: 'Knowledge Sharing',
    title: 'Create video documentation for training',
    description: 'AI guides creation of training videos from successful repair procedures',
    icon: <Video className="w-4 h-4" />,
    aiAgents: ['Training Content Creator', 'Video Processing System', 'Knowledge Management Platform'],
    technicianInput: '"Discovered new technique for difficult repair - should document"',
    aiResponse: 'Video documentation started. Key steps highlighted. Training module created. Team notification scheduled for review.',
    businessImpact: 'Knowledge capture, team training, skill development',
    frequency: 'Low',
    ...generatePerformanceMetrics(19, 'Low')
  },
  {
    id: '89',
    category: 'Business Development',
    title: 'Capture customer testimonials',
    description: 'AI manages customer testimonial collection for marketing and reputation building',
    icon: <Star className="w-4 h-4" />,
    aiAgents: ['Testimonial Collection System', 'Marketing Content Manager', 'Customer Satisfaction Tracker'],
    technicianInput: '"Customer extremely happy - wants to give testimonial"',
    aiResponse: 'Testimonial capture initiated. Review request sent. Marketing team notified. Customer consent documented.',
    businessImpact: 'Marketing content, reputation building, customer advocacy',
    frequency: 'Low',
    ...generatePerformanceMetrics(13, 'Low')
  },
  {
    id: '90',
    category: 'Environmental Impact',
    title: 'Track carbon footprint and eco-benefits',
    description: 'AI calculates environmental impact of repairs and energy efficiency improvements',
    icon: <Leaf className="w-4 h-4" />,
    aiAgents: ['Environmental Impact Calculator', 'Carbon Footprint Tracker', 'Sustainability Reporter'],
    technicianInput: '"Replaced old furnace with high-efficiency model"',
    aiResponse: 'Environmental impact: 2.3 tons CO2 reduction annually. Energy savings: 23%. Customer carbon footprint improved by 18%.',
    businessImpact: 'Environmental responsibility, customer value proposition, sustainability goals',
    frequency: 'Medium',
    ...generatePerformanceMetrics(31, 'Medium')
  },
  {
    id: '91',
    category: 'Innovation',
    title: 'Test new technologies and procedures',
    description: 'AI coordinates pilot programs for new tools, techniques, and technologies',
    icon: <Beaker className="w-4 h-4" />,
    aiAgents: ['Innovation Testing Platform', 'Performance Comparison Engine', 'Technology Evaluation System'],
    technicianInput: '"Testing new diagnostic tool - want to compare results"',
    aiResponse: 'Pilot program data recorded. Performance comparison: 23% faster diagnosis. Cost-benefit analysis initiated. Rollout recommendation pending.',
    businessImpact: 'Technology advancement, competitive advantage, efficiency improvement',
    frequency: 'Low',
    ...generatePerformanceMetrics(7, 'Low')
  },
  {
    id: '92',
    category: 'Personal Development',
    title: 'Track certification and training progress',
    description: 'AI monitors professional development, certifications, and skill advancement',
    icon: <GraduationCap className="w-4 h-4" />,
    aiAgents: ['Professional Development Tracker', 'Certification Manager', 'Skill Assessment Engine'],
    technicianInput: '"Completed EPA certification renewal"',
    aiResponse: 'Certification updated. Skills profile refreshed. New service capabilities unlocked. Advanced training opportunities identified.',
    businessImpact: 'Professional growth, service capability expansion, career advancement',
    frequency: 'Low',
    ...generatePerformanceMetrics(5, 'Low')
  },

  // NEW QUALITY ASSURANCE USE CASES (93-95)

  {
    id: '93',
    category: 'Quality Assurance',
    title: 'Provide customer perspective self-rating',
    description: 'AI guides technician to rate job from customer viewpoint for empathy and alignment development',
    icon: <Users className="w-4 h-4" />,
    aiAgents: ['Customer Experience Analyzer', 'Empathy Development Coach', 'Quality Assurance Inspector'],
    technicianInput: '"Completed water heater replacement - need to do customer perspective rating"',
    aiResponse: 'Customer perspective rating initiated. Rate communication, timeliness, cleanliness, professionalism. Add comments as if you were the homeowner. Empathy insights provided.',
    businessImpact: 'Improved customer empathy, service quality enhancement, technician development',
    frequency: 'High',
    ...generatePerformanceMetrics(89, 'High')
  },
  {
    id: '94',
    category: 'Quality Assurance',
    title: 'Get recall prevention tips for high-risk job codes',
    description: 'AI provides specific guidance based on historical recall patterns for current job code',
    icon: <AlertTriangle className="w-4 h-4" />,
    aiAgents: ['Recall Prevention System', 'Historical Pattern Analyzer', 'Quality Assurance Inspector'],
    technicianInput: '"Starting furnace heat exchanger replacement - job code shows high recall rate"',
    aiResponse: 'Recall alert: This job code has 18% recall rate. Key prevention tips: Check gas pressure twice, verify proper venting clearances, test all safety switches. Checklist activated.',
    businessImpact: 'Reduced callbacks, improved first-time fix rate, cost savings',
    frequency: 'Medium',
    ...generatePerformanceMetrics(34, 'Medium')
  },
  {
    id: '95',
    category: 'Quality Assurance',
    title: 'Prevent third attempt failures',
    description: 'AI provides targeted guidance to complete jobs in two attempts based on third-attempt history',
    icon: <Target className="w-4 h-4" />,
    aiAgents: ['Third Attempt Prevention System', 'Job Completion Optimizer', 'Technical Expertise Engine'],
    technicianInput: '"Second visit for AC compressor issue - same job code had third attempts before"',
    aiResponse: 'Third attempt prevention activated. Historical analysis shows: Electrical connections often overlooked, refrigerant levels need precise adjustment. Extended diagnostic protocol engaged.',
    businessImpact: 'Eliminated third visits, customer satisfaction, operational efficiency',
    frequency: 'Medium',
    ...generatePerformanceMetrics(27, 'Medium')
  }
];

const categories = ['All', 'Service Delivery', 'Parts Management', 'Scheduling', 'Technical Support', 'Administrative', 'Customer Communication', 'Performance Optimization', 'Emergency Response', 'Quality Assurance', 'Business Development', 'Team Coordination', 'Knowledge Sharing', 'Environmental Impact', 'Innovation', 'Personal Development'];

export default function MagikButtonShowcase() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState<MagikButtonUseCase | null>(null);

  const filteredUseCases = useCases.filter(useCase => {
    const matchesCategory = selectedCategory === 'All' || useCase.category === selectedCategory;
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Zap className="h-8 w-8 text-purple-600" />
              Magik Button Use Cases
            </h1>
            <p className="text-muted-foreground">
              95 ways AI agents empower technicians through seamless automation
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation('/technician-magik-analytics')}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4" />
            View Analytics
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            Tech Hub Integration
          </Badge>
        </div>
      </div>

      {/* Philosophy Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Zap className="h-5 w-5" />
            Core Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 font-medium">
            "Make it easy for technicians to do what they need to do, and difficult for them to do what they shouldn't do."
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{useCases.length}</div>
              <div className="text-sm text-purple-700">Use Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10+</div>
              <div className="text-sm text-purple-700">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-purple-700">Admin Burden</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analytics Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">95</div>
          <div className="text-sm text-blue-700">Total Use Cases</div>
          <div className="text-xs text-blue-600 mt-1">Comprehensive Coverage</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(useCases.reduce((sum, uc) => sum + uc.dailyTriggers, 0))}
          </div>
          <div className="text-sm text-green-700">Daily Activations</div>
          <div className="text-xs text-green-600 mt-1">Across All Use Cases</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(useCases.reduce((sum, uc) => sum + uc.successRate, 0) / useCases.length)}%
          </div>
          <div className="text-sm text-purple-700">Avg Success Rate</div>
          <div className="text-xs text-purple-600 mt-1">AI Performance</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">
            {(useCases.reduce((sum, uc) => sum + parseFloat(uc.avgResponseTime), 0) / useCases.length).toFixed(1)}s
          </div>
          <div className="text-sm text-orange-700">Avg Response</div>
          <div className="text-xs text-orange-600 mt-1">AI Processing Time</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search use cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUseCases.map((useCase) => (
          <Card key={useCase.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedUseCase(useCase)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {useCase.icon}
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {useCase.category}
                  </Badge>
                  <Badge 
                    variant={useCase.frequency === 'High' ? 'default' : 
                             useCase.frequency === 'Medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {useCase.frequency}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{useCase.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">AI Agents Involved:</div>
                  <div className="flex flex-wrap gap-1">
                    {useCase.aiAgents.map((agent, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{useCase.dailyTriggers}</div>
                    <div className="text-xs text-gray-600">Daily Uses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{useCase.successRate}%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-orange-600">{useCase.hourlyPeak}/hr</div>
                    <div className="text-xs text-gray-600">Peak Usage</div>
                  </div>
                  <div className="text-center flex items-center justify-center gap-1">
                    <div className="text-sm font-medium text-gray-700">{useCase.avgResponseTime}</div>
                    {useCase.trendDirection === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                    {useCase.trendDirection === 'down' && <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />}
                    {useCase.trendDirection === 'stable' && <div className="w-3 h-0.5 bg-gray-400"></div>}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-green-600 mb-1">Business Impact:</div>
                  <div className="text-sm text-green-700">{useCase.businessImpact}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Modal/Expanded View */}
      {selectedUseCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedUseCase.icon}
                  <CardTitle>{selectedUseCase.title}</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedUseCase(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How It Works:</h4>
                <p className="text-muted-foreground">{selectedUseCase.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Technician Input:</h4>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="text-blue-800">{selectedUseCase.technicianInput}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">AI Response:</h4>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="text-green-800">{selectedUseCase.aiResponse}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">AI Agents Involved:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUseCase.aiAgents.map((agent, idx) => (
                    <Badge key={idx} variant="secondary">
                      {agent}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Business Impact:</h4>
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-yellow-800">{selectedUseCase.businessImpact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Success Metrics for Magik Button Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-muted-foreground">Daily Uses/Tech</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground">Auto-Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.5hr</div>
              <div className="text-sm text-muted-foreground">Time Saved Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">+12%</div>
              <div className="text-sm text-muted-foreground">Revenue Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">94%</div>
              <div className="text-sm text-muted-foreground">Tech Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}