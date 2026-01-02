
import React from 'react';
import { Settings, Globe, LogOut, ChevronRight, ShoppingCart, FileText, Heart as HeartIcon } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { postMessageToNative } from '../utils';

interface MyPageProps {
  labels: any;
  lang: string;
  setLang: (l: any) => void;
}

const MyPage: React.FC<MyPageProps> = ({ labels, lang, setLang }) => {
  const menuItems = [
    { icon: FileText, label: '나의 작성 글', count: 12 },
    { icon: ShoppingCart, label: '판매 내역', count: 5 },
    { icon: HeartIcon, label: '관심 목록', count: 28 },
  ];

  return (
    <div className="pb-24 bg-tossBg min-h-screen">
      <div className="bg-white p-6 pt-10 rounded-b-4xl shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img src={MOCK_USER.profileImage} className="w-20 h-20 rounded-full border-4 border-slate-50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-tossBlue border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{MOCK_USER.nickname}</h2>
            <p className="text-slate-400 text-sm font-medium">{MOCK_USER.region} • 온도 {MOCK_USER.rating * 10}°C</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-1.5 p-4 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <item.icon className="text-slate-500" size={20} />
              <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
              <span className="text-sm font-bold text-slate-900">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3 px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="text-tossBlue" size={20} />
              <span className="font-bold text-slate-700">{labels.langSelect}</span>
            </div>
            <div className="flex gap-1">
              {['KO', 'EN', 'TH'].map(l => (
                <button 
                  key={l}
                  onClick={() => setLang(l as any)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    lang === l ? 'bg-tossBlue text-white' : 'text-slate-400 bg-slate-50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full p-4 flex items-center justify-between active:bg-slate-50">
            <div className="flex items-center gap-3">
              <Settings className="text-slate-400" size={20} />
              <span className="font-bold text-slate-700">{labels.settings}</span>
            </div>
            <ChevronRight className="text-slate-300" size={20} />
          </button>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <button 
            onClick={() => {
              if (confirm('정말 탈퇴하시겠습니까?')) {
                postMessageToNative('account_deleted');
              }
            }}
            className="w-full p-4 flex items-center gap-3 text-red-500 active:bg-red-50"
          >
            <LogOut size={20} />
            <span className="font-bold">{labels.deleteAccount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
