import { Button } from "@/components/ui/button";
import { Send, Download, Target, QrCode, Banknote, TrendingUp } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      icon: Send,
      label: "Send",
      gradient: "bg-gradient-primary",
      glow: "glow-primary"
    },
    {
      icon: Download, 
      label: "Receive",
      gradient: "bg-gradient-secondary",
      glow: "glow-secondary"
    },
    {
      icon: Target,
      label: "Add to Goal",
      gradient: "bg-gradient-tertiary", 
      glow: "glow-accent"
    },
    {
      icon: QrCode,
      label: "Scan QR",
      gradient: "bg-gradient-success",
      glow: "glow-success"
    }
  ];

  const handleActionClick = (actionLabel: string) => {
    // Add haptic feedback simulation
    console.log(`Action clicked: ${actionLabel}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white font-poppins">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            onClick={() => handleActionClick(action.label)}
            className={`
              ${action.gradient} ${action.glow} 
              h-16 flex-col space-y-1 text-white border-0
              hover:scale-105 transition-all duration-300
              font-poppins font-semibold
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
      
      {/* Additional UPI shortcuts */}
      <div className="flex gap-3 mt-4">
        <Button 
          variant="outline" 
          size="sm"
          className="glass border-neon-teal/30 text-neon-teal hover:bg-neon-teal/10 flex-1"
        >
          <Banknote className="w-4 h-4 mr-2" />
          Pay Bills
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="glass border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10 flex-1"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Invest
        </Button>
      </div>
    </div>
  );
};