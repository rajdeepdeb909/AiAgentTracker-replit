import { generateId } from './utils';

export interface HumanApprovalRequest {
  id: string;
  requestType: string;
  category: 'executive' | 'operational' | 'financial' | 'recruitment' | 'quality' | 'analytics' | 'partnership';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  proposedAction: string;
  requestingAgent: number;
  assignedRole: string;
  assignedUser?: string;
  businessImpact: string;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedValue?: number;
  urgencyReason?: string;
  supportingData: any;
  timestamp: string;
  approvalDeadline?: string;
  escalationPath?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  reviewNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

/**
 * Generates role-specific human-in-the-loop approval examples
 * for all stakeholder types in the America's Home Manager system
 */
export class HumanApprovalService {
  
  /**
   * Generate approval requests for all human roles with realistic business scenarios
   */
  static generateRoleSpecificApprovals(): HumanApprovalRequest[] {
    const currentTime = new Date();
    const approvals: HumanApprovalRequest[] = [];

    // CEO-Level Approvals (Strategic Decisions)
    approvals.push({
      id: generateId(),
      requestType: 'strategic_partnership',
      category: 'executive',
      priority: 'critical',
      title: 'Major Partnership Expansion with Home Depot',
      description: 'AI Agent #16 recommends expanding B2B partnership with Home Depot nationwide, requiring $2.5M investment for exclusive service integration',
      proposedAction: 'Execute partnership agreement covering 1,847 Home Depot locations with guaranteed $15M annual revenue commitment',
      requestingAgent: 16,
      assignedRole: 'ceo',
      assignedUser: 'exec_ceo',
      businessImpact: 'Potential $15M annual revenue increase, market dominance in retail partnerships',
      riskLevel: 'high',
      estimatedValue: 15000000,
      urgencyReason: 'Competitors are pursuing similar partnerships - 72-hour decision window',
      supportingData: {
        projectedROI: '600%',
        marketAnalysis: 'Captures 34% additional market share',
        competitorResponse: 'Likely to trigger defensive moves from Lowe\'s partnership'
      },
      timestamp: new Date(currentTime.getTime() - 1800000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 172800000).toISOString(),
      escalationPath: ['board_approval'],
      status: 'pending'
    });

    // COO-Level Approvals (Operational Excellence)
    approvals.push({
      id: generateId(),
      requestType: 'operational_restructure',
      category: 'operational',
      priority: 'high',
      title: 'Regional Service Territory Expansion',
      description: 'AI Agent #20 identifies optimal expansion into Phoenix and Denver markets with 94% success probability',
      proposedAction: 'Launch service operations in 2 new metropolitan areas, hiring 85 technicians and establishing regional hubs',
      requestingAgent: 20,
      assignedRole: 'coo',
      assignedUser: 'exec_coo',
      businessImpact: 'Expands serviceable market by 1.2M households, projected $8M annual revenue',
      riskLevel: 'medium',
      estimatedValue: 8000000,
      urgencyReason: 'Seasonal demand peak approaching - Q4 launch critical for market penetration',
      supportingData: {
        marketPenetration: '87% technician availability',
        demandForecasting: '2,400 weekly service requests projected',
        competitiveGap: 'Limited competition in premium service tier'
      },
      timestamp: new Date(currentTime.getTime() - 3600000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 604800000).toISOString(),
      escalationPath: ['ceo'],
      status: 'pending'
    });

    // CFO-Level Approvals (Financial Decisions)
    approvals.push({
      id: generateId(),
      requestType: 'budget_allocation',
      category: 'financial',
      priority: 'high',
      title: 'AI Infrastructure Investment Package',
      description: 'AI Agent #19 recommends $1.8M investment in advanced AI infrastructure to achieve 97% automation rate',
      proposedAction: 'Approve capital expenditure for AI server expansion, additional ML model licenses, and advanced analytics platform',
      requestingAgent: 19,
      assignedRole: 'cfo',
      assignedUser: 'exec_cfo',
      businessImpact: 'Reduces operational costs by $3.2M annually through increased automation efficiency',
      riskLevel: 'low',
      estimatedValue: 3200000,
      urgencyReason: 'Current capacity constraints limiting agent performance by 12%',
      supportingData: {
        paybackPeriod: '8.2 months',
        efficiencyGains: 'Automation rate increases from 94.8% to 97%',
        costSavings: '$267K monthly operational cost reduction'
      },
      timestamp: new Date(currentTime.getTime() - 5400000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 432000000).toISOString(),
      escalationPath: ['ceo', 'board_approval'],
      status: 'pending'
    });

    // Recruitment Manager Approvals
    approvals.push({
      id: generateId(),
      requestType: 'recruitment_campaign',
      category: 'recruitment',
      priority: 'high',
      title: 'Accelerated Technician Recruitment Initiative',
      description: 'AI Agent #22 proposes launching premium recruitment campaign targeting 150 experienced HVAC technicians',
      proposedAction: 'Deploy $340K recruitment budget across digital channels, trade shows, and referral bonuses to meet Q4 hiring targets',
      requestingAgent: 22,
      assignedRole: 'recruitment_manager',
      assignedUser: 'staff_recruitment_manager',
      businessImpact: 'Reduces technician shortage from 23% to 8%, enabling $1.2M additional service capacity',
      riskLevel: 'medium',
      estimatedValue: 1200000,
      urgencyReason: 'Seasonal hiring competition intensifies in October - first-mover advantage critical',
      supportingData: {
        targetAchievement: '150 technicians in 90 days',
        qualityMetrics: '85% retention rate projected',
        marketAnalysis: 'Limited qualified candidate pool - aggressive positioning required'
      },
      timestamp: new Date(currentTime.getTime() - 2700000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 259200000).toISOString(),
      escalationPath: ['operations_manager', 'coo'],
      status: 'pending'
    });

    // Operations Manager Approvals
    approvals.push({
      id: generateId(),
      requestType: 'quality_improvement',
      category: 'quality',
      priority: 'medium',
      title: 'Customer Satisfaction Enhancement Program',
      description: 'AI Agent #8 identifies 12 service quality improvements that could increase customer ratings from 4.2 to 4.7 stars',
      proposedAction: 'Implement enhanced quality assurance protocols, technician coaching program, and customer follow-up system',
      requestingAgent: 8,
      assignedRole: 'operations_manager',
      assignedUser: 'staff_operations_manager',
      businessImpact: 'Customer retention increases by 18%, referral rate improves by 28%',
      riskLevel: 'low',
      estimatedValue: 450000,
      urgencyReason: 'Customer satisfaction scores trending downward - proactive intervention needed',
      supportingData: {
        satisfactionImprovement: '4.2 to 4.7 star rating projected',
        retentionImpact: '18% improvement in customer lifetime value',
        operationalChanges: '14 protocol enhancements identified'
      },
      timestamp: new Date(currentTime.getTime() - 7200000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 518400000).toISOString(),
      escalationPath: ['coo'],
      status: 'pending'
    });

    // Analytics Manager Approvals
    approvals.push({
      id: generateId(),
      requestType: 'predictive_modeling',
      category: 'analytics',
      priority: 'medium',
      title: 'Advanced Predictive Maintenance AI Implementation',
      description: 'AI Agent #14 proposes implementing predictive failure models for HVAC systems, reducing emergency calls by 35%',
      proposedAction: 'Deploy ML models for predictive maintenance across 15,000 active service contracts with IoT sensor integration',
      requestingAgent: 14,
      assignedRole: 'analytics_manager',
      assignedUser: 'staff_analytics_manager',
      businessImpact: 'Reduces emergency service calls by 35%, increases preventive service revenue by $890K annually',
      riskLevel: 'medium',
      estimatedValue: 890000,
      urgencyReason: 'Winter season approaching - optimal time for preventive maintenance program launch',
      supportingData: {
        failurePrediction: '87% accuracy in predicting system failures 30 days in advance',
        revenueShift: 'Emergency calls decrease by 35%, scheduled service increases by 42%',
        customerValue: 'Reduces customer downtime by 67%'
      },
      timestamp: new Date(currentTime.getTime() - 9000000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 345600000).toISOString(),
      escalationPath: ['cto', 'coo'],
      status: 'pending'
    });

    // Partnership Development Lead Approvals
    approvals.push({
      id: generateId(),
      requestType: 'partnership_agreement',
      category: 'partnership',
      priority: 'high',
      title: 'Strategic HOA Management Partnership',
      description: 'AI Agent #16 negotiated exclusive partnership with 3 major HOA management companies covering 45,000 homes',
      proposedAction: 'Execute partnership agreements providing preferred vendor status for maintenance services across large residential communities',
      requestingAgent: 16,
      assignedRole: 'partnership_lead',
      assignedUser: 'staff_partnership_lead',
      businessImpact: 'Guarantees $2.8M annual recurring revenue with 89% profit margins',
      riskLevel: 'low',
      estimatedValue: 2800000,
      urgencyReason: 'Competing service providers actively pursuing same partnerships',
      supportingData: {
        contractLength: '3-year exclusive agreements',
        serviceVolume: '45,000 homes, average 2.3 service calls annually per home',
        profitMargin: '89% margins on contracted services vs 67% on individual calls'
      },
      timestamp: new Date(currentTime.getTime() - 4500000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 172800000).toISOString(),
      escalationPath: ['cro', 'ceo'],
      status: 'pending'
    });

    // Quality Assurance Lead Approvals
    approvals.push({
      id: generateId(),
      requestType: 'process_optimization',
      category: 'quality',
      priority: 'medium',
      title: 'Technician Certification Enhancement Program',
      description: 'AI Agent #23 identifies training gaps affecting service quality and proposes comprehensive certification program',
      proposedAction: 'Launch 6-week enhanced certification program for 180 technicians, including advanced HVAC diagnostics and customer service',
      requestingAgent: 23,
      assignedRole: 'quality_assurance_lead',
      assignedUser: 'staff_quality_assurance_lead',
      businessImpact: 'Reduces service callbacks by 42%, increases first-visit resolution rate to 94%',
      riskLevel: 'low',
      estimatedValue: 320000,
      urgencyReason: 'Service quality metrics declining - proactive training intervention required',
      supportingData: {
        callbackReduction: '42% decrease in repeat service calls',
        resolutionRate: 'First-visit success rate improves from 78% to 94%',
        technicianSatisfaction: '91% technician satisfaction with enhanced training'
      },
      timestamp: new Date(currentTime.getTime() - 6300000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 432000000).toISOString(),
      escalationPath: ['operations_manager', 'coo'],
      status: 'pending'
    });

    // Scheduling Coordinator Approvals
    approvals.push({
      id: generateId(),
      requestType: 'operational_efficiency',
      category: 'operational',
      priority: 'high',
      title: 'Dynamic Scheduling Algorithm Deployment',
      description: 'AI Agent #11 developed advanced scheduling system that reduces travel time by 28% and increases daily service capacity',
      proposedAction: 'Deploy AI-powered dynamic scheduling across all service territories with real-time optimization capabilities',
      requestingAgent: 11,
      assignedRole: 'scheduling_coordinator',
      assignedUser: 'staff_scheduling_coordinator',
      businessImpact: 'Increases daily service capacity by 32 appointments, saves $180K annually in fuel costs',
      riskLevel: 'low',
      estimatedValue: 580000,
      urgencyReason: 'Current scheduling inefficiencies causing customer wait times to exceed service standards',
      supportingData: {
        efficiencyGains: '28% reduction in technician travel time',
        capacityIncrease: '32 additional service appointments per day',
        costSavings: '$180K annual fuel savings, $400K in additional service revenue'
      },
      timestamp: new Date(currentTime.getTime() - 1200000).toISOString(),
      approvalDeadline: new Date(currentTime.getTime() + 259200000).toISOString(),
      escalationPath: ['operations_manager'],
      status: 'pending'
    });

    return approvals;
  }

