import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { Result } from '@/types/CommonTypes';
import { queryKeys } from '@/lib/queryKeys';

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

export const fetchProductsRanking = async (
  gender: Gender,
  type: Type
): Promise<Product[]> => {
  const res = await api.get<Result<Product[]>>('/products/ranking', {
    params: {
      targetType: genderMap[gender],
      rankType: typeMap[type],
    },
  });
  return res.data.data;
};

export const useProductsRanking = (gender: Gender, type: Type) => {
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery<Product[]>({
    queryKey: queryKeys.products.ranking(gender, type),
    queryFn: () => fetchProductsRanking(gender, type),
    staleTime: 1000 * 60 * 5,
  });

  return {
    products,
    loading,
    error,
  };
};
