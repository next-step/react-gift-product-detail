import type { Product } from '../type'
import { fetchApi } from './client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
  type UseMutationOptions,
  type UseMutationResult,
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
    queryKey: productKeys.summary(productId!),
    queryFn: () => fetchProductSummary(productId!),    enabled: productId !== undefined,
    ...options,
  })
}

export interface ProductDetailItem {
  label: string
  value: string
}

export interface ProductDetail {
  info: ProductDetailItem[]
}

export async function fetchProduct(productId: number): Promise<Product> {
  return fetchApi<Product>(`/api/products/${productId}`)
}

export async function fetchProductDetail(
  productId: number,
): Promise<ProductDetail> {
  return fetchApi<ProductDetail>(`/api/products/${productId}/detail`)
}

export async function fetchHighlightReview(
  productId: number,
): Promise<unknown> {
  return fetchApi(`/api/products/${productId}/highlight-review`)
}

export async function fetchWishCount(productId: number): Promise<number> {
  const data = await fetchApi<{ count: number }>(
    `/api/products/${productId}/wish`,
  )
  return data.count
}

export async function postWish(productId: number): Promise<void> {
  await fetchApi(`/api/products/${productId}/wish`, { method: 'POST' })
}

export function useProductQuery(
  productId: number | undefined,
  options?: UseQueryOptions<Product, Error>,
): UseQueryResult<Product, Error> {
  return useQuery<Product, Error>({
    queryKey: productKeys.detail(productId!),
    queryFn: () => fetchProduct(productId!),
    enabled: productId !== undefined,
    ...options,
  })
}

export function useProductDetailQuery(
  productId: number | undefined,
  options?: UseQueryOptions<ProductDetail, Error>,
): UseQueryResult<ProductDetail, Error> {
  return useQuery<ProductDetail, Error>({
    queryKey: productKeys.productDetail(productId!),
    queryFn: () => fetchProductDetail(productId!),
    enabled: productId !== undefined,
    ...options,
  })
}

export function useHighlightReviewQuery(
  productId: number | undefined,
  options?: UseQueryOptions<unknown, Error>,
): UseQueryResult<unknown, Error> {
  return useQuery<unknown, Error>({
    queryKey: productKeys.review(productId!),
    queryFn: () => fetchHighlightReview(productId!),
    enabled: productId !== undefined,
    ...options,
  })
}

export function useWishCountQuery(
  productId: number | undefined,
  options?: UseQueryOptions<number, Error>,
): UseQueryResult<number, Error> {
  return useQuery<number, Error>({
    queryKey: productKeys.wish(productId!),
    queryFn: () => fetchWishCount(productId!),
    enabled: productId !== undefined,
    ...options,
  })
}

export function useWishMutation(
  productId: number,
  options?: UseMutationOptions<void, Error, void>,
): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient()
  return useMutation<void, Error, void>({
    mutationFn: () => postWish(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productKeys.wish(productId) })
      const prev = queryClient.getQueryData<number>(productKeys.wish(productId))
      queryClient.setQueryData<number>(productKeys.wish(productId), (prev ?? 0) + 1)
      return { prev }
    },
    onError: (_err, _vars, context) => {
      if (context?.prev !== undefined) {
        queryClient.setQueryData(productKeys.wish(productId), context.prev)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.wish(productId) })
    },
    ...options,
  })
}