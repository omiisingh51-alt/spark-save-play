import { useState } from "react";
import { Home, Wallet, Target, PieChart, Settings } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "goals", label: "Goals", icon: Target, badge: 2 },
  { id: "analysis", label: "Analysis", icon: PieChart },
  { id: "settings", label: "Settings", icon: Settings }
];

export const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-sm mx-auto">
        <nav className="glass-card rounded-t-3xl px-4 py-2 border-t border-white/10">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-primary glow-primary scale-110' 
                      : 'hover:bg-white/5'
                    }
                  `}
                >
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-tertiary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{item.badge}</span>
                    </div>
                  )}
                  
                  {/* Icon */}
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-muted-foreground'
                    }`} 
                  />
                  
                  {/* Label */}
                  <span 
                    className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};