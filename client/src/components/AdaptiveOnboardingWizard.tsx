import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Rocket,
  Users,
  Building2,
  Wrench,
  Phone,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Brain,
  MapPin,
  Calendar,
  BarChart3,
  Settings,
  Lightbulb,
  Star,
  Award,
  PlayCircle,
  BookOpen,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";
import { useLocation } from "wouter";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: JSX.Element;
  requiredFields?: string[];
  canSkip?: boolean;
}

interface UserProfile {
  role: string;
  experience: string;
  primaryGoals: string[];
  planningAreas: string[];
  teamSize: string;
  companyType: string;
  preferredFeatures: string[];
  name: string;
  email: string;
}

export default function AdaptiveOnboardingWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    role: "",
    experience: "",
    primaryGoals: [],
    planningAreas: [],
    teamSize: "",
    companyType: "",
    preferredFeatures: [],
    name: "",
    email: ""
  });
  const [location, navigate] = useLocation();

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const roles = [
    { id: "executive", label: "Executive/CEO", icon: Building2, description: "Strategic oversight and business growth" },
    { id: "operations", label: "Operations Manager", icon: Settings, description: "Day-to-day operational management" },
    { id: "technician", label: "Field Technician", icon: Wrench, description: "On-site service delivery" },
    { id: "dispatcher", label: "Dispatcher/Scheduler", icon: Calendar, description: "Scheduling and coordination" },
    { id: "customer-service", label: "Customer Service", icon: Phone, description: "Customer communication and support" },
    { id: "analyst", label: "Business Analyst", icon: BarChart3, description: "Performance analysis and insights" }
  ];

  const experienceLevels = [
    { id: "new", label: "New to Home Services", description: "Just starting out in the industry" },
    { id: "intermediate", label: "Some Experience", description: "1-3 years in home services" },
    { id: "experienced", label: "Experienced Professional", description: "3+ years with established processes" },
    { id: "expert", label: "Industry Expert", description: "Extensive experience, looking to optimize" }
  ];

  const primaryGoals = [
    { id: "increase-revenue", label: "Increase Revenue", icon: DollarSign },
    { id: "improve-efficiency", label: "Improve Operational Efficiency", icon: TrendingUp },
    { id: "customer-satisfaction", label: "Enhance Customer Satisfaction", icon: Star },
    { id: "reduce-costs", label: "Reduce Operating Costs", icon: Target },
    { id: "expand-coverage", label: "Expand Service Coverage", icon: MapPin },
    { id: "optimize-scheduling", label: "Optimize Scheduling", icon: Calendar },
    { id: "improve-communication", label: "Better Communication", icon: Phone },
    { id: "data-insights", label: "Data-Driven Insights", icon: Brain }
  ];

  const planningAreas = [
    "Atlanta Metro, GA", "Dallas-Fort Worth, TX", "Chicago, IL", "Phoenix, AZ", "Miami-Dade, FL",
    "Los Angeles, CA", "New York Metro, NY", "Houston, TX", "Philadelphia, PA", "San Antonio, TX",
    "San Diego, CA", "Charlotte, NC", "Seattle, WA", "Denver, CO", "Las Vegas, NV"
  ];

  const preferredFeatures = [
    { id: "call-center", label: "Call Center Analytics", icon: Phone },
    { id: "technician-tracking", label: "Technician Performance", icon: Users },
    { id: "scheduling", label: "Advanced Scheduling", icon: Calendar },
    { id: "route-optimization", label: "Route Optimization", icon: MapPin },
    { id: "financial-tracking", label: "Financial Intelligence", icon: DollarSign },
    { id: "customer-communication", label: "Customer Communication", icon: Phone },
    { id: "parts-management", label: "Parts & Inventory", icon: Wrench },
    { id: "performance-analytics", label: "Performance Analytics", icon: BarChart3 }
  ];

  const getAdaptiveSteps = (): OnboardingStep[] => {
    const baseSteps: OnboardingStep[] = [
      {
        id: "welcome",
        title: "Welcome to America's Home Manager",
        description: "Your AI-powered platform for home services excellence",
        content: (
          <div className="text-center space-y-6 p-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Future of Home Services</h3>
              <p className="text-gray-300 text-lg">
                America's Home Manager operates 430+ planning areas with 26 specialized AI agents, 
                managing everything from customer acquisition to technician empowerment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">430+</div>
                <div className="text-sm text-blue-200">Planning Areas</div>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">26</div>
                <div className="text-sm text-green-200">AI Agents</div>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">$200M</div>
                <div className="text-sm text-purple-200">Funding Target</div>
              </div>
              <div className="bg-yellow-900/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">$1B</div>
                <div className="text-sm text-yellow-200">Valuation Goal</div>
              </div>
            </div>
          </div>
        ),
        canSkip: false
      },
      {
        id: "personal-info",
        title: "Tell Us About Yourself",
        description: "Help us personalize your experience",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="bg-gray-900 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  placeholder="Enter your email"
                  className="bg-gray-900 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        ),
        requiredFields: ["name", "email"],
        canSkip: false
      },
      {
        id: "role-selection",
        title: "What's Your Role?",
        description: "This helps us customize the platform for your needs",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  userProfile.role === role.id
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onClick={() => setUserProfile({...userProfile, role: role.id})}
              >
                <CardContent className="p-4 text-center">
                  <role.icon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                  <h4 className="font-medium text-white">{role.label}</h4>
                  <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ),
        requiredFields: ["role"],
        canSkip: false
      },
      {
        id: "experience-level",
        title: "Experience Level",
        description: "How familiar are you with home services operations?",
        content: (
          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all ${
                  userProfile.experience === level.id
                    ? 'bg-green-900/50 border-green-500'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onClick={() => setUserProfile({...userProfile, experience: level.id})}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium text-white">{level.label}</h4>
                  <p className="text-sm text-gray-400">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ),
        requiredFields: ["experience"],
        canSkip: false
      },
      {
        id: "primary-goals",
        title: "What Are Your Primary Goals?",
        description: "Select all that apply to prioritize your dashboard",
        content: (
          <div className="grid grid-cols-2 gap-3">
            {primaryGoals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  userProfile.primaryGoals.includes(goal.id)
                    ? 'bg-purple-900/50 border border-purple-500'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => {
                  const updatedGoals = userProfile.primaryGoals.includes(goal.id)
                    ? userProfile.primaryGoals.filter(g => g !== goal.id)
                    : [...userProfile.primaryGoals, goal.id];
                  setUserProfile({...userProfile, primaryGoals: updatedGoals});
                }}
              >
                <goal.icon className="h-5 w-5 text-purple-400" />
                <span className="text-white text-sm">{goal.label}</span>
                {userProfile.primaryGoals.includes(goal.id) && (
                  <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                )}
              </div>
            ))}
          </div>
        ),
        canSkip: true
      },
      {
        id: "planning-areas",
        title: "Select Your Planning Areas",
        description: "Which geographic areas do you operate in?",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {planningAreas.map((area) => (
                <div
                  key={area}
                  className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-all ${
                    userProfile.planningAreas.includes(area)
                      ? 'bg-blue-900/50 border border-blue-500'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    const updatedAreas = userProfile.planningAreas.includes(area)
                      ? userProfile.planningAreas.filter(a => a !== area)
                      : [...userProfile.planningAreas, area];
                    setUserProfile({...userProfile, planningAreas: updatedAreas});
                  }}
                >
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-white text-sm">{area}</span>
                  {userProfile.planningAreas.includes(area) && (
                    <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ),
        canSkip: true
      },
      {
        id: "features",
        title: "Feature Preferences",
        description: "Which features are most important to you?",
        content: (
          <div className="grid grid-cols-2 gap-3">
            {preferredFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  userProfile.preferredFeatures.includes(feature.id)
                    ? 'bg-cyan-900/50 border border-cyan-500'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => {
                  const updatedFeatures = userProfile.preferredFeatures.includes(feature.id)
                    ? userProfile.preferredFeatures.filter(f => f !== feature.id)
                    : [...userProfile.preferredFeatures, feature.id];
                  setUserProfile({...userProfile, preferredFeatures: updatedFeatures});
                }}
              >
                <feature.icon className="h-5 w-5 text-cyan-400" />
                <span className="text-white text-sm">{feature.label}</span>
                {userProfile.preferredFeatures.includes(feature.id) && (
                  <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                )}
              </div>
            ))}
          </div>
        ),
        canSkip: true
      },
      {
        id: "completion",
        title: "Setup Complete!",
        description: "Your personalized dashboard is ready",
        content: (
          <div className="text-center space-y-6 p-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to Your Personalized Dashboard!</h3>
              <p className="text-gray-300">
                Based on your preferences, we've customized your experience. Here's what you'll see:
              </p>
            </div>
            
            <div className="space-y-3">
              {getPersonalizedRecommendations().map((rec, index) => (
                <div key={index} className="bg-blue-900/30 p-3 rounded-lg text-left">
                  <div className="flex items-center space-x-2">
                    <rec.icon className="h-5 w-5 text-blue-400" />
                    <span className="text-white font-medium">{rec.title}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Quick Start Tips:</h4>
              <ul className="text-gray-300 text-sm space-y-1 text-left">
                <li>• Start with the Dashboard to see your key metrics</li>
                <li>• Explore AI agents most relevant to your role</li>
                <li>• Check out the Call Center Analytics for immediate impact</li>
                <li>• Use the Multi-Dimensional Performance System for deep insights</li>
              </ul>
            </div>
          </div>
        ),
        canSkip: false
      }
    ];

    return baseSteps;
  };

  const getPersonalizedRecommendations = () => {
    const recommendations = [];

    if (userProfile.role === "executive") {
      recommendations.push({
        icon: BarChart3,
        title: "Executive Dashboard",
        description: "High-level KPIs and strategic insights across all 430 planning areas"
      });
    }

    if (userProfile.role === "technician") {
      recommendations.push({
        icon: Wrench,
        title: "Technician Tools",
        description: "Job routing, parts management, and performance tracking"
      });
    }

    if (userProfile.primaryGoals.includes("call-center")) {
      recommendations.push({
        icon: Phone,
        title: "Call Center Analytics",
        description: "Friction analysis and revenue recovery implementation"
      });
    }

    if (userProfile.primaryGoals.includes("increase-revenue")) {
      recommendations.push({
        icon: DollarSign,
        title: "Financial Intelligence",
        description: "Revenue optimization and cost reduction strategies"
      });
    }

    // Always include these essential features
    recommendations.push({
      icon: Brain,
      title: "AI Agent Network",
      description: `${userProfile.preferredFeatures.length || 8} agents tailored to your preferences`
    });

    return recommendations.slice(0, 4); // Limit to 4 recommendations
  };

  const steps = getAdaptiveSteps();
  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    if (!currentStepData.requiredFields) return true;
    
    return currentStepData.requiredFields.every(field => {
      const value = userProfile[field as keyof UserProfile];
      return Array.isArray(value) ? value.length > 0 : value !== "";
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      setIsOpen(false);
      // Navigate to dashboard
      navigate("/");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOpen(false);
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl text-white">{currentStepData.title}</DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">
                {currentStepData.description}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentStepData.content}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            
            {currentStepData.canSkip && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-gray-400 hover:text-white"
              >
                Skip Setup
              </Button>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Get Started
                <Rocket className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}