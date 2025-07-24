export const QUERY_KEYS = {
  productSummary: (productId: number) => ["productSummary", productId] as const,
};