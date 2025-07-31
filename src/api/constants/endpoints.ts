// * API 엔드포인트 통합 상수 관리
export const API_ENDPOINTS = {
  // Auth 관련
  AUTH: {
    LOGIN: '/api/login',
  },

  // Product 관련
  PRODUCTS: {
    RANKING: '/api/products/ranking',
    SUMMARY: (productId: number) => `/api/products/${productId}/summary`,
    INFO: (productId: number) => `/api/products/${productId}`,
    DETAIL: (productId: number) => `/api/products/${productId}/detail`,
    REVIEW: (productId: number) => `/api/products/${productId}/highlight-review`,
    WISH: (productId: number) => `/api/products/${productId}/wish`,
  },

  // Theme 관련
  THEMES: {
    LIST: '/api/themes',
    INFO: (themeId: number) => `/api/themes/${themeId}/info`,
    PRODUCTS: (themeId: number) => `/api/themes/${themeId}/products`,
  },

  // Order 관련
  ORDER: '/api/order',
} as const
