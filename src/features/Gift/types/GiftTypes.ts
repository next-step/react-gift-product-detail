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

export type Gender = 'All' | '남성이' | '여성이' | '청소년이'
export type Type = '받고 싶어한' | '많이 선물한' | '위시로 받은'

export interface Theme {
  themeId: number
  name: string
  image: string
}
