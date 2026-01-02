
import React, { useState, useEffect } from 'react';
import { MOCK_MARKET_ITEMS } from '../constants';
import { MarketItem } from '../types';
import { Heart } from 'lucide-react';
import { formatPrice, timeAgo } from '../utils';

interface MarketPageProps {
  onItemClick: (item: MarketItem) => void;
  labels: any;
  lang: string;
}

const MarketPage: React.FC<MarketPageProps> = ({ onItemClick, labels, lang }) => {
  // 언어 변경에 대응하기 위해 카테고리명을 직접 저장하는 대신 인덱스를 사용합니다.
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);

  // 언어가 변경될 때 카테고리 선택을 '전체'(0번 인덱스)로 초기화하여 오류를 방지합니다.
  useEffect(() => {
    setSelectedCatIndex(0);
  }, [lang]);

  const selectedCatLabel = labels.marketCategories[selectedCatIndex];

  return (
    <div className="pb-20">
      {/* 카테고리 네비게이션 - 화면 너비에 맞춰 줄바꿈 처리 */}
      <div className="sticky top-16 md:top-20 bg-white/90 backdrop-blur-md z-40 border-b border-tossBorder px-4 py-4 md:px-8">
        <div className="flex flex-wrap gap-2 max-w-5xl">
          {labels.marketCategories.map((cat: string, index: number) => (
            <button
              key={cat}
              onClick={() => setSelectedCatIndex(index)}
              className={`px-4 py-2 rounded-2xl text-[13px] md:text-sm font-bold transition-all border ${
                selectedCatIndex === index 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                  : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 중고장터 아이템 그리드 - 모든 화면에서 최대 2열 유지 */}
      <div className="grid grid-cols-2 gap-px bg-tossBorder border-b border-tossBorder">
        {MOCK_MARKET_ITEMS
          .filter(item => selectedCatIndex === 0 || item.category === selectedCatLabel)
          .map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-4 md:p-6 space-y-3 cursor-pointer active:bg-slate-50 transition-colors"
            onClick={() => onItemClick(item)}
          >
            <div className="relative aspect-square">
              <img 
                src={item.images[0]} 
                alt={item.title} 
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-inner border border-slate-50"
              />
              {item.status !== 'SALE' && (
                <div className="absolute inset-0 bg-black/40 rounded-2xl md:rounded-3xl flex items-center justify-center">
                  <span className="text-white font-bold text-xs bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/30">
                    {item.status}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1.5 pt-1">
              <h4 className="font-bold text-slate-800 line-clamp-2 text-[14px] md:text-[16px] leading-snug h-10 md:h-12">{item.title}</h4>
              <p className="text-[10px] md:text-[12px] text-slate-400 font-medium">{item.author.region} • {timeAgo(item.createdAt)}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-md md:text-xl font-black text-tossBlue">{formatPrice(item.price, lang)}</span>
                <div className="flex items-center gap-1 text-slate-300">
                  <Heart size={14} className={item.likes > 0 ? "fill-red-400 text-red-400" : ""} />
                  <span className="text-[10px] md:text-[12px] font-bold">{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 데이터 없음 상태 */}
      {MOCK_MARKET_ITEMS.filter(item => selectedCatIndex === 0 || item.category === selectedCatLabel).length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-slate-400">
          <p className="font-bold">이 카테고리에 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MarketPage;
