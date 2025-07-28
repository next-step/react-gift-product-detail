export const API_PATHS = {
  LOGIN: "/api/login",
  THEMES: {
    LIST: "/api/themes",
    INFO: (themeId: string | number) => `/api/themes/${themeId}/info`,
    PRODUCTS: (themeId: string | number) => `/api/themes/${themeId}/products`,
  },
  PRODUCTS: {
    ITEM: (productId: string | number) => `/api/products/${productId}`,
    DETAIL: (productId: string | number) => `/api/products/${productId}/detail`,
    WISH: (productId: string | number) => `/api/products/${productId}/wish`,
    REVIEW: (productId: string | number) =>
      `/api/products/${productId}/highlight-review`,
    SUMMARY: (productId: string | number) =>
      `/api/products/${productId}/summary`,
    RANKING: "/api/products/ranking",
  },
  ORDER: "/api/order",
};
