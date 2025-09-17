import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus, 
  Flame, 
  Trophy, 
  Pause, 
  Play, 
  TrendingDown,
  Calendar,
  DollarSign
} from "lucide-react";

export const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "New iPhone 📱",
      target: 80000,
      saved: 28000,
      dueDate: "March 2026",
      streak: 7,
      status: "active",
      priority: "high"
    },
    {
      id: 2,
      name: "Europe Trip ✈️",
      target: 150000,
      saved: 45000,
      dueDate: "December 2025",
      streak: 12,
      status: "active",
      priority: "medium"
    },
    {
      id: 3,
      name: "Gaming Setup 🎮",
      target: 120000,
      saved: 85000,
      dueDate: "August 2024",
      streak: 25,
      status: "on-track",
      priority: "low"
    },
    {
      id: 4,
      name: "Emergency Fund 🛡️",
      target: 50000,
      saved: 15000,
      dueDate: "June 2025",
      streak: 0,
      status: "paused",
      priority: "high"
    }
  ]);

  const getStatusBadge = (status: string, streak: number) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-gradient-success text-white">
            <Flame className="w-3 h-3 mr-1 streak-flame" />
            {streak} day streak
          </Badge>
        );
      case "on-track":
        return (
          <Badge className="bg-gradient-primary text-white">
            <Trophy className="w-3 h-3 mr-1" />
            On Track
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-gradient-warning text-warning-foreground">
            <Pause className="w-3 h-3 mr-1" />
            Paused
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-neon-coral/50 bg-neon-coral/5";
      case "medium": return "border-neon-teal/50 bg-neon-teal/5";
      case "low": return "border-neon-purple/50 bg-neon-purple/5";
      default: return "";
    }
  };

  return (
    <div className="mobile-container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            GoalSaver 🎯
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {goals.filter(g => g.status === "active").length} active goals • Total saved: ₹{goals.reduce((sum, g) => sum + g.saved, 0).toLocaleString('en-IN')}
          </p>
        </div>
        <Button className="bg-gradient-primary text-white glow-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-card p-4 text-center">
          <Target className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
          <div className="text-sm text-white font-semibold">{goals.length}</div>
          <div className="text-xs text-muted-foreground">Total Goals</div>
        </Card>
        <Card className="glass-card p-4 text-center">
          <Flame className="w-6 h-6 mx-auto mb-2 text-neon-coral streak-flame" />
          <div className="text-sm text-white font-semibold">
            {Math.max(...goals.map(g => g.streak))}
          </div>
          <div className="text-xs text-muted-foreground">Best Streak</div>
        </Card>
        <Card className="glass-card p-4 text-center">
          <Trophy className="w-6 h-6 mx-auto mb-2 text-neon-green" />
          <div className="text-sm text-white font-semibold">
            {goals.filter(g => (g.saved / g.target) > 0.8).length}
          </div>
          <div className="text-xs text-muted-foreground">Near Complete</div>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progressPercentage = (goal.saved / goal.target) * 100;
          
          return (
            <Card 
              key={goal.id} 
              className={`card-glow p-5 ${getPriorityColor(goal.priority)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">{goal.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {goal.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {goal.priority} priority
                    </span>
                  </div>
                </div>
                {getStatusBadge(goal.status, goal.streak)}
              </div>

              {/* Progress Ring */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke={progressPercentage >= 100 ? "hsl(var(--neon-green))" : "hsl(var(--primary))"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - Math.min(progressPercentage, 100) / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-lg font-bold">
                      ₹{goal.saved.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / ₹{goal.target.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹{(goal.target - goal.saved).toLocaleString('en-IN')} to go</span>
                    <span>{Math.max(0, Math.ceil((goal.target - goal.saved) / 1000))} days left</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-primary text-white"
                  disabled={goal.status === "paused"}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Now
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="glass border-white/30 text-white"
                >
                  {goal.status === "paused" ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="glass border-white/30 text-white"
                >
                  <TrendingDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Milestone indicator */}
              {progressPercentage >= 25 && progressPercentage < 50 && (
                <div className="mt-3 text-center">
                  <Badge className="bg-gradient-secondary text-white">
                    🎉 Quarter milestone achieved!
                  </Badge>
                </div>
              )}
              {progressPercentage >= 50 && progressPercentage < 75 && (
                <div className="mt-3 text-center">
                  <Badge className="bg-gradient-tertiary text-white">
                    🔥 Halfway there! Keep going!
                  </Badge>
                </div>
              )}
              {progressPercentage >= 75 && progressPercentage < 100 && (
                <div className="mt-3 text-center">
                  <Badge className="bg-gradient-warning text-warning-foreground">
                    ⭐ So close! Final sprint!
                  </Badge>
                </div>
              )}
              {progressPercentage >= 100 && (
                <div className="mt-3 text-center">
                  <Badge className="bg-gradient-success text-white glow-success">
                    🎆 Goal completed! Congratulations! 🎆
                  </Badge>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};