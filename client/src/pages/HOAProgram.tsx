import { useLocation } from "wouter";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { HOAProgram as HOAProgramComponent } from "@/components/HOAProgram";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HOAProgram() {
  const [, setLocation] = useLocation();
  const { hasPermission } = useAuth();

  // Check if user has permission to view HOA programs
  const canViewHOA = hasPermission('view_hoa_programs');

  // Ensure the page scrolls to top when loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateBack = () => {
    setLocation('/dashboard');
  };

  // If no permission, show access denied
  if (!canViewHOA) {
    return (
      <div className="flex h-screen bg-gray-950">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto flex flex-col">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">HOA Partnership Program</h1>
            </div>
            
            <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Access Denied: You don't have permission to view HOA programs. Contact your administrator to request access.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-white font-medium mb-3">Available Actions</h3>
              <p className="text-gray-400 mb-4">You can navigate to other sections you have access to:</p>
              <div className="flex flex-wrap gap-3">
                {hasPermission('view_dashboard') && (
                  <Button
                    onClick={() => setLocation('/')}
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto flex flex-col">
        <HOAProgramComponent onNavigateBack={handleNavigateBack} />
      </main>
    </div>
  );
}