export interface ProductRanking {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
    imageURL: string;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
}

export interface GiftGridProps {
  gender: string;
  category: string;
}

export interface GiftItemProps {
  id: number;
  name: string;
  imageURL: string;
  brand: string;
  price: number; 
  discountRate: number;
  rank: number;
  onClick: () => void;
}