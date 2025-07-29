import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import {
  getProductById,
  getProductDetail,
  getProductHighlightReview,
  getProductWish,
} from '@/entities/product/api/productApi';
import { useSuspenseQueries, useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { RankingProduct } from '@/entities/product/model/types';
import { ProductOverview, ProductTabs } from '@/entities/product/ui';
import { ProductActionGroup } from '@/entities/product/ui/ProductActionGroup';

const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? Number(productId) : undefined;
  const queryClient = useQueryClient();

  if (!numericProductId) {
    return null;
  }

  // 페이지 진입 시 즉시 보이는 데이터들을 useSuspenseQueries로 호출
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: productQueryKeys.info(numericProductId),
        queryFn: () => getProductById(numericProductId),
      },
      {
        queryKey: productQueryKeys.wish(numericProductId),
        queryFn: () => getProductWish(numericProductId),
      },
    ],
  });

  const productData = results[0].data as RankingProduct;
  const wishData = results[1].data;

  // 탭 데이터는 백그라운드에서 호출
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: productQueryKeys.detail(numericProductId),
      queryFn: () => getProductDetail(numericProductId),
    });

    queryClient.prefetchQuery({
      queryKey: productQueryKeys.highlightReview(numericProductId),
      queryFn: () => getProductHighlightReview(numericProductId),
    });
  }, [numericProductId, queryClient]);

  return (
    <ErrorBoundary fallback={<RedirectOnError to={ROUTES.HOME} />}>
      <Suspense fallback={<Loading height="100vh" />}>
        <ProductOverview data={productData} />
        <Suspense fallback={<Loading height="60px" />}>
          <ProductTabs />
        </Suspense>
        <ProductActionGroup wishData={wishData} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Product;
