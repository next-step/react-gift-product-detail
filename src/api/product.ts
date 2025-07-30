import type { Product } from '../type'
import { fetchApi } from './client'
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { productKeys } from '@/constants/queryKeys'

export interface ProductSummary {
  id: number
  name: string
  brandName: string
  price: number
  imageURL: string
}

export async function fetchProductRanking(
  targetType: string = 'ALL',
  rankType: string = 'MANY_WISH',
): Promise<Product[]> {
  const data = await fetchApi<Product[]>('/api/products/ranking', {
    targetType,
    rankType,
  })

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from /api/products/ranking')
  }
  return data
}

export async function fetchProductSummary(
  productId: number,
): Promise<ProductSummary> {
  const data = await fetchApi<ProductSummary>(
    `/api/products/${productId}/summary`,
  )

  if (
    typeof data !== 'object' ||
    typeof data.id !== 'number' ||
    typeof data.name !== 'string'
  ) {
    throw new Error('Invalid response from /api/products/:productId/summary')
  }

  return data
    }

export function useProductRankingQuery(
  targetType = 'ALL',
  rankType = 'MANY_WISH',
  options?: UseQueryOptions<Product[], Error>,
): UseQueryResult<Product[], Error> {
  return useQuery<Product[], Error>({
    queryKey: productKeys.ranking(targetType, rankType),    queryFn: () => fetchProductRanking(targetType, rankType),
    ...options,
  })
}

export function useProductSummaryQuery(
  productId: number | undefined,
  options?: UseQueryOptions<ProductSummary, Error>,
): UseQueryResult<ProductSummary, Error> {
  return useQuery<ProductSummary, Error>({
    queryKey: productKeys.summary(productId!),    queryFn: () => fetchProductSummary(productId!),
    enabled: productId !== undefined,
    ...options,
  })
}