import axios from 'axios';
import type { Product } from '@/types/product';

type BaseResponse<T> = { data: T };

export async function fetchProductRanking(): Promise<Product[]> {
  const res = await axios.get<BaseResponse<Product[]>>('/api/products/ranking');
  return res.data.data;
}
