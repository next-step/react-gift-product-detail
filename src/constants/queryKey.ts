const QUERY_KEY = {
  THEME_LIST: ["themeList"],
  THEME_INFO: (themeId: string) => ["theme_info", themeId],
  PRODUCT_INFO: (productId: string) => ["product_info", productId],
  PRODUCT_DETAIL: (productId: string) => ["product_detail", productId],
  PRODUCT_REVIEW: (productId: string) => ["product_review", productId],
  PRODUCT_WISH: (productId: string) => ["product_wish", productId],
};

export default QUERY_KEY;
