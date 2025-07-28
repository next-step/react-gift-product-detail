export const API_ENDPOINTS = {
  THEMES: "/api/themes",
  THEME_INFO: (themeId: number) => `/api/themes/${themeId}/info`,
  THEME_PRODUCTS: (themeId: number) => `/api/themes/${themeId}/products`,
  RANKING: "/api/products/ranking",
  LOGIN: "/api/login",
  PRODUCT_SUMMARY: (productId: number) => `/api/products/${productId}/summary`,
  ORDER: "/api/order",
  PRODUCT: (productId: string) => `/api/products/${productId}`,
  PRODUCT_DETAIL: (productId: string) => `/api/products/${productId}/detail`,
  PRODUCT_WISH: (productId: string) => `/api/products/${productId}/wish`,
  PRODUCT_HIGHLIGHT_REVIEW: (productId: string) => `/api/products/${productId}/highlight-review`,
};
