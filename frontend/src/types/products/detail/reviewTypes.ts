interface Review {
  id: string;
  authorName: string;
  content: string;
}

export interface ReviewData {
  totalCount: number;
  reviews: Review[];
}

export interface ReviewProps {
  review: ReviewData;
}
