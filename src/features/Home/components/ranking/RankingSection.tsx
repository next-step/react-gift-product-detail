import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TargetTab from './TargetTab';
import {
  Rank_MAP,
  RankS,
  Target_MAP,
  TargetS,
  type Product,
  type RankedProduct,
  type RankType,
  type TargetType,
} from './RankingTypes';
import RankTab from './RankTab';
import ProductGrid from './ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchRankedProducts } from '@apis/rankingApi';

const addRanking = (products: Product[]): RankedProduct[] => {
  return products.map((product, i) => ({
    ...product,
    ranking: i + 1,
  }));
};

const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  // 기본값 설정
  const rawTarget = searchParams.get('Target');
  const rawRank = searchParams.get('Rank');

  const selectedTarget: TargetType = TargetS.includes(rawTarget as TargetType)
    ? (rawTarget as TargetType)
    : '전체';
  const selectedRank: RankType = RankS.includes(rawRank as RankType)
    ? (rawRank as RankType)
    : '받고 싶어한';

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const apiTargetType = Target_MAP[selectedTarget];
  const apiRankType = Rank_MAP[selectedRank];
  const { data, isError, isPending } = useQuery<Product[]>({
    queryKey: ['RankedProducts', apiTargetType, apiRankType],
    queryFn: () => fetchRankedProducts(apiTargetType, apiRankType),
  });

  const products = data ? addRanking(data) : [];

  const navigate = useNavigate();
  const handleClick = (item: RankedProduct) => {
    navigate(`/order/${item.id}`);
  };

  return (
    <Section>
      <Title>실시간 급상승 선물랭킹</Title>

      <TargetTab
        selected={selectedTarget}
        onSelect={(label: string) => updateParam('Target', label)}
      />
      <RankTab
        selected={selectedRank}
        onSelect={(label: string) => updateParam('Rank', label)}
      />

      <ProductGrid
        products={products}
        isPending={isPending}
        isError={isError}
        isExpanded={isExpanded}
        toggleExpand={() => setIsExpanded((prev) => !prev)}
        onClickItem={handleClick}
      />
    </Section>
  );
};

export default RankingSection;

const Section = styled.section(({ theme }) => ({
  padding: theme.spacing.spacing4,
}));

const Title = styled.h2(({ theme }) => ({
  fontSize: theme.typography.title2Bold.fontSize,
  fontWeight: theme.typography.title2Bold.fontWeight,
  color: theme.colors.semantic.textDefault,
  marginBottom: theme.spacing.spacing4,
}));
