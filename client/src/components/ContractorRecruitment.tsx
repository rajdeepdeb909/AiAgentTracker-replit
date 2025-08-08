import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContractorRecruitment as ContractorRecruitmentType, RecruitmentTarget, RecruitmentActivity } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Users, Target, Activity, Plus, Filter, ArrowLeft, MapPin, Wrench, Package, Star, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import SystemWideActivityFeed from './SystemWideActivityFeed';

// Form schemas matching actual schema
const contractorFormSchema = z.object({
  contractorType: z.enum(['individual', 'firm']),
  firstName: z.string().optional(),
  lastName: z.string().optional(), 
  firmName: z.string().optional(),
  firmOwnerName: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  planningArea: z.string().min(1, 'Planning area is required'),
  serviceSkills: z.array(z.string()).min(1, 'At least one service skill required'),
  productSpecialties: z.array(z.string()).min(1, 'At least one product specialty required'),
  certifications: z.array(z.string()).default([]),
  yearsExperience: z.number().min(0, 'Experience years required'),
  // Additional fields for form UI (not in database)
  weeklyAvailability: z.string().min(1, 'Availability required'),
  recruitmentStatus: z.enum(['screening', 'interviewing', 'background_check', 'onboarding', 'active', 'inactive']),
  hourlyRate: z.number().min(0),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.contractorType === 'individual') {
    return data.firstName && data.lastName;
  } else {
    return data.firmName && data.firmOwnerName;
  }
}, {
  message: 'Individual contractors need first/last name. Firms need firm name and owner name.',
  path: ['contractorType']
});

const targetFormSchema = z.object({
  planningArea: z.string().min(1, 'Planning area is required'),
  targetContractors: z.number().min(1, 'Target must be at least 1'),
  currentContractors: z.number().min(0),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']),
  targetDate: z.date(),
  targetStatus: z.enum(['planning', 'active', 'completed', 'on_hold']),
  notes: z.string().optional(),
});

type ContractorFormData = z.infer<typeof contractorFormSchema>;
type TargetFormData = z.infer<typeof targetFormSchema>;

// Constants
const SERVICE_SKILLS = [
  'Appliance Repair', 'HVAC Service', 'Plumbing', 'Electrical', 'Handyman Services',
  'Smart Home Installation', 'Maintenance Services', 'Emergency Repairs'
];

const PRODUCT_SPECIALTIES = [
  'Refrigerators', 'Washers/Dryers', 'Dishwashers', 'Ovens/Ranges', 'Microwaves',
  'Water Heaters', 'Air Conditioners', 'Furnaces', 'Smart Appliances'
];

const CERTIFICATIONS = [
  'EPA 608 Certification', 'HVAC Excellence', 'NATE Certification', 'Electrical License',
  'Plumbing License', 'Appliance Service Certification', 'Smart Home Installation'
];

const PRODUCTS_BRANDS = [
  'Whirlpool', 'GE', 'Samsung', 'LG', 'Frigidaire', 'Maytag', 'KitchenAid',
  'Bosch', 'Carrier', 'Trane', 'Lennox', 'Rheem', 'American Standard'
];

const PLANNING_AREAS = [
  'Houston Metro', 'Dallas-Fort Worth', 'Austin Metro', 'San Antonio',
  'Phoenix Metro', 'Miami-Dade', 'Tampa Bay', 'Orlando Metro',
  'Atlanta Metro', 'Charlotte Metro', 'Nashville Metro', 'Denver Metro'
];

