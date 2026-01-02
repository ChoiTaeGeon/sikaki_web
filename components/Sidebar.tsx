
import React from 'react';
import { Home, Users, ShoppingBag, UserCircle, PenSquare } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  labels: any;
  onWriteClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, labels, onWriteClick }) => {
  const menuItems = [
    { id: 'home', label: labels.home, icon: Home },
    { id: 'community', label: labels.community, icon: Users },
    { id: 'market', label: labels.market, icon: ShoppingBag },
    { id: 'mypage', label: labels.mypage, icon: UserCircle },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[280px] h-screen sticky top-0 bg-white border-r border-tossBorder p-8 shrink-0">
      {/* Logo Section */}
      <div className="mb-12">
        <h1 
          className="text-3xl font-black text-tossBlue cursor-pointer select-none tracking-tighter"
          onClick={() => onTabChange('home')}
        >
          SIKAKI
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-tossBlue text-white shadow-lg shadow-tossBlue/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon 
              size={22} 
              className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} 
            />
            <span className="text-[17px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Primary Action Button (Write) */}
      <div className="mt-8">
        <button 
          onClick={onWriteClick}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-slate-800 active:scale-[0.98] transition-all"
        >
          <PenSquare size={20} />
          {labels.write}
        </button>
      </div>

      {/* Simple Footer or User Profile Summary can go here */}
      <div className="mt-8 pt-8 border-t border-slate-50">
        <div className="text-[12px] text-slate-400 font-medium">
          © 2025 SIKAKI Platform<br />
          Local Community Service
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
