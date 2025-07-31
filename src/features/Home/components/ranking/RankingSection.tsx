import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TargetTab from './TargetTab';
import {
  RankS,
  TargetS,
  type RankedProduct,
  type RankType,
  type TargetType,
} from './RankingTypes';
import RankTab from './RankTab';
import ProductGrid from './ProductGrid';
import SuspenseErrorBoundaryWrapper from '@components/common/SuspenseErrorBoundaryWrapper ';

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

  // 상품 클릭시 해당 상품의 order page로 이동
  const navigate = useNavigate();
  const handleClick = (item: RankedProduct) => {
    navigate(`/product/${item.id}`);
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
      <SuspenseErrorBoundaryWrapper key={selectedRank + selectedTarget}>
        {/*쿼리 키만 바뀌는 경우 감지 못해 key 추가*/}
        <ProductGrid
          selectedTarget={selectedTarget}
          selectedRank={selectedRank}
          isExpanded={isExpanded}
          toggleExpand={() => setIsExpanded((prev) => !prev)}
          onClickItem={handleClick}
        />
      </SuspenseErrorBoundaryWrapper>
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