  /**
   * Process approval decision and generate system activity
   */
  static processApprovalDecision(
    approvalId: string, 
    decision: 'approved' | 'rejected', 
    approverUser: string,
    notes?: string
  ) {
    return {
      id: generateId(),
      type: decision === 'approved' ? 'approval_granted' : 'approval_rejected',
      category: 'executive' as const,
      priority: 'high' as const,
      title: `${decision === 'approved' ? '✅ Executive Approval' : '❌ Executive Rejection'}: ${approvalId}`,
      description: `Human stakeholder ${approverUser} ${decision} AI agent recommendation. ${notes ? `Decision notes: ${notes}` : ''}`,
      location: 'Executive Decision Center',
      timestamp: new Date().toISOString(),
      requiresApproval: false,
      metadata: {
        approvalId,
        decision,
        approver: approverUser,
        decisionNotes: notes,
        processedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Get approval requests by role
   */
  static getApprovalsByRole(role: string): HumanApprovalRequest[] {
    const allApprovals = this.generateRoleSpecificApprovals();
    return allApprovals.filter(approval => approval.assignedRole === role);
  }

  /**
   * Get high-priority pending approvals across all roles
   */
  static getHighPriorityApprovals(): HumanApprovalRequest[] {
    const allApprovals = this.generateRoleSpecificApprovals();
    return allApprovals.filter(approval => 
      approval.status === 'pending' && 
      (approval.priority === 'high' || approval.priority === 'critical')
    );
  }
}