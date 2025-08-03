export const QUERY_KEYS = {
  PRODUCTS: 'products',
  THEMES: 'themes',
} as const

export const productKeys = {
  all: () => [QUERY_KEYS.PRODUCTS],
  ranking: (targetType: string, rankType: string) =>
    [QUERY_KEYS.PRODUCTS, 'ranking', targetType, rankType] as const,
  summary: (productId: number) =>
    [QUERY_KEYS.PRODUCTS, productId, 'summary'] as const,

  detail: (productId: number) => [QUERY_KEYS.PRODUCTS, productId] as const,
  productDetail: (productId: number) =>
    [QUERY_KEYS.PRODUCTS, productId, 'detail'] as const,
  review: (productId: number) =>
    [QUERY_KEYS.PRODUCTS, productId, 'highlight-review'] as const,
  wish: (productId: number) =>
    [QUERY_KEYS.PRODUCTS, productId, 'wish'] as const,
}

export const themeKeys = {
  all: () => [QUERY_KEYS.THEMES],
  products: (themeId: number, params: unknown) =>
    [QUERY_KEYS.THEMES, themeId, 'products', params] as const,
}
