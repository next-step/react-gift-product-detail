interface Review {
  id: string;
  authorName: string;
  content: string;
}

export type ProductHighlightReview = {
  totalCount: number;
  reviews: Review[];
};
