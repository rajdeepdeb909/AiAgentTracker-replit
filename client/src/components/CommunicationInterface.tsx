import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mail, Smartphone, Phone, Zap, Send, User, Clock, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommunicationInterfaceProps {
  agentName: string;
  channels: string[];
  onClose: () => void;
}

export default function CommunicationInterface({ agentName, channels, onClose }: CommunicationInterfaceProps) {
  const [selectedChannel, setSelectedChannel] = useState(channels[0] || "Email");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [priority, setPriority] = useState("normal");

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email": return <Mail className="w-4 h-4" />;
      case "SMS": return <Smartphone className="w-4 h-4" />;
      case "Chat": return <MessageSquare className="w-4 h-4" />;
      case "Voice": return <Phone className="w-4 h-4" />;
      case "Dispatch": return <Zap className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getChannelDescription = (channel: string) => {
    switch (channel) {
      case "Email":
        return "Send detailed service confirmations, quotes, and follow-up communications to customers";
      case "SMS":
        return "Send quick appointment reminders, status updates, and emergency alerts";
      case "Chat":
        return "Provide real-time customer support and scheduling assistance";
      case "Voice":
        return "Handle phone calls, emergency dispatch, and voice-guided instructions";
      case "Dispatch":
        return "Coordinate emergency response and field technician communication";
      default:
        return "Standard communication channel";
    }
  };

  const handleSendMessage = () => {
    // In a real system, this would integrate with the agent's communication system
    console.log(`Sending ${selectedChannel} via ${agentName}:`, {
      channel: selectedChannel,
      recipient,
      message,
      priority
    });
    
    // Reset form
    setMessage("");
    setRecipient("");
    setPriority("normal");
    
    // Show success feedback (in real system, would handle actual sending)
    alert(`${selectedChannel} communication sent via ${agentName}!`);
  };

  const recentCommunications = [
    {
      id: 1,
      type: "Email",
      recipient: "customer@example.com",
      subject: "Service Appointment Confirmation",
      timestamp: "2 hours ago",
      status: "delivered"
    },
    {
      id: 2,
      type: "SMS",
      recipient: "+1 (555) 123-4567",
      subject: "Technician en route - ETA 15 minutes",
      timestamp: "30 minutes ago",
      status: "delivered"
    },
    {
      id: 3,
      type: "Voice",
      recipient: "Emergency Dispatch",
      subject: "HVAC emergency - Commercial building",
      timestamp: "1 hour ago",
      status: "completed"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-900 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl">{agentName} - Communication Center</CardTitle>
              <p className="text-gray-400 text-sm mt-1">Manage multi-channel customer communications</p>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="send" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="send" className="text-gray-300 data-[state=active]:text-white">Send Message</TabsTrigger>
              <TabsTrigger value="recent" className="text-gray-300 data-[state=active]:text-white">Recent Activity</TabsTrigger>
              <TabsTrigger value="capabilities" className="text-gray-300 data-[state=active]:text-white">Capabilities</TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="space-y-4">
              {/* Channel Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Communication Channel</label>
                  <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {channels.map((channel) => (
                        <SelectItem key={channel} value={channel} className="text-white hover:bg-gray-700">
                          <div className="flex items-center">
                            {getChannelIcon(channel)}
                            <span className="ml-2">{channel}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">{getChannelDescription(selectedChannel)}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Priority Level</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="emergency" className="text-red-400">Emergency</SelectItem>
                      <SelectItem value="high" className="text-orange-400">High Priority</SelectItem>
                      <SelectItem value="normal" className="text-white">Normal</SelectItem>
                      <SelectItem value="low" className="text-gray-400">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  {selectedChannel === "Email" ? "Email Address" : 
                   selectedChannel === "SMS" ? "Phone Number" :
                   selectedChannel === "Voice" ? "Phone Number" :
                   "Recipient"}
                </label>
                <Input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={
                    selectedChannel === "Email" ? "customer@example.com" :
                    selectedChannel === "SMS" ? "+1 (555) 123-4567" :
                    selectedChannel === "Voice" ? "+1 (555) 123-4567" :
                    "Enter recipient"
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Message Content */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Message Content</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    selectedChannel === "Email" ? "Enter detailed message content..." :
                    selectedChannel === "SMS" ? "Enter brief message (160 characters max)..." :
                    selectedChannel === "Voice" ? "Enter talking points for voice call..." :
                    "Enter message content..."
                  }
                  rows={selectedChannel === "SMS" ? 3 : 6}
                  className="bg-gray-800 border-gray-700 text-white resize-none"
                  maxLength={selectedChannel === "SMS" ? 160 : undefined}
                />
                {selectedChannel === "SMS" && (
                  <p className="text-xs text-gray-500 mt-1">{message.length}/160 characters</p>
                )}
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSendMessage}
                  disabled={!recipient || !message}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send {selectedChannel}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-3">
                {recentCommunications.map((comm) => (
                  <div key={comm.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getChannelIcon(comm.type)}
                        <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-400">
                          {comm.type}
                        </Badge>
                        <span className="ml-2 text-white font-medium">{comm.recipient}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {comm.timestamp}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{comm.subject}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-xs">{comm.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="capabilities" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {channels.map((channel) => (
                  <Card key={channel} className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        {getChannelIcon(channel)}
                        <CardTitle className="text-white text-lg ml-2">{channel}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-3">{getChannelDescription(channel)}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-white text-sm font-medium">Typical Use Cases:</h4>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {channel === "Email" && (
                            <>
                              <li>• Service appointment confirmations</li>
                              <li>• Detailed quotes and estimates</li>
                              <li>• Post-service follow-ups</li>
                              <li>• Technical documentation delivery</li>
                            </>
                          )}
                          {channel === "SMS" && (
                            <>
                              <li>• Appointment reminders (2-24 hours before)</li>
                              <li>• Technician arrival notifications</li>
                              <li>• Service completion confirmations</li>
                              <li>• Emergency alerts and updates</li>
                            </>
                          )}
                          {channel === "Chat" && (
                            <>
                              <li>• Real-time scheduling assistance</li>
                              <li>• Quick troubleshooting support</li>
                              <li>• Service status inquiries</li>
                              <li>• General customer questions</li>
                            </>
                          )}
                          {channel === "Voice" && (
                            <>
                              <li>• Emergency service coordination</li>
                              <li>• Complex technical discussions</li>
                              <li>• Customer preference clarification</li>
                              <li>• Sensitive billing discussions</li>
                            </>
                          )}
                          {channel === "Dispatch" && (
                            <>
                              <li>• Emergency response coordination</li>
                              <li>• Field technician communication</li>
                              <li>• Resource allocation updates</li>
                              <li>• Critical safety alerts</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}