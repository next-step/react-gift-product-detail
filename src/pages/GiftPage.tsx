import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { NavBar } from '@/components/NavBar';
import { FriendSelectBar } from '@/components/FriendSelectBar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Banner } from '@/components/Banner';
import {
  RankingTabs,
  type GenderFilter,
  type SortFilter,
} from '@/components/RankingTabs';

import { RankingGrid } from '@/components/RankingGrid';
import type { GiftItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getThemes, getRanking } from '@/api/services';
import { RankingGridSkeleton } from '@/components/RankingGridSkeleton';
import { useQuery } from '@tanstack/react-query';

export const GiftPage = () => {
  const [gender, setGender] = useState<GenderFilter>('ALL');
  const [sort, setSort] = useState<SortFilter>('WANT');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  });
  const { data: rankingList, isLoading: isRankingLoading, error: rankingError } = useQuery({
    queryKey: ['ranking', gender, sort],
    queryFn: () => getRanking(gender, sort),
  });

  const handleCardClick = (item: GiftItem) => {
    if (!isLoggedIn) {
      alert('로그인이 필요해요.');
      navigate('/login');
    } else {
      navigate(`/product/${item.id}`);
    }
  };

  const handleTab = (g: GenderFilter, s: SortFilter) => {
    setGender(g);
    setSort(s);
  };

  return (
    <Layout>
      <NavBar />
      <FriendSelectBar />
      {isCategoriesLoading && <div>테마 목록을 불러오는 중...</div>}
      {categoriesError && <div>테마 목록을 불러오는 데 실패했습니다.</div>}
      {categories && <CategoryGrid items={categories} />}
      <Banner />
      <RankingTabs gender={gender} sort={sort} onChange={handleTab} />
      {isRankingLoading ? (
        <RankingGridSkeleton />
      ) : rankingError ? (
        <div>랭킹 정보를 불러오는 데 실패했습니다.</div>
      ) : (
        rankingList && rankingList.length > 0 ? (
          <RankingGrid items={rankingList} onCardClick={handleCardClick} />
        ) : (
          <div>표시할 상품 목록이 없습니다.</div>
        )
      )}</Layout>
  );
};

export default GiftPage;
