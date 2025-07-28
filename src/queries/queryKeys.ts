export const queryKeys = {
  themeList: () => ['themeList'] as const,
  themeProducts: (themeId: number) => ['themeProducts', themeId] as const,
  product: (productId: string | number) => ['product', productId] as const,
};