function ContractorRecruitment() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [editingContractor, setEditingContractor] = useState<any | null>(null);
  const [editingTarget, setEditingTarget] = useState<any | null>(null);
  const [showRecruitmentKit, setShowRecruitmentKit] = useState(false);
  const [showContractorCaseStudies, setShowContractorCaseStudies] = useState(false);
  const [showContractorTemplates, setShowContractorTemplates] = useState(false);
  const [selectedPlanningArea, setSelectedPlanningArea] = useState('Dallas-Fort Worth');
  const [filters, setFilters] = useState({
    planningArea: 'Dallas-Fort Worth',
    recruitmentStatus: '',
    serviceSkills: [] as string[],
    productSpecialties: [] as string[]
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Contractor form
  const contractorForm = useForm<ContractorFormData>({
    resolver: zodResolver(contractorFormSchema),
    defaultValues: {
      contractorType: 'individual',
      firstName: '',
      lastName: '',
      firmName: '',
      firmOwnerName: '',
      phone: '',
      email: '',
      planningArea: 'Dallas-Fort Worth',
      serviceSkills: ['HVAC Repair'],
      productSpecialties: ['Air Conditioning'],
      certifications: [],
      yearsExperience: 2,
      weeklyAvailability: 'Full-time (40+ hours/week)',
      recruitmentStatus: 'screening',
      hourlyRate: 35,
      notes: '',
    },
  });

  // Target form
  const targetForm = useForm<TargetFormData>({
    resolver: zodResolver(targetFormSchema),
    defaultValues: {
      planningArea: '',
      targetContractors: 10,
      currentContractors: 0,
      urgencyLevel: 'medium',
      targetDate: new Date(),
      targetStatus: 'planning',
      notes: '',
    },
  });

  // Reset forms when modals close
  useEffect(() => {
    if (!showContractorModal) {
      contractorForm.reset();
      setEditingContractor(null);
    }
    if (!showTargetModal) {
      targetForm.reset();
      setEditingTarget(null);
    }
  }, [showContractorModal, showTargetModal, contractorForm, targetForm]);

  // Load editing data
  useEffect(() => {
    if (editingContractor) {
      contractorForm.reset({
        firstName: editingContractor.firstName || '',
        lastName: editingContractor.lastName || '',
        phone: editingContractor.phone || '',
        email: editingContractor.email || '',
        planningArea: editingContractor.planningArea,
        serviceSkills: editingContractor.serviceSkills || [],
        productSpecialties: editingContractor.productSpecialties || [],
        yearsExperience: editingContractor.yearsExperience || 2,
        weeklyAvailability: editingContractor.weeklyAvailability || 'Full-time (40+ hours/week)',
        recruitmentStatus: editingContractor.recruitmentStatus as any,
        hourlyRate: editingContractor.hourlyRate || 25,
        notes: editingContractor.notes || '',
      });
    }
    if (editingTarget) {
      targetForm.reset({
        planningArea: editingTarget.planningArea,
        targetContractors: editingTarget.targetContractors,
        currentContractors: editingTarget.currentContractors || 0,
        urgencyLevel: editingTarget.urgencyLevel as any,
        targetDate: new Date(editingTarget.targetDate || new Date()),
        targetStatus: editingTarget.targetStatus as any,
        notes: editingTarget.notes || '',
      });
    }
  }, [editingContractor, editingTarget, contractorForm, targetForm]);

  // Queries
  const { data: contractors = [], isLoading: contractorsLoading } = useQuery({
    queryKey: ['/api/contractor-recruitment', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.planningArea) params.append('planningArea', filters.planningArea);
      if (filters.recruitmentStatus) params.append('recruitmentStatus', filters.recruitmentStatus);
      filters.serviceSkills.forEach(skill => params.append('serviceSkills', skill));
      filters.productSpecialties.forEach(product => params.append('productSpecialties', product));
      
      const response = await fetch(`/api/contractor-recruitment?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch contractors');
      return response.json();
    },
  });

  const { data: targets = [] } = useQuery({
    queryKey: ['/api/recruitment-targets'],
    queryFn: async () => {
      const response = await fetch('/api/recruitment-targets');
      if (!response.ok) throw new Error('Failed to fetch targets');
      return response.json();
    },
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['/api/recruitment-activities'],
    queryFn: async () => {
      const response = await fetch('/api/recruitment-activities');
      if (!response.ok) throw new Error('Failed to fetch activities');
      return response.json();
    },
  });

  // Mutations
  const createContractorMutation = useMutation({
    mutationFn: async (data: ContractorFormData) => {
      console.log('Creating contractor with data:', data);
      const response = await fetch('/api/contractor-recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to create contractor:', response.status, errorText);
        throw new Error('Failed to create contractor');
      }
      return response.json();
    },
    onSuccess: () => {
      console.log('Contractor created successfully');
      queryClient.invalidateQueries({ queryKey: ['/api/contractor-recruitment'] });
      setShowContractorModal(false);
      contractorForm.reset();
      toast({ title: 'Success', description: 'Contractor added successfully' });
    },
    onError: (error) => {
      console.error('Error creating contractor:', error);
      toast({ title: 'Error', description: 'Failed to add contractor', variant: 'destructive' });
    },
  });

  const updateContractorMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ContractorFormData> }) => {
      const response = await fetch(`/api/contractor-recruitment/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update contractor');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contractor-recruitment'] });
      setShowContractorModal(false);
      toast({ title: 'Success', description: 'Contractor updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update contractor', variant: 'destructive' });
    },
  });

  const createTargetMutation = useMutation({
    mutationFn: async (data: TargetFormData) => {
      const response = await fetch('/api/recruitment-targets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create target');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recruitment-targets'] });
      setShowTargetModal(false);
      toast({ title: 'Success', description: 'Recruitment target created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create target', variant: 'destructive' });
    },
  });

  const updateTargetMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<TargetFormData> }) => {
      const response = await fetch(`/api/recruitment-targets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update target');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/recruitment-targets'] });
      setShowTargetModal(false);
      toast({ title: 'Success', description: 'Target updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update target', variant: 'destructive' });
    },
  });

  // Handlers
  const handleContractorSubmit = (data: ContractorFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', contractorForm.formState.errors);
    console.log('Form validation state:', contractorForm.formState.isValid);
    
    // Debug contractor type validation
    if (data.contractorType === 'firm' && (!data.firmName || !data.firmOwnerName)) {
      console.error('Firm validation failed:', { firmName: data.firmName, firmOwnerName: data.firmOwnerName });
      toast({ 
        title: 'Validation Error', 
        description: 'Firm name and owner name are required for contractor firms', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (data.contractorType === 'individual' && (!data.firstName || !data.lastName)) {
      console.error('Individual validation failed:', { firstName: data.firstName, lastName: data.lastName });
      toast({ 
        title: 'Validation Error', 
        description: 'First name and last name are required for individual contractors', 
        variant: 'destructive' 
      });
      return;
    }
    
    // Map form data to database schema (exclude UI-only fields)
    const contractorData = {
      contractorType: data.contractorType,
      firstName: data.firstName,
      lastName: data.lastName,
      firmName: data.firmName,
      firmOwnerName: data.firmOwnerName,
      email: data.email,
      phone: data.phone,
      planningArea: data.planningArea,
      serviceSkills: data.serviceSkills,
      productSpecialties: data.productSpecialties,
      certifications: data.certifications,
      yearsExperience: data.yearsExperience,
      // Store UI fields in notes for now
      notes: `${data.notes || ''}\nAvailability: ${data.weeklyAvailability}\nStatus: ${data.recruitmentStatus}\nRate: $${data.hourlyRate}/hr`.trim(),
    };
    
    if (editingContractor) {
      updateContractorMutation.mutate({ id: editingContractor.id, data: contractorData });
    } else {
      createContractorMutation.mutate(contractorData);
    }
  };

  const handleTargetSubmit = (data: TargetFormData) => {
    if (editingTarget) {
      updateTargetMutation.mutate({ id: editingTarget.id, data });
    } else {
      createTargetMutation.mutate(data);
    }
  };

  const handleEditContractor = (contractor: any) => {
    setEditingContractor(contractor);
    setShowContractorModal(true);
  };

  const handleEditTarget = (target: any) => {
    setEditingTarget(target);
    setShowTargetModal(true);
  };

  // Statistics
  const stats = {
    totalContractors: contractors.length,
    activeContractors: contractors.filter((c: any) => c.recruitmentStatus === 'active').length,
    pendingScreening: contractors.filter((c: any) => c.recruitmentStatus === 'screening').length,
    totalTargets: targets.length,
    completedTargets: targets.filter((t: any) => t.targetStatus === 'completed').length,
    planningAreas: Array.from(new Set(contractors.map((c: any) => c.planningArea))).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'screening': return 'bg-yellow-500';
      case 'interviewing': return 'bg-blue-500';
      case 'background_check': return 'bg-purple-500';
      case 'onboarding': return 'bg-orange-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">1099 Contractor Recruitment</h1>
            <p className="text-gray-400">Manage contractor recruitment by planning area, skills, and specialties</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showTargetModal} onOpenChange={setShowTargetModal}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Set Target
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingTarget ? 'Edit Recruitment Target' : 'Set Recruitment Target'}
                </DialogTitle>
              </DialogHeader>
              <Form {...targetForm}>
                <form onSubmit={targetForm.handleSubmit(handleTargetSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={targetForm.control}
                      name="planningArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Planning Area</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select planning area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              {PLANNING_AREAS.map((area) => (
                                <SelectItem key={area} value={area} className="text-white">
                                  {area}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={targetForm.control}
                      name="targetStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="planning" className="text-white">Planning</SelectItem>
                              <SelectItem value="active" className="text-white">Active</SelectItem>
                              <SelectItem value="completed" className="text-white">Completed</SelectItem>
                              <SelectItem value="on_hold" className="text-white">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={targetForm.control}
                      name="targetContractors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Target Contractors</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={targetForm.control}
                      name="currentContractors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Current Contractors</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={targetForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Additional notes..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowTargetModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createTargetMutation.isPending || updateTargetMutation.isPending}
                    >
                      {editingTarget ? 'Update Target' : 'Create Target'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Button onClick={() => setShowContractorModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contractor
          </Button>
          
          <Dialog open={showContractorModal} onOpenChange={setShowContractorModal}>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingContractor ? 'Edit Contractor' : 'Add New Contractor'}
                </DialogTitle>
              </DialogHeader>
              <Form {...contractorForm}>
                <form onSubmit={contractorForm.handleSubmit(handleContractorSubmit)} className="space-y-4">
                  {/* Contractor Type Selector */}
                  <FormField
                    control={contractorForm.control}
                    name="contractorType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Contractor Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select contractor type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="individual" className="text-white">Individual Contractor</SelectItem>
                            <SelectItem value="firm" className="text-white">Contractor Firm</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Conditional Fields Based on Contractor Type */}
                  {contractorForm.watch('contractorType') === 'individual' ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={contractorForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">First Name</FormLabel>
                            <FormControl>
                              <Input className="bg-gray-800 border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Last Name</FormLabel>
                            <FormControl>
                              <Input className="bg-gray-800 border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={contractorForm.control}
                        name="firmName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Firm Name</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-gray-800 border-gray-700 text-white" 
                                {...field} 
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="firmOwnerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Firm Owner Name</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-gray-800 border-gray-700 text-white" 
                                {...field} 
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={contractorForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone</FormLabel>
                          <FormControl>
                            <Input className="bg-gray-800 border-gray-700 text-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contractorForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input type="email" className="bg-gray-800 border-gray-700 text-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Planning Area */}
                  <FormField
                    control={contractorForm.control}
                    name="planningArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Planning Area</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select planning area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {PLANNING_AREAS.map((area) => (
                              <SelectItem key={area} value={area} className="text-white">
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Firm-specific fields */}
                  {contractorForm.watch('contractorType') === 'firm' && (
                    <div className="space-y-4 border-t border-gray-600 pt-4">
                      <h3 className="text-lg font-semibold text-white">Firm Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={contractorForm.control}
                          name="teamSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Team Size</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1"
                                  className="bg-gray-800 border-gray-700 text-white" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contractorForm.control}
                          name="insuranceCoverage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Insurance Coverage</FormLabel>
                              <FormControl>
                                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="e.g., General Liability, Workers Comp" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormLabel className="text-white">Firm Certifications</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {CERTIFICATIONS.map((cert) => (
                            <label key={cert} className="flex items-center space-x-2 text-sm text-gray-300">
                              <input
                                type="checkbox"
                                checked={contractorForm.watch('firmCertifications')?.includes(cert) || false}
                                onChange={(e) => {
                                  const current = contractorForm.getValues('firmCertifications') || [];
                                  if (e.target.checked) {
                                    contractorForm.setValue('firmCertifications', [...current, cert]);
                                  } else {
                                    contractorForm.setValue('firmCertifications', current.filter(c => c !== cert));
                                  }
                                }}
                                className="rounded"
                              />
                              <span>{cert}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel className="text-white">Brands Serviced</FormLabel>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {PRODUCTS_BRANDS.map((product) => (
                              <label key={product} className="flex items-center space-x-2 text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={contractorForm.watch('productsServiced')?.includes(product) || false}
                                  onChange={(e) => {
                                    const current = contractorForm.getValues('productsServiced') || [];
                                    if (e.target.checked) {
                                      contractorForm.setValue('productsServiced', [...current, product]);
                                    } else {
                                      contractorForm.setValue('productsServiced', current.filter(p => p !== product));
                                    }
                                  }}
                                  className="rounded"
                                />
                                <span>{product}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <FormLabel className="text-white">Brands NOT Serviced</FormLabel>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {PRODUCTS_BRANDS.map((product) => (
                              <label key={product} className="flex items-center space-x-2 text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={contractorForm.watch('productsNotServiced')?.includes(product) || false}
                                  onChange={(e) => {
                                    const current = contractorForm.getValues('productsNotServiced') || [];
                                    if (e.target.checked) {
                                      contractorForm.setValue('productsNotServiced', [...current, product]);
                                    } else {
                                      contractorForm.setValue('productsNotServiced', current.filter(p => p !== product));
                                    }
                                  }}
                                  className="rounded"
                                />
                                <span>{product}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Individual contractor certifications */}
                  {contractorForm.watch('contractorType') === 'individual' && (
                    <div className="space-y-2">
                      <FormLabel className="text-white">Certifications</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {CERTIFICATIONS.map((cert) => (
                          <label key={cert} className="flex items-center space-x-2 text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={contractorForm.watch('certifications')?.includes(cert) || false}
                              onChange={(e) => {
                                const current = contractorForm.getValues('certifications') || [];
                                if (e.target.checked) {
                                  contractorForm.setValue('certifications', [...current, cert]);
                                } else {
                                  contractorForm.setValue('certifications', current.filter(c => c !== cert));
                                }
                              }}
                              className="rounded"
                            />
                            <span>{cert}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common fields */}
                  <div className="space-y-4 border-t border-gray-600 pt-4">
                    <FormField
                      control={contractorForm.control}
                      name="planningArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Planning Area</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select planning area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              {PLANNING_AREAS.map((area) => (
                                <SelectItem key={area} value={area} className="text-white">
                                  {area}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={contractorForm.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Experience Years</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0"
                                className="bg-gray-800 border-gray-700 text-white" 
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Hourly Rate ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0"
                                className="bg-gray-800 border-gray-700 text-white" 
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="weeklyAvailability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Weekly Availability</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="Part-time (10-20 hours/week)" className="text-white">Part-time (10-20 hours)</SelectItem>
                                <SelectItem value="Part-time (20-30 hours/week)" className="text-white">Part-time (20-30 hours)</SelectItem>
                                <SelectItem value="Full-time (40+ hours/week)" className="text-white">Full-time (40+ hours)</SelectItem>
                                <SelectItem value="Flexible/On-call" className="text-white">Flexible/On-call</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <FormLabel className="text-white">Service Skills</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {SERVICE_SKILLS.map((skill) => (
                            <label key={skill} className="flex items-center space-x-2 text-sm text-gray-300">
                              <input
                                type="checkbox"
                                checked={contractorForm.watch('serviceSkills')?.includes(skill) || false}
                                onChange={(e) => {
                                  const current = contractorForm.getValues('serviceSkills') || [];
                                  if (e.target.checked) {
                                    contractorForm.setValue('serviceSkills', [...current, skill]);
                                  } else {
                                    contractorForm.setValue('serviceSkills', current.filter(s => s !== skill));
                                  }
                                }}
                                className="rounded"
                              />
                              <span>{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <FormLabel className="text-white">Product Specialties</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {PRODUCT_SPECIALTIES.map((specialty) => (
                            <label key={specialty} className="flex items-center space-x-2 text-sm text-gray-300">
                              <input
                                type="checkbox"
                                checked={contractorForm.watch('productSpecialties')?.includes(specialty) || false}
                                onChange={(e) => {
                                  const current = contractorForm.getValues('productSpecialties') || [];
                                  if (e.target.checked) {
                                    contractorForm.setValue('productSpecialties', [...current, specialty]);
                                  } else {
                                    contractorForm.setValue('productSpecialties', current.filter(p => p !== specialty));
                                  }
                                }}
                                className="rounded"
                              />
                              <span>{specialty}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Brands section for individual contractors */}
                      {contractorForm.watch('contractorType') === 'individual' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <FormLabel className="text-white">Brands Serviced</FormLabel>
                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                              {PRODUCTS_BRANDS.map((product) => (
                                <label key={product} className="flex items-center space-x-2 text-sm text-gray-300">
                                  <input
                                    type="checkbox"
                                    checked={contractorForm.watch('productsServiced')?.includes(product) || false}
                                    onChange={(e) => {
                                      const current = contractorForm.getValues('productsServiced') || [];
                                      if (e.target.checked) {
                                        contractorForm.setValue('productsServiced', [...current, product]);
                                      } else {
                                        contractorForm.setValue('productsServiced', current.filter(p => p !== product));
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <span>{product}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <FormLabel className="text-white">Brands NOT Serviced</FormLabel>
                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                              {PRODUCTS_BRANDS.map((product) => (
                                <label key={product} className="flex items-center space-x-2 text-sm text-gray-300">
                                  <input
                                    type="checkbox"
                                    checked={contractorForm.watch('productsNotServiced')?.includes(product) || false}
                                    onChange={(e) => {
                                      const current = contractorForm.getValues('productsNotServiced') || [];
                                      if (e.target.checked) {
                                        contractorForm.setValue('productsNotServiced', [...current, product]);
                                      } else {
                                        contractorForm.setValue('productsNotServiced', current.filter(p => p !== product));
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <span>{product}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Experience and Availability */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={contractorForm.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Experience Years</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="weeklyAvailability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Weekly Availability</FormLabel>
                            <FormControl>
                              <Input className="bg-gray-800 border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Status and Rate */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={contractorForm.control}
                        name="recruitmentStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Recruitment Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="screening" className="text-white">Screening</SelectItem>
                                <SelectItem value="interviewing" className="text-white">Interviewing</SelectItem>
                                <SelectItem value="background_check" className="text-white">Background Check</SelectItem>
                                <SelectItem value="onboarding" className="text-white">Onboarding</SelectItem>
                                <SelectItem value="active" className="text-white">Active</SelectItem>
                                <SelectItem value="inactive" className="text-white">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contractorForm.control}
                        name="hourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Hourly Rate ($/hour)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contractorForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-gray-800 border-gray-700 text-white"
                              placeholder="Additional notes about the contractor..."
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowContractorModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={contractorForm.formState.isSubmitting}
                    >
                      {editingContractor ? 'Update Contractor' : 'Add Contractor'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Contractors</p>
                <p className="text-xl font-bold text-white">{stats.totalContractors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-xl font-bold text-white">{stats.activeContractors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-yellow-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-400">Screening</p>
                <p className="text-xl font-bold text-white">{stats.pendingScreening}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Targets Set</p>
                <p className="text-xl font-bold text-white">{stats.totalTargets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-xl font-bold text-white">{stats.completedTargets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Planning Areas</p>
                <p className="text-xl font-bold text-white">{stats.planningAreas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Planning Area Selector */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <label className="text-white font-medium">Planning Area:</label>
            </div>
            <Select 
              value={selectedPlanningArea} 
              onValueChange={(value) => {
                setSelectedPlanningArea(value);
                setFilters(prev => ({ ...prev, planningArea: value }));
              }}
            >
              <SelectTrigger className="w-64 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {PLANNING_AREAS.map((area) => (
                  <SelectItem key={area} value={area} className="text-white">
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Viewing contractors and targets for</span>
              <Badge variant="outline" className="text-blue-300 border-blue-500">
                {selectedPlanningArea}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            <Users className="h-4 w-4 mr-2" />
            Contractors by Area
          </TabsTrigger>
          <TabsTrigger value="targets" className="data-[state=active]:bg-gray-700">
            <Target className="h-4 w-4 mr-2" />
            Targets by Area
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-gray-700">
            <Activity className="h-4 w-4 mr-2" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="live-activity" className="data-[state=active]:bg-gray-700">
            <Activity className="h-4 w-4 mr-2" />
            Live Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Contractors Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Contractors in {selectedPlanningArea}
              </h2>
              <p className="text-sm text-gray-400">
                {contractors.length} contractors found
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select
                value={filters.recruitmentStatus}
                onValueChange={(value) => setFilters({ ...filters, recruitmentStatus: value })}
              >
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white">All Statuses</SelectItem>
                  <SelectItem value="screening" className="text-white">Screening</SelectItem>
                  <SelectItem value="interviewing" className="text-white">Interviewing</SelectItem>
                  <SelectItem value="background_check" className="text-white">Background Check</SelectItem>
                  <SelectItem value="onboarding" className="text-white">Onboarding</SelectItem>
                  <SelectItem value="active" className="text-white">Active</SelectItem>
                  <SelectItem value="inactive" className="text-white">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={showContractorModal} onOpenChange={setShowContractorModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contractor
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingContractor ? 'Edit Contractor' : 'Add Contractor'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...contractorForm}>
                    <form onSubmit={contractorForm.handleSubmit(handleContractorSubmit)} className="space-y-4">
                      {/* All contractor form fields would go here - keeping existing form */}
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setShowContractorModal(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingContractor ? 'Update' : 'Add'} Contractor
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Contractors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contractorsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded mb-2" />
                      <div className="h-3 bg-gray-700 rounded mb-1" />
                      <div className="h-3 bg-gray-700 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : contractors.map((contractor: any) => (
              <Card key={contractor.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer">
                <CardContent className="p-4" onClick={() => handleEditContractor(contractor)}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {contractor.contractorType === 'firm' 
                            ? contractor.firmName || 'Contractor Firm'
                            : `${contractor.firstName} ${contractor.lastName}`
                          }
                        </h3>
                        <p className="text-xs text-gray-400">
                          {contractor.contractorType === 'firm' ? 'Contractor Firm' : 'Individual Contractor'}
                          {contractor.contractorType === 'firm' && contractor.teamSize > 1 && (
                            <span> • {contractor.teamSize} technicians</span>
                          )}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(contractor.recruitmentStatus || 'screening')} text-white`}>
                        {(contractor.recruitmentStatus || 'screening').replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {contractor.planningArea}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Star className="h-3 w-3 mr-1" />
                        {contractor.experienceYears || 0} years experience
                      </div>
                      <div className="text-sm text-gray-400">
                        ${contractor.hourlyRate || 25}/hour
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Service Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {(contractor.serviceSkills || []).slice(0, 2).map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs bg-blue-900 border-blue-700 text-blue-300">
                              <Wrench className="h-2 w-2 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                          {(contractor.serviceSkills || []).length > 2 && (
                            <Badge variant="outline" className="text-xs bg-gray-700 border-gray-600 text-gray-300">
                              +{(contractor.serviceSkills || []).length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Product Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          {(contractor.productSpecialties || []).slice(0, 2).map((product: string) => (
                            <Badge key={product} variant="outline" className="text-xs bg-purple-900 border-purple-700 text-purple-300">
                              <Package className="h-2 w-2 mr-1" />
                              {product}
                            </Badge>
                          ))}
                          {(contractor.productSpecialties || []).length > 2 && (
                            <Badge variant="outline" className="text-xs bg-gray-700 border-gray-600 text-gray-300">
                              +{(contractor.productSpecialties || []).length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {contractors.length === 0 && !contractorsLoading && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Contractors Found</h3>
                <p className="text-gray-400 mb-4">Start building your contractor network by adding candidates.</p>
                <Button onClick={() => setShowContractorModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Contractor
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          {/* Targets Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Recruitment Targets for {selectedPlanningArea}
              </h2>
              <p className="text-sm text-gray-400">
                {targets.filter((target: any) => target.planningArea === selectedPlanningArea).length} targets set
              </p>
            </div>
            <Dialog open={showTargetModal} onOpenChange={setShowTargetModal}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Set Target
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingTarget ? 'Edit Recruitment Target' : 'Set Recruitment Target'}
                  </DialogTitle>
                </DialogHeader>
                <Form {...targetForm}>
                  <form onSubmit={targetForm.handleSubmit(handleTargetSubmit)} className="space-y-4">
                    {/* All target form fields would go here - keeping existing form */}
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowTargetModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingTarget ? 'Update' : 'Set'} Target
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {targets
              .filter((target: any) => target.planningArea === selectedPlanningArea)
              .map((target: any) => (
              <Card key={target.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer">
                <CardContent className="p-4" onClick={() => handleEditTarget(target)}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{target.planningArea}</h3>
                      <Badge className={`${(target.targetStatus || target.status) === 'completed' ? 'bg-green-500' : (target.targetStatus || target.status) === 'active' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                        {((target.targetStatus || target.status) || 'planning').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{target.currentContractors || 0} / {target.targetContractors}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(((target.currentContractors || 0) / target.targetContractors) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400">
                        Target: {format(new Date(target.targetDate || target.targetCompletionDate || new Date()), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Planning Area Focus</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs bg-green-900 border-green-700 text-green-300">
                          {target.urgencyLevel || 'Medium'} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {targets.filter((target: any) => target.planningArea === selectedPlanningArea).length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Recruitment Targets Set</h3>
                <p className="text-gray-400 mb-4">Set recruitment targets for {selectedPlanningArea} to track progress.</p>
                <Button onClick={() => setShowTargetModal(true)}>
                  <Target className="h-4 w-4 mr-2" />
                  Set Target for {selectedPlanningArea}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          {/* Activity Creation Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Recruitment Activities
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Log Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Log Recruitment Activity</DialogTitle>
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
                              <SelectItem value="outreach">Initial Outreach</SelectItem>
                              <SelectItem value="call">Phone Call</SelectItem>
                              <SelectItem value="email">Email Follow-up</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="test">Skills Assessment</SelectItem>
                              <SelectItem value="onboarding">Onboarding</SelectItem>
                              <SelectItem value="background">Background Check</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Contractor</label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Select contractor" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              {contractors.map((contractor: any) => (
                                <SelectItem key={contractor.id} value={contractor.id.toString()}>
                                  {contractor.firstName && contractor.lastName 
                                    ? `${contractor.firstName} ${contractor.lastName}`
                                    : contractor.firmName
                                  } - {contractor.planningArea}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                        <Textarea 
                          placeholder="Detailed description of the recruitment activity..."
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
                              <SelectItem value="scheduled">Scheduled Next Step</SelectItem>
                              <SelectItem value="completed">Completed Successfully</SelectItem>
                              <SelectItem value="interested">Contractor Interested</SelectItem>
                              <SelectItem value="declined">Contractor Declined</SelectItem>
                              <SelectItem value="no-response">No Response</SelectItem>
                              <SelectItem value="passed">Passed Assessment</SelectItem>
                              <SelectItem value="failed">Failed Assessment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Recruiter</label>
                          <Input 
                            placeholder="Recruiter name"
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
                        <Button className="bg-blue-600 hover:bg-blue-700">
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
          </Card>

          {/* Activity Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">127</div>
                <div className="text-sm text-gray-400">Total Activities</div>
                <div className="text-xs text-green-400">+23 this week</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">45</div>
                <div className="text-sm text-gray-400">In Progress</div>
                <div className="text-xs text-yellow-400">Pending follow-up</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">38</div>
                <div className="text-sm text-gray-400">Successful Hires</div>
                <div className="text-xs text-green-400">68% conversion</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">12</div>
                <div className="text-sm text-gray-400">This Week</div>
                <div className="text-xs text-purple-400">Above target</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities List */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Activities Yet</h3>
                  <p className="text-gray-400">Recruitment activities will appear here as you work with contractors.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.slice(0, 10).map((activity: any) => (
                    <div key={activity.id} className="border-l-4 border-blue-500 bg-gray-700/50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className={
                            activity.activityType === 'interview' ? 'bg-purple-600' :
                            activity.activityType === 'call' ? 'bg-blue-600' :
                            activity.activityType === 'email' ? 'bg-green-600' :
                            activity.activityType === 'onboarding' ? 'bg-yellow-600' :
                            'bg-gray-600'
                          }>
                            {activity.activityType || 'Contact'}
                          </Badge>
                          <h4 className="font-medium text-white">
                            {activity.contractorName || `Contractor #${activity.contractorId}`}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">
                            {format(new Date(activity.activityDate || activity.createdAt || new Date()), 'MMM dd, yyyy')}
                          </div>
                          <div className="text-xs text-gray-500">
                            by {activity.recruiterName || 'System'}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-3">{activity.description || 'Recruitment activity'}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {activity.outcome && (
                            <Badge variant="outline" className={
                              activity.outcome === 'completed' || activity.outcome === 'passed' ? 'border-green-500 text-green-400' :
                              activity.outcome === 'failed' || activity.outcome === 'declined' ? 'border-red-500 text-red-400' :
                              activity.outcome === 'interested' || activity.outcome === 'scheduled' ? 'border-yellow-500 text-yellow-400' :
                              'border-gray-500 text-gray-400'
                            }>
                              {activity.outcome}
                            </Badge>
                          )}
                        </div>
                        
                        {activity.nextAction && (
                          <div className="text-xs text-blue-400">
                            Next: {activity.nextAction}
                            {activity.nextActionDate && (
                              <span className="text-gray-500 ml-1">
                                ({format(new Date(activity.nextActionDate), 'MMM dd')})
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 1099 Recruitment Tools & Resources */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">1099 Contractor Recruitment Tools & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => setShowRecruitmentKit(true)}
                  className="h-auto p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">1099 Recruitment Kit</p>
                    <p className="text-sm text-blue-300">Complete toolkit for independent contractor recruitment</p>
                  </div>
                </Button>

                <Button className="h-auto p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30">
                  <div className="text-left">
                    <p className="font-semibold text-white">Skills Assessment</p>
                    <p className="text-sm text-green-300">Technical evaluation tests and scoring guides</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowContractorCaseStudies(true)}
                  className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Success Stories</p>
                    <p className="text-sm text-purple-300">Case studies from successful contractor partnerships</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowContractorTemplates(true)}
                  className="h-auto p-4 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Contract Templates</p>
                    <p className="text-sm text-yellow-300">1099 agreements and onboarding documents</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-activity" className="space-y-6">
          {/* Live Activity Feed focused on Contractor Recruitment */}
          <SystemWideActivityFeed 
            category="recruitment" 
            showHeader={true} 
            maxItems={25}
          />
        </TabsContent>
      </Tabs>

      {/* 1099 Recruitment Kit Modal */}
      <Dialog open={showRecruitmentKit} onOpenChange={setShowRecruitmentKit}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-400" />
              1099 Contractor Recruitment Kit
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete recruitment toolkit for sourcing, evaluating, and onboarding independent contractors
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Sourcing Materials */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sourcing & Outreach Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Job Posting Templates</h4>
                    <p className="text-sm text-gray-300 mb-3">Pre-written job descriptions for different specializations and planning areas</p>
                    <div className="space-y-2">
                      <div className="text-xs text-blue-300">• HVAC Specialist - Dallas Metro</div>
                      <div className="text-xs text-blue-300">• Plumbing Expert - Houston Area</div>
                      <div className="text-xs text-blue-300">• Appliance Repair - Austin Region</div>
                      <div className="text-xs text-blue-300">• Multi-Trade Generalist - San Antonio</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Outreach Scripts</h4>
                    <p className="text-sm text-gray-300 mb-3">Email and phone scripts for initial contractor outreach</p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-300">• Cold outreach templates</div>
                      <div className="text-xs text-green-300">• Follow-up sequences</div>
                      <div className="text-xs text-green-300">• Referral request scripts</div>
                      <div className="text-xs text-green-300">• LinkedIn connection messages</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Download Scripts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Evaluation Tools */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Evaluation & Assessment Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Technical Skills Assessment</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive evaluation forms for technical competency</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Open Assessment
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Background Check Process</h4>
                    <p className="text-sm text-gray-300 mb-3">Step-by-step background verification procedures</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      View Process
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Interview Guide</h4>
                    <p className="text-sm text-gray-300 mb-3">Structured interview questions and evaluation rubrics</p>
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Onboarding Materials */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Onboarding & Training Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Welcome Package</h4>
                    <p className="text-sm text-gray-300 mb-3">Complete onboarding materials for new contractors</p>
                    <div className="space-y-2">
                      <div className="text-xs text-blue-300">• Platform training modules</div>
                      <div className="text-xs text-blue-300">• Service standards guide</div>
                      <div className="text-xs text-blue-300">• Customer communication protocols</div>
                      <div className="text-xs text-blue-300">• Safety and compliance requirements</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Download Package
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Performance Standards</h4>
                    <p className="text-sm text-gray-300 mb-3">Clear expectations and success metrics for contractors</p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-300">• Completion rate targets (75%+)</div>
                      <div className="text-xs text-green-300">• Customer satisfaction goals (4.5+)</div>
                      <div className="text-xs text-green-300">• Response time requirements</div>
                      <div className="text-xs text-green-300">• Quality assurance standards</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      View Standards
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contractor Case Studies Modal */}
      <Dialog open={showContractorCaseStudies} onOpenChange={setShowContractorCaseStudies}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              1099 Contractor Success Stories
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Real success stories from high-performing independent contractors across different planning areas
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Featured Success Stories */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Mike Rodriguez - HVAC Specialist</h3>
                      <p className="text-sm text-gray-400">Dallas Metro • 2.5 years with platform</p>
                    </div>
                    <Badge className="bg-green-600">Top 5% Performer</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">89%</div>
                      <div className="text-xs text-gray-400">Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$127K</div>
                      <div className="text-xs text-gray-400">Annual Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.9/5</div>
                      <div className="text-xs text-gray-400">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">347</div>
                      <div className="text-xs text-gray-400">Jobs Completed</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Background</h4>
                      <p className="text-sm text-gray-300">Former HVAC company employee looking for flexibility and higher earnings. Joined platform with 8 years experience.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Success Factors</h4>
                      <p className="text-sm text-gray-300">Excellent customer communication, reliable scheduling, expertise in both residential and commercial systems. Consistently exceeds performance targets.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Impact</h4>
                      <p className="text-sm text-gray-300">Increased earnings by 47% compared to W-2 employment. Maintains flexible schedule while serving high-value Dallas Metro clients.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Sarah Chen - Multi-Trade Expert</h3>
                      <p className="text-sm text-gray-400">Austin Region • 1.8 years with platform</p>
                    </div>
                    <Badge className="bg-blue-600">Rising Star</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">92%</div>
                      <div className="text-xs text-gray-400">Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$98K</div>
                      <div className="text-xs text-gray-400">Annual Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.8/5</div>
                      <div className="text-xs text-gray-400">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">412</div>
                      <div className="text-xs text-gray-400">Jobs Completed</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Background</h4>
                      <p className="text-sm text-gray-300">Career changer from corporate IT seeking hands-on work. Completed trade certifications while building platform reputation.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Success Factors</h4>
                      <p className="text-sm text-gray-300">Strong problem-solving skills, willingness to learn, excellent time management. Specializes in quick residential repairs across multiple trades.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Growth Trajectory</h4>
                      <p className="text-sm text-gray-300">Earnings increased 340% from year 1 to year 2. Now mentoring new contractors and expanding into commercial work.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">1099 Contractor Program Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">847</div>
                    <div className="text-xs text-gray-400">Active Contractors</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">$76K</div>
                    <div className="text-xs text-gray-400">Average Annual Earnings</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">82%</div>
                    <div className="text-xs text-gray-400">Average Completion Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">4.6/5</div>
                    <div className="text-xs text-gray-400">Average Customer Rating</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contractor Templates Modal */}
      <Dialog open={showContractorTemplates} onOpenChange={setShowContractorTemplates}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-yellow-400" />
              1099 Contractor Agreement Templates
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Comprehensive legal templates and onboarding documents for independent contractor partnerships
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Contract Templates */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Independent Contractor Agreements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Standard 1099 Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive independent contractor agreement for general home services</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-yellow-300">• Scope of work and service standards</div>
                      <div className="text-xs text-yellow-300">• Payment terms and fee structure</div>
                      <div className="text-xs text-yellow-300">• Insurance and liability requirements</div>
                      <div className="text-xs text-yellow-300">• Termination and dispute resolution</div>
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
                    <h4 className="font-medium text-white mb-2">Specialized Trade Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Enhanced contract for licensed specialists (HVAC, electrical, plumbing)</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-blue-300">• License verification requirements</div>
                      <div className="text-xs text-blue-300">• Specialized service rate structures</div>
                      <div className="text-xs text-blue-300">• Equipment and tool requirements</div>
                      <div className="text-xs text-blue-300">• Emergency response commitments</div>
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
              <h3 className="text-lg font-semibold text-white mb-3">Supporting Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">W-9 Tax Form</h4>
                    <p className="text-sm text-gray-300 mb-3">IRS Form W-9 for contractor tax identification</p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Download Form
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Insurance Requirements</h4>
                    <p className="text-sm text-gray-300 mb-3">Detailed insurance coverage requirements and verification forms</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      View Requirements
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Onboarding Checklist</h4>
                    <p className="text-sm text-gray-300 mb-3">Complete checklist for contractor setup and platform access</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      Download Checklist
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compliance Notice */}
            <div>
              <Alert className="bg-blue-900/30 border-blue-500/30">
                <AlertDescription className="text-blue-300">
                  <strong>Compliance Notice:</strong> All 1099 contractor agreements comply with IRS guidelines and relevant state employment laws. Independent contractor classification verified through legal review.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ContractorRecruitment;