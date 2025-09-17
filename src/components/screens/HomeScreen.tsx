import { useState } from "react";
import { WalletCard } from "../WalletCard";
import { QuickActions } from "../QuickActions";
import { GoalSaverCard } from "../GoalSaverCard";
import { ExpenditureSnapshot } from "../ExpenditureSnapshot";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame } from "lucide-react";

export const HomeScreen = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  
  return (
    <div className="mobile-container px-4 py-6 space-y-6">
      {/* Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            Hi Omi 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Ready to achieve your goals today?
          </p>
        </div>
        <Badge className="bg-gradient-warning text-warning-foreground px-3 py-1 glow-warning">
          <Trophy className="w-4 h-4 mr-1" />
          Smart Spender
        </Badge>
      </div>

      {/* Glowing Wallet Card */}
      <WalletCard />

      {/* Quick Actions */}
      <QuickActions />

      {/* Goal Saver Card */}
      <GoalSaverCard 
        title="New iPhone 📱"
        targetAmount={80000}
        currentAmount={28000}
        targetDate="March 2026"
        streak={currentStreak}
      />

      {/* Expenditure Snapshot */}
      <ExpenditureSnapshot />
    </div>
  );
};