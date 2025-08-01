import { useSuspenseQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/axios';

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: Price;
  brandInfo: BrandInfo;
}

export type Gender = 'All' | '남성이' | '여성이' | '청소년이';
export type Type = '받고 싶어한' | '많이 선물한' | '위시로 받은';

const genderMap: Record<Gender, string> = {
  All: 'ALL',
  남성이: 'MALE',
  여성이: 'FEMALE',
  청소년이: 'TEEN',
};

const typeMap: Record<Type, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
};

const fetchProductsRanking = async (
  gender: Gender,
  type: Type
): Promise<Product[]> => {
  return await apiGet<Product[]>('/products/ranking', {
    params: {
      targetType: genderMap[gender],
      rankType: typeMap[type],
    },
  });
};

export const useProductsRanking = (gender: Gender, type: Type): Product[] => {
  const { data } = useSuspenseQuery<Product[]>({
    queryKey: ['productsRanking', gender, type],
    queryFn: () => fetchProductsRanking(gender, type),
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
