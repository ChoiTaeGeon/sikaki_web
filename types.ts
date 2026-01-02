
export type Language = 'KO' | 'EN' | 'TH';

export interface User {
  id: string;
  nickname: string;
  profileImage?: string;
  region: string;
  rating: number;
}

export type CommunityCategory = 'FREE' | 'QUESTION' | 'ANONYMOUS';

export interface Post {
  id: string;
  author: User;
  category: CommunityCategory;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

export interface MarketItem {
  id: string;
  author: User;
  category: string;
  title: string;
  content: string;
  price: number;
  images: string[];
  status: 'SALE' | 'RESERVED' | 'SOLD';
  likes: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: string;
}
