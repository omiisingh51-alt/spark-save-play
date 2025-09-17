import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar,
  Filter,
  Download,
  Zap
} from "lucide-react";

export const AnalysisScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const expenditureData = [
    { 
      category: "Food & Dining", 
      amount: 8500, 
      percentage: 35, 
      emoji: "🍕", 
      color: "neon-coral",
      change: 25,
      transactions: 45,
      avgPerTransaction: 189
    },
    { 
      category: "Transportation", 
      amount: 4200, 
      percentage: 18, 
      emoji: "🚗", 
      color: "neon-blue",
      change: -8,
      transactions: 28,
      avgPerTransaction: 150
    },
    { 
      category: "Shopping", 
      amount: 6800, 
      percentage: 28, 
      emoji: "🛍️", 
      color: "neon-purple",
      change: 15,
      transactions: 12,
      avgPerTransaction: 567
    },
    { 
      category: "Entertainment", 
      amount: 4600, 
      percentage: 19, 
      emoji: "🎮", 
      color: "neon-teal",
      change: -12,
      transactions: 18,
      avgPerTransaction: 256
    }
  ];

  const insights = [
    {
      type: "warning",
      title: "High Food Spending Alert",
      description: "You spent 25% more on food this month. Consider meal planning!",
      icon: AlertTriangle,
      color: "warning"
    },
    {
      type: "success", 
      title: "Transportation Savings",
      description: "Great job! You saved ₹400 on transport by using metro more often.",
      icon: TrendingDown,
      color: "success"
    },
    {
      type: "tip",
      title: "Weekend Spending Pattern",
      description: "Most of your shopping happens on weekends. Set a weekly budget!",
      icon: Zap,
      color: "primary"
    }
  ];

  const totalSpent = expenditureData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="mobile-container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            Analysis 📊
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Smart insights for better spending
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="glass border-white/30 text-white">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="glass border-white/30 text-white">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {["week", "month", "quarter", "year"].map((period) => (
          <Button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 ${
              selectedPeriod === period 
                ? "bg-gradient-primary text-white" 
                : "glass border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="glass w-full mb-6">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
          <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
          <TabsTrigger value="insights" className="flex-1">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Total Spending Card */}
          <Card className="card-glow p-6 bg-gradient-primary">
            <div className="text-center text-white">
              <PieChart className="w-12 h-12 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-2">
                ₹{totalSpent.toLocaleString('en-IN')}
              </div>
              <p className="opacity-80 mb-4">Total spent this {selectedPeriod}</p>
              <div className="flex justify-around text-sm">
                <div>
                  <div className="font-semibold">₹{Math.round(totalSpent/30)}</div>
                  <div className="opacity-70">Daily avg</div>
                </div>
                <div>
                  <div className="font-semibold">{expenditureData.reduce((sum, item) => sum + item.transactions, 0)}</div>
                  <div className="opacity-70">Transactions</div>
                </div>
                <div>
                  <div className="font-semibold">₹{Math.round(totalSpent / expenditureData.reduce((sum, item) => sum + item.transactions, 0))}</div>
                  <div className="opacity-70">Per transaction</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive 3D Pie Chart */}
          <Card className="card-glow p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Spending Breakdown</h3>
            
            <div className="relative flex items-center justify-center mb-6">
              <svg 
                className="w-48 h-48 transform cursor-pointer" 
                viewBox="0 0 120 120"
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {expenditureData.map((item, index) => {
                  const radius = 50;
                  const circumference = 2 * Math.PI * radius;
                  const rotation = expenditureData.slice(0, index).reduce((acc, prev) => acc + (prev.percentage * 3.6), 0);
                  const isHovered = hoveredCategory === item.category;
                  
                  return (
                    <circle
                      key={item.category}
                      cx="60"
                      cy="60"
                      r={isHovered ? 52 : radius}
                      fill="none"
                      stroke={`hsl(var(--${item.color}))`}
                      strokeWidth={isHovered ? 14 : 12}
                      strokeLinecap="round"
                      strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                      strokeDashoffset="0"
                      transform={`rotate(${rotation} 60 60)`}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        filter: `drop-shadow(0 0 ${isHovered ? 12 : 8}px hsl(var(--${item.color}) / ${isHovered ? 0.8 : 0.6}))`,
                      }}
                      onMouseEnter={() => setHoveredCategory(item.category)}
                    />
                  );
                })}
              </svg>
              
              {/* Center info */}
              <div className="absolute inset-0 flex items-center justify-center">
                {hoveredCategory ? (
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {expenditureData.find(item => item.category === hoveredCategory)?.emoji}
                    </div>
                    <div className="text-sm text-white font-semibold">
                      ₹{expenditureData.find(item => item.category === hoveredCategory)?.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">₹{(totalSpent/1000).toFixed(1)}k</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {expenditureData.map((item) => (
            <Card key={item.category} className="card-glow p-4 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-white">{item.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.transactions} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </div>
                  <Badge className={`${
                    item.change > 0 ? 'bg-gradient-warning' : 'bg-gradient-success'
                  } text-white`}>
                    {item.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(item.change)}%
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average per transaction:</span>
                  <span className="text-white">₹{item.avgPerTransaction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Share of total spending:</span>
                  <span className="text-white">{item.percentage}%</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="card-glow p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Spending Trends</h3>
            {/* Simplified trend visualization */}
            <div className="space-y-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const amount = Math.floor(Math.random() * 2000) + 500;
                const isWeekend = index >= 5;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-sm text-white w-8">{day}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-3 relative">
                      <div 
                        className={`h-full rounded-full ${
                          isWeekend ? 'bg-gradient-warning' : 'bg-gradient-secondary'
                        }`}
                        style={{ width: `${(amount / 2500) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-white w-16 text-right">₹{amount}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {insights.map((insight, index) => (
            <Card key={index} className={`card-glow p-4 border-l-4 border-${insight.color}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-${insight.color} flex items-center justify-center`}>
                  <insight.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
          
          {/* AI Insights Coming Soon */}
          <Card className="card-glow p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Insights</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Personalized spending recommendations powered by AI
            </p>
            <Badge className="bg-gradient-tertiary text-white">Coming Soon</Badge>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};