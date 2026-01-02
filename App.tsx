
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import MarketPage from './pages/MarketPage';
import MyPage from './pages/MyPage';
import WriteModal from './components/WriteModal';
import { translations } from './translations';
import { Language, Post, MarketItem } from './types';
import { postMessageToNative } from './utils';
import { ChevronLeft, PenSquare } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState<Language>('KO');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [writeType, setWriteType] = useState<'POST' | 'MARKET'>('POST');
  const [selectedItem, setSelectedItem] = useState<Post | MarketItem | null>(null);

  const labels = translations[lang];

  useEffect(() => {
    postMessageToNative('app_loaded');
    
    const handleNativeBack = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.action === 'back_pressed') {
          handleBack();
        }
      } catch (e) {}
    };

    window.addEventListener('message', handleNativeBack);
    return () => window.removeEventListener('message', handleNativeBack);
  }, []);

  useEffect(() => {
    postMessageToNative('page_view', { page: activeTab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleBack = useCallback(() => {
    if (selectedItem) {
      setSelectedItem(null);
    } else if (isWriteModalOpen) {
      setIsWriteModalOpen(false);
    } else if (activeTab !== 'home') {
      setActiveTab('home');
    } else {
      postMessageToNative('exit_app');
    }
  }, [selectedItem, isWriteModalOpen, activeTab]);

  const handleWriteClick = () => {
    if (activeTab === 'market') {
      setWriteType('MARKET');
    } else {
      setWriteType('POST');
    }
    setIsWriteModalOpen(true);
  };

  const renderContent = () => {
    if (selectedItem) {
      return (
        <div className="p-0 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24 md:pb-20">
          <div className="flex items-center justify-center p-4 md:p-8">
             <div className="max-w-4xl w-full bg-white rounded-4xl shadow-sm border border-tossBorder overflow-hidden">
                <div className="aspect-[16/9] bg-slate-100 relative group">
                  <img 
                    src={(selectedItem as any).images[0]} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
                    alt="Detail"
                  />
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all active:scale-95"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>
                <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-5">
                      <img src={selectedItem.author.profileImage} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-md" alt="Avatar" />
                      <div>
                        <div className="font-bold text-xl md:text-2xl text-slate-900">{selectedItem.author.nickname}</div>
                        <div className="text-slate-400 text-sm md:text-[15px] font-medium">{selectedItem.author.region}</div>
                      </div>
                    </div>
                    <div className="bg-tossBlue/5 px-4 py-2 md:px-5 md:py-2.5 rounded-2xl text-tossBlue font-black text-xs md:text-sm">
                      매너온도 {selectedItem.author.rating * 10}°C
                    </div>
                  </div>
                  <div className="border-t border-slate-50 pt-6 md:pt-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-4 md:mb-8 text-slate-900 tracking-tight leading-tight">{selectedItem.title}</h2>
                    <p className="text-slate-600 leading-[1.7] md:leading-[1.8] text-[16px] md:text-lg whitespace-pre-wrap">{selectedItem.content}</p>
                  </div>
                </div>
                {'price' in selectedItem && (
                  <div className="bg-slate-50 p-6 md:p-10 flex items-center justify-between border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-slate-400 font-bold text-xs md:text-sm mb-1 uppercase tracking-wider">판매가격</span>
                      <div className="font-black text-xl md:text-3xl text-slate-900">
                        {selectedItem.price.toLocaleString()}원
                      </div>
                    </div>
                    <button className="px-6 py-3 md:px-12 md:py-5 bg-tossBlue text-white rounded-2xl md:rounded-3xl font-bold text-sm md:text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-tossBlue/20">
                      채팅하기
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home': return <HomePage onPostClick={setSelectedItem} labels={labels} />;
      case 'community': return <CommunityPage onPostClick={setSelectedItem} labels={labels} />;
      case 'market': return <MarketPage onItemClick={setSelectedItem} labels={labels} lang={lang} />;
      case 'mypage': return <MyPage labels={labels} lang={lang} setLang={setLang} />;
      default: return <HomePage onPostClick={setSelectedItem} labels={labels} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Side Navigation Bar (Desktop Only) */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        labels={labels}
        onWriteClick={handleWriteClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={selectedItem ? '' : labels[activeTab as keyof typeof labels] as string} 
          showBack={!!selectedItem}
          onBack={() => setSelectedItem(null)}
          onProfileClick={() => setActiveTab('mypage')}
          labels={labels}
        />
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto md:p-8">
            <div className="bg-white md:rounded-4xl md:shadow-sm md:border md:border-tossBorder min-h-[calc(100vh-160px)]">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      {!selectedItem && (
        <button 
          onClick={handleWriteClick}
          className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-tossBlue text-white rounded-full flex items-center justify-center shadow-2xl shadow-tossBlue/40 active:scale-90 transition-transform z-40"
          aria-label="글쓰기"
        >
          <PenSquare size={24} />
        </button>
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        labels={labels} 
      />

      <WriteModal 
        isOpen={isWriteModalOpen} 
        onClose={() => setIsWriteModalOpen(false)} 
        type={writeType}
        labels={labels}
      />
    </div>
  );
};

export default App;
