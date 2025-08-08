import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Shield, User, Key } from "lucide-react";

interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    userType: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
    department?: string;
    title?: string;
    permissions: string[];
    coordinatedAgents?: string[];
    planningAreas?: string[];
    isActive: boolean;
  };
  sessionToken: string;
  message: string;
}

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: credentials
      });
      return response as LoginResponse;
    },
    onSuccess: (data) => {
      // Store session token
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user.displayName || data.user.username}!`,
        variant: "default",
      });

      // Redirect to dashboard
      setLocation('/dashboard');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Quick login credentials for demo
  const quickLoginOptions = [
    { role: 'System Administrator', username: 'admin', password: 'SecureAdmin2025!', userType: 'Admin' },
    { role: 'Chief Executive Officer', username: 'ceo', password: 'ceo_secure_2025', userType: 'Executive' },
    { role: 'Chief Operating Officer', username: 'coo', password: 'coo_secure_2025', userType: 'Executive' },
    { role: 'Operations Manager', username: 'amanda.thompson', password: 'operations_manager_2025', userType: 'Manager' },
    { role: 'Advanced Scheduling Agent', username: 'scheduling', password: 'scheduling_key_2025', userType: 'AI Agent' },
  ];

  const handleQuickLogin = (username: string, password: string) => {
    setFormData({ username, password });
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-500" />
            </div>
            <CardTitle className="text-2xl text-white">Americas Home Manager</CardTitle>
            <CardDescription className="text-gray-400">
              AI-Agentic Operations Platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {loginMutation.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {(loginMutation.error as any)?.message || 'Login failed. Please check your credentials.'}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Quick Login Options */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Quick Access Credentials</CardTitle>
            <CardDescription className="text-gray-400">
              Demo credentials for different user types and AI agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickLoginOptions.map((option, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-medium">{option.role}</h4>
                    <p className="text-sm text-gray-400">{option.userType} • {option.username}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => handleQuickLogin(option.username, option.password)}
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <h4 className="text-blue-300 font-medium mb-2">Authentication Features</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• 26 AI Agents with unique credentials</li>
                <li>• 10+ Human roles across departments</li>
                <li>• Role-based permission system (34 permissions)</li>
                <li>• Session management and activity logging</li>
                <li>• AI-agentic coordination tracking</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}