export const queryKeys = {
  giftProduct: (id: number) => ['giftProduct', id] as const,
  giftRanking: (filter: string, tab: string) =>
    ['giftRanking', filter, tab] as const,
  giftThemes: ['giftThemes'] as const,
  themeInfo: (themeId: number) => ['themeInfo', themeId] as const,
  productInfo: (productId: number) =>
    ['productInfo', productId] as const,
  productDescription: (productId: number) =>
    ['productDescription', productId] as const,
  productReview: (productId: number) =>
    ['productReview', productId] as const,
  productWish: (productId: number) =>
    ['productWish', productId] as const,

};
