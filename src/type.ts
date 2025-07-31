export interface Product {
  id: number
  name: string
  imageURL: string
  price: {
    basicPrice: number
    discountRate: number
    sellingPrice: number
  }
  brandInfo: {
    id: number
    name: string
    imageURL: string
  }
}
export interface ProductAnnouncementItem {
  name: string
  value: string
  displayOrder: number
}

export interface ProductDetail {
  description: string
  announcement: ProductAnnouncementItem[] | Record<string, string>}

export interface HighlightReview {
  id: string
  authorName: string
  content: string
}

export interface HighlightReviewResponse {
  totalCount: number
  reviews: HighlightReview[]
}

export interface WishInfo {
  wishCount: number
  isWished: boolean
}