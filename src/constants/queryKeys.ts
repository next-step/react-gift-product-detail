export const QUERY_KEYS = {
  ORDER_PRODUCTS: (orderId: string) => ["orderProducts", orderId] as const,
  PRODUCTS_RANKING: (targetType: string, rankType: string) => ["rankingList", targetType, rankType] as const,

  THEMES: ["themes"] as const,
  THEME_INFO: (themeId: string) => ["themeInfo", themeId] as const,
  THEME_PRODUCTS: (themeId: string) => ["themeProducts", themeId] as const,

  PRODUCT: (productId: string) => ["product", productId] as const,
} as const;
