
import React from 'react';
import { MOCK_POSTS } from '../constants';
import { Post } from '../types';
import { Heart, MessageCircle } from 'lucide-react';
import { timeAgo } from '../utils';

interface HomePageProps {
  onPostClick: (post: Post) => void;
  labels: any;
}

const HomePage: React.FC<HomePageProps> = ({ onPostClick, labels }) => {
  const topPosts = MOCK_POSTS.slice(0, 10);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">{labels.popularPosts}</h2>
          {/* 'View All' button removed as requested */}
        </div>
        <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
          {topPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onPostClick(post)}
              className="bg-white border border-tossBorder p-4 md:p-6 rounded-3xl md:rounded-4xl active:scale-[0.98] md:active:scale-[0.99] transition-all cursor-pointer shadow-sm hover:shadow-md md:hover:shadow-xl md:hover:-translate-y-1"
            >
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="flex-1 space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-tossBg text-tossBlue text-[10px] md:text-[11px] font-black rounded-lg uppercase">
                      {post.category}
                    </span>
                    <span className="text-tossGrey text-[11px] md:text-[12px] font-medium">{timeAgo(post.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 text-lg md:text-xl leading-snug">{post.title}</h3>
                  <p className="text-sm md:text-[16px] text-slate-500 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 md:gap-5 pt-1 md:pt-2">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[13px] md:text-[14px] font-bold">
                      <Heart size={16} className="text-red-400 fill-red-400/10" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[13px] md:text-[14px] font-bold">
                      <MessageCircle size={16} className="text-blue-400 fill-blue-400/10" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
                {post.images.length > 0 && (
                  <img 
                    src={post.images[0]} 
                    alt="preview" 
                    className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-2xl md:rounded-3xl shrink-0 shadow-sm"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
