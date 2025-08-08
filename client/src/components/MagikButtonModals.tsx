import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Package, Clock, Wrench, FileText, Star, AlertTriangle, Brain, Navigation, Phone, MessageSquare, GraduationCap, Target, Zap, ArrowRight, MapPin, User } from 'lucide-react';

interface MagikButtonModalsProps {
  isServiceOpen: boolean;
  setIsServiceOpen: (open: boolean) => void;
  isPartsOpen: boolean;
  setIsPartsOpen: (open: boolean) => void;
  isScheduleOpen: boolean;
  setIsScheduleOpen: (open: boolean) => void;
  isTechnicalOpen: boolean;
  setIsTechnicalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  technicianId: string;
}

export function MagikButtonModals({
  isServiceOpen,
  setIsServiceOpen,
  isPartsOpen,
  setIsPartsOpen,
  isScheduleOpen,
  setIsScheduleOpen,
  isTechnicalOpen,
  setIsTechnicalOpen,
  isAdminOpen,
  setIsAdminOpen,
  technicianId
}: MagikButtonModalsProps) {
  const [selectedPart, setSelectedPart] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [customerRating, setCustomerRating] = useState('');
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [routeOptimizing, setRouteOptimizing] = useState(false);
  const [trainingAnalyzing, setTrainingAnalyzing] = useState(false);
  
  const diagnosticFlowchart = [
    { step: 1, question: "Is the unit receiving power?", actions: ["Check breaker", "Test outlet", "Inspect wiring"] },
    { step: 2, question: "Are there unusual sounds?", actions: ["Record audio", "Check fan motor", "Inspect compressor"] },
    { step: 3, question: "What's the temperature differential?", actions: ["Measure intake", "Check output", "Test thermostat"] },
    { step: 4, question: "AI Analysis Complete", actions: ["Connect to specialist", "Order recommended parts", "Schedule follow-up"] }
  ];

  return (
    <>
      {/* Service Delivery Modal */}
      <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-400" />
              Service Delivery Hub - {technicianId}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete service management with AI-powered customer notifications and quality tracking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                <h3 className="text-green-400 font-medium mb-2">Today's Completed</h3>
                <div className="text-2xl text-white">7</div>
                <div className="text-xs text-gray-300">Jobs finished</div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                <h3 className="text-blue-400 font-medium mb-2">Customer Rating</h3>
                <div className="text-2xl text-white">4.8★</div>
                <div className="text-xs text-gray-300">Average today</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">Quick Service Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Complete Current Job
                </Button>
                <Button variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                  <Star className="w-4 h-4 mr-2 text-blue-400" />
                  Request Customer Rating
                </Button>
                <Button variant="outline" className="bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20">
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                  Report Issue
                </Button>
                <Button variant="outline" className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20">
                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                  Schedule Follow-up
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  AI Customer Notifications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button size="sm" variant="outline" className="bg-green-500/10 border-green-500/30">
                    <Phone className="w-4 h-4 mr-2" />
                    Auto-call: "Arriving in 15 min"
                  </Button>
                  <Button size="sm" variant="outline" className="bg-blue-500/10 border-blue-500/30">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    SMS: "Service complete"
                  </Button>
                  <Button size="sm" variant="outline" className="bg-purple-500/10 border-purple-500/30">
                    <Star className="w-4 h-4 mr-2" />
                    Request feedback
                  </Button>
                  <Button size="sm" variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Delay notification
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm mb-2 block">Service Notes</label>
                <Textarea 
                  placeholder="Add notes about current service..."
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Parts Management Modal */}
      <Dialog open={isPartsOpen} onOpenChange={setIsPartsOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-green-400" />
              Parts Management - {technicianId}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h3 className="text-green-400 text-sm font-medium">On Truck</h3>
                <div className="text-xl text-white">47</div>
                <div className="text-xs text-gray-300">Parts available</div>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                <h3 className="text-yellow-400 text-sm font-medium">Low Stock</h3>
                <div className="text-xl text-white">3</div>
                <div className="text-xs text-gray-300">Need ordering</div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h3 className="text-blue-400 text-sm font-medium">Ordered</h3>
                <div className="text-xl text-white">8</div>
                <div className="text-xs text-gray-300">En route</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Quick Parts Actions</h4>
              <Select value={selectedPart} onValueChange={setSelectedPart}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Select part to order..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="hvac-filter">HVAC Filter - Standard</SelectItem>
                  <SelectItem value="water-heater-element">Water Heater Element</SelectItem>
                  <SelectItem value="garbage-disposal">Garbage Disposal Unit</SelectItem>
                  <SelectItem value="toilet-flapper">Toilet Flapper Valve</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20">
                  <Package className="w-4 h-4 mr-2 text-green-400" />
                  Order Selected Part
                </Button>
                <Button variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  Check Inventory
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded">
              <h5 className="text-white text-sm font-medium mb-2">Low Stock Alerts</h5>
              <div className="space-y-1 text-xs">
                <div className="text-yellow-400">• HVAC Filters (2 remaining)</div>
                <div className="text-yellow-400">• Pipe Fittings (1 remaining)</div>
                <div className="text-red-400">• Drain Snake (0 remaining)</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Management Modal */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              AI Route Optimization - {technicianId}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-powered route optimization with real-time traffic and weather integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                <h3 className="text-purple-400 text-sm font-medium">Today's Jobs</h3>
                <div className="text-xl text-white">9</div>
                <div className="text-xs text-gray-300">2 remaining</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h3 className="text-green-400 text-sm font-medium">On Time Rate</h3>
                <div className="text-xl text-white">94%</div>
                <div className="text-xs text-gray-300">This week</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Upcoming Appointments</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium">3:30 PM - HVAC Repair</div>
                      <div className="text-gray-300 text-sm">1247 Oak Street</div>
                      <div className="text-blue-400 text-xs">Est. 45 minutes</div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-green-500/10 border-green-500/30">
                      Start Navigation
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-gray-700/30 rounded border border-gray-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium">5:00 PM - Plumbing Check</div>
                      <div className="text-gray-300 text-sm">892 Pine Avenue</div>
                      <div className="text-purple-400 text-xs">Est. 30 minutes</div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Route Optimization
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Current route efficiency</span>
                    <span className="text-white font-medium">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-green-500/10 border-green-500/30"
                      onClick={() => {
                        setRouteOptimizing(true);
                        setTimeout(() => setRouteOptimizing(false), 3000);
                      }}
                      disabled={routeOptimizing}
                    >
                      {routeOptimizing ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Optimize Route
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="bg-blue-500/10 border-blue-500/30">
                      <MapPin className="w-4 h-4 mr-2" />
                      Traffic Update
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400">
                    ✓ Real-time traffic • ✓ Weather conditions • ✓ Customer preferences
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20">
                  <Phone className="w-4 h-4 mr-2 text-purple-400" />
                  Auto-notify customers
                </Button>
                <Button variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                  <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                  View Full Calendar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Technical Support Modal */}
      <Dialog open={isTechnicalOpen} onOpenChange={setIsTechnicalOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-orange-400" />
              AI Diagnostic Assistant - {technicianId}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-powered diagnostic flowchart with specialist connection and expert system integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
                <h3 className="text-orange-400 text-sm font-medium">Active Issues</h3>
                <div className="text-xl text-white">2</div>
                <div className="text-xs text-gray-300">Need resolution</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h3 className="text-green-400 text-sm font-medium">Resolved Today</h3>
                <div className="text-xl text-white">5</div>
                <div className="text-xs text-gray-300">Technical fixes</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 rounded border border-orange-500/30">
                <h4 className="text-orange-400 font-medium mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Diagnostic Flowchart
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Step {diagnosticStep + 1} of {diagnosticFlowchart.length}</span>
                    <Badge className="bg-blue-500">HVAC System</Badge>
                  </div>
                  <Progress value={(diagnosticStep + 1) / diagnosticFlowchart.length * 100} className="h-2" />
                  
                  <div className="p-3 bg-gray-800/50 rounded">
                    <h5 className="text-white font-medium mb-2">{diagnosticFlowchart[diagnosticStep].question}</h5>
                    <div className="space-y-2">
                      {diagnosticFlowchart[diagnosticStep].actions.map((action, idx) => (
                        <Button 
                          key={idx}
                          size="sm" 
                          variant="outline" 
                          className="w-full bg-blue-500/10 border-blue-500/30 justify-start"
                          onClick={() => {
                            if (diagnosticStep < diagnosticFlowchart.length - 1) {
                              setDiagnosticStep(diagnosticStep + 1);
                            }
                          }}
                        >
                          <ArrowRight className="w-3 h-3 mr-2" />
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {diagnosticStep === diagnosticFlowchart.length - 1 && (
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Connect to Specialist
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Phone className="w-3 h-3 mr-2" />
                          Call HVAC Expert
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500/30">
                          <MessageSquare className="w-3 h-3 mr-2" />
                          Chat Support
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-gray-500/10 border-gray-500/30"
                  onClick={() => setDiagnosticStep(0)}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reset Diagnostic
                </Button>
                <Button variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Manual Override
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded">
              <h5 className="text-white text-sm font-medium mb-2">Current Issues</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">HVAC Unit Not Cooling</span>
                  <span className="text-yellow-400">In Progress</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Water Pressure Low</span>
                  <span className="text-red-400">Escalated</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Tasks Modal */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-red-400" />
              Personalized Training Hub - {technicianId}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              AI-powered personalized training recommendations based on your performance patterns
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
                <h3 className="text-red-400 text-sm font-medium">Pending Tasks</h3>
                <div className="text-xl text-white">4</div>
                <div className="text-xs text-gray-300">Need completion</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h3 className="text-green-400 text-sm font-medium">Completed</h3>
                <div className="text-xl text-white">12</div>
                <div className="text-xs text-gray-300">This week</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 rounded border border-red-500/30">
                <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Training Analysis
                </h4>
                <Button 
                  className="w-full mb-3 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setTrainingAnalyzing(true);
                    setTimeout(() => setTrainingAnalyzing(false), 3000);
                  }}
                  disabled={trainingAnalyzing}
                >
                  {trainingAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing Performance...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Generate Personalized Training Plan
                    </>
                  )}
                </Button>
                
                {!trainingAnalyzing && (
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-yellow-400 font-medium">Priority: HVAC Diagnostics</h5>
                        <Badge className="bg-red-500">High</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Completion rate: 67% (below target 85%)</p>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        <GraduationCap className="w-3 h-3 mr-2" />
                        Start HVAC Fundamentals
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-blue-400 font-medium">Customer Communication</h5>
                        <Badge className="bg-yellow-500">Medium</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Rating: 4.2/5 (target: 4.5+)</p>
                      <Button size="sm" variant="outline" className="border-blue-500/30">
                        <MessageSquare className="w-3 h-3 mr-2" />
                        Communication Skills Module
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-green-400 font-medium">Parts Identification</h5>
                        <Badge className="bg-green-500">Strength</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Accuracy: 94% (excellent)</p>
                      <Button size="sm" variant="outline" className="border-green-500/30">
                        <Star className="w-3 h-3 mr-2" />
                        Advanced Parts Training
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Time Sheet
                </Button>
                <Button variant="outline" className="bg-purple-500/10 border-purple-500/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Time Off
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded">
              <h5 className="text-white text-sm font-medium mb-2">Pending Tasks</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Complete safety training</span>
                  <span className="text-yellow-400">Due today</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Submit expense report</span>
                  <span className="text-red-400">Overdue</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Update vehicle inspection</span>
                  <span className="text-green-400">Due Friday</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}