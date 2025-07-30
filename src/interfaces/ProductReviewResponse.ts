import { Review } from "./Review"
export interface ProductReviewResponse {
  data: {
    totalCount: number
    reviews: Review[]
  }
}
