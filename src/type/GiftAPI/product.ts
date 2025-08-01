export interface ApiResponse<T> {
  data : T
}

export interface ProductItem {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ProductItemFromTheme {
  list: ProductItem[];
  cursor: number;
  hasMoreList: boolean;
}

export const defaultProductItemFromTheme = {
  list: [],
  cursor: 0,
  hasMoreList: true
}

export interface ProductItemSummary {
  id: number;
  name: string;
  brandName: string;
  price: number
  imageURL: string;
}

export const defaultProductItemSummary = {
  id: 0,
  name: '',
  brandName: '',
  price: 0,
  imageURL: ''
}
export interface ProductWish{
  wishCount: number,
  isWished: boolean
}

export interface ProductDetailInfo {
  description : string,
    announcements: [
      {
        name: string,
        value: string,
        displayOrder: number
      }
    ]
}

export interface productHighlightReviewUrl{
  totalCount: number,
    reviews: [
      {
        id: string,
        authorName: string,
        content: string,
      },

    ]
  }
export enum  ProductDetailType {
  description,
  review,
  info,
}

export const DetailTypeOption = [

  { type: ProductDetailType.description, text: '상품설명' },
  { type: ProductDetailType.review, text: '상품후기' },
  { type: ProductDetailType.info, text: '상품정보' },
]
