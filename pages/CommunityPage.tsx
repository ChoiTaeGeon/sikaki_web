
import React, { useState } from 'react';
import { MOCK_POSTS } from '../constants';
import { Post, CommunityCategory } from '../types';
import { Heart, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { timeAgo } from '../utils';

interface CommunityPageProps {
  onPostClick: (post: Post) => void;
  labels: any;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onPostClick, labels }) => {
  const [selectedCat, setSelectedCat] = useState<string>('전체');
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const categories = ["전체", ...labels.categories];

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedPosts(newExpanded);
  };

  return (
    <div className="pb-20">
      <div className="sticky top-16 bg-white/90 backdrop-blur-md z-40 border-b border-tossBorder overflow-x-auto">
        <div className="flex gap-2 p-3 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                selectedCat === cat 
                  ? 'bg-tossBlue text-white' 
                  : 'bg-tossBg text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {MOCK_POSTS.map((post) => {
          const isExpanded = expandedPosts.has(post.id);
          const needsMore = post.content.length > 150;

          return (
            <div 
              key={post.id} 
              className="p-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={post.author.profileImage} className="w-8 h-8 rounded-full border border-slate-100" />
                <div>
                  <div className="text-sm font-bold">{post.author.nickname}</div>
                  <div className="text-[10px] text-slate-400">{timeAgo(post.createdAt)} • {post.author.region}</div>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              
              <div className="relative">
                <p className={`text-slate-600 leading-relaxed mb-4 ${!isExpanded && needsMore ? 'line-clamp-5' : ''}`}>
                  {post.content}
                </p>
                {needsMore && (
                  <button 
                    onClick={(e) => toggleExpand(e, post.id)}
                    className="text-tossBlue text-sm font-bold flex items-center gap-1 mt-[-8px] mb-4"
                  >
                    {isExpanded ? 'Fold' : labels.more}
                    {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </button>
                )}
              </div>

              {post.images.length > 0 && !isExpanded && (
                <div className="flex gap-2 overflow-x-auto pb-4">
                  {post.images.map((img, i) => (
                    <img key={i} src={img} className="w-40 h-40 object-cover rounded-2xl flex-shrink-0 shadow-sm" />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                <button className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                  <Heart size={18} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityPage;
