import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Rocket, 
  Trophy, 
  Target, 
  Calendar,
  DollarSign,
  Users,
  Zap,
  Star,
  Gift,
  Crown
} from "lucide-react";

interface GlobalChallengeModalProps {
  children: React.ReactNode;
}

export default function GlobalChallengeModal({ children }: GlobalChallengeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [challengeType, setChallengeType] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [duration, setDuration] = useState("");
  const [rewardPool, setRewardPool] = useState("");
  const [description, setDescription] = useState("");

  const challengeTemplates = [
    {
      id: "speed-mastery",
      name: "Speed Mastery Challenge",
      description: "Complete onboarding or training modules faster than average",
      participants: "All new contractors & employees",
      duration: "2 weeks",
      rewards: "$50,000 total pool",
      impact: "Expected 35% faster completion"
    },
    {
      id: "quality-excellence",
      name: "Quality Excellence Championship",
      description: "Maintain highest quality ratings across all service categories",
      participants: "All active technicians",
      duration: "1 month",
      rewards: "$75,000 total pool + recognition",
      impact: "Expected 25% quality improvement"
    },
    {
      id: "cross-platform-champion",
      name: "Cross-Platform Champion",
      description: "Excel across multiple gamification engines simultaneously",
      participants: "All platform users",
      duration: "6 weeks",
      rewards: "$150,000 mega prize pool",
      impact: "Expected 45% engagement boost"
    },
    {
      id: "innovation-sprint",
      name: "Innovation Sprint",
      description: "Suggest and implement process improvements",
      participants: "All team members",
      duration: "3 weeks",
      rewards: "$25,000 + implementation bonuses",
      impact: "Expected 15+ process improvements"
    }
  ];

  const handleLaunchChallenge = () => {
    // In a real implementation, this would call an API
    console.log("Launching global challenge:", {
      type: challengeType,
      name: challengeName,
      duration,
      rewardPool,
      description
    });
    
    // Show success feedback
    alert(`🚀 Global Challenge "${challengeName}" has been launched successfully!\n\nParticipants across all gamification engines will be notified immediately. Real-time tracking begins now.`);
    setIsOpen(false);
    
    // Reset form
    setChallengeType("");
    setChallengeName("");
    setDuration("");
    setRewardPool("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Rocket className="h-6 w-6 mr-3 text-blue-400" />
            Launch Global Challenge
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Templates */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              Quick Launch Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challengeTemplates.map((template) => (
                <Card key={template.id} className="bg-gray-800 border-gray-600 cursor-pointer hover:bg-gray-750 transition-colors" 
                      onClick={() => {
                        setChallengeType(template.id);
                        setChallengeName(template.name);
                        setDescription(template.description);
                      }}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      {template.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-gray-300">{template.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-blue-400">{template.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-green-400">{template.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Rewards:</span>
                        <span className="text-yellow-400">{template.rewards}</span>
                      </div>
                      <div className="text-xs text-purple-400">{template.impact}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Challenge Configuration */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-400" />
              Challenge Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="challengeName" className="text-gray-300">Challenge Name</Label>
                  <Input
                    id="challengeName"
                    value={challengeName}
                    onChange={(e) => setChallengeName(e.target.value)}
                    placeholder="Enter challenge name"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="challengeType" className="text-gray-300">Challenge Type</Label>
                  <Select value={challengeType} onValueChange={setChallengeType}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select challenge type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="speed-mastery">Speed Mastery</SelectItem>
                      <SelectItem value="quality-excellence">Quality Excellence</SelectItem>
                      <SelectItem value="cross-platform-champion">Cross-Platform Champion</SelectItem>
                      <SelectItem value="innovation-sprint">Innovation Sprint</SelectItem>
                      <SelectItem value="custom">Custom Challenge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-gray-300">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="6-weeks">6 Weeks</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rewardPool" className="text-gray-300">Reward Pool ($)</Label>
                  <Input
                    id="rewardPool"
                    value={rewardPool}
                    onChange={(e) => setRewardPool(e.target.value)}
                    placeholder="Enter total reward amount"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">Challenge Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the challenge objectives, rules, and requirements..."
                  className="bg-gray-800 border-gray-600 text-white h-40"
                />
              </div>
            </div>
          </div>

          {/* Impact Preview */}
          {challengeName && (
            <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Expected Impact: {challengeName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">9,525</div>
                    <div className="text-sm text-blue-200">Eligible Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-300">85%</div>
                    <div className="text-sm text-green-200">Expected Participation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-300">35%</div>
                    <div className="text-sm text-purple-200">Performance Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">${rewardPool || "TBD"}</div>
                    <div className="text-sm text-yellow-200">Reward Pool</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLaunchChallenge}
              disabled={!challengeName || !challengeType || !duration}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Launch Global Challenge
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}