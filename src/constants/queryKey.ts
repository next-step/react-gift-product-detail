export const QUERY_KEY = {
  THEMES: ["themes"],
  TRENDING_GIFTS: (mainTabIdx: number, subTabIdx: number) => [
    "trendingGifts",
    mainTabIdx,
    subTabIdx,
  ],
  THEME_INFO: (themeId: string | number | undefined) => ["themeInfo", themeId],
  THEME_PRODUCTS: (themeId: string | number | undefined, cursor: number) => [
    "themeProducts",
    themeId,
    cursor,
  ],
  PRODUCT_INFO: (id: string | number | undefined) => ["productInfo", id],
  PRODUCT_DETAIL: (id: string | number | undefined) => ["productDetail", id],
  PRODUCT_WISH: (id: string | number | undefined) => ["productWish", id],
  PRODUCT_HIGHLIGHT_REVIEW: (id: string | number | undefined) => [
    "productHighlightReview",
    id,
  ],
  PRODUCT_DETAIL_INFO: (id: string | number | undefined) => [
    "productDetailInfo",
    id,
  ],
} as const;
