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
} as const;
