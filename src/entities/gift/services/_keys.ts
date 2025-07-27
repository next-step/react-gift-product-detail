export const GIFT_QUERY_KEYS = {
    GIFT_LIST_BY_THEME_ID: (themeId: number) => ["GIFT", `THEME_ID=${themeId}`],
    GIFT_THEME_INFO: (themeId: number) => ["GIFT", `THEME_INFO=${themeId}`],
    GIFT_THEMES: () => ["GIFT", "THEMES"],

    RANKING_GIFT_BY_QUERY: (rankType: string, targetType: string) => [
        `RANKING_GIFT_BY_QUERY`,
        `RANK_TYPE_QUERY=${rankType}`,
        `TARGET_TYPE_QUERY=${targetType}`,
    ],

    PRODUCT_SUMMARY_BY_ID: (productId: number) => ["PRODUCT_SUMMARY", `PRODUCT_ID=${productId}`],
};
