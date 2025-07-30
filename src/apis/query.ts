import type { GetProductRankingParams } from './domain/products/getProductsRanking';
import type { GetThemeProductsParams } from './domain/themes/getThemeProducts';

export const API_QUERY_KEY = {
  theme: {
    info: (themeId: string) => ['theme', themeId],
    category: ['theme', 'category'],
    products: (params: GetThemeProductsParams) => ['theme', 'products', 'lists', params],
  },
  products: {
    ranking: (params: GetProductRankingParams) => ['products', 'lists', 'ranking', params],
    summary: (productId: string) => ['products', productId, 'summary'],
    byId: (productId: string) => ['products', productId, 'byId'],
    detail: (productId: string) => ['products', productId, 'detail'],
    highlightReview: (productId: string) => ['products', productId, 'highlight-review'],
    wish: (productId: string) => ['products', productId, 'wish'],
  },
};
