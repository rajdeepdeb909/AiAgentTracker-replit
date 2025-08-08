import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { TAB_PERMISSIONS, canAccessTab } from '@shared/permissions';

interface User {
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
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (routePath: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(
    () => localStorage.getItem('sessionToken')
  );
  const queryClient = useQueryClient();

  // Query to get current user
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['/api/auth/user'],
    queryFn: async () => {
      if (!sessionToken) {
        throw new Error('No session token');
      }
      
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Invalid or expired token
          localStorage.removeItem('sessionToken');
          localStorage.removeItem('user');
          setSessionToken(null);
        }
        throw new Error('Authentication failed');
      }

      return response.json();
    },
    enabled: !!sessionToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update API request default headers when session token changes
  useEffect(() => {
    if (sessionToken) {
      // Set default Authorization header for apiRequest
      const originalApiRequest = apiRequest;
      (apiRequest as any).defaultHeaders = {
        'Authorization': `Bearer ${sessionToken}`
      };
    }
  }, [sessionToken]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  };

  const canAccessRoute = (routePath: string): boolean => {
    if (!user) return false;
    // Simple route access check based on permissions
    const routePermissions: Record<string, string> = {
      '/dashboard': 'view_dashboard',
      '/agents': 'view_agents',
      '/performance': 'view_performance_metrics',
      '/b2b-client-management': 'view_b2b_clients',
    };
    const requiredPermission = routePermissions[routePath];
    return requiredPermission ? hasPermission(requiredPermission) : true;
  };

  const logout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    setSessionToken(null);
    queryClient.clear();
    
    // Make logout API call
    if (sessionToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionToken}`
        }
      }).catch(console.error);
    }
  };

  const contextValue: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user && !!sessionToken,
    hasPermission,
    canAccessRoute,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}