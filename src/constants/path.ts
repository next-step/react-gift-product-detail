export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  MY_PAGE: "/my",
  ORDER: (id: string | number = ":id") => `/order/${id}`,
  THEME: (id: string | number = ":id") => `/theme/${id}`,
  NOT_FOUND: "/not-found",
  PRODUCT: (id?: number) => (id ? `/products/${id}` : `/products/:productId`),
  ALL: "*",
} as const;
