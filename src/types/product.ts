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
  rank: number
}

export interface ProductAnnouncement {
  name: string
  value: string
  displayOrder: number
}

export interface ProductDetail {
  description: string
  announcements: ProductAnnouncement[]
}

export interface WishInfo {
  wishCount: number
  isWished: boolean
}

export interface HighlightReview {
  id: string
  authorName: string
  content: string
}

export interface HighlightReviewResponse {
  totalCount: number
  reviews: HighlightReview[]
}
