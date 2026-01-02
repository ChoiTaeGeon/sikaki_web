
import React from 'react';
import { Home, Users, ShoppingBag, UserCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  labels: any;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, labels }) => {
  const tabs = [
    { id: 'home', label: labels.home, icon: Home },
    { id: 'community', label: labels.community, icon: Users },
    { id: 'market', label: labels.market, icon: ShoppingBag },
    { id: 'mypage', label: labels.mypage, icon: UserCircle },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-tossBorder flex justify-around items-center py-2 safe-pb z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 w-1/4 transition-all active:scale-90 ${
            activeTab === tab.id ? 'text-tossBlue' : 'text-slate-400'
          }`}
        >
          <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
