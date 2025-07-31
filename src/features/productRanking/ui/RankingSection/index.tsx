import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getRankingProducts } from '@/entities/product/api/productApi';
import type { TargetType, RankType } from '@/entities/product/model/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import { ROUTES } from '@/shared/config';
import RankingFilter from '../RankingFilter';
import RankingGrid from '../RankingGrid';
import * as S from './styles';

const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const selectedGender = searchParams.get('gender') || 'ALL';
  const selectedAction = searchParams.get('action') || 'MANY_WISH';

  const { data } = useSuspenseQuery({
    queryKey: productQueryKeys.ranking(selectedGender, selectedAction),
    queryFn: () => getRankingProducts(selectedGender as TargetType, selectedAction as RankType),
  });

  const handleGenderChange = (gender: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('gender', gender);
      return newParams;
    });
  };

  const handleActionChange = (action: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('action', action);
      return newParams;
    });
  };

  const handleItemCardClick = (productId: number) => {
    navigate(`${ROUTES.PRODUCT}/${productId}`);
  };

  const handleToggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <S.Section>
      <S.Title>실시간 급상승 선물랭킹</S.Title>

      <RankingFilter
        selectedGender={selectedGender}
        selectedAction={selectedAction}
        onGenderChange={handleGenderChange}
        onActionChange={handleActionChange}
      />

      <RankingGrid
        data={data}
        isExpanded={isExpanded}
        onToggleExpand={handleToggleExpand}
        onItemClick={handleItemCardClick}
      />
    </S.Section>
  );
};

export default RankingSection;
