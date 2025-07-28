type QueryId = string | number | undefined;

export const QUERY_KEY = {
  THEMES: ["themes"],
  TRENDING_GIFTS: (mainTabIdx: number, subTabIdx: number) => [
    "trendingGifts",
    mainTabIdx,
    subTabIdx,
  ],
  THEME_INFO: (themeId: QueryId) => ["themeInfo", themeId],
  THEME_PRODUCTS: (themeId: QueryId, cursor: number) => [
    "themeProducts",
    themeId,
    cursor,
  ],
  PRODUCT_INFO: (id: QueryId) => ["productInfo", id],
  PRODUCT_DETAIL: (id: QueryId) => ["productDetail", id],
  PRODUCT_WISH: (id: QueryId) => ["productWish", id],
  PRODUCT_HIGHLIGHT_REVIEW: (id: QueryId) => ["productHighlightReview", id],
  PRODUCT_DETAIL_INFO: (id: QueryId) => ["productDetailInfo", id],
} as const;
