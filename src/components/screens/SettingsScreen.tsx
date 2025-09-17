import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Lock,
  Globe,
  CreditCard,
  Zap,
  Star
} from "lucide-react";

export const SettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    goals: true,
    transactions: true,
    insights: false,
    marketing: false
  });

  const [biometric, setBiometric] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Settings",
          description: "Name, email, phone number",
          action: () => {},
          hasChevron: true
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          description: "Manage cards and UPI IDs",
          action: () => {},
          hasChevron: true,
          badge: "2 Cards"
        },
        {
          icon: Shield,
          label: "Security & Privacy",
          description: "Password, 2FA, biometrics",
          action: () => {},
          hasChevron: true
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Goal reminders, transaction alerts",
          action: () => {},
          hasChevron: true
        },
        {
          icon: Palette,
          label: "Appearance", 
          description: "Themes, colors, display",
          action: () => {},
          hasChevron: true,
          badge: "Dark Mode"
        },
        {
          icon: Globe,
          label: "Language & Region",
          description: "Hindi, English, currency",
          action: () => {},
          hasChevron: true
        }
      ]
    },
    {
      title: "Features",
      items: [
        {
          icon: Zap,
          label: "AutoSave Settings",
          description: "Round-off rules, frequency",
          toggle: true,
          value: autoSave,
          onChange: setAutoSave
        },
        {
          icon: Lock,
          label: "Biometric Login",
          description: "Fingerprint & Face ID",
          toggle: true,
          value: biometric,
          onChange: setBiometric
        },
        {
          icon: Smartphone,
          label: "Quick Actions",
          description: "Customize home shortcuts",
          action: () => {},
          hasChevron: true
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          description: "FAQs, contact us, tutorials",
          action: () => {},
          hasChevron: true
        },
        {
          icon: Star,
          label: "Rate CampusWallet", 
          description: "Love the app? Leave a review!",
          action: () => {},
          hasChevron: true
        }
      ]
    }
  ];

  const quickToggles = [
    {
      label: "Goal Reminders",
      key: "goals",
      icon: "🎯"
    },
    {
      label: "Transaction Alerts",
      key: "transactions", 
      icon: "💳"
    },
    {
      label: "Spending Insights",
      key: "insights",
      icon: "📊"
    },
    {
      label: "Promotional Offers",
      key: "marketing",
      icon: "🎁"
    }
  ];

  return (
    <div className="mobile-container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            Settings ⚙️
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Customize your CampusWallet experience
          </p>
        </div>
        <Badge className="bg-gradient-primary text-white">
          Premium
        </Badge>
      </div>

      {/* Profile Quick View */}
      <Card className="card-glow p-6 bg-gradient-wallet">
        <div className="flex items-center gap-4 text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Omi Sharma</h3>
            <p className="opacity-80 text-sm">omi.sharma@student.ac.in</p>
            <p className="opacity-60 text-xs">Member since March 2024</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Edit
          </Button>
        </div>
      </Card>

      {/* Quick Notification Toggles */}
      <Card className="card-glow p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Toggles</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickToggles.map((toggle) => (
            <div key={toggle.key} className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">{toggle.icon}</span>
                <span className="text-sm text-white font-medium">{toggle.label}</span>
              </div>
              <Switch
                checked={notifications[toggle.key as keyof typeof notifications]}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, [toggle.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <Card className="card-glow divide-y divide-white/10">
            {section.items.map((item, index) => (
              <div 
                key={index}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={item.action}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-white/20 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.toggle && item.onChange && (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    )}
                    {item.hasChevron && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      ))}

      {/* App Info */}
      <Card className="card-glow p-4 text-center">
        <div className="text-white space-y-2">
          <div className="font-semibold">CampusWallet v2.1.0</div>
          <div className="text-sm text-muted-foreground">
            Built with ❤️ for students
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Button 
        className="w-full bg-gradient-warning text-warning-foreground glow-warning"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};