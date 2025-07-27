export const QUERY_KEYS = {
  themes: ['themes'],
  themeInfo: (themeId: number) => ['themeInfo', themeId],
  themeProducts: (themeId: number) => ['themeProducts', themeId],
  
  product: (productId: number) => ['product', productId],

  productRanking: (category: string, gender: string) => ['productRanking', category, gender],
};
