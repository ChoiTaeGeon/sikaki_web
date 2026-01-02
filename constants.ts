
import { Post, MarketItem, User } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  nickname: 'SikakiMaster',
  region: 'Seoul, Gangnam',
  rating: 4.8,
  profileImage: 'https://picsum.photos/seed/user1/100/100',
};

export const MOCK_POSTS: Post[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `p${i}`,
  author: MOCK_USER,
  category: i % 3 === 0 ? 'FREE' : i % 3 === 1 ? 'QUESTION' : 'ANONYMOUS',
  title: `오늘 점심 뭐 먹을까요? ${i + 1}`,
  content: `강남역 근처에 맛있는 돈까스집 추천해주세요. 벌써 며칠째 고민 중입니다. 아 그리고 여기 근처에 새로 생긴 카페도 가보셨나요? ${'내용이 긴 게시물을 테스트하기 위해 반복합니다. '.repeat(10)}`,
  images: [
    `https://picsum.photos/seed/post${i}/800/600`,
    `https://picsum.photos/seed/post${i + 100}/800/600`
  ],
  likes: 12 + i,
  comments: 4 + i,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const MOCK_MARKET_ITEMS: MarketItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `m${i}`,
  author: MOCK_USER,
  category: ['전자제품', '가구/인테리어', '생활/가공식품'][i % 3],
  title: `상태 좋은 ${['맥북 프로', '이케아 의자', '캡슐 커피'][i % 3]} 팝니다`,
  content: `거의 사용하지 않은 새제품급입니다. 직거래 선호해요. 네고 가능하니 편하게 연락주세요!`,
  price: (i + 1) * 15000,
  images: [
    `https://picsum.photos/seed/market${i}/600/600`,
    `https://picsum.photos/seed/market${i + 50}/600/600`
  ],
  status: 'SALE',
  likes: i * 2,
  createdAt: new Date(Date.now() - i * 7200000).toISOString(),
}));
