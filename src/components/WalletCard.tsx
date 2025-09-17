import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Eye, EyeOff } from "lucide-react";

export const WalletCard = () => {
  const [balance, setBalance] = useState(45672.30);
  const [showBalance, setShowBalance] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <Card className={`card-glow p-6 bg-gradient-wallet relative overflow-hidden ${isAnimating ? 'pulse-glow' : ''}`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 opacity-10">
        <CreditCard className="w-24 h-24 text-white" />
      </div>
      
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              💳
            </div>
            <span className="text-white/80 text-sm font-medium">Total Balance</span>
          </div>
          <button 
            onClick={toggleBalanceVisibility}
            className="text-white/60 hover:text-white transition-colors"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white font-poppins">
            {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '₹••••••'}
          </div>
          <div className="text-white/70 text-sm">
            UPI ID: omi.sharma@paytm
          </div>
        </div>
        
        {/* Glow animation dots */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full bg-white/30 ${
                isAnimating ? 'animate-pulse' : ''
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};