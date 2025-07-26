interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductHighlightReview {
  totalCount: number;
  reviews: Review[];
}
