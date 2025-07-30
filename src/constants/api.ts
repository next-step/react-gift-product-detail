export const API = {
  PRODUCT_RANKING: "/products/ranking",
  THEMES: "/themes",
  PRODUCT_INFO: (id: string | number) => `/products/${id}`,
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}/detail`,
  HIGHLIGHT_REVIEW: (id: string | number) => `/products/${id}/highlight-review`,
  PRODUCT_WISH: (id: string | number) => `/products/${id}/wish`,
};
