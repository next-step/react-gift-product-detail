export const API_PRODUCTS_PATH = {
  ranking: '/api/products/ranking',
  byId: (productId: string) => `/api/products/${productId}`,
  summary: (productId: string) => `/api/products/${productId}/summary`,
  detail: (productId: string) => `/api/products/${productId}/detail`,
  highlightReview: (productId: string) => `/api/products/${productId}/highlight-review`,
  wish: (productId: string) => `/api/products/${productId}/wish`,
};
