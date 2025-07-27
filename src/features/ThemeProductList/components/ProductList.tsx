import ProductCard from './ProductCard';
import styled from '@emotion/styled';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { fetchThemeProducts } from '@apis/themeApi';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import EmptyMessage from '@components/common/EmptyMessage';
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import type { ThemeProductProps, ThemeProducts } from '../themeProductType';

const ProductList = ({ id }: ThemeProductProps) => {
  const {
    data,
    error,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ThemeProducts, Error>({
    queryKey: ['themeProducts', id],

    // 데이터 요청함수
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      fetchThemeProducts(Number(id), pageParam as number),

    // 다음 페이지를 가져올 기준
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,

    // 초기 페이지 Param
    initialPageParam: 0,
  });

  // 무한 스크롤 훅 사용
  const { sentinelRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  // 모든 페이지에서 상품 리스트를 평탄화
  const products = data?.pages.flatMap((page) => page.list) ?? [];

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <EmptyMessage>
        {error.message ?? '상품을 불러오는데 실패했습니다.'}
      </EmptyMessage>
    );

  if (products.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <>
      <GridWrapper>
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </GridWrapper>
      {hasNextPage && <div ref={sentinelRef} style={{ height: '1px' }} />}
    </>
  );
};

export default ProductList;

const GridWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing5,
  padding: theme.spacing.spacing6,
}));
