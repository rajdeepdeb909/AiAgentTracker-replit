import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import NavigationBreadcrumbs from './NavigationBreadcrumbs';
import {
  Play,
  Pause,
  RotateCcw,
  User,
  Clock,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  DollarSign,
  Users,
  Zap
} from 'lucide-react';

interface PresentationSlide {
  id: number;
  title: string;
  duration: number; // in seconds
  content: React.ReactNode;
}

const SimulatedBoardPresentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // CEO Monthly Presentation Slides
  const presentationSlides: PresentationSlide[] = [
    {
      id: 1,
      title: "Executive Summary & Opening",
      duration: 60,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">CEO Monthly Board Report</h1>
            <h2 className="text-xl text-gray-300 mb-6">Strategic Leadership & Vision</h2>
            <div className="flex items-center justify-center space-x-6">
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <User className="w-4 h-4 mr-2" />
                Chief Executive Officer
              </Badge>
              <Badge className="bg-gray-600 text-white px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                10 Minutes
              </Badge>
            </div>
          </div>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Series A Progress: $45M committed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Market Expansion: +15 new areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Board Alignment: 100% unanimous</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Investor Confidence: 95% rating</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 2,
      title: "Key Performance Metrics",
      duration: 90,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Strategic Performance Indicators</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Series A Progress</h3>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">$200M Target</div>
                <div className="text-green-400 text-sm mb-4">+$45M committed this month</div>
                <Progress value={22.5} className="mb-2" />
                <p className="text-xs text-gray-400">Fundraising milestone achievement toward $1B valuation</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Market Leadership</h3>
                  <BarChart3 className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">430 Markets</div>
                <div className="text-green-400 text-sm mb-4">+15 new areas this month</div>
                <Progress value={86} className="mb-2" />
                <p className="text-xs text-gray-400">Geographic expansion and market penetration</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Investor Relations</h3>
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">95% Confidence</div>
                <div className="text-green-400 text-sm mb-4">+5% improvement</div>
                <Progress value={95} className="mb-2" />
                <p className="text-xs text-gray-400">Investor satisfaction and commitment level</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Board Alignment</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">100% Support</div>
                <div className="text-green-400 text-sm mb-4">Unanimous decisions</div>
                <Progress value={100} className="mb-2" />
                <p className="text-xs text-gray-400">Strategic direction and executive decisions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Strategic Initiatives & Progress",
      duration: 120,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Key Strategic Initiatives</h2>
          
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Series A Fundraising Completion
                  </h3>
                  <Badge className="bg-green-600 text-white">On Track</Badge>
                </div>
                <p className="text-gray-300 mb-3">Targeting $200M by Q2 with current momentum showing strong investor interest</p>
                <Progress value={45} className="mb-2" />
                <p className="text-xs text-gray-400">Target: Q2 2025 • Status: $45M committed • Next milestone: $100M</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Strategic B2B Partnerships
                  </h3>
                  <Badge className="bg-blue-600 text-white">Expanding</Badge>
                </div>
                <p className="text-gray-300 mb-3">Major partnerships with AHS, Assurant, and Choice driving B2B revenue</p>
                <div className="flex space-x-4 text-sm">
                  <span className="text-green-400">• AHS: Active contract</span>
                  <span className="text-green-400">• Assurant: Pilot program</span>
                  <span className="text-yellow-400">• Choice: Negotiations</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    Executive Team Scaling
                  </h3>
                  <Badge className="bg-green-600 text-white">Complete</Badge>
                </div>
                <p className="text-gray-300 mb-3">Successfully recruited CDO and CAO positions, completing C-suite</p>
                <div className="text-sm text-gray-400">7 C-level executives now managing all operational areas</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Challenges & Risk Management",
      duration: 90,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Current Challenges & Mitigation</h2>
          
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-red-600/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                    Capacity Crisis Management
                  </h3>
                  <Badge className="bg-red-600 text-white">Critical</Badge>
                </div>
                <p className="text-gray-300 mb-3">2,000 daily reschedules impacting customer satisfaction and revenue</p>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2"><strong>Impact:</strong> $31K daily revenue loss from cancellations</p>
                  <p className="text-sm text-gray-300"><strong>Action:</strong> Accelerating 1099 contractor program</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-yellow-600/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                    Series A Timeline Pressures
                  </h3>
                  <Badge className="bg-yellow-600 text-white">Monitor</Badge>
                </div>
                <p className="text-gray-300 mb-3">Timeline pressures requiring demonstrable growth metrics</p>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">Strong momentum with $45M committed, on track for Q2 close</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-blue-600/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Executive Coordination
                  </h3>
                  <Badge className="bg-blue-600 text-white">Managing</Badge>
                </div>
                <p className="text-gray-300 mb-3">Coordination across 7 C-level positions requiring clear communication</p>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">Implementing daily executive sync meetings and coordination protocols</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Strategic Recommendations & Next Steps",
      duration: 120,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Board Recommendations & Action Items</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-green-400" />
                    Immediate Actions (Next 30 Days)
                  </h3>
                  <Badge className="bg-green-600 text-white">Priority 1</Badge>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Accelerate 1099 contractor program to solve capacity crisis immediately
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Implement aggressive hiring plan to scale technician workforce by 75%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    Close next $55M tranche of Series A funding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Strategic Initiatives (Next 90 Days)
                  </h3>
                  <Badge className="bg-blue-600 text-white">Priority 2</Badge>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Establish clear executive coordination protocols for daily operations
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Develop competitive moat through AI-first operational superiority
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Expand to remaining 70 planning areas for complete market coverage
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">Board Decision Required</h3>
                <div className="bg-yellow-900/30 border border-yellow-600/50 p-4 rounded-lg">
                  <p className="text-yellow-200 mb-2"><strong>Approval Requested:</strong></p>
                  <p className="text-gray-300">Authorization to expand 1099 contractor program budget by $2.5M for immediate capacity relief</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Q&A and Board Discussion",
      duration: 180,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Questions & Board Discussion</h2>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4">Open Floor for Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-gray-300 mb-2"><strong>Topic Areas Available for Discussion:</strong></p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <li>• Series A fundraising timeline</li>
                    <li>• Capacity crisis mitigation</li>
                    <li>• Competitive positioning</li>
                    <li>• Executive team coordination</li>
                    <li>• Technology infrastructure</li>
                    <li>• Market expansion strategy</li>
                    <li>• B2B partnerships</li>
                    <li>• Financial projections</li>
                  </ul>
                </div>
                
                <div className="text-center pt-8">
                  <div className="text-4xl text-gray-600 mb-4">💼</div>
                  <p className="text-lg text-gray-300">Ready for Board Questions</p>
                  <p className="text-sm text-gray-400">3 minutes allocated per board member</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSlide < presentationSlides.length) {
      interval = setInterval(() => {
        setSlideProgress(prev => {
          const newProgress = prev + (1000 / presentationSlides[currentSlide].duration);
          if (newProgress >= 100) {
            if (currentSlide < presentationSlides.length - 1) {
              setCurrentSlide(curr => curr + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
        setTotalTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, presentationSlides]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentSlide(0);
    setSlideProgress(0);
    setTotalTime(0);
  };

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setSlideProgress(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <NavigationBreadcrumbs />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Simulated Board Presentation</h1>
          <p className="text-gray-400">CEO Monthly Board Report - Live Presentation Simulation</p>
        </div>

        {/* Presentation Controls */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={handlePlayPause}
                  className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-gray-600">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-300">
                  Slide {currentSlide + 1} of {presentationSlides.length}
                </div>
                <div className="text-sm text-gray-300">
                  Total Time: {formatTime(totalTime)}
                </div>
                <div className="w-48">
                  <Progress value={slideProgress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slide Navigation */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {presentationSlides.map((slide, index) => (
                <Button
                  key={slide.id}
                  onClick={() => handleSlideChange(index)}
                  variant={currentSlide === index ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap ${
                    currentSlide === index 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'border-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {index + 1}. {slide.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Slide Content */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Slide {currentSlide + 1}: {presentationSlides[currentSlide].title}
              </CardTitle>
              <Badge className="bg-blue-600 text-white">
                {Math.ceil(presentationSlides[currentSlide].duration / 60)} min
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {presentationSlides[currentSlide].content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulatedBoardPresentation;