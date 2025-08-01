import { apiGet, API_PATH } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Gender, Type } from '@/features/Gift/types/GiftTypes'
import type { Product } from '@/types/CommonTypes'

const genderMap: Record<Gender, string> = {
  All: 'ALL',
  남성이: 'MALE',
  여성이: 'FEMALE',
  청소년이: 'TEEN',
}

const typeMap: Record<Type, string> = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
}

const fetchProductsRanking = async (
  gender: Gender,
  type: Type
): Promise<Product[]> => {
  const res = await apiGet<Product[]>(API_PATH.RANKING, {
    params: {
      targetType: genderMap[gender],
      rankType: typeMap[type],
    },
  })
  return res
}

export const useProductsRanking = (gender: Gender, type: Type) => {
  const { data: productsRanking } = useSuspenseQuery({
    queryKey: ['productsRanking', gender, type],
    queryFn: () => fetchProductsRanking(gender, type),
    staleTime: 1000 * 60 * 5,
  })
  return productsRanking
}
