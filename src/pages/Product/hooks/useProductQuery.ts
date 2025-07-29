import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQueries, useQueryClient } from '@tanstack/react-query';
import {
  getProductById,
  getProductDetail,
  getProductHighlightReview,
  getProductWish,
} from '@/entities/product/api/productApi';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { RankingProduct } from '@/entities/product/model/types';

export const useProductQuery = () => {
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? Number(productId) : undefined;
  const queryClient = useQueryClient();

  if (!numericProductId) {
    return {
      productData: null,
      wishData: null,
      numericProductId: undefined,
    };
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

  return {
    productData,
    wishData,
    numericProductId,
  };
};
