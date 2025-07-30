export interface Theme {
  themeId: number
  name: string
  image: string
}

export interface ThemeProductsResponse {
  list: import('../type').Product[]
  cursor: number
  hasMoreList: boolean
}
import { fetchApi } from './client'
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import { themeKeys } from '@/constants/queryKeys'
export interface FetchThemeProductsParams {
  cursor?: number
  limit?: number
}

export async function fetchThemes(): Promise<Theme[]> {
  const data = await fetchApi<Theme[]>('/api/themes')

  if (!Array.isArray(data)) {
    throw new Error('Invalid response from /api/themes')
  }
  return data
}

export async function fetchThemeProducts(
  themeId: number,
  { cursor = 0, limit = 10 }: FetchThemeProductsParams = {},
): Promise<ThemeProductsResponse> {
  const data = await fetchApi<ThemeProductsResponse>(
    `/api/themes/${themeId}/products`,
    { cursor: String(cursor), limit: String(limit) },
  )
  if (typeof data !== 'object' || !Array.isArray(data.list)) {
    throw new Error('Invalid response from /api/themes/:themeId/products')
  }

  return data
   }

export function useThemesQuery(
  options?: UseQueryOptions<Theme[], Error>,
): UseQueryResult<Theme[], Error> {
  return useQuery<Theme[], Error>({
    queryKey: themeKeys.all(),
    queryFn: fetchThemes,
    ...options,
  })
}

export function useThemeProductsQuery(
  themeId: number | undefined,
  params?: FetchThemeProductsParams,
  options?: UseQueryOptions<ThemeProductsResponse, Error>,
): UseQueryResult<ThemeProductsResponse, Error> {
  return useQuery<ThemeProductsResponse, Error>({
    queryKey: themeKeys.products(themeId!, params),    queryFn: () => fetchThemeProducts(themeId!, params),
    enabled: themeId !== undefined,
    ...options,
  })
}