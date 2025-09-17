import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PieChart, AlertTriangle, TrendingUp, Coffee, ShoppingCart, Car, Gamepad2 } from "lucide-react";

export const ExpenditureSnapshot = () => {
  const expenditureData = [
    { category: "Food", amount: 8500, percentage: 35, emoji: "🍕", color: "neon-coral" },
    { category: "Transport", amount: 4200, percentage: 18, emoji: "🚗", color: "neon-blue" },
    { category: "Shopping", amount: 6800, percentage: 28, emoji: "🛍️", color: "neon-purple" },
    { category: "Entertainment", amount: 4600, percentage: 19, emoji: "🎮", color: "neon-teal" }
  ];

  const totalSpent = expenditureData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white font-poppins">
        Spending Overview
      </h3>
      
      {/* Alert Banner */}
      <Alert className="glass border-warning/30 bg-warning/10">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-warning font-medium">
          ⚠️ You spent 25% more on Food this month
        </AlertDescription>
      </Alert>

      {/* Pie Chart Card */}
      <Card className="card-glow p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white">This Month</h4>
            <p className="text-sm text-muted-foreground">
              Total: ₹{totalSpent.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Interactive Pie Visualization */}
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            {expenditureData.map((item, index) => {
              const radius = 50;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = circumference;
              const strokeDashoffset = circumference * (1 - item.percentage / 100);
              const rotation = expenditureData.slice(0, index).reduce((acc, prev) => acc + (prev.percentage * 3.6), 0);
              
              return (
                <circle
                  key={item.category}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={`hsl(var(--${item.color}))`}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                  strokeDashoffset="0"
                  transform={`rotate(${rotation} 60 60)`}
                  className="transition-all duration-500 hover:stroke-width-[14] cursor-pointer"
                  style={{
                    filter: `drop-shadow(0 0 8px hsl(var(--${item.color}) / 0.6))`,
                  }}
                />
              );
            })}
          </svg>
          
          {/* Center total */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-white">₹{(totalSpent/1000).toFixed(1)}k</div>
              <div className="text-xs text-muted-foreground">spent</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {expenditureData.map((item) => (
            <div key={item.category} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <div>
                  <div className="text-sm font-medium text-white">{item.category}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-white">
                ₹{(item.amount/1000).toFixed(1)}k
              </div>
            </div>
          ))}
        </div>

        {/* Trend Indicators */}
        <div className="flex gap-2 mt-4">
          <Badge className="bg-gradient-success text-success-foreground">
            <TrendingUp className="w-3 h-3 mr-1" />
            Savings +12%
          </Badge>
          <Badge className="bg-gradient-warning text-warning-foreground">
            <Coffee className="w-3 h-3 mr-1" />
            Food +25%
          </Badge>
        </div>
      </Card>
    </div>
  );
};