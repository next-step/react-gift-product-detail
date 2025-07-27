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

    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      fetchThemeProducts(Number(id), pageParam as number),

    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
    initialPageParam: 0,
  });

  const { sentinelRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  console.log(data);
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
      <GridWrqpper>
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </GridWrqpper>
      {hasNextPage && <div ref={sentinelRef} style={{ height: '1px' }} />}
    </>
  );
};

export default ProductList;

const GridWrqpper = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing5,
  padding: theme.spacing.spacing6,
}));
