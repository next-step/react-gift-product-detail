export const ROUTE = {
  MAIN: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: (productId: string | number = ':productId') => `/order/${productId}`,
  THEME: (themeId: string | number = ':themeId') => `/theme/${themeId}`,
  PRODUCT: (productId: string | number = ':productId') => `/products/${productId}`,
  NOT_FOUND: '*',
} as const;
