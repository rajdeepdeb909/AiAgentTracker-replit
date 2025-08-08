import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, Truck, MapPin, Clock, CheckCircle } from "lucide-react";

export default function PartsWorkflowDiagram() {
  const workflowSteps = [
    {
      step: 1,
      title: "Technician Diagnosis",
      description: "Field technician diagnoses problem and assigns job code",
      agent: "Technician Interaction Hub",
      duration: "5-15 min",
      icon: <CheckCircle className="w-5 h-5 text-blue-400" />,
      outputs: ["Job code (e.g., HC-401)", "Equipment model/serial", "Diagnostic notes"]
    },
    {
      step: 2,
      title: "Parts Prediction + Fleet Learning",
      description: "AI combines technician recommendation with 2000+ technician fleet data",
      agent: "Parts Prediction Engine",
      duration: "< 30 seconds",
      icon: <Package className="w-5 h-5 text-purple-400" />,
      outputs: ["Technician parts + fleet insights", "Low-frequency parts analysis (10% cases)", "Conditional parts orders"]
    },
    {
      step: 3,
      title: "Field Verification Prompt",
      description: "AI prompts technician to verify specific conditions for low-frequency parts",
      agent: "Technician Management Agent",
      duration: "Real-time",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      outputs: ["Field verification prompts", "Technician accuracy tracking", "Condition-specific guidance"]
    },
    {
      step: 4,
      title: "Intelligent Procurement",
      description: "System determines direct-ship vs truck inventory based on verification",
      agent: "Inventory Management Assistant + Parts Ordering Specialist",
      duration: "< 2 min",
      icon: <Truck className="w-5 h-5 text-green-400" />,
      outputs: ["Confidence-weighted orders", "Direct-ship (85%) or truck stock (15%)", "Secondary parts prediction"]
    },
    {
      step: 5,
      title: "Customer Update + Learning Loop",
      description: "Proactive notification with delivery timeline and accuracy tracking",
      agent: "Outstanding Orders Manager",
      duration: "< 1 min",
      icon: <Clock className="w-5 h-5 text-cyan-400" />,
      outputs: ["SMS/Email to customer", "Parts accuracy validation", "Technician performance feedback"]
    }
  ];

  const inventoryStrategy = {
    directShip: {
      percentage: 85,
      description: "Most parts ship directly from supplier to customer",
      examples: ["Major appliances", "Specialized components", "Low-frequency parts"],
      timeline: "24-48 hours"
    },
    truckInventory: {
      percentage: 15,
      description: "High-turnover parts kept on trucks (30-day max)",
      examples: ["Common filters", "Basic gaskets", "Standard fuses"],
      timeline: "Same day"
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Process */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Parts Procurement Workflow</CardTitle>
          <p className="text-gray-400">Direct-ship model with minimal truck inventory for high-turnover items</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center border-2 border-blue-500/30">
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{step.step}. {step.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {step.agent}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                          {step.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {step.outputs.map((output, outputIndex) => (
                        <div key={outputIndex} className="bg-gray-800/30 p-2 rounded text-xs text-gray-300">
                          • {output}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow to next step */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inventory Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-400" />
              Direct-Ship Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-orange-400">{inventoryStrategy.directShip.percentage}%</span>
                <Badge className="bg-orange-500/20 text-orange-400">Primary Method</Badge>
              </div>
              
              <p className="text-gray-400 text-sm">{inventoryStrategy.directShip.description}</p>
              
              <div>
                <h5 className="text-white font-medium mb-2">Typical Parts</h5>
                <div className="space-y-1">
                  {inventoryStrategy.directShip.examples.map((example, index) => (
                    <div key={index} className="text-sm text-gray-300">• {example}</div>
                  ))}
                </div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-orange-400 font-medium">Delivery: {inventoryStrategy.directShip.timeline}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-400" />
              Truck Inventory Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-400">{inventoryStrategy.truckInventory.percentage}%</span>
                <Badge className="bg-green-500/20 text-green-400">High-Turnover Only</Badge>
              </div>
              
              <p className="text-gray-400 text-sm">{inventoryStrategy.truckInventory.description}</p>
              
              <div>
                <h5 className="text-white font-medium mb-2">Common Items</h5>
                <div className="space-y-1">
                  {inventoryStrategy.truckInventory.examples.map((example, index) => (
                    <div key={index} className="text-sm text-gray-300">• {example}</div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium">Delivery: {inventoryStrategy.truckInventory.timeline}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Philosophy Description */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Parts Prediction Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 mb-4">
            <h4 className="text-blue-400 font-medium mb-3">Technician + Fleet Learning Approach</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• <strong>Heavy weight on technician recommendations</strong> as primary input</p>
              <p>• <strong>2000+ technician fleet data</strong> provides superior accuracy beyond individual judgment</p>
              <p>• <strong>Even 10% frequency parts</strong> are analyzed backwards to understand exact circumstances</p>
              <p>• <strong>Real-time field verification prompts</strong> for condition-specific parts needs</p>
              <p>• <strong>Sequential parts prediction</strong> for post-installation requirements (compressors, PCBs)</p>
              <p>• <strong>Continuous feedback loops</strong> improve both AI accuracy and technician performance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Metrics */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Process Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">96.8%</p>
              <p className="text-sm text-gray-400">Fleet + Tech Accuracy</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">2000+</p>
              <p className="text-sm text-gray-400">Technician Data Pool</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-green-400">10%</p>
              <p className="text-sm text-gray-400">Min Frequency Analyzed</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-orange-400">Real-time</p>
              <p className="text-sm text-gray-400">Field Verification</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}