export const QUERY_KEYS = {
  productInfo: (id: number) => ['productInfo', id] as const,
  productDetail: (id: number) => ['productDetail', id] as const,
  productReview: (id: number) => ['productReview', id] as const,
  productWish: (id: number) => ['productWish', id] as const,
  productSummary: (id?: string) => ['product', id] as const,
  themeInfo: (id: string) => ['themeInfo', id] as const,
  themeItemList: (themeId: string) => ['themeItemList', themeId] as const,
  rankingProducts: (targetType: string, rankType: string) =>
    ['rankingProducts', targetType, rankType] as const,
  themeCategories: ['themeCategories'] as const,
};
