export const PRODUCT_QUERY_KEYS = {
    PRODUCT_INFO_BY_ID: (productId: number) => ["PRODUCT", `PRODUCT_ID=${productId}`],
    PRODUCT_DETAIL_BY_ID: (productId: number) => ["PRODUCT", `PRODUCT_DETAIL_ID=${productId}`],
    PRODUCT_REVIEW_BY_ID: (productId: number) => ["PRODUCT", `PRODUCT_REVIEW_ID=${productId}`],
    PRODUCT_WISH_BY_ID: (productId: number) => ["PRODUCT", `PRODUCT_WISH_ID=${productId}`],
} as const;
