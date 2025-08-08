import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  RefreshCw,
  Trash2,
  User,
  Briefcase,
  Target,
  MapPin,
  Star,
  Info
} from "lucide-react";

export default function OnboardingSettings() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const resetOnboarding = () => {
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('userProfile');
    window.location.reload();
  };

  const getUserProfile = () => {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  };

  const userProfile = getUserProfile();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
          <Settings className="h-4 w-4 mr-2" />
          Onboarding Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-gray-900 border-gray-700 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-400" />
            Onboarding & Profile Settings
          </DialogTitle>
          <DialogDescription>
            Manage your onboarding experience and profile preferences
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Current Profile Summary */}
          {userProfile && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-400" />
                  Current Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Name</Label>
                    <div className="text-white">{userProfile.name || "Not set"}</div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <div className="text-white">{userProfile.email || "Not set"}</div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Role</Label>
                    <div className="text-white capitalize">{userProfile.role?.replace('-', ' ') || "Not set"}</div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Experience</Label>
                    <div className="text-white capitalize">{userProfile.experience?.replace('-', ' ') || "Not set"}</div>
                  </div>
                </div>

                {userProfile.primaryGoals && userProfile.primaryGoals.length > 0 && (
                  <div>
                    <Label className="text-gray-400">Primary Goals</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userProfile.primaryGoals.map((goal: string) => (
                        <Badge key={goal} variant="outline" className="text-blue-400 border-blue-400">
                          {goal.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {userProfile.planningAreas && userProfile.planningAreas.length > 0 && (
                  <div>
                    <Label className="text-gray-400">Planning Areas</Label>
                    <div className="text-white text-sm">
                      {userProfile.planningAreas.length} areas selected
                    </div>
                  </div>
                )}

                {userProfile.preferredFeatures && userProfile.preferredFeatures.length > 0 && (
                  <div>
                    <Label className="text-gray-400">Preferred Features</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userProfile.preferredFeatures.slice(0, 5).map((feature: string) => (
                        <Badge key={feature} variant="outline" className="text-purple-400 border-purple-400">
                          {feature.replace('-', ' ')}
                        </Badge>
                      ))}
                      {userProfile.preferredFeatures.length > 5 && (
                        <Badge variant="outline" className="text-gray-400 border-gray-500">
                          +{userProfile.preferredFeatures.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Onboarding Controls */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-blue-400" />
                Onboarding Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Show onboarding for new users</Label>
                  <div className="text-sm text-gray-400">Automatically guide new users through setup</div>
                </div>
                <Switch
                  checked={!localStorage.getItem('hasCompletedOnboarding')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      localStorage.removeItem('hasCompletedOnboarding');
                    } else {
                      localStorage.setItem('hasCompletedOnboarding', 'true');
                    }
                  }}
                />
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={resetOnboarding}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Onboarding Wizard
                </Button>
                
                <Button
                  onClick={() => {
                    localStorage.removeItem('userProfile');
                    window.location.reload();
                  }}
                  variant="outline"
                  className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Profile Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Information */}
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-400" />
                About Adaptive Onboarding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>
                  The Adaptive Onboarding Wizard personalizes your America's Home Manager experience based on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your role and experience level</li>
                  <li>Primary business goals and objectives</li>
                  <li>Geographic planning areas you operate in</li>
                  <li>Preferred features and functionality</li>
                </ul>
                <p className="mt-3">
                  This customization helps prioritize the most relevant AI agents, dashboards, and tools for your specific needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}