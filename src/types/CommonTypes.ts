export interface Price {
  basicPrice: number
  discountRate: number
  sellingPrice: number
}

export interface BrandInfo {
  id: number
  name: string
  imageURL: string
}

export interface Product {
  id: number
  name: string
  imageURL: string
  price: Price
  brandInfo: BrandInfo
}
