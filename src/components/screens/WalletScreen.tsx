import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  PiggyBank, 
  Target, 
  Lock, 
  Coins, 
  Shield, 
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";

export const WalletScreen = () => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [roundOffSavings, setRoundOffSavings] = useState(2847);

  const goals = [
    {
      name: "New iPhone 📱",
      target: 80000,
      saved: 28000,
      dueDate: "March 2026"
    },
    {
      name: "Europe Trip ✈️",
      target: 150000,
      saved: 45000,
      dueDate: "December 2025"
    }
  ];

  return (
    <div className="mobile-container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-poppins text-white">
          My Wallet 💳
        </h1>
        <Button variant="outline" size="sm" className="glass border-white/30 text-white">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="glass w-full mb-6">
          <TabsTrigger value="goals" className="flex-1">My Goals</TabsTrigger>
          <TabsTrigger value="autosave" className="flex-1">AutoSave</TabsTrigger>
          <TabsTrigger value="emergency" className="flex-1">Emergency</TabsTrigger>
          <TabsTrigger value="locked" className="flex-1">Locked</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Active Goals</h3>
            <Badge className="bg-gradient-primary text-white">
              {goals.length} Active
            </Badge>
          </div>
          
          {goals.map((goal, index) => (
            <Card key={index} className="card-glow p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{goal.name}</h4>
                <span className="text-sm text-muted-foreground">{goal.dueDate}</span>
              </div>
              
              <Progress 
                value={(goal.saved / goal.target) * 100} 
                className="mb-3"
              />
              
              <div className="flex justify-between text-sm">
                <span className="text-white">₹{goal.saved.toLocaleString('en-IN')}</span>
                <span className="text-muted-foreground">₹{goal.target.toLocaleString('en-IN')}</span>
              </div>
              
              <Button className="w-full mt-3 bg-gradient-success text-white">
                <Target className="w-4 h-4 mr-2" />
                Add Money
              </Button>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="autosave" className="space-y-4">
          <Card className="card-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Round-off AutoSave</h3>
                  <p className="text-sm text-muted-foreground">Save spare change automatically</p>
                </div>
              </div>
              <Switch 
                checked={autoSaveEnabled}
                onCheckedChange={setAutoSaveEnabled}
              />
            </div>
            
            {autoSaveEnabled && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-white mb-2 coin-drop">
                    ₹{roundOffSavings.toLocaleString('en-IN')}
                  </div>
                  <p className="text-muted-foreground">Saved this month</p>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-2xl">
                  <span>🪙</span>
                  <span className="coin-drop">💰</span>
                  <span>🐷</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average per transaction:</span>
                    <span className="text-white">₹8.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total transactions:</span>
                    <span className="text-white">335</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="card-glow p-6 bg-gradient-warning">
            <div className="text-center text-warning-foreground">
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Emergency Fund</h3>
              <div className="text-3xl font-bold mb-2">₹25,000</div>
              <p className="text-sm opacity-80 mb-4">
                3 months of expenses covered
              </p>
              
              <Progress value={60} className="mb-4" />
              
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-white/20 text-warning-foreground border-0">
                  Add Money
                </Button>
                <Button variant="outline" className="border-white/30 text-warning-foreground">
                  Emergency Withdraw
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <Card className="card-glow p-6 bg-gradient-tertiary">
            <div className="text-center text-white">
              <Lock className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Locked Savings 🔒</h3>
              <div className="text-3xl font-bold mb-2">₹12,500</div>
              <p className="text-sm opacity-80 mb-4">
                Locked until December 2024
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">127 days remaining</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Interest rate:</span>
                  <span>8.5% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Projected earnings:</span>
                  <span className="text-neon-green">₹1,062</span>
                </div>
              </div>
              
              <Button 
                disabled 
                className="w-full mt-4 opacity-50"
              >
                <Lock className="w-4 h-4 mr-2" />
                Locked until maturity
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};