
import React from 'react';
import { Bell, Search, ChevronLeft, Menu, UserCircle } from 'lucide-react';
import { postMessageToNative } from '../utils';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfileClick?: () => void;
  labels: any;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack, 
  onBack,
  onProfileClick,
  labels 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-tossBorder h-16 md:h-20 flex items-center justify-between px-4 md:px-8 w-full">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            onClick={() => {
              if (onBack) onBack();
              postMessageToNative('go_back');
            }} 
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          /* Mobile Logo (Visible only on small screens) */
          <div className="md:hidden flex items-center gap-2">
             <h1 className="text-xl font-black text-tossBlue tracking-tighter">SIKAKI</h1>
          </div>
        )}
        
        {title && <h2 className="text-lg font-bold text-slate-800 md:text-xl truncate max-w-[200px]">{title}</h2>}
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        {/* Search & Notifications */}
        <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Search size={22} />
        </button>
        
        <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Icon - Linked to MyPage */}
        <button 
          onClick={onProfileClick}
          className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
        >
          <UserCircle size={24} className="text-tossBlue" />
        </button>

        {/* Mobile Menu Toggle (Visible only on mobile if needed, but profile icon covers the request) */}
        <button className="md:hidden p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
