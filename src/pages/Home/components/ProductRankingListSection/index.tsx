// src/pages/ProductRankingListSection.tsx

import React, { Suspense, lazy, useEffect, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import type { ProductData, ProductRankingFilterOption } from '@/types/products';
import { Typography } from '@/components/common/Typography';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import ErrorBoundary from '@/pages/Home/components/ErrorBoundary';

const ProductRankingFilter = lazy(() =>
  import('./RankingFilter').then(mod => ({ default: mod.ProductRankingFilter })),
);
const ProductRankingList = lazy(() => import('./ProductRankingList'));

export default function ProductRankingListSection() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingText>로딩 중…</LoadingText>}>
        <RankingSectionContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function RankingSectionContent() {
  const [filterOption, setFilterOption] = useState<ProductRankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRanking = useCallback(() => {
    setLoading(true);
    setError(false);
    import('axios').then(({ default: axios }) => {
      axios
        .get<{ data: ProductData[] }>('/api/products/ranking', { params: filterOption })
        .then(({ data }) => {
          setProducts(data.data ?? []);
          setLoading(false);
        })
        .catch(err => {
          console.error('랭킹 조회 실패:', err);
          setError(true);
          setLoading(false);
        });
    });
  }, [filterOption]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  return (
    <Section>
      <Typography as='h3' variant='title1Bold' color='default'>
        실시간 급상승 선물랭킹
      </Typography>
      <HorizontalSpacing size='spacing5' />

      <Suspense fallback={<LoadingText>필터 로딩 중…</LoadingText>}>
        <ProductRankingFilter option={filterOption} onOptionChange={setFilterOption} />
      </Suspense>

      <HorizontalSpacing size='spacing4' />

      {loading && <LoadingText>로딩 중…</LoadingText>}
      {!loading && error && <ErrorText>랭킹을 불러오는 중 오류가 발생했습니다.</ErrorText>}
      {!loading && !error && products.length === 0 && (
        <EmptyText>현재 급상승 선물이 없습니다.</EmptyText>
      )}

      {!loading && !error && products.length > 0 && (
        <Suspense fallback={<LoadingText>목록 로딩 중…</LoadingText>}>
          <ProductRankingList products={products} />
        </Suspense>
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
