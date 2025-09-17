import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Flame, Plus, Pause, TrendingUp } from "lucide-react";

interface GoalSaverCardProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  streak: number;
}

export const GoalSaverCard = ({ 
  title, 
  targetAmount, 
  currentAmount, 
  targetDate, 
  streak 
}: GoalSaverCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const progressPercentage = (currentAmount / targetAmount) * 100;
  
  const handleAddMoney = () => {
    setIsAnimating(true);
    // Simulate adding money with animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <Card className="card-glow p-6 bg-gradient-success relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <Target className="w-full h-full" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              🎯
            </div>
            <div>
              <h3 className="font-bold text-white font-poppins text-lg">{title}</h3>
              <p className="text-white/70 text-sm">Target: {targetDate}</p>
            </div>
          </div>
          
          <Badge className="streak-flame bg-gradient-warning text-warning-foreground px-3 py-1">
            <Flame className="w-4 h-4 mr-1" />
            {streak} day streak
          </Badge>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between text-white">
            <span className="text-sm font-medium">
              ₹{currentAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-medium">
              ₹{targetAmount.toLocaleString('en-IN')}
            </span>
          </div>
          
          {/* Custom Progress Ring */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Percentage in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white font-poppins">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddMoney}
              className={`
                flex-1 bg-white/20 hover:bg-white/30 text-white border-0
                ${isAnimating ? 'coin-drop' : ''}
                transition-all duration-300
              `}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Now
            </Button>
            <Button
              variant="outline"
              size="sm" 
              className="glass border-white/30 text-white hover:bg-white/10"
            >
              <Pause className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass border-white/30 text-white hover:bg-white/10"
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge className="bg-white/20 text-white border-0">
              On Track • Next milestone in ₹2,000
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};