export const QUERY_KEYS = {
    THEME_INFO: (themeId: number) => ['themeInfo', themeId] as const,
    THEME_PRODUCTS: (themeId: number) => ['themeProducts', themeId] as const,
    RANKING_PRODUCTS: (gender: string, action: string) => ['rankingProducts', gender, action] as const,
    THEMES: ['themes'] as const,
    PRODUCT_SUMMARY: (productId: string | number) => ['productSummary', productId] as const,
    PRODUCT_DETAIL: (productId: number) => ['productDetail', productId] as const,
    PRODUCT_HIGHLIGHT_REVIEW: (productId: number) => ['productHighlightReview', productId] as const,
    PRODUCT_WISH: (productId: number) => ['productWish', productId] as const,
    PRODUCT: (productId: number) => ['product', productId] as const,
  };