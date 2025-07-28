type GeneralInfoType = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type DetailInfoType = {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
};

type ReviewInfoType = {
  totalCount: number;
  reviews: {
    id: string;
    authorName: string;
    content: string;
  }[];
};
type WishInfoType = {
  wishCount: number;
  isWished: boolean;
};

export type ProductInfoType = {
  generalInfo: GeneralInfoType;
  detailInfo: DetailInfoType;
  reviewInfo: ReviewInfoType;
  wishInfo: WishInfoType;
};
