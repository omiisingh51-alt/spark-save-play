import { Dashboard } from "@/components/Dashboard";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <main className="pb-20"> {/* Bottom padding for navigation */}
        <Dashboard />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
