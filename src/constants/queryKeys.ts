export const QUERY_KEYS = {
  themes: ['themes'],
  themeInfo: (themeId: number) => ['themeInfo', themeId],
  themeProducts: (themeId: number) => ['themeProducts', themeId],
  
  product: (productId: number) => ['product', productId],

  productRanking: (category: string, gender: string) => ['productRanking', category, gender],

  productInfo: (productId: number) => ['productInfo', productId],
  productDetail: (productId: number) => ['productDetail', productId],
  productWish: (productId: number) => ['productWish', productId],
  productHighlightReview: (productId: number) => ['productHighlightReview', productId],

};
