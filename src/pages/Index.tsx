import { useState } from "react";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { WalletScreen } from "@/components/screens/WalletScreen";
import { GoalsScreen } from "@/components/screens/GoalsScreen";
import { AnalysisScreen } from "@/components/screens/AnalysisScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "wallet":
        return <WalletScreen />;
      case "goals":
        return <GoalsScreen />;
      case "analysis":
        return <AnalysisScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <main className="pb-20"> {/* Bottom padding for navigation */}
        {renderScreen()}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
