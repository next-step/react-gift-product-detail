export const productQueryKeys = {
    info: (productId: number) => ['product', productId] as const,
    summary: (productId: string | number) => ['productSummary', productId] as const,
    detail : (productId: number) => ['productDetail', productId] as const,
    highlightReview: (productId: number) => ['productHighlightReview', productId] as const,
    wish: (productId: number) => ['productWish', productId] as const,
    ranking: (gender: string, action: string) => ['rankingProducts', gender, action] as const,
} as const;