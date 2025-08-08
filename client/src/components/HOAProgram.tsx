import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { 
  Home, 
  Users, 
  Trophy, 
  Target, 
  Calendar,
  DollarSign,
  Star,
  Award,
  TrendingUp,
  UserPlus,
  MessageSquare,
  Gift,
  ArrowLeft,
  Building,
  Crown,
  Handshake,
  Activity,
  Building2
} from 'lucide-react';
import HOAProspectManagement from "@/components/HOAProspectManagement";

interface HOAPartnership {
  id: string;
  name: string;
  location: string;
  units: number;
  status: 'active' | 'pending' | 'prospect';
  leaderName: string;
  leaderTitle: string;
  joinDate: string;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalRevenue: number;
  activeMembers: number;
  conversionRate: number;
  averageOrderValue: number;
  referrals: number;
  incentivesEarned: number;
}

interface HOAIncentive {
  id: string;
  type: 'leader' | 'member' | 'community';
  title: string;
  description: string;
  requirement: string;
  reward: string;
  value: number;
  earned: number;
  isActive: boolean;
}

interface TieredMembership {
  tier: string;
  color: string;
  benefits: string[];
  requirements: string;
  monthlyFee: number;
  annualDiscount: number;
  hoaDiscount: number;
}

interface HOAProgramProps {
  onNavigateBack: () => void;
}

