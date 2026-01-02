
import React, { useState } from 'react';
import { X, Camera, ChevronDown } from 'lucide-react';
import { postMessageToNative } from '../utils';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'POST' | 'MARKET';
  labels: any;
}

const WriteModal: React.FC<WriteModalProps> = ({ isOpen, onClose, type, labels }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen) return null;

  const categories = type === 'POST' ? labels.categories : labels.marketCategories.filter((c: string) => c !== '전체');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '' && (type === 'POST' || price.trim() !== '');

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    postMessageToNative('post_created', { type, title, category });
    alert('작성이 완료되었습니다!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <header className="h-20 flex items-center justify-between px-6 border-b shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold">
              {type === 'MARKET' ? (labels.writeMarket || "판매 글 작성하기") : labels.write}
            </h2>
          </div>
          <button 
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              isFormValid 
                ? 'bg-tossBlue text-white hover:brightness-110' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {labels.submit}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">카테고리</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none focus:ring-2 ring-tossBlue/20"
              >
                <option value="" disabled>카테고리를 선택하세요</option>
                {categories.map((cat: string) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown size={20} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Image Upload Preview */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-1">사진 (최대 10장)</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <label className="flex-shrink-0 w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-tossBlue/50 transition-colors">
                <Camera className="text-slate-400" size={28} />
                <span className="text-[11px] text-slate-400 font-bold mt-1">{images.length}/10</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              {images.map((img, i) => (
                <div key={i} className="relative flex-shrink-0 w-24 h-24 group">
                  <img src={img} className="w-full h-full object-cover rounded-3xl" />
                  <button 
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">{labels.title}</label>
              <input 
                type="text" 
                placeholder="제목을 입력하세요"
                className="w-full text-xl font-bold border-none bg-transparent outline-none placeholder:text-slate-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {type === 'MARKET' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">{labels.price}</label>
                <div className="flex items-center gap-2 py-3 border-y border-slate-100">
                  <span className="font-bold text-slate-400">₩</span>
                  <input 
                    type="number" 
                    placeholder="판매 가격을 입력하세요"
                    className="w-full font-extrabold text-lg outline-none bg-transparent"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-1">{labels.content}</label>
              <textarea 
                placeholder="신뢰할 수 있는 거래를 위해 내용을 상세히 적어주세요."
                className="w-full h-48 border-none outline-none resize-none placeholder:text-slate-300 leading-relaxed bg-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WriteModal;
