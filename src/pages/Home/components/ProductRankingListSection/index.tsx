// src/pages/ProductRankingListSection.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import type { ProductData, ProductRankingFilterOption } from '@/types/products';
import { Typography } from '@/components/common/Typography';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import ErrorBoundary from '@/pages/Home/components/ErrorBoundary';
import { ProductRankingFilter } from './RankingFilter';
import ProductRankingList from './ProductRankingList';
import axios, { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function ProductRankingListSection() {
  return (
    <ErrorBoundary>
      <RankingSectionContent />
    </ErrorBoundary>
  );
}

function RankingSectionContent() {
  const [filterOption, setFilterOption] = useState<ProductRankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<ProductData[], AxiosError>({
    queryKey: ['productRanking', filterOption],
    queryFn: () =>
      axios
        .get<{ data: ProductData[] }>('/api/products/ranking', {
          params: filterOption,
        })
        .then(res => res.data.data),
  });

  return (
    <Section>
      <Typography as='h3' variant='title1Bold' color='default'>
        실시간 급상승 선물랭킹
      </Typography>
      <HorizontalSpacing size='spacing5' />

      <ProductRankingFilter option={filterOption} onOptionChange={setFilterOption} />

      <HorizontalSpacing size='spacing4' />

      {isLoading && <LoadingText>로딩 중…</LoadingText>}
      {!isLoading && error && (
        <ErrorText>랭킹을 불러오는 중 오류가 발생했습니다.</ErrorText>
      )}
      {!isLoading && !error && products.length === 0 && (
        <EmptyText>현재 급상승 선물이 없습니다.</EmptyText>
      )}

      {!isLoading && !error && products.length > 0 && (
        <ProductRankingList products={products} />
      )}
    </Section>
  );
}

// Styled
const Section = styled.section(({ theme }) => ({
  padding: `0 ${theme.spacing.spacing4}`,
  width: '100%',
}));

const LoadingTextBase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography as='p' variant='body1Regular' color='default'>
    {children}
  </Typography>
);

const LoadingText = styled(LoadingTextBase)`
  margin: 1rem 0;
`;
const ErrorText = styled(LoadingText)`
  color: red;
`;
const EmptyText = styled(LoadingText)`
  color: #555;
`;
