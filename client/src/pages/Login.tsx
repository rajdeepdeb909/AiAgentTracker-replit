import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both username and password',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store session token and user data
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: 'Success',
        description: `Welcome back, ${data.user.displayName || data.user.username}!`,
      });

      // Reload to trigger auth context update
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              America's Home Manager
            </CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access the AI Agent Management Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-400">Quick Login Credentials:</p>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setUsername('admin');
                      setPassword('SecureAdmin2025!');
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setUsername('ceo');
                      setPassword('ceo_secure_2025');
                    }}
                  >
                    CEO
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setUsername('amanda.thompson');
                      setPassword('operations_manager_2025');
                    }}
                  >
                    Operations Manager
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setUsername('scheduling');
                      setPassword('scheduling_key_2025');
                    }}
                  >
                    AI Agent
                  </Button>
                </div>
                <div className="text-xs text-gray-500 text-center mt-3">
                  <p>• 26 AI Agents with unique credentials</p>
                  <p>• 10+ Human roles across departments</p>
                  <p>• Role-based permission system</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}