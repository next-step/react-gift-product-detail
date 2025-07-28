export const QUERY_KEYS = {
  productSummary: (productId: number) => ["productSummary", productId] as const,
  productDetail: (id: number) => ["productDetail", id],
  review: (id: number) => ["product", id, "review"],
};
