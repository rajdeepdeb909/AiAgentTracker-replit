import Sidebar from "@/components/Sidebar";
import { LLMMetricsDashboard } from "@/components/LLMMetricsDashboard";
import { LLMPerformanceMonitoring } from "@/components/LLMPerformanceMonitoring";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LLMMarketing() {
  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-dark-card border-b border-dark-border p-responsive animate-fade-in">
          <div className="container-responsive">
            <div className="animate-slide-up">
              <h1 className="text-responsive-xl font-bold text-white">LLM Marketing Intelligence</h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Track performance across ChatGPT, Perplexity, Claude, and other AI platforms driving customer acquisition
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-responsive animate-fade-in">
          <div className="container-responsive">
            <Tabs defaultValue="metrics" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                <TabsTrigger value="monitoring">Live Monitoring & Improvement</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="space-y-6">
                <LLMMetricsDashboard />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <LLMPerformanceMonitoring />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}