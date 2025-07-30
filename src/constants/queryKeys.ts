export const QUERY_KEYS = {
  product: (id: number) => ["product", id] as const,
  productDetail: (id: number) => [...QUERY_KEYS.product(id), "detail"] as const,
  productReviews: (id: number) => [...QUERY_KEYS.product(id), "reviews"] as const,
  productWish: (id: number) => [...QUERY_KEYS.product(id), "wish"] as const,

  review: (productId: number, reviewId: number) =>
    [...QUERY_KEYS.productReviews(productId), reviewId] as const,
  reviewLikes: (productId: number, reviewId: number) =>
    [...QUERY_KEYS.review(productId, reviewId), "likes"] as const,
  reviewComments: (productId: number, reviewId: number) =>
    [...QUERY_KEYS.review(productId, reviewId), "comments"] as const,

  reviewComment: (productId: number, reviewId: number, commentId: number) =>
    [...QUERY_KEYS.reviewComments(productId, reviewId), commentId] as const,
};
