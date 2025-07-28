export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: (id: number | string) => `/order/${id}`,
  ORDER_PATH: '/order/:id',
  THEME: (themeId: number | string) => `/themes/${themeId}`,
  THEME_PATH: '/themes/:themeId',
  PRODUCT_DETAIL: (productId: number | string) => `/products/${productId}`,
  PRODUCT_DETAIL_PATH: '/products/:productId',
  NOT_FOUND: '*',
} as const;
