export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  MY: "/my",
  ORDER: "/order/:itemId",
  toORDER: (itemId: string | number) => `/order/${itemId}`,
  THEME: "/themes/:themeId",
  PRODUCT_DETAIL: "/products/:productId",
  toPRODUCT_DETAIL: (productId: string | number) => `/products/${productId}`,
  NOTFOUND: "*",
};
