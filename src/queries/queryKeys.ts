export const queryKeys = {
  themeList: () => ['themeList'] as const,
  themeInfo: (id: number) => ['themeInfo', id] as const,
  themeProducts: (id: number) => ['themeProducts', id] as const,
  product: (id: number) => ['product', id] as const,
  productDetail: (id: number) => ['productDetail', id] as const,
  productWish: (id: number) => ['productWish', id] as const,
  productHighlightReview: (id: number) => ['productHighlightReview', id] as const,
  productSummary: (id: number) => ['productSummary', id] as const,
  productRanking: (target: string, rank: string) => ['productRanking', target, rank] as const,
};