export function HOAProgram({ onNavigateBack }: HOAProgramProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedHOA, setSelectedHOA] = useState<string | null>(null);
  const [showCreateIncentive, setShowCreateIncentive] = useState(false);
  const [showAddNewHOA, setShowAddNewHOA] = useState(false);
  const [showPresentationKit, setShowPresentationKit] = useState(false);
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [showContractTemplates, setShowContractTemplates] = useState(false);
  const [newIncentive, setNewIncentive] = useState({
    type: 'member' as 'leader' | 'member' | 'community',
    title: '',
    description: '',
    requirement: '',
    reward: '',
    value: 0
  });
  const [newHOA, setNewHOA] = useState({
    name: '',
    location: '',
    units: 0,
    contactPerson: '',
    email: '',
    phone: '',
    membershipTier: 'bronze' as 'bronze' | 'silver' | 'gold' | 'platinum',
    status: 'prospect' as 'prospect' | 'pending' | 'active'
  });
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler functions for button actions
  const handleViewDetails = (hoa: HOAPartnership) => {
    setSelectedHOA(hoa.id);
    // Show detailed view or navigate to details page
    alert(`Viewing details for ${hoa.name}\n\nPartnership ID: ${hoa.id}\nLocation: ${hoa.location}\nUnits: ${hoa.units}\nStatus: ${hoa.status}\nLeader: ${hoa.leaderName} (${hoa.leaderTitle})\nTotal Revenue: $${hoa.totalRevenue.toLocaleString()}\nActive Members: ${hoa.activeMembers}\nConversion Rate: ${hoa.conversionRate}%`);
  };

  const handleContact = (hoa: HOAPartnership) => {
    // Open contact modal or initiate contact
    const contactMessage = `Contacting ${hoa.leaderName} (${hoa.leaderTitle}) from ${hoa.name}`;
    alert(`${contactMessage}\n\nThis would typically open your email client or messaging system to contact the HOA leader directly.`);
  };

  const handleViewIncentiveDetails = (incentive: HOAIncentive) => {
    alert(`Incentive Details: ${incentive.title}\n\nType: ${incentive.type}\nDescription: ${incentive.description}\nRequirement: ${incentive.requirement}\nReward: ${incentive.reward}\nValue: $${incentive.value}\nTotal Earned: $${incentive.earned.toLocaleString()}\nStatus: ${incentive.isActive ? 'Active' : 'Inactive'}`);
  };

  const handleEditIncentive = (incentive: HOAIncentive) => {
    alert(`Edit Incentive: ${incentive.title}\n\nThis would open an edit form to modify the incentive details.`);
  };

  // Sample HOA partnerships data
  const hoaPartnerships: HOAPartnership[] = [
    {
      id: 'HOA-001',
      name: 'Sunrise Village HOA',
      location: 'Austin, TX',
      units: 245,
      status: 'active',
      leaderName: 'Sarah Martinez',
      leaderTitle: 'HOA President',
      joinDate: '2024-08-15',
      membershipTier: 'Gold',
      totalRevenue: 89500,
      activeMembers: 127,
      conversionRate: 51.8,
      averageOrderValue: 285,
      referrals: 34,
      incentivesEarned: 4275
    },
    {
      id: 'HOA-002',
      name: 'Oakwood Commons',
      location: 'Dallas, TX',
      units: 186,
      status: 'active',
      leaderName: 'Michael Chen',
      leaderTitle: 'Board Member',
      joinDate: '2024-09-03',
      membershipTier: 'Silver',
      totalRevenue: 64200,
      activeMembers: 89,
      conversionRate: 47.8,
      averageOrderValue: 265,
      referrals: 23,
      incentivesEarned: 3210
    },
    {
      id: 'HOA-003',
      name: 'Heritage Park Association',
      location: 'Houston, TX',
      units: 412,
      status: 'pending',
      leaderName: 'Jennifer Williams',
      leaderTitle: 'Community Manager',
      joinDate: '2024-10-12',
      membershipTier: 'Bronze',
      totalRevenue: 28900,
      activeMembers: 45,
      conversionRate: 10.9,
      averageOrderValue: 245,
      referrals: 8,
      incentivesEarned: 1445
    }
  ];

  // HOA-specific tiered memberships with additional benefits
  const tieredMemberships: TieredMembership[] = [
    {
      tier: 'Bronze',
      color: 'bg-amber-600',
      benefits: [
        '5% discount on all services',
        'Priority scheduling within 48 hours',
        'Basic annual maintenance check',
        'HOA community newsletter',
        'Mobile app access'
      ],
      requirements: 'Any HOA member',
      monthlyFee: 19,
      annualDiscount: 15,
      hoaDiscount: 5
    },
    {
      tier: 'Silver',
      color: 'bg-gray-400',
      benefits: [
        '10% discount on all services',
        'Priority scheduling within 24 hours',
        'Bi-annual maintenance checks',
        'Free emergency service calls',
        '24/7 customer support',
        'Appliance protection plan (basic)',
        'Community referral rewards'
      ],
      requirements: '2+ services annually or $500+ spent',
      monthlyFee: 35,
      annualDiscount: 20,
      hoaDiscount: 10
    },
    {
      tier: 'Gold',
      color: 'bg-yellow-500',
      benefits: [
        '15% discount on all services',
        'Same-day service guarantee',
        'Quarterly comprehensive home checks',
        'Free parts replacement (up to $200/year)',
        'Dedicated account manager',
        'Advanced appliance protection',
        'Smart home integration consultation',
        'Community leadership rewards'
      ],
      requirements: '4+ services annually or $1,200+ spent',
      monthlyFee: 55,
      annualDiscount: 25,
      hoaDiscount: 15
    },
    {
      tier: 'Platinum',
      color: 'bg-purple-600',
      benefits: [
        '20% discount on all services',
        '2-hour emergency response',
        'Monthly preventive maintenance',
        'Unlimited parts replacement',
        'Concierge service coordination',
        'Premium appliance protection',
        'Smart home automation setup',
        'HOA ambassador program',
        'Annual home efficiency audit'
      ],
      requirements: '8+ services annually or $2,500+ spent',
      monthlyFee: 89,
      annualDiscount: 30,
      hoaDiscount: 20
    }
  ];

  // HOA-specific incentive programs
  const hoaIncentives: HOAIncentive[] = [
    {
      id: 'INC-001',
      type: 'leader',
      title: 'HOA Leadership Bonus',
      description: 'Monthly reward for HOA leaders who actively promote our services',
      requirement: 'Achieve 25% member participation rate',
      reward: '$500 credit + $200 cash bonus',
      value: 700,
      earned: 2800,
      isActive: true
    },
    {
      id: 'INC-002',
      type: 'leader',
      title: 'Community Champion Award',
      description: 'Quarterly recognition for highest-performing HOA partnerships',
      requirement: 'Top 3 HOAs by conversion rate',
      reward: '$1,000 credit + recognition plaque',
      value: 1000,
      earned: 3000,
      isActive: true
    },
    {
      id: 'INC-003',
      type: 'member',
      title: 'Neighbor Referral Program',
      description: 'Reward members for referring other HOA residents',
      requirement: 'Successful referral completion',
      reward: '$75 credit for both parties',
      value: 150,
      earned: 4500,
      isActive: true
    },
    {
      id: 'INC-004',
      type: 'community',
      title: 'Community Service Excellence',
      description: 'Rewards for HOAs that maintain high service satisfaction',
      requirement: '90%+ satisfaction rating for 3 months',
      reward: '5% additional discount for all members',
      value: 0,
      earned: 12500,
      isActive: true
    }
  ];

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-600';
      case 'Silver': return 'bg-gray-400';
      case 'Gold': return 'bg-yellow-500';
      case 'Platinum': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'prospect': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCreateIncentive = () => {
    setShowCreateIncentive(true);
  };

  const handleSaveIncentive = () => {
    // Here you would typically save to your backend/state management
    console.log('Creating new incentive:', newIncentive);
    
    // Reset form and close modal
    setNewIncentive({
      type: 'member',
      title: '',
      description: '',
      requirement: '',
      reward: '',
      value: 0
    });
    setShowCreateIncentive(false);
    
    // Show success message (you could use a toast notification here)
    alert('Incentive created successfully!');
  };

  const handleCancelCreate = () => {
    setShowCreateIncentive(false);
    setNewIncentive({
      type: 'member',
      title: '',
      description: '',
      requirement: '',
      reward: '',
      value: 0
    });
  };

  const handleAddNewHOA = () => {
    setShowAddNewHOA(true);
  };

  const handleSaveHOA = () => {
    // Here you would typically save to your backend/state management
    console.log('Creating new HOA:', newHOA);
    
    // Reset form and close modal
    setNewHOA({
      name: '',
      location: '',
      units: 0,
      contactPerson: '',
      email: '',
      phone: '',
      membershipTier: 'bronze',
      status: 'prospect'
    });
    setShowAddNewHOA(false);
    
    // Show success message (you could use a toast notification here)
    alert('HOA partnership created successfully!');
  };

  const handleCancelAddHOA = () => {
    setShowAddNewHOA(false);
    setNewHOA({
      name: '',
      location: '',
      units: 0,
      contactPerson: '',
      email: '',
      phone: '',
      membershipTier: 'bronze',
      status: 'prospect'
    });
  };

  return (
    <div className="space-y-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNavigateBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-400" />
              HOA Partnership Program
            </h1>
            <p className="text-gray-400">Homeowners Association recruitment, onboarding, and tiered membership management</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active HOAs</p>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs text-green-400">+2 this month</p>
              </div>
              <Building className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-white">261</p>
                <p className="text-xs text-green-400">+47 this month</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">HOA Revenue</p>
                <p className="text-2xl font-bold text-white">$182.6K</p>
                <p className="text-xs text-green-400">+34% vs last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Conversion</p>
                <p className="text-2xl font-bold text-white">36.8%</p>
                <p className="text-xs text-green-400">+8.2% improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
          <TabsTrigger value="memberships">Tiered Plans</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program Summary */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Program Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Member Conversion Rate</span>
                    <span className="text-white">36.8%</span>
                  </div>
                  <Progress value={36.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Leader Satisfaction</span>
                    <span className="text-white">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Revenue per HOA</span>
                    <span className="text-white">$60.9K</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Referral Success Rate</span>
                    <span className="text-white">68.5%</span>
                  </div>
                  <Progress value={68.5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Top Performing HOAs */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Performing HOAs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hoaPartnerships.slice(0, 3).map((hoa, index) => (
                  <div key={hoa.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium">{hoa.name}</p>
                        <p className="text-xs text-gray-400">{hoa.units} units • {hoa.conversionRate}% conversion</p>
                      </div>
                    </div>
                    <Badge className={getTierBadgeColor(hoa.membershipTier)}>
                      {hoa.membershipTier}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Recent HOA Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <UserPlus className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-white">Heritage Park Association joined the program</p>
                    <p className="text-xs text-gray-400">2 hours ago • Bronze tier enrollment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <p className="text-white">Sarah Martinez earned Community Champion Award</p>
                    <p className="text-xs text-gray-400">1 day ago • $1,000 credit + recognition</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <p className="text-white">Oakwood Commons upgraded to Silver tier</p>
                    <p className="text-xs text-gray-400">3 days ago • 89 active members</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partnerships" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Active HOA Partnerships</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAddNewHOA}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New HOA
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {hoaPartnerships.map((hoa) => (
              <Card key={hoa.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{hoa.name}</h3>
                        <p className="text-gray-400">{hoa.location} • {hoa.units} units</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(hoa.status)}>
                        {hoa.status}
                      </Badge>
                      <Badge className={getTierBadgeColor(hoa.membershipTier)}>
                        {hoa.membershipTier}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Revenue</p>
                      <p className="text-lg font-semibold text-white">${hoa.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Active Members</p>
                      <p className="text-lg font-semibold text-white">{hoa.activeMembers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Conversion Rate</p>
                      <p className="text-lg font-semibold text-white">{hoa.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Referrals</p>
                      <p className="text-lg font-semibold text-white">{hoa.referrals}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Leader: {hoa.leaderName} ({hoa.leaderTitle})</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleViewDetails(hoa)}>
                        View Details
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleContact(hoa)}>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="memberships" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">HOA Tiered Membership Plans</h2>
            <p className="text-gray-400">Comprehensive home management with exclusive HOA member benefits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tieredMemberships.map((tier) => (
              <Card key={tier.tier} className="bg-gray-800 border-gray-700 relative">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{tier.tier}</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-white">${tier.monthlyFee}</span>
                    <span className="text-gray-400">/month</span>
                    <p className="text-sm text-green-400">Save {tier.annualDiscount}% annually</p>
                    <p className="text-sm text-blue-400">Extra {tier.hoaDiscount}% HOA discount</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">Requirements:</p>
                    <p className="text-sm text-white">{tier.requirements}</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Choose {tier.tier}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">HOA Incentive Programs</h2>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreateIncentive}
            >
              <Gift className="w-4 h-4 mr-2" />
              Create Incentive
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hoaIncentives.map((incentive) => (
              <Card key={incentive.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      {incentive.type === 'leader' && <Crown className="w-5 h-5 text-yellow-400" />}
                      {incentive.type === 'member' && <Users className="w-5 h-5 text-blue-400" />}
                      {incentive.type === 'community' && <Home className="w-5 h-5 text-green-400" />}
                      {incentive.title}
                    </CardTitle>
                    <Badge className={incentive.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                      {incentive.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{incentive.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Requirement:</span>
                      <span className="text-sm text-white">{incentive.requirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Reward:</span>
                      <span className="text-sm text-green-400">{incentive.reward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Total Earned:</span>
                      <span className="text-sm text-white">${incentive.earned.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="secondary" className="flex-1" onClick={() => handleViewIncentiveDetails(incentive)}>
                      View Details
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => handleEditIncentive(incentive)}>
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-6">
          <HOAProspectManagement />
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-6">
          {/* HOA Recruitment Activities Header */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-green-400" />
                  HOA Recruitment Pipeline
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Activity className="w-4 h-4 mr-2" />
                      Log HOA Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Log HOA Recruitment Activity</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Activity Type</label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select activity type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="initial_contact">Initial Contact</SelectItem>
                              <SelectItem value="presentation">Board Presentation</SelectItem>
                              <SelectItem value="follow_up">Follow-up Call</SelectItem>
                              <SelectItem value="site_visit">Property Visit</SelectItem>
                              <SelectItem value="contract_review">Contract Review</SelectItem>
                              <SelectItem value="negotiation">Negotiation Meeting</SelectItem>
                              <SelectItem value="onboarding">Partnership Onboarding</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">HOA</label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select HOA" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              {hoaPartnerships.map((hoa) => (
                                <SelectItem key={hoa.id} value={hoa.id}>
                                  {hoa.name} - {hoa.location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                        <Textarea 
                          placeholder="Detailed description of the HOA recruitment activity..."
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Outcome</label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select outcome" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="interested">HOA Interested</SelectItem>
                              <SelectItem value="presentation_scheduled">Presentation Scheduled</SelectItem>
                              <SelectItem value="proposal_requested">Proposal Requested</SelectItem>
                              <SelectItem value="contract_sent">Contract Sent</SelectItem>
                              <SelectItem value="negotiating">In Negotiation</SelectItem>
                              <SelectItem value="signed">Partnership Signed</SelectItem>
                              <SelectItem value="declined">HOA Declined</SelectItem>
                              <SelectItem value="no_response">No Response</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Contact Person</label>
                          <Input 
                            placeholder="Board member or property manager name"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Next Action</label>
                        <Input 
                          placeholder="What's the next step in this recruitment process?"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Log Activity
                        </Button>
                        <Button variant="outline" className="border-gray-600">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Alert className="bg-blue-500/10 border-blue-500/20">
                <AlertDescription className="text-blue-300">
                  <strong>Recruitment Strategy:</strong> Target HOAs with 150+ units, active leadership, and existing vendor relationships. Focus on demonstrating cost savings and convenience benefits for residents.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* HOA Pipeline Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">24</div>
                <div className="text-sm text-gray-400">Prospects</div>
                <div className="text-xs text-blue-400">Under evaluation</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">8</div>
                <div className="text-sm text-gray-400">In Negotiation</div>
                <div className="text-xs text-yellow-400">Contract discussions</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Handshake className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">3</div>
                <div className="text-sm text-gray-400">Ready to Launch</div>
                <div className="text-xs text-green-400">Onboarding phase</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">47</div>
                <div className="text-sm text-gray-400">Total Activities</div>
                <div className="text-xs text-purple-400">This quarter</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent HOA Recruitment Activities */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent HOA Recruitment Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-gray-700/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">Presentation</Badge>
                      <h4 className="font-medium text-white">Heritage Park Association</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Jan 29, 2025</div>
                      <div className="text-xs text-gray-500">by Sarah Chen</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Delivered comprehensive presentation to board members about home services partnership benefits</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                      Proposal Requested
                    </Badge>
                    <div className="text-xs text-blue-400">
                      Next: Send detailed proposal (Feb 1)
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-gray-700/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-600">Follow-up</Badge>
                      <h4 className="font-medium text-white">Oakwood Commons</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Jan 28, 2025</div>
                      <div className="text-xs text-gray-500">by Mike Rodriguez</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Follow-up call with board president to address insurance and liability questions</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Contract Sent
                    </Badge>
                    <div className="text-xs text-blue-400">
                      Next: Contract review meeting (Jan 31)
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 bg-gray-700/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-600">Site Visit</Badge>
                      <h4 className="font-medium text-white">Sunrise Village HOA</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Jan 27, 2025</div>
                      <div className="text-xs text-gray-500">by Jennifer Walsh</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Property walkthrough with management company to understand maintenance needs and resident pain points</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Interested
                    </Badge>
                    <div className="text-xs text-blue-400">
                      Next: Board presentation scheduled (Feb 3)
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 bg-gray-700/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-600">Initial Contact</Badge>
                      <h4 className="font-medium text-white">Meadowbrook Estates</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Jan 26, 2025</div>
                      <div className="text-xs text-gray-500">by David Kim</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Cold outreach to board president regarding vendor cost optimization opportunities</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                      Interested
                    </Badge>
                    <div className="text-xs text-blue-400">
                      Next: Schedule information meeting (Jan 30)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Tools & Resources */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recruitment Tools & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => setShowPresentationKit(true)}
                  className="h-auto p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">HOA Presentation Kit</p>
                    <p className="text-sm text-blue-300">Customizable presentations for board meetings</p>
                  </div>
                </Button>

                <Button className="h-auto p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30">
                  <div className="text-left">
                    <p className="font-semibold text-white">ROI Calculator</p>
                    <p className="text-sm text-green-300">Show cost savings and convenience benefits</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowCaseStudies(true)}
                  className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Case Studies</p>
                    <p className="text-sm text-purple-300">Success stories from existing HOAs</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowContractTemplates(true)}
                  className="h-auto p-4 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Contract Templates</p>
                    <p className="text-sm text-yellow-300">Standardized partnership agreements</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Incentive Modal */}
      <Dialog open={showCreateIncentive} onOpenChange={setShowCreateIncentive}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-400" />
              Create New HOA Incentive
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new incentive program to reward HOA leaders, members, or communities.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Incentive Type
              </label>
              <Select 
                value={newIncentive.type} 
                onValueChange={(value: 'leader' | 'member' | 'community') => 
                  setNewIncentive(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select incentive type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="leader">Leader Incentive</SelectItem>
                  <SelectItem value="member">Member Incentive</SelectItem>
                  <SelectItem value="community">Community Incentive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Title
              </label>
              <Input
                value={newIncentive.title}
                onChange={(e) => setNewIncentive(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter incentive title"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Description
              </label>
              <Textarea
                value={newIncentive.description}
                onChange={(e) => setNewIncentive(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the incentive program"
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Requirement
              </label>
              <Input
                value={newIncentive.requirement}
                onChange={(e) => setNewIncentive(prev => ({ ...prev, requirement: e.target.value }))}
                placeholder="What needs to be achieved?"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Reward
              </label>
              <Input
                value={newIncentive.reward}
                onChange={(e) => setNewIncentive(prev => ({ ...prev, reward: e.target.value }))}
                placeholder="What reward will be given?"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Value ($)
              </label>
              <Input
                type="number"
                value={newIncentive.value}
                onChange={(e) => setNewIncentive(prev => ({ ...prev, value: Number(e.target.value) }))}
                placeholder="0"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancelCreate}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveIncentive}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!newIncentive.title || !newIncentive.description}
            >
              Create Incentive
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New HOA Modal */}
      <Dialog open={showAddNewHOA} onOpenChange={setShowAddNewHOA}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              Add New HOA Partnership
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new HOA partnership to expand your community network.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  HOA Name *
                </label>
                <Input
                  value={newHOA.name}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter HOA name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Location *
                </label>
                <Input
                  value={newHOA.location}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Number of Units
                </label>
                <Input
                  type="number"
                  value={newHOA.units}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, units: Number(e.target.value) }))}
                  placeholder="0"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Contact Person *
                </label>
                <Input
                  value={newHOA.contactPerson}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Primary contact name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  value={newHOA.email}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@hoa.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Phone
                </label>
                <Input
                  value={newHOA.phone}
                  onChange={(e) => setNewHOA(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Membership Tier
                </label>
                <Select 
                  value={newHOA.membershipTier} 
                  onValueChange={(value: 'bronze' | 'silver' | 'gold' | 'platinum') => 
                    setNewHOA(prev => ({ ...prev, membershipTier: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Status
                </label>
                <Select 
                  value={newHOA.status} 
                  onValueChange={(value: 'prospect' | 'pending' | 'active') => 
                    setNewHOA(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancelAddHOA}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveHOA}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!newHOA.name || !newHOA.location || !newHOA.contactPerson || !newHOA.email}
            >
              Add HOA Partnership
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* HOA Presentation Kit Modal */}
      <Dialog open={showPresentationKit} onOpenChange={setShowPresentationKit}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              HOA Presentation Kit
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete presentation materials for HOA board meetings and community presentations
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Presentation Templates */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Presentation Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Board Meeting Presentation</h4>
                    <p className="text-sm text-gray-300 mb-3">15-slide presentation for formal board meetings with ROI analysis and implementation timeline</p>
                    <div className="space-y-2">
                      <div className="text-xs text-blue-300">• Executive Summary & Value Proposition</div>
                      <div className="text-xs text-blue-300">• Cost Comparison & Savings Analysis</div>
                      <div className="text-xs text-blue-300">• Implementation Timeline & Process</div>
                      <div className="text-xs text-blue-300">• Q&A Section with Common Questions</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Community Info Session</h4>
                    <p className="text-sm text-gray-300 mb-3">Interactive presentation for resident meetings focusing on convenience and benefits</p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-300">• Resident Benefits & Convenience</div>
                      <div className="text-xs text-green-300">• Service Examples & Success Stories</div>
                      <div className="text-xs text-green-300">• How to Get Started Guide</div>
                      <div className="text-xs text-green-300">• Live Demo Walkthrough</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Supporting Materials */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Supporting Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">ROI Calculator</h4>
                    <p className="text-sm text-gray-300 mb-3">Interactive calculator showing cost savings for different community sizes</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Open Calculator
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">FAQ Document</h4>
                    <p className="text-sm text-gray-300 mb-3">25 most common questions with detailed answers</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      View FAQ
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Implementation Guide</h4>
                    <p className="text-sm text-gray-300 mb-3">Step-by-step rollout process for HOA partnerships</p>
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Case Studies Modal */}
      <Dialog open={showCaseStudies} onOpenChange={setShowCaseStudies}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              HOA Success Case Studies
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Real success stories from existing HOA partnerships demonstrating value and outcomes
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Featured Case Studies */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Sunset Ridge Community</h3>
                      <p className="text-sm text-gray-400">245 units • Launched March 2024</p>
                    </div>
                    <Badge className="bg-green-600">Platinum Partner</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">73%</div>
                      <div className="text-xs text-gray-400">Member Participation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$127K</div>
                      <div className="text-xs text-gray-400">Annual Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.8/5</div>
                      <div className="text-xs text-gray-400">Satisfaction Rating</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Challenge</h4>
                      <p className="text-sm text-gray-300">Rising maintenance costs and difficulty coordinating vendor services across 245 units. Board spending 15+ hours monthly on vendor management.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Solution</h4>
                      <p className="text-sm text-gray-300">Implemented tiered membership program with 25% HOA discount. AI-powered scheduling reduced coordination time by 85%.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Results</h4>
                      <p className="text-sm text-gray-300">73% resident adoption, $127K annual cost savings, board administration time reduced from 15 hours to 2 hours monthly.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Oakwood Manor HOA</h3>
                      <p className="text-sm text-gray-400">158 units • Launched June 2024</p>
                    </div>
                    <Badge className="bg-yellow-600">Gold Partner</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">89%</div>
                      <div className="text-xs text-gray-400">Member Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$78K</div>
                      <div className="text-xs text-gray-400">Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">3.2x</div>
                      <div className="text-xs text-gray-400">Service Speed</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Challenge</h4>
                      <p className="text-sm text-gray-300">Emergency HVAC and plumbing issues causing resident dissatisfaction. Average repair time: 4.5 days.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Solution</h4>
                      <p className="text-sm text-gray-300">Priority emergency response program with 2-hour response time guarantee and dedicated technician pool.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Results</h4>
                      <p className="text-sm text-gray-300">Emergency response time reduced to 1.4 hours. 89% resident satisfaction increase. 47% reduction in vendor costs.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Program Performance Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">94%</div>
                    <div className="text-xs text-gray-400">HOAs Report Savings</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">$89K</div>
                    <div className="text-xs text-gray-400">Average Annual Savings</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">67%</div>
                    <div className="text-xs text-gray-400">Average Participation</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">4.7/5</div>
                    <div className="text-xs text-gray-400">Average Rating</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contract Templates Modal */}
      <Dialog open={showContractTemplates} onOpenChange={setShowContractTemplates}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-yellow-400" />
              HOA Contract Templates
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Standardized partnership agreements and legal documents for HOA partnerships
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Contract Types */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Partnership Agreement Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Standard HOA Partnership Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive partnership contract for communities with 50-300 units</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-yellow-300">• Service scope and pricing structure</div>
                      <div className="text-xs text-yellow-300">• Member discount tiers and benefits</div>
                      <div className="text-xs text-yellow-300">• Performance standards and SLAs</div>
                      <div className="text-xs text-yellow-300">• Termination and renewal clauses</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Premium Partnership Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Enhanced contract for large communities (300+ units) with custom terms</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-blue-300">• Dedicated account management</div>
                      <div className="text-xs text-blue-300">• Priority emergency response</div>
                      <div className="text-xs text-blue-300">• Custom reporting and analytics</div>
                      <div className="text-xs text-blue-300">• Bulk service discounts</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Supporting Documents */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Supporting Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Service Level Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Detailed SLA template with response times and quality standards</p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Download SLA
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Pricing Schedule</h4>
                    <p className="text-sm text-gray-300 mb-3">Standard pricing structure with discount tiers and member benefits</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Download Pricing
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Amendment Templates</h4>
                    <p className="text-sm text-gray-300 mb-3">Contract modification templates for scope changes</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Legal Notes */}
            <div>
              <Alert className="bg-blue-900/30 border-blue-500/30">
                <AlertDescription className="text-blue-300">
                  <strong>Legal Notice:</strong> All contract templates have been reviewed by legal counsel and comply with relevant state and local regulations. Recommend legal review for community-specific requirements.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}