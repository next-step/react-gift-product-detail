export const QUERY_KEYS = {
    THEME_INFO: (themeId: number) => ['themeInfo', themeId] as const,
    THEME_PRODUCTS: (themeId: number) => ['themeProducts', themeId] as const,
    RANKING_PRODUCTS: (gender: string, action: string) => ['rankingProducts', gender, action] as const,
    THEMES: ['themes'] as const,
    PRODUCT_SUMMARY: (productId: string | number) => ['productSummary', productId] as const,
  };