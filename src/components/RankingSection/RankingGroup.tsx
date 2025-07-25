import styled from '@emotion/styled';
import { useState } from 'react';
import RankingFilter from '@/components/RankingSection/RankingFilter';
import RankingSort from '@/components/RankingSection/RankingSort';
import RankingContent from '@/components/RankingSection/RankingContent';
import { useProductRanking } from '@/hooks/useProductRanking';
import { useRankingParams } from '@/hooks/useRankingParams';

const INITIAL_VISIBLE_COUNT = 6;

const RankingGroup = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const { targetType, rankType, setTargetType, setRankType } =
    useRankingParams();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProductRanking(targetType, rankType);

  const isExpanded = visibleCount === products.length;

  const toggleVisibleCount = () => {
    setVisibleCount(isExpanded ? INITIAL_VISIBLE_COUNT : products.length);
  };

  return (
    <Section>
      <Title>실시간 급상승 선물랭킹</Title>
      <RankingFilter selectedFilter={targetType} onSelect={setTargetType} />
      <RankingSort selectedSort={rankType} onSelect={setRankType} />
      <RankingContent
        data={products}
        isLoading={isLoading}
        isError={isError}
        visibleCount={visibleCount}
        toggleVisibleCount={toggleVisibleCount}
        isExpanded={isExpanded}
      />
    </Section>
  );
};

export default RankingGroup;

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[4]}`};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
