import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  routePath?: string;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission, 
  routePath, 
  fallbackPath = '/dashboard' 
}: ProtectedRouteProps) {
  const { hasPermission, canAccessRoute, user } = useAuth();
  const [, setLocation] = useLocation();

  // If no permission required, allow access
  if (!requiredPermission && !routePath) {
    return <>{children}</>;
  }

  // Check route-based permission
  if (routePath && !canAccessRoute(routePath)) {
    return <AccessDeniedView onNavigateBack={() => setLocation(fallbackPath)} />;
  }

  // Check specific permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <AccessDeniedView onNavigateBack={() => setLocation(fallbackPath)} />;
  }

  return <>{children}</>;
}

function AccessDeniedView({ onNavigateBack }: { onNavigateBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-md">
        <CardContent className="p-6 text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You don't have permission to access this area. Contact your administrator to request access.
          </p>
          <Button 
            onClick={onNavigateBack} 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}