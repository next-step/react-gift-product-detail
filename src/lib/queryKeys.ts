import type { Gender, Type } from '@/features/Gift/hooks/useProductsRanking';

export const queryKeys = {
  products: {
    ranking: (gender: Gender, type: Type) =>
      ['productsRanking', gender, type] as const,
    summary: (productId: number | null) => ['product', productId] as const,
  },
  themes: {
    products: (themeId: number | null) => ['themeProducts', themeId] as const,
  },
};
